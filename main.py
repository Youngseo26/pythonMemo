from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:int
    content:str
    
memos=[]
    
app = FastAPI()


@app.post("/memos") 
def create_memo(memo:Memo):
    memos.append(memo)
    return 'Success!'

@app.get("/memos")
def read_memo():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id ==req_memo.id:
            memo.content = req_memo.content
            return 'Success!'
    return 'Fail:('    


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index, memo in enumerate (memos):
        if memo_id == memo_id:
            memos.pop(index)
            return 'Success!'
    return 'Fail:(' 
            


app.mount("/", StaticFiles(directory="static", html=True), name="static")