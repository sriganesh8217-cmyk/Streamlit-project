from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Message(BaseModel):
    role: MessageRole
    content: str


class Conversation(BaseModel):
    messages: list[Message] = Field(default_factory=list)

    def add_user_message(self, content: str) -> None:
        self.messages.append(Message(role=MessageRole.USER, content=content))

    def add_assistant_message(self, content: str) -> None:
        self.messages.append(Message(role=MessageRole.ASSISTANT, content=content))

    def to_gemini_format(self) -> list[dict]:
        return [
            {"role": msg.role.value, "parts": [{"text": msg.content}]}
            for msg in self.messages
        ]


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4096)
    conversation: list[Message] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class HealthResponse(BaseModel):
    status: str
    version: str
