import os
import cv2
import numpy as np
from PIL import Image

def extract_frames(video_path="public/character.mp4", output_dir="public/frames", num_frames=64):
    if not os.path.exists(video_path):
        print(f"[!] Error: {video_path} not found.")
        print("Please place your generated directional video at public/character.mp4 first.")
        return

    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_frames / fps if fps > 0 else 0
    print(f"[*] Video: {video_path}")
    print(f"[*] Total frames: {total_frames}, FPS: {fps:.2f}, Duration: {duration:.2f}s")
    
    if total_frames <= 0:
        print("[!] Could not read frames from video.")
        cap.release()
        return

    # In Step 2, the video typically finishes with a neutral pose facing camera,
    # and the rotational trajectory spans the first ~85-90% of the video.
    # We sample the rotational portion into 64 frames (360 degrees) and save center frame.
    rotation_end_frame = int(total_frames * 0.90) if total_frames > 64 else total_frames
    
    # Extract 64 frames
    frame_indices = np.linspace(0, rotation_end_frame - 1, num_frames, dtype=int)
    
    print(f"[*] Extracting {num_frames} frames to {output_dir}...")
    for i, idx in enumerate(frame_indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            continue
        
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame_rgb)
        
        out_path = os.path.join(output_dir, f"frame_{i:02d}.webp")
        img.save(out_path, "WEBP", quality=90)
    
    # Extract center neutral frame (last frame or specified center frame)
    cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames - 1)
    ret, center_frame = cap.read()
    if ret:
        center_rgb = cv2.cvtColor(center_frame, cv2.COLOR_BGR2RGB)
        center_img = Image.fromarray(center_rgb)
        center_path = "public/center.webp"
        center_img.save(center_path, "WEBP", quality=92)
        print(f"[*] Saved center neutral frame to {center_path}")

    # Detect background color from top-left corner of the first frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret, first_frame = cap.read()
    if ret:
        corner = first_frame[10, 10] # BGR
        hex_color = f"#{corner[2]:02x}{corner[1]:02x}{corner[0]:02x}"
        print(f"[*] Detected background color: {hex_color}")
        
    cap.release()
    print("[✓] Frame extraction complete!")

if __name__ == "__main__":
    extract_frames()
