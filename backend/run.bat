@echo off
echo Compiling and starting Zugar Zinger Backend...
if not exist bin mkdir bin
javac -d bin src/main/java/com/zugarzinger/ZugarZingerApplication.java
if %errorlevel% neq 0 (
    echo Compilation failed!
    exit /b %errorlevel%
)
java -cp bin com.zugarzinger.ZugarZingerApplication
