from pydantic import BaseModel
from typing import List, Optional
import datetime

# Users
class UserBase(BaseModel):
    student_id: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_admin: bool
    class Config:
        from_attributes = True

# Notes
class NoteBase(BaseModel):
    title: str
    unit: int
    file_url: str

class NoteCreate(NoteBase):
    subject_id: int

class Note(NoteBase):
    id: int
    subject_id: int
    class Config:
        from_attributes = True

# Question Papers
class QuestionPaperBase(BaseModel):
    year: int
    file_url: str

class QuestionPaperCreate(QuestionPaperBase):
    subject_id: int

class QuestionPaper(QuestionPaperBase):
    id: int
    subject_id: int
    class Config:
        from_attributes = True

# Subjects
class SubjectBase(BaseModel):
    name: str
    code: str
    description: str
    icon: Optional[str] = "book"

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int
    notes: List[Note] = []
    question_papers: List[QuestionPaper] = []
    class Config:
        from_attributes = True

# Courses
class CourseBase(BaseModel):
    name: str
    description: str
    duration: str
    difficulty: str
    enroll_url: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    class Config:
        from_attributes = True

# Announcements
class AnnouncementBase(BaseModel):
    title: str
    content: str

class AnnouncementCreate(AnnouncementBase):
    pass

class Announcement(AnnouncementBase):
    id: int
    date: datetime.datetime
    class Config:
        from_attributes = True

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    student_id: str | None = None
