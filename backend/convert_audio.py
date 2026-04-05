from pydub import AudioSegment
audio = AudioSegment.from_mp3("test_kannada.mp3")
audio.export("test_kannada.wav", format="wav")
print("Converted successfully!")