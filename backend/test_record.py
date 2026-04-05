import sounddevice as sd
from scipy.io.wavfile import write

print("Recording for 5 seconds... speak in Kannada now!")
recording = sd.rec(int(5 * 16000), samplerate=16000, channels=1, dtype='int16')
sd.wait()
write("test_kannada.wav", 16000, recording)
print("Saved as test_kannada.wav")