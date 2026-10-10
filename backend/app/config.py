from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "AI Chat API"
    APP_VERSION: str = "1.0.0"
    GOOGLE_API_KEY: str
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]
    MAX_REQUESTS_PER_MINUTE: int = 30
    GEMINI_MODEL: str = "gemini-3.8-flash"
    STREAMING_ENABLED: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
