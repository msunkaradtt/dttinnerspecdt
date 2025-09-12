from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from datetime import datetime

import os

import shutil
from pathlib import Path

from worker import celery, step2gltf_task, fbx2gltf_task
from celery.result import AsyncResult


Total_Files_Converted = 0
Server_Is_Busy = False

app = FastAPI(root_path="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")

@app.get("/")
def read_root():
    return {"Message": "Welcome to Convertor API. Please refer to /docs for more information."}

@app.post("/convert/step2gltf", status_code=201)
def convert_step2gltf(input_step_file: UploadFile):
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    now = datetime.now()
    output_file_name = f"dttconv_step2gltf_{now.strftime('%d-%m-%Y_%H-%M-%S')}"

    save_to = UPLOAD_DIR / input_step_file.filename

    with save_to.open("wb") as f:
        shutil.copyfileobj(input_step_file.file, f)

    task = step2gltf_task.delay(input_step_file.filename, output_file_name)

    return {"task_id": task.id, "status": "Submitted", "filename": input_step_file.filename}

@app.post("/convert/fbx2gltf", status_code=201)
def convert_fbx2gltf(input_fbx_file: UploadFile):
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    now = datetime.now()
    output_file_name = f"dttconv_fbx2gltf_{now.strftime('%d-%m-%Y_%H-%M-%S')}"

    save_to = UPLOAD_DIR / input_fbx_file.filename

    with save_to.open("wb") as f:
        shutil.copyfileobj(input_fbx_file.file, f)

    task = fbx2gltf_task.delay(input_fbx_file.filename, output_file_name)

    return {"task_id": task.id, "status": "Submitted", "filename": input_fbx_file.filename}

@app.get("/convert/step2gltfDownload/{fileName}")
def download_step2gltf(fileName):
    global Total_Files_Converted
    path = os.getcwd()
    filePath = path + "/uploads/" + fileName

    Total_Files_Converted += 1

    return FileResponse(filePath, media_type='model/gltf+json', filename=fileName)

@app.get("/convert/gettotalfiles")
def get_totalfiles():
    global Total_Files_Converted
    data = {"converted_files": Total_Files_Converted}

    return data


@app.get("/convert/activetasks/{task_id}")
async def get_status(task_id):
    task_result = AsyncResult(task_id, app=celery)

    if task_result.state == 'PENDING':
        response = {'state': task_result.state, 'status': 'Pending...'}
    elif task_result.state != 'FAILURE':
        response = {
            'state': task_result.state,
            'status': task_result.info.get('status', ''),
            'result': task_result.info.get('output_file', '')
            }
    else:
        response = {'state': task_result.state, 'status': str(task_result.info)}

    return response
