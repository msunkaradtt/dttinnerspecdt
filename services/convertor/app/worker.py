from celery import Celery
import os
import gmsh
import trimesh
import sys
import numpy as np

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")

celery.conf.update(
    task_soft_time_limit=600,
)

@celery.task(name="step2gltf_task")
def step2gltf_task(input_file, output_file_name):
    path = os.getcwd()
    inputFile = path + "/uploads/" + input_file
    outFile = path + "/uploads/" + output_file_name + ".gltf"

    try:
        gmsh.initialize()
        gmsh.option.setNumber("General.Terminal", 1)

        # Import the STEP file
        gmsh.model.occ.importShapes(inputFile)
        gmsh.model.occ.synchronize()

        # Set mesh options as per your code
        order = 1
        mesh_size_factor = 1./8

        gmsh.option.setNumber("Mesh.MeshSizeFactor", mesh_size_factor)

        gmsh.option.setNumber("Mesh.Algorithm", 6)

        if order == 1:
            gmsh.option.setNumber("Mesh.ElementOrder", 1)
            gmsh.model.mesh.generate(2)
            gmsh.model.mesh.refine()
        elif order == 2:
            gmsh.option.setNumber("Mesh.ElementOrder", 2)
            gmsh.model.mesh.generate(2)


        gmsh.option.setNumber("Mesh.MshFileVersion", 4)

        # Extract node data
        node_tags, node_coords, _ = gmsh.model.mesh.getNodes()
        nodes = np.array(node_coords).reshape(-1, 3)

        # Extract element data
        elem_types, elem_tags, elem_node_tags = gmsh.model.mesh.getElements()

        # Find triangle elements (Gmsh element type 2)
        elem_types = np.array(elem_types)
        indices = np.where(elem_types == 2)[0]
        if len(indices) == 0:
            print("No triangle elements found in the mesh.")
            gmsh.finalize()
            sys.exit(1)
        else:
            idx = indices[0]

        # Get triangle connectivity
        tri_node_tags = elem_node_tags[idx]

        # Map node tags to indices
        tag_to_index = {tag: idx for idx, tag in enumerate(node_tags)}
        triangles = np.array([tag_to_index[tag] for tag in tri_node_tags]).reshape(-1, 3)

        # Create a Trimesh object
        mesh = trimesh.Trimesh(vertices=nodes, faces=triangles, process=False)

        mesh.euler_number
        mesh.vertices -= mesh.center_mass

        # Rescale and center the mesh
        rescale = max(mesh.extents) / 2.0
        tform = [
            -(mesh.bounds[1][i] + mesh.bounds[0][i]) / 2.0
            for i in range(3)
        ]
        matrix = np.eye(4)
        matrix[:3, 3] = tform
        mesh.apply_transform(matrix)
        matrix = np.eye(4)
        matrix[:3, :3] /= rescale
        mesh.apply_transform(matrix)

        mesh.fix_normals()

        # Export to glTF
        mesh.export(outFile, 'gltf', embed_buffers=True)

        # Finalize Gmsh
        gmsh.finalize()


        return {'status': 'Conversion complete', 'output_file': output_file_name + ".gltf"}
    except Exception as e:
        return {'status': 'Conversion failed'}