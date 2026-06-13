---
spec_id: admin/extron-dvs605
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DVS 605 Control Spec"
manufacturer: Extron
model_family: "DVS 605"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DVS 605"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dvs_605_68-2110-01_J.pdf
  - https://www.extron.com/download/
  - https://www.extron.com
retrieved_at: 2026-06-12T18:55:16.441Z
last_checked_at: 2026-06-12T19:17:34.644Z
generated_at: 2026-06-12T19:17:34.644Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "X3&_auto_switch"
  - "firmware version range not stated; MAC address default shown as 00-05-A6-xx-xx-xx; full safety/interlock section not present in source"
  - "HTTP base path not stated in source"
  - "firmware version compatibility not stated; electrical specs (voltage/current/power) absent; detailed physical safety warnings absent"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:17:34.644Z
  matched_actions: 257
  action_count: 257
  confidence: medium
  summary: "All 257 spec actions match verbatim source commands; transport parameters confirmed; only auto-switch (X3&) present in source but not represented in spec. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Extron DVS 605 Control Spec

## Summary
The Extron DVS 605 is a 5-input audio/video scaler with simultaneous analog (VGA) and digital (HDMI, 3G/HD-SDI on D-models) outputs, controllable via RS-232, USB, and Ethernet (TCP/IP Telnet port 23, HTTP port 80). This spec covers the Extron Simple Instruction Set (SIS) command set used for input selection, PIP control, output resolution, HDCP, audio, presets, and device configuration. Factory default Telnet port is 23; factory default web/HTTP port is 80. RS-232 is 9600 baud, 8 data bits, 1 stop bit, no parity, no flow control. Authentication is password-based with administrator and user levels; factory passwords are set to the unit serial number, and a system reset clears them (no password).

<!-- UNRESOLVED: firmware version range not stated; MAC address default shown as 00-05-A6-xx-xx-xx; full safety/interlock section not present in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23   # Telnet SIS port (default, remappable)
  base_url: ""  # UNRESOLVED: HTTP base path not stated in source
  http_port: 80  # web UI port (default, remappable)
auth:
  type: password
  description: "Administrator and user passwords; factory default = device serial number; absolute system reset clears passwords (no password). Superscript '24' commands require administrator login."
```

## Traits
```yaml
- powerable       # inferred from power save mode commands (PSAV)
- routable        # inferred from input selection commands (!, &, $)
- queryable       # inferred from status/query commands (I, Q, N, i, STAT)
- levelable       # inferred from audio volume/gain commands (V, G)
```

## Actions
```yaml
# ===== Input selection =====
- id: input_select_video_and_audio
  label: Select video and audio input
  kind: action
  command: "X!!"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
      description: "Input number (1-5)"
- id: input_select_video
  label: Select video input (breakaway)
  kind: action
  command: "X!&"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: input_select_audio
  label: Select audio input (breakaway)
  kind: action
  command: "X!$"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: input_view_video
  label: View current video input
  kind: query
  command: "&"
- id: input_view_audio
  label: View current audio input
  kind: query
  command: "$"
- id: input_view_current
  label: View selected input
  kind: query
  command: "!"

# ===== Picture-in-Picture =====
- id: pip_on
  label: PIP on with input
  kind: action
  command: "EX2&PIP"
  params:
    - name: pip_input
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0=off, 1-4=PIP source (input 5 not available for PIP)"
- id: pip_off
  label: PIP off
  kind: action
  command: "E0PIP"
- id: pip_view
  label: View PIP selection
  kind: query
  command: "EPIP"
- id: pip_swap
  label: Swap main and PIP window
  kind: action
  command: "%"

# ===== Input video format =====
- id: input_set_video_format
  label: Set input video format
  kind: action
  command: "X!*X#\\"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: format
      type: integer
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=no signal, 1=RGB, 2=YUV auto, 3=RGBcvS, 4=S-video, 5=Composite, 6=DVI/HDMI (3-5 only), 7=Auto detect"
- id: input_view_set_format
  label: View set input format
  kind: query
  command: "X!\\"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: input_view_detected_format
  label: View detected input format
  kind: query
  command: "X!*\\"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Input name =====
- id: input_write_name
  label: Write input name
  kind: action
  command: "EX!,X1$NI"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: name
      type: string
      description: "Up to 16 characters; single space clears"
- id: input_read_name
  label: Read input name
  kind: query
  command: "EX!NI"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Input signal status (unsolicited notification) =====
- id: ntfy_enable
  label: Enable unsolicited signal status
  kind: action
  command: "ES1NTFY"
- id: ntfy_disable
  label: Disable unsolicited signal status
  kind: action
  command: "ES0NTFY"
- id: ntfy_query
  label: Query signal notification state
  kind: query
  command: "ESNTFY"

# ===== EDID (VGA and HDMI) =====
- id: edid_assign
  label: Assign EDID to input
  kind: action
  command: "EAX!*X1(EDID"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: edid_slot
      type: integer
      description: "See EDID table (X1() 0-92); 0=auto, 3-7=custom slots"
- id: edid_view
  label: View assigned EDID for input
  kind: query
  command: "EAX!EDID"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: edid_capture_output
  label: Capture output EDID to custom slot
  kind: action
  command: "ESX@*X1(EDID"
  params:
    - name: output
      type: integer
      values: [1, 2]
      description: "1=analog, 2=HDMI"
    - name: slot
      type: integer
      values: [3, 4, 5, 6, 7]
- id: edid_export
  label: Export EDID file
  kind: action
  command: "EEX1(,<filename>EDID"
  params:
    - name: edid_slot
      type: integer
    - name: filename
      type: string
- id: edid_import
  label: Import EDID file
  kind: action
  command: "EIX1(,<filename>EDID"
  params:
    - name: edid_slot
      type: integer
      values: [3, 4, 5, 6, 7]
    - name: filename
      type: string

# ===== Auto-Image =====
- id: autoimage_enable
  label: Enable Auto-Image for input
  kind: action
  command: "X!*1A"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: autoimage_disable
  label: Disable Auto-Image for input
  kind: action
  command: "X!*0A"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: autoimage_view
  label: View Auto-Image setting
  kind: query
  command: "X!A"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: autoimage_execute
  label: Execute Auto-Image (current aspect)
  kind: action
  command: "0*A"
- id: autoimage_execute_fill
  label: Execute Auto-Image and fill
  kind: action
  command: "1*A"
- id: autoimage_execute_follow
  label: Execute Auto-Image and follow
  kind: action
  command: "2*A"
- id: autoimage_set_threshold
  label: Set Auto-Image threshold
  kind: action
  command: "EX3@ALVL"
  params:
    - name: threshold
      type: integer
      values: [0, 100]
      description: "0=black, 100=white, default=25"
- id: autoimage_view_threshold
  label: View Auto-Image threshold
  kind: query
  command: "EALVL"

# ===== Horizontal start =====
- id: hstart_set
  label: Set horizontal start
  kind: action
  command: "EX!*X$HSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 255]
      description: "default midpoint=128"
- id: hstart_increment
  label: Increment horizontal start
  kind: action
  command: "EX!+HSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hstart_decrement
  label: Decrement horizontal start
  kind: action
  command: "EX!-HSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hstart_view
  label: View horizontal start
  kind: query
  command: "EX!HSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Vertical start =====
- id: vstart_set
  label: Set vertical start
  kind: action
  command: "EX!*X$VSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 255]
- id: vstart_increment
  label: Increment vertical start
  kind: action
  command: "EX!+VSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: vstart_decrement
  label: Decrement vertical start
  kind: action
  command: "EX!-VSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: vstart_view
  label: View vertical start
  kind: query
  command: "EX!VSRT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Pixel phase =====
- id: phas_set
  label: Set pixel phase
  kind: action
  command: "EX!*X%PHAS"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 63]
      description: "default=31"
- id: phas_increment
  label: Increment pixel phase
  kind: action
  command: "EX!+PHAS"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: phas_decrement
  label: Decrement pixel phase
  kind: action
  command: "EX!-PHAS"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: phas_view
  label: View pixel phase
  kind: query
  command: "EX!PHAS"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Total pixels =====
- id: tpix_set
  label: Set total pixels
  kind: action
  command: "EX!*X^TPIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      description: "±512 of default"
- id: tpix_increment
  label: Increment total pixels
  kind: action
  command: "EX!+TPIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: tpix_decrement
  label: Decrement total pixels
  kind: action
  command: "EX!-TPIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: tpix_view
  label: View total pixels
  kind: query
  command: "EX!TPIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Active pixels =====
- id: apix_set
  label: Set active pixels
  kind: action
  command: "EX!*X&APIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      description: "±512 of default"
- id: apix_increment
  label: Increment active pixels
  kind: action
  command: "EX!+APIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: apix_decrement
  label: Decrement active pixels
  kind: action
  command: "EX!-APIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: apix_view
  label: View active pixels
  kind: query
  command: "EX!APIX"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Active lines =====
- id: alin_set
  label: Set active lines
  kind: action
  command: "EX!*X*ALIN"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      description: "±512 of default"
- id: alin_increment
  label: Increment active lines
  kind: action
  command: "EX!+ALIN"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: alin_decrement
  label: Decrement active lines
  kind: action
  command: "EX!-ALIN"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: alin_view
  label: View active lines
  kind: query
  command: "EX!ALIN"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Film mode autodetect =====
- id: film_enable
  label: Enable film mode autodetect
  kind: action
  command: "EX!*1FILM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: film_disable
  label: Disable film mode autodetect
  kind: action
  command: "EX!*0FILM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: film_view
  label: View film mode setting
  kind: query
  command: "EX!FILM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Picture adjustments / video mute =====
- id: vmt_black
  label: Mute all outputs to black
  kind: action
  command: "1B"
- id: vmt_sync_off
  label: Mute all sync and video
  kind: action
  command: "2B"
- id: vmt_unmute
  label: Unmute video
  kind: action
  command: "0B"
- id: vmt_view
  label: View video mute status
  kind: query
  command: "B"

# ===== Color / Tint / Contrast / Brightness / Detail filter =====
- id: colr_set
  label: Set color
  kind: action
  command: "EX!*X1%COLR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 127]
      description: "default=64"
- id: colr_increment
  label: Increment color
  kind: action
  command: "EX!+COLR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: colr_decrement
  label: Decrement color
  kind: action
  command: "EX!-COLR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: colr_view
  label: View color
  kind: query
  command: "EX!COLR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: tint_set
  label: Set tint
  kind: action
  command: "EX!*X1%TINT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 127]
- id: tint_increment
  label: Increment tint
  kind: action
  command: "EX!+TINT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: tint_decrement
  label: Decrement tint
  kind: action
  command: "EX!-TINT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: tint_view
  label: View tint
  kind: query
  command: "EX!TINT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: cont_set
  label: Set contrast
  kind: action
  command: "EX!*X1%CONT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 127]
- id: cont_increment
  label: Increment contrast
  kind: action
  command: "EX!+CONT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: cont_decrement
  label: Decrement contrast
  kind: action
  command: "EX!-CONT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: cont_view
  label: View contrast
  kind: query
  command: "EX!CONT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: brit_set
  label: Set brightness
  kind: action
  command: "EX!*X1%BRIT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 127]
- id: brit_increment
  label: Increment brightness
  kind: action
  command: "EX!+BRIT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: brit_decrement
  label: Decrement brightness
  kind: action
  command: "EX!-BRIT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: brit_view
  label: View brightness
  kind: query
  command: "EX!BRIT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdet_set
  label: Set detail filter level
  kind: action
  command: "EX!*X1%HDET"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
    - name: value
      type: integer
      values: [0, 127]
- id: hdet_increment
  label: Increment detail filter
  kind: action
  command: "EX!+HDET"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdet_decrement
  label: Decrement detail filter
  kind: action
  command: "EX!-HDET"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdet_view
  label: View detail filter
  kind: query
  command: "EX!HDET"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]

# ===== Window geometry =====
- id: hctr_window_set
  label: Set window horizontal position
  kind: action
  command: "E1*X1**X1^HCTR"
  params:
    - name: window
      type: integer
      values: [1, 2]
      description: "1=main, 2=PIP"
    - name: value
      type: integer
      description: "±11000, leading +/-"
- id: hctr_window_inc
  label: Increment window horizontal position
  kind: action
  command: "E1*X1*+HCTR"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hctr_window_dec
  label: Decrement window horizontal position
  kind: action
  command: "E1*X1*-HCTR"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hctr_window_view
  label: View window horizontal position
  kind: query
  command: "E1*X1*HCTR"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hsiz_window_set
  label: Set window horizontal size
  kind: action
  command: "E1*X1**X1&HSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
    - name: value
      type: integer
      values: [10, 11000]
- id: hsiz_window_inc
  label: Increase window horizontal size
  kind: action
  command: "E1*X1*+HSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hsiz_window_dec
  label: Decrease window horizontal size
  kind: action
  command: "E1*X1*-HSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hsiz_window_view
  label: View window horizontal size
  kind: query
  command: "E1*X1*HSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: vsiz_window_set
  label: Set window vertical size
  kind: action
  command: "E1*X1**X1&VSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
    - name: value
      type: integer
      values: [10, 11000]
- id: vsiz_window_inc
  label: Increase window vertical size
  kind: action
  command: "E1*X1*+VSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: vsiz_window_dec
  label: Decrease window vertical size
  kind: action
  command: "E1*X1*-VSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: vsiz_window_view
  label: View window vertical size
  kind: query
  command: "E1*X1*VSIZ"
  params:
    - name: window
      type: integer
      values: [1, 2]
- id: hctr_image_set
  label: Set image horizontal position
  kind: action
  command: "E2*X1**X1^HCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
    - name: value
      type: integer
      description: "±11000"
- id: hctr_image_inc
  label: Increment image horizontal position
  kind: action
  command: "E2*X1*+HCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: hctr_image_dec
  label: Decrement image horizontal position
  kind: action
  command: "E2*X1*-HCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: hctr_image_view
  label: View image horizontal position
  kind: query
  command: "E2*X1*HCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: vctr_image_set
  label: Set image vertical position
  kind: action
  command: "E2*X1**X1^VCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
    - name: value
      type: integer
      description: "±11000"
- id: vctr_image_inc
  label: Increment image vertical position
  kind: action
  command: "E2*X1*+VCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: vctr_image_dec
  label: Decrement image vertical position
  kind: action
  command: "E2*X1*-VCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: vctr_image_view
  label: View image vertical position
  kind: query
  command: "E2*X1*VCTR"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: hsiz_image_set
  label: Set image horizontal size
  kind: action
  command: "E2*X1**X1&HSIZ"
  params:
    - name: image
      type: integer
      values: [1, 2]
    - name: value
      type: integer
      values: [10, 11000]
- id: hsiz_image_inc
  label: Increase image horizontal size
  kind: action
  command: "E2*X1*+HSIZ"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: hsiz_image_dec
  label: Decrease image horizontal size
  kind: action
  command: "E2*X1*-HSIZ"
  params:
    - name: image
      type: integer
      values: [1, 2]
- id: hsiz_image_view
  label: View image horizontal size
  kind: query
  command: "E2*X1*HSIZ"
  params:
    - name: image
      type: integer
      values: [1, 2]

# ===== Output configuration =====
- id: rate_set
  label: Set output scaler rate
  kind: action
  command: "EX1(RATE"
  params:
    - name: edid_slot
      type: integer
      description: "See EDID table X1() (0=auto, 3-7=custom, 10-92=predefined)"
- id: rate_view
  label: View output scaler rate
  kind: query
  command: "ERATE"
- id: opol_set
  label: Set VGA output polarity
  kind: action
  command: "EX2!OPOL"
  params:
    - name: polarity
      type: integer
      values: [0, 1, 2, 3]
      description: "0=H-/V-, 1=H-/V+, 2=H+/V-, 3=H+/V+"
- id: opol_view
  label: View VGA output polarity
  kind: query
  command: "EOPOL"
- id: osyn_set
  label: Set VGA output sync format
  kind: action
  command: "EX2@OSYN"
  params:
    - name: format
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0=RGBHV, 1=RGBS, 2=RGsB, 3=Y R-Y B-Y bi-level, 4=Y R-Y B-Y tri-level"
- id: osyn_view
  label: View VGA output sync format
  kind: query
  command: "EOSYN"
- id: vtpo_set
  label: Set HDMI output format
  kind: action
  command: "EX3^VTPO"
  params:
    - name: format
      type: integer
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Auto, 1=DVI, 2=HDMI 444 RGB, 3=HDMI 444 YUV FULL, 4=HDMI 444 YUV LIMITED, 5=HDMI 422 YUV FULL, 6=HDMI 422 YUV LIMITED"
- id: vtpo_view
  label: View HDMI output format
  kind: query
  command: "EVTPO"

# ===== Power save mode =====
- id: psav_off
  label: Power save off (full power)
  kind: action
  command: "E0PSAV"
- id: psav_on
  label: Power save on (low power)
  kind: action
  command: "E1PSAV"
- id: psav_view
  label: View power save state
  kind: query
  command: "EPSAV"

# ===== Screen saver mode =====
- id: ssav_set
  label: Set screen saver mode
  kind: action
  command: "EMX3)SSAV"
  params:
    - name: mode
      type: integer
      values: [1, 2]
      description: "1=black, 2=blue+OSD"
- id: ssav_view
  label: View screen saver mode
  kind: query
  command: "EMSSAV"

# ===== Audio configuration =====
- id: amt_on
  label: Audio mute on
  kind: action
  command: "1Z"
- id: amt_off
  label: Audio mute off
  kind: action
  command: "0Z"
- id: amt_view
  label: View audio mute status
  kind: query
  command: "Z"
- id: audio_gain_set
  label: Set audio gain/attenuation
  kind: action
  command: "X4)G"
  params:
    - name: value
      type: integer
      description: "-53 to +24 dB, leading +/-"
- id: audio_gain_inc
  label: Increment audio gain
  kind: action
  command: "+G"
- id: audio_gain_dec
  label: Decrement audio gain
  kind: action
  command: "-G"
- id: audio_gain_view
  label: View audio gain
  kind: query
  command: "G"
- id: volume_set
  label: Set audio volume
  kind: action
  command: "X3*V"
  params:
    - name: value
      type: integer
      description: "-100 to 0 dB, default=-30 dB; leading '-' for attenuation"
- id: volume_inc
  label: Increment volume
  kind: action
  command: "+V"
- id: volume_dec
  label: Decrement volume
  kind: action
  command: "-V"
- id: volume_view
  label: View audio volume
  kind: query
  command: "V"
- id: adly_set
  label: Set static audio delay
  kind: action
  command: "ESX4#ADLY"
  params:
    - name: delay
      type: integer
      values: [0, 255]
      description: "milliseconds, default=0"
- id: adly_view
  label: View static audio delay
  kind: query
  command: "ESADLY"
- id: afmt_input_set_none
  label: Set audio input to none
  kind: action
  command: "EIX!*0AFMT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: afmt_input_set_analog
  label: Set audio input to analog
  kind: action
  command: "EIX!*1AFMT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: afmt_input_set_2ch_digital
  label: Set audio input to 2Ch digital
  kind: action
  command: "EIX!*2AFMT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: afmt_input_set_full_digital
  label: Set audio input to Full digital
  kind: action
  command: "EIX!*3AFMT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: afmt_input_set_2ch_auto
  label: Set audio input to 2Ch digital auto
  kind: action
  command: "EIX!*4AFMT"
  params:
    - name: input
      type: integer
      values: [3, 4, 5]
- id: afmt_input_set_full_auto
  label: Set audio input to Full digital auto
  kind: action
  command: "EIX!*5AFMT"
  params:
    - name: input
      type: integer
      values: [3, 4, 5]
- id: afmt_input_view
  label: View audio input type
  kind: query
  command: "EIX!AFMT"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: afmt_output_set
  label: Set audio output format
  kind: action
  command: "EOX3(AFMT"
  params:
    - name: format
      type: integer
      values: [1, 2]
      description: "1=dual mono, 2=stereo (default)"
- id: afmt_output_view
  label: View audio output format
  kind: query
  command: "EOAFMT"
- id: aflw_set
  label: Set audio follow source
  kind: action
  command: "EX4!AFLW"
  params:
    - name: source
      type: integer
      values: [0, 1, 2]
      description: "0=Main, 1=PIP, 2=Toggle"
- id: aflw_view
  label: View audio follow source
  kind: query
  command: "EAFLW"

# ===== Presets =====
- id: input_preset_recall
  label: Recall input preset
  kind: action
  command: "2*X2$."
  params:
    - name: preset
      type: integer
      values: [1, 128]
- id: input_preset_save
  label: Save input preset
  kind: action
  command: "2*X2$,"
  params:
    - name: preset
      type: integer
      values: [1, 128]
- id: input_preset_delete
  label: Delete input preset
  kind: action
  command: "EX2*X2$PRST"
  params:
    - name: image
      type: integer
      description: "Per X2* symbol (input preset slot indicator)"
    - name: preset
      type: integer
      values: [1, 128]
- id: input_preset_name_write
  label: Write input preset name
  kind: action
  command: "E2*X2$,X1$PNAM"
  params:
    - name: preset
      type: integer
      values: [1, 128]
    - name: name
      type: string
      description: "Up to 16 characters"
- id: input_preset_name_read
  label: Read input preset name
  kind: query
  command: "E2*X2$PNAM"
  params:
    - name: preset
      type: integer
      values: [1, 128]
- id: pip_preset_recall_no_input
  label: Recall PIP preset (no inputs)
  kind: action
  command: "3*X2#."
  params:
    - name: preset
      type: integer
      values: [1, 16]
- id: pip_preset_recall_with_input
  label: Recall PIP preset (with inputs)
  kind: action
  command: "4*X2#."
  params:
    - name: preset
      type: integer
      values: [1, 16]
- id: pip_preset_save
  label: Save PIP preset
  kind: action
  command: "4*X2#,"
  params:
    - name: preset
      type: integer
      values: [1, 16]
- id: pip_preset_delete
  label: Delete PIP preset
  kind: action
  command: "EX4*X2#PRST"
  params:
    - name: image
      type: integer
      description: "Per X4* symbol"
    - name: preset
      type: integer
      values: [1, 16]
- id: pip_preset_name_write
  label: Write PIP preset name
  kind: action
  command: "E3*X2#,X1$PNAM"
  params:
    - name: preset
      type: integer
      values: [1, 16]
    - name: name
      type: string
- id: pip_preset_name_read
  label: Read PIP preset name
  kind: query
  command: "E3*X2#PNAM"
  params:
    - name: preset
      type: integer
      values: [1, 16]

# ===== Advanced configuration =====
- id: test_set
  label: Set test pattern
  kind: action
  command: "EX2)TEST"
  params:
    - name: pattern
      type: integer
      values: [0, 14]
      description: "0=off, 1=crop, 2=alt px, 3=alt ln, 4=crosshatch, 5=4x4, 6=bars, 7=gray, 8=ramp, 9=white, 10=1.33, 11=1.78, 12=1.85, 13=2.35, 14=blue"
- id: test_view
  label: View test pattern
  kind: query
  command: "ETEST"
- id: freeze_all
  label: Freeze all windows
  kind: action
  command: "1F"
- id: freeze_main
  label: Freeze main window
  kind: action
  command: "2F"
- id: freeze_pip
  label: Freeze PIP window
  kind: action
  command: "3F"
- id: freeze_off
  label: Unfreeze all
  kind: action
  command: "0F"
- id: freeze_view
  label: View freeze status
  kind: query
  command: "F"
- id: amem_enable
  label: Enable auto memory for input
  kind: action
  command: "EX!*1AMEM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: amem_disable
  label: Disable auto memory for input
  kind: action
  command: "EX!*0AMEM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: amem_view
  label: View auto memory setting
  kind: query
  command: "EX!AMEM"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: aspr_fill
  label: Set input aspect to fill
  kind: action
  command: "EX!*1ASPR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: aspr_follow
  label: Set input aspect to follow
  kind: action
  command: "EX!*2ASPR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: aspr_view
  label: View input aspect setting
  kind: query
  command: "EX!ASPR"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: swef_cut
  label: Set switch effect to cut
  kind: action
  command: "E0SWEF"
- id: swef_dissolve
  label: Set switch effect to dissolve
  kind: action
  command: "E1SWEF"
- id: swef_view
  label: View switch effect
  kind: query
  command: "ESWEF"
- id: edur_set
  label: Set dissolve duration
  kind: action
  command: "EX3%EDUR"
  params:
    - name: duration
      type: integer
      values: [2, 50]
      description: "tenths of seconds (2=0.2s, 50=5.0s), default=3"
- id: edur_view
  label: View dissolve duration
  kind: query
  command: "EEDUR"
- id: exe1
  label: Enable Executive mode 1 (full lock)
  kind: action
  command: "1X"
- id: exe2
  label: Enable Executive mode 2 (partial lock)
  kind: action
  command: "2X"
- id: exe0
  label: Disable Executive mode
  kind: action
  command: "0X"
- id: exe_view
  label: View Executive mode
  kind: query
  command: "X"
- id: oscn_set
  label: Set overscan mode
  kind: action
  command: "EX#*X2*OSCN"
  params:
    - name: format
      type: integer
      values: [1, 2, 3, 4, 5, 6]
      description: "1=RGB, 2=YUV auto, 3=RGBcvS, 4=S-video, 5=composite, 6=DVI/HDMI"
    - name: overscan
      type: integer
      values: [0, 1]
      description: "0=0.0%, 1=2.5%"
- id: oscn_view
  label: View overscan mode
  kind: query
  command: "EX#OSCN"
  params:
    - name: format
      type: integer
      values: [1, 2, 3, 4, 5, 6]
- id: hdcp_notify_enable
  label: Enable HDCP notification
  kind: action
  command: "EN1HDCP"
- id: hdcp_notify_disable
  label: Disable HDCP notification
  kind: action
  command: "EN0HDCP"
- id: hdcp_in_enable
  label: Enable HDCP auth for input
  kind: action
  command: "EEX!*1HDCP"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdcp_in_disable
  label: Disable HDCP auth for input
  kind: action
  command: "EEX!*0HDCP"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdcp_in_view
  label: View HDCP auth for input
  kind: query
  command: "EEX!HDCP"
  params:
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5]
- id: hdcp_out_set
  label: Set HDCP output mode
  kind: action
  command: "ESX3$HDCP"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
      description: "0=follow input, 1=always encrypt, 2=follow w/ DVI trials, 3=always encrypt w/ DVI trials"
- id: hdcp_out_view
  label: View HDCP output mode
  kind: query
  command: "ESHDCP"
- id: glok_disable
  label: Disable genlock
  kind: action
  command: "E0GLOK"
- id: glok_input
  label: Enable input genlock
  kind: action
  command: "E1GLOK"
- id: glok_sdi
  label: Enable SDI genlock (D-models)
  kind: action
  command: "E2GLOK"
- id: glok_view
  label: View genlock setting
  kind: query
  command: "EGLOK"
- id: glok_status
  label: View genlock status (verbose 2/3)
  kind: query
  command: "E41STAT"
- id: glof_h_set
  label: Set horizontal genlock offset
  kind: action
  command: "EHX5)GLOF"
  params:
    - name: pixels
      type: integer
      description: "± total pixels-1 of current output resolution"
- id: glof_h_view
  label: View horizontal genlock offset
  kind: query
  command: "EHGLOF"
- id: glof_v_set
  label: Set vertical genlock offset
  kind: action
  command: "EVX5!GLOF"
  params:
    - name: lines
      type: integer
      description: "± total lines-1 of current output resolution"
- id: glof_v_view
  label: View vertical genlock offset
  kind: query
  command: "EVGLOF"

# ===== Signal / IR =====
- id: sig_view
  label: View signal presence (all inputs)
  kind: query
  command: "0LS"
- id: ir_enable
  label: Enable hardwired IR port
  kind: action
  command: "65*0#"
- id: ir_disable
  label: Disable hardwired IR port
  kind: action
  command: "65*1#"
- id: ir_view
  label: View IR disable setting
  kind: query
  command: "65#"

# ===== OSD time-out =====
- id: mdur_set
  label: Set OSD menu time-out
  kind: action
  command: "EX2%MDUR"
  params:
    - name: seconds
      type: integer
      values: [0, 501]
      description: "0=OSD disabled, 1-500=seconds, 501=never"
- id: mdur_view
  label: View OSD menu time-out
  kind: query
  command: "EMDUR"

# ===== Reset / file system =====
- id: file_erase_named
  label: Erase named file
  kind: action
  command: "E<filename>EF"
  params:
    - name: filename
      type: string
- id: file_erase_dir
  label: Erase current directory and files
  kind: action
  command: "E/EF"
- id: file_erase_dir_subdir
  label: Erase current directory and subdirectories
  kind: action
  command: "E//EF"
- id: flash_erase
  label: Erase flash memory
  kind: action
  command: "EZFFF"
- id: reset_factory
  label: Reset to factory defaults (retain Ethernet)
  kind: action
  command: "EZXXX"
- id: reset_absolute
  label: Absolute system reset (resets IP to 192.168.254.254)
  kind: action
  command: "EZQQQ"
- id: reset_absolute_retain_ip
  label: Absolute system reset (retain IP)
  kind: action
  command: "EZY"

# ===== Information =====
- id: info_general
  label: Query general information
  kind: query
  command: "I"
- id: firmware_version
  label: Query firmware version
  kind: query
  command: "Q"
- id: firmware_full_version
  label: Query full firmware version
  kind: query
  command: "0Q"
- id: firmware_bootstrap
  label: Query bootstrap firmware
  kind: query
  command: "2Q"
- id: firmware_factory
  label: Query factory base code
  kind: query
  command: "3Q"
- id: firmware_updated
  label: Query updated firmware
  kind: query
  command: "4Q"
- id: part_number
  label: Query part number
  kind: query
  command: "N"
- id: model_name
  label: Query model name
  kind: query
  command: "1i"
- id: model_description
  label: Query model description
  kind: query
  command: "2i"
- id: system_memory
  label: Query system memory usage
  kind: query
  command: "3i"
- id: user_memory
  label: Query user memory usage
  kind: query
  command: "4i"
- id: internal_temp
  label: Query internal temperature
  kind: query
  command: "E20STAT"

# ===== Backup / restore =====
- id: config_save
  label: Save device configuration
  kind: action
  command: "E1*{config_type}XF"
  params:
    - name: config_type
      type: integer
      values: [0, 2]
      description: "0=IP config (ip.cfg), 2=unit parameters (box.cfg)"
- id: config_restore
  label: Restore device configuration
  kind: action
  command: "E0*{config_type}XF"
  params:
    - name: config_type
      type: integer
      values: [0, 2]

# ===== Product naming =====
- id: unit_name_set
  label: Set unit name
  kind: action
  command: "EX1@CN"
  params:
    - name: name
      type: string
      description: "Up to 24 chars (A-Z, 0-9, -); first alpha, last not -"
- id: unit_name_default
  label: Reset unit name to factory default
  kind: action
  command: "E•CN"
- id: unit_name_view
  label: View unit name
  kind: query
  command: "ECN"

# ===== IP / Network (Telnet) =====
- id: tc_set_conn
  label: Set current connection port timeout
  kind: action
  command: "E0*TC"
- id: tc_view_conn
  label: View current connection port timeout
  kind: query
  command: "E1*TC"
- id: tc_set_global
  label: Set global IP port timeout
  kind: action
  command: "E0TC"
- id: tc_view_global
  label: View global IP port timeout
  kind: query
  command: "E1TC"
- id: ct_set
  label: Set time/date
  kind: action
  command: "EX10&CT"
  params:
    - name: datetime
      type: string
      description: "MM/DD/YY-HH:MM:SS"
- id: ct_view
  label: Read time/date
  kind: query
  command: "ECT"
- id: dhcp_on
  label: Set DHCP on
  kind: action
  command: "E1DH"
- id: dhcp_off
  label: Set DHCP off
  kind: action
  command: "E0DH"
- id: dhcp_view
  label: View DHCP mode
  kind: query
  command: "EDH"
- id: ip_set
  label: Set IP address
  kind: action
  command: "EX10*CI"
  params:
    - name: ip
      type: string
      description: "xxx.xxx.xxx.xxx (default 192.168.254.254)"
- id: ip_view
  label: Read IP address
  kind: query
  command: "ECI"
- id: gw_set
  label: Set gateway IP
  kind: action
  command: "EX10*CG"
  params:
    - name: ip
      type: string
- id: gw_view
  label: Read gateway IP
  kind: query
  command: "ECG"
- id: sm_set
  label: Set subnet mask
  kind: action
  command: "EX11)CS"
  params:
    - name: mask
      type: string
      description: "default 255.255.0.0"
- id: sm_view
  label: Read subnet mask
  kind: query
  command: "ECS"
- id: reboot_net
  label: Reboot networking
  kind: action
  command: "E2BOOT"
- id: mac_read
  label: Read MAC address
  kind: query
  command: "ECI"  # source denotes the read-MAC path under CI block; default MAC = 00-05-A6-xx-xx-xx

# ===== Passwords / verbose =====
- id: admin_pw_view
  label: View administrator password
  kind: query
  command: "ECA"
- id: admin_pw_clear
  label: Clear all passwords
  kind: action
  command: "E%20CA"
- id: user_pw_view
  label: View user password
  kind: query
  command: "ECU"
- id: user_pw_clear
  label: Clear user password
  kind: action
  command: "E%20CU"
- id: verbose_set
  label: Set verbose mode
  kind: action
  command: "EX11!CV"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
      description: "0=none (Telnet default), 1=verbose (RS-232/USB default), 2=tagged, 3=verbose+tagged"

# ===== Port mapping / directories =====
- id: telnet_port_set
  label: Set Telnet port map
  kind: action
  command: "E{port}MT"
  params:
    - name: port
      type: integer
      description: "Default 23"
- id: telnet_port_reset
  label: Reset Telnet port map to 23
  kind: action
  command: "E23MT"
- id: telnet_port_disable
  label: Disable Telnet port map
  kind: action
  command: "E0MT"
- id: telnet_port_read
  label: Read Telnet port map
  kind: query
  command: "EMT"
- id: web_port_set
  label: Set web port map
  kind: action
  command: "E{port}MH"
  params:
    - name: port
      type: integer
      description: "Default 80"
- id: web_port_reset
  label: Reset web port map to 80
  kind: action
  command: "E80MH"
- id: web_port_disable
  label: Disable web port map
  kind: action
  command: "E0MH"
- id: web_port_read
  label: Read web port map
  kind: query
  command: "EMH"
- id: dir_create
  label: Create directory
  kind: action
  command: "E/CJ"
- id: dir_root
  label: Move to root directory
  kind: action
  command: "E/%2E%2ECJ"
- id: dir_up
  label: Move up one directory
  kind: action
  command: "ECJ"
```

## Feedbacks
```yaml
- id: input_signal_status
  type: enum
  values: [no_signal, signal_detected]
  description: "Per-input; format from 0LS response is 5 digits e.g. 0*1*0*1*0 = inputs 2 and 4 detected"
- id: video_mute_status
  type: enum
  values: [unmuted, black, sync_and_video_off]
  description: "From B command"
- id: audio_mute_status
  type: enum
  values: [unmuted, muted]
  description: "From Z command"
- id: hdcp_status
  type: enum
  values: [no_sink, hdcp_encrypted, no_hdcp]
  description: "X3# (HDMI/DVI outputs only)"
- id: hdcp_input_auth
  type: enum
  values: [blocked, allowed]
  description: "X4( per HDMI input"
- id: hdcp_output_mode
  type: enum
  values: [follow_input, always_encrypt, follow_with_dvi_trials, always_encrypt_with_dvi_trials]
  description: "X3$"
- id: genlock_state
  type: enum
  values: [disabled, input_enabled, sdi_enabled]
  description: "X4&"
- id: genlock_status
  type: enum
  values: [disabled, enabled_not_locked, enabled_locked]
  description: "X4* via E41STAT verbose"
- id: screen_saver_state
  type: enum
  values: [timer_idle, timer_running, expired]
  description: "X4^"
- id: freeze_status
  type: enum
  values: [all_unfrozen, all_frozen, main_frozen, pip_frozen]
  description: "X5@"
- id: pip_selection
  type: integer
  values: [0, 4]
  description: "0=off, 1-4=PIP input (2-digit response e.g. 01)"
- id: current_input
  type: integer
  values: [1, 5]
  description: "From !, &, $ commands"
- id: executive_mode
  type: enum
  values: [unlocked, full_lock, partial_lock]
  description: "From X command (0/1/2)"
- id: video_signal_presence_inputs_1_to_5
  type: string
  description: "5-char field from 0LS; each char 0/1 = no signal/signal detected for inputs 1-5"
- id: verbose_mode
  type: enum
  values: [none, verbose, tagged, verbose_and_tagged]
  description: "X11! default 0=Telnet, 1=RS-232/USB"
- id: dhcp_state
  type: enum
  values: [off, on]
  description: "From EDH"
- id: unsolicited_signal_change_message
  type: string
  description: "Unsolicited: In 00 • 0*0*0*0*0 when input signal status changes (requires NTFY enable)"
- id: copyright_banner
  type: string
  description: "Sent on connect; format: © Copyright 2015, Extron Electronics, DVS 605, V<x.xx>, 60-1059-01 <CR><LF><date/time>"
- id: reconfig_message
  type: string
  description: "Unsolicited on input switch or new signal: Reconfig"
- id: power_save_state
  type: enum
  values: [full_power, low_power]
  description: "X4% from PSAV"
- id: error_response
  type: string
  description: "E## codes: E01 invalid input, E06 invalid switch, E10 invalid command, E11 invalid preset, E12 invalid port, E13 invalid param, E14 invalid for config, E17 invalid for signal type, E22 busy, E24 privilege violation, E25 device not present, E26 max connections, E28 file not found"
```

## Variables
```yaml
# Discrete device-wide configuration parameters covered as parameterized actions above.
# No additional unbounded variables identified beyond parameterized action params.
```

## Events
```yaml
- id: input_switch
  description: "Scaler-initiated message on input change: In X! • All"
  trigger: "local input selection"
- id: reconfig
  description: "Reconfig - sent on input switch or new signal"
- id: copyright_banner
  description: "On TCP/IP or RS-232 connect: copyright line with firmware version, part number, date/time"
- id: signal_status_change
  description: "In 00 • 0*0*0*0*0 (requires NTFY enabled)"
- id: password_prompt
  description: "Password: prompt on connect when password set"
- id: login_confirmation
  description: "Login Administrator or Login User on successful password"
- id: boot_reboot_network
  description: "2BOOT confirmation on network reboot"
- id: password_view_redacted
  description: "Password returned as **** when querying a set password (security redaction)"
```

## Macros
```yaml
# No explicit multi-step macro sequences documented in the source.
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset    # EZQQQ - resets IP to default
  - erase_flash_memory       # EZFFF
  - reset_to_factory_defaults # EZXXX (retains Ethernet)
interlocks: []
# Source contains no explicit safety warnings, electrical interlocks, or power-on sequencing.
```

## Notes
- Extron SIS commands use one or more characters per field; no special start/end delimiters.
- `E` is the Escape character (0x1B); commands prefixed with `E` are escape sequences in the SIS protocol.
- All SIS responses end with CR/LF (the `]` symbol in the manual).
- Upper/lower case interchangeable in commands.
- For TCP/IP control, default port is 23 (Telnet) with TCP socket protocol; default web/HTTP port is 80.
- URL-encoded web equivalents shown alongside ASCII commands; the `W` prefix marks URL-encoded form.
- HDCP commands only valid on HDMI/DVI inputs and outputs.
- PIP mode disables true seamless switching.
- Audio breakaway ($) not allowed TO an input configured for any digital audio format; video breakaway (&) not allowed FROM such an input (E17 error).
- Genlock offset commands require a DVS 605 D or AD model with SDI genlock currently enabled and locked.
- Factory default IP: 192.168.254.254, subnet mask: 255.255.0.0, MAC prefix: 00-05-A6.
- Telnet port and web port are user-remappable; both can be disabled.
- EdidE/EdidI file import/export operate on the device user file system; PCS software mediates file transfer.
- Commands marked with superscript 24 require administrator login; E14 indicates command invalid for current configuration; E28 indicates file not found.

<!-- UNRESOLVED: firmware version compatibility not stated; electrical specs (voltage/current/power) absent; detailed physical safety warnings absent -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dvs_605_68-2110-01_J.pdf
  - https://www.extron.com/download/
  - https://www.extron.com
retrieved_at: 2026-06-12T18:55:16.441Z
last_checked_at: 2026-06-12T19:17:34.644Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:17:34.644Z
matched_actions: 257
action_count: 257
confidence: medium
summary: "All 257 spec actions match verbatim source commands; transport parameters confirmed; only auto-switch (X3&) present in source but not represented in spec. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "X3&_auto_switch"
- "firmware version range not stated; MAC address default shown as 00-05-A6-xx-xx-xx; full safety/interlock section not present in source"
- "HTTP base path not stated in source"
- "firmware version compatibility not stated; electrical specs (voltage/current/power) absent; detailed physical safety warnings absent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
