---
spec_id: admin/extron-fox-ii-t-hd-4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOX II T HD 4K Control Spec"
manufacturer: Extron
model_family: "FOX II T HD 4K"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOX II T HD 4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2300-01_C.pdf
  - https://www.extron.com/download/files/userman/68-2300-50_C_FOXIITHD4K.pdf
  - https://www.extron.com/product/fox2thd4k
retrieved_at: 2026-07-02T20:29:45.793Z
last_checked_at: 2026-07-07T11:40:27.056Z
generated_at: 2026-07-07T11:40:27.056Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "companion receiver (FOX II R HD 4K) commands not covered — this is the transmitter-only manual excerpt."
  - "IP/Ethernet control not described in source; only serial/USB serial control documented."
  - "no multi-step command sequences described in source."
  - "no power-on sequencing interlock or voltage/current specs stated in this excerpt."
  - "firmware version compatibility range not stated (only queryable at runtime via Q)."
  - "protocol/firmware version label of the SIS dialect not stated."
  - "exact part-number suffixes (60-1351-11 MM / 60-1351-12 SM) not confirmed in this excerpt — referenced in prior recovery notes only."
  - "no voltage/current/power specifications present in this control-protocol excerpt."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:40:27.056Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 SIS commands matched verbatim in source command table; transport parameters (9600 8N1) confirmed; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron FOX II T HD 4K Control Spec

## Summary
The Extron FOX II T HD 4K is an HDMI / audio fiber-optic transmitter that sends video, embedded or analog audio, RS-232, and IR over a single or dual fiber link to a compatible FOX II Series receiver. This spec covers control of the transmitter via Extron Simple Instruction Set (SIS) over a serial RS-232 connection (rear Remote RS-232 captive-screw port or front mini USB-B Configuration port). The unit also passes a separate RS-232/IR signal transparently over the fiber link (up to 115200 baud); that pass-through is a signal path, not the control interface, and is out of scope here.

<!-- UNRESOLVED: companion receiver (FOX II R HD 4K) commands not covered — this is the transmitter-only manual excerpt. -->
<!-- UNRESOLVED: IP/Ethernet control not described in source; only serial/USB serial control documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Connector: rear-panel "Remote RS-232" 5-pole captive screw (Tx, Rx, G).
  # Equivalent control also available on front-panel mini USB-B "Configuration" port.
  # NOTE: A separate "RS-232 OVER FIBER" 3.5 mm 5-pole port passes a controlled
  # device's serial/IR signal transparently through the fiber link at up to 115200 baud.
  # That pass-through rate (115200) does NOT apply to the host control interface (9600).
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# - queryable  # inferred: many status/info query commands present (2S,4S,5S,6S,20S,I,Q,N,40S, etc.)
# - levelable  # inferred: analog audio gain/attenuation set + inc/dec commands present
traits:
  - queryable
  - levelable
# NOTE: No power on/off SIS command exists (device has no PW command); NOT marked powerable.
# NOTE: No input/output routing commands; NOT marked routable.
```

## Actions
```yaml
# ---------------------------------------------------------------------------
# SIS (Simple Instruction Set) command notation - read before implementing:
#
#   Leading "E" in a command  = ESCAPE byte (0x1B) per source symbol table.
#                               (e.g. "EAEDID" is sent as 0x1B,'A','E','D','I','D'.)
#                               Commands with NO leading E (e.g. "1B", "2S", "+G",
#                               "I", "Q", "N") begin with their literal first char.
#   Trailing terminator       = every host command ends with CR (0x0D). Source writes
#                               this as "}". Responses from unit end with CR/LF
#                               (0x0D 0x0A), written as "]" in source.
#   "•"                       = hard SPACE character (0x20) per source symbol table.
#   {X!} {X@} {X$} {X%} ...   = variable per the source "Symbol Definitions" table.
#                               Braces here denote the substitution point; the symbol
#                               name (X!, X@, ...) matches the source document.
#
# Symbol reference (excerpt relevant to commands below):
#   X!   EDID resolution/rate code        01-58 (see EDID X! value table)
#   X@   save-EDID source                 1=Tx loop-through, 2=Rx output
#   X$   video/sync mute status           0=off, 1=video mute, 2=video+sync mute
#   X%   on/off status                    0=off, 1=on
#   X^   video bit depth                  0=auto, 1=8-bit
#   X&   HDCP mode                        0=auto, 1=on
#   X*   digital output format            0=auto, 1=DVI, 2=HDMI
#   X(   audio gain adjustment range      00 to 24
#   X1)  audio level range                -18 to +24 (1 dB steps)
#   X1!  audio attenuation range          00 to 18
#   X1@  audio input format               0=auto, 1=digital(embedded HDMI), 2=analog
#   X1#  audio mute target                0=all, 1=HDMI, 2=analog
#   X1$  audio output                     1=digital, 2=analog
#   X1%  color bars test pattern          0=off, 1=720p60, 2=1080p60
#   X1^  device name                      up to 24 alphanumeric/minus chars
#
# Error responses (returned on invalid input): E10 invalid command, E13 invalid
# parameter, E14 invalid for this configuration, E17 invalid for signal type,
# E22 busy. See Feedbacks.
# ---------------------------------------------------------------------------

# --- EDID Minder ---
- id: set_edid_resolution
  label: Set EDID Resolution
  kind: action
  command: "EA{X!}EDID"
  params:
    - name: X!
      type: enum
      description: "EDID resolution/rate code 01-58 (see X! value table). NOTE: front-panel HEX switch must be in position 1 or unit returns E14."
- id: view_edid_resolution
  label: View EDID Resolution
  kind: query
  command: "EAEDID"
  params: []
- id: save_edid
  label: Save EDID
  kind: action
  command: "ES{X@}EDID"
  params:
    - name: X@
      type: enum
      description: "1=save EDID from transmitter loop-through, 2=save EDID from receiver output. Active monitor required or E13 returned."
- id: view_native_edid_resolution
  label: View Native EDID Resolution
  kind: query
  command: "ENEDID"
  params: []

# --- Video and sync mutes (HDMI Loop-through) ---
- id: set_video_mute
  label: Set Video/Sync Mute
  kind: action
  command: "{X$}B"
  params:
    - name: X$
      type: enum
      description: "0=unmute/output video, 1=video mute (black), 2=video+sync mute"
- id: show_video_mute_status
  label: Show Video Mute Status
  kind: query
  command: "B"
  params: []

# --- HDCP notification (HDMI Loop-through) ---
- id: set_hdcp_notification
  label: Set HDCP Notification (Green Screen)
  kind: action
  command: "EN{X%}HDCP"
  params:
    - name: X%
      type: enum
      description: "1=enable green-screen HDCP notification (default), 0=disable"
- id: view_hdcp_notification
  label: View HDCP Notification
  kind: query
  command: "ENHDCP"
  params: []

# --- Video bit depth (HDMI Loop-through) ---
- id: set_video_bit_depth
  label: Set Video Bit Depth
  kind: action
  command: "EV{X^}BITD"
  params:
    - name: X^
      type: enum
      description: "0=auto (follow input, default), 1=force 8-bit"
- id: view_video_bit_depth
  label: View Video Bit Depth
  kind: query
  command: "EVBITD"
  params: []

# --- Input HDCP authorized device ---
- id: set_hdcp_authorized_device
  label: Set HDCP Authorized Device
  kind: action
  command: "EE{X%}HDCP"
  params:
    - name: X%
      type: enum
      description: "1=set transmitter as HDCP-authorized device (default), 0=not authorized"
- id: view_hdcp_authorized_device_status
  label: View HDCP Authorized Device Status
  kind: query
  command: "EEHDCP"
  params: []

# --- HDCP mode ---
- id: set_hdcp_mode
  label: Set HDCP Mode
  kind: action
  command: "ES{X&}HDCP"
  params:
    - name: X&
      type: enum
      description: "0=auto/follow input (default), 1=on"
- id: view_hdcp_mode
  label: View HDCP Mode
  kind: query
  command: "ESHDCP"
  params: []

# --- Digital output format (HDMI Loop-through) ---
- id: set_digital_output_format
  label: Set Digital Output Format
  kind: action
  command: "E{X*}VTPO"
  params:
    - name: X*
      type: enum
      description: "0=auto/follow input (default), 1=DVI, 2=HDMI"
- id: view_digital_output_format
  label: View Digital Output Format
  kind: query
  command: "EVTPO"
  params: []

# --- Analog audio input gain and attenuation ---
# NOTE (source): set-gain "G" and set-attenuation "g" are CASE SENSITIVE.
# Increment/decrement/show are NOT case sensitive.
- id: set_audio_gain
  label: Set Input Audio Gain
  kind: action
  command: "{X(}G"
  params:
    - name: X(
      type: integer
      description: "Gain value 00-24 (+dB). Uppercase G."
- id: set_audio_attenuation
  label: Set Input Audio Attenuation
  kind: action
  command: "{X1!}g"
  params:
    - name: X1!
      type: integer
      description: "Attenuation value 00-18 (-dB). LOWERCASE g (case sensitive)."
- id: increment_audio_level
  label: Increment Audio Level
  kind: action
  command: "+G"
  params: []
  # Increases audio level by 1 dB.
- id: decrement_audio_level
  label: Decrement Audio Level
  kind: action
  command: "-G"
  params: []
  # Decreases audio level by 1 dB. (Source uses a minus sign.)
- id: show_audio_level
  label: Show Audio Input Level
  kind: query
  command: "G"
  params: []

# --- Audio input format ---
- id: set_audio_input_format
  label: Set Audio Input Format
  kind: action
  command: "EI{X1@}AFMT"
  params:
    - name: X1@
      type: enum
      description: "0=auto (default), 1=digital embedded HDMI, 2=analog"
- id: view_audio_input_format
  label: View Audio Input Format
  kind: query
  command: "EIAFMT"
  params: []

# --- Audio mute (HDMI Loop-through and Return Out) ---
- id: mute_audio
  label: Mute Audio
  kind: action
  command: "{X1#}*1Z"
  params:
    - name: X1#
      type: enum
      description: "Audio path to mute: 0=all, 1=HDMI loop-through, 2=analog"
- id: unmute_audio
  label: Unmute Audio
  kind: action
  command: "{X1#}*0Z"
  params:
    - name: X1#
      type: enum
      description: "Audio path to unmute: 0=all, 1=HDMI loop-through, 2=analog"
- id: show_audio_mute_status
  label: Show Audio Mute Status
  kind: query
  command: "{X1$}Z"
  params:
    - name: X1$
      type: enum
      description: "Audio output to query: 1=digital, 2=analog"

# --- Color bars test pattern ---
- id: set_color_bars_test_pattern
  label: Set Color Bars Test Pattern
  kind: action
  command: "E{X1%}Test"
  params:
    - name: X1%
      type: enum
      description: "0=off/output input video, 1=720p@60 color bars, 2=1080p@60 color bars. Tx→Rx fiber cable required for receiver output; pattern clears on power loss."
- id: show_color_bars_status
  label: Show Color Bars Test Pattern Status
  kind: query
  command: "ETest"
  params: []

# --- Name ---
- id: assign_device_name
  label: Assign Device Name
  kind: action
  command: "E{X1^}CN"
  params:
    - name: X1^
      type: string
      description: "Up to 24 chars, alphanumeric or minus. First char must be a letter; last char cannot be minus."
- id: reset_device_name
  label: Reset Device Name To Default
  kind: action
  command: "E•CN"
  params: []
  # Resets name to "FOX-II-T-HD-4K". "•" = literal SPACE (0x20) per source.
- id: view_device_name
  label: View Device Name
  kind: query
  command: "ECN"
  params: []

# --- Status requests ---
- id: view_rx_link_status
  label: View Rx Link (Rx-to-Tx) Status
  kind: query
  command: "2S"
  params: []
- id: view_input_video_status
  label: View Input Video Status
  kind: query
  command: "4S"
  params: []
- id: view_audio_input_status
  label: View Audio Input Status
  kind: query
  command: "5S"
  params: []
- id: view_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "6S"
  params: []
- id: view_temperature
  label: View Internal Temperature
  kind: query
  command: "20S"
  params: []
  # Response format: "nnn F•nnn C" (degrees F and C).

# --- Information requests ---
- id: information_request
  label: Full Information Request
  kind: query
  command: "I"
  params: []
  # Response: link/signal/resolution/HDCP/audio/EDID-switch/device-type composite.
- id: show_firmware_version
  label: Show Firmware Version
  kind: query
  command: "Q"
  params: []
- id: request_hdcp_output_status
  label: Request HDCP Output Status
  kind: query
  command: "EOHDCP"
  params: []
  # HDCP detected on transmitter loop-through output.
- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
- id: request_sfp_status
  label: Request SFP (Optical Module) Status
  kind: query
  command: "40S"
  params: []
  # Response: module mfr, Tx power, Rx power, module operating temp.

# --- Resets ---
- id: reset_audio
  label: Reset Audio Settings
  kind: action
  command: "EZA"
  params: []
  # Resets audio to default levels (0 dB gain).
- id: system_reset
  label: System Reset (Factory Defaults)
  kind: action
  command: "EZXXX"
  params: []
  # Resets ALL settings to factory defaults (equivalent to front-panel mode-5 reset).
  # CONFIRMATION RECOMMENDED: destructive - erases user audio/video/EDID settings.
```

## Feedbacks
```yaml
# Observable states / query responses. Values follow source symbol table.
- id: power_on_copyright
  type: string
  description: "Power-on banner: '(c) Copyright 20nn, Extron Electronics FOX II T HD 4K •YY, Vx.xx, 60-nnnn-xx'. YY=SM(multimode)/MM; Vx.xx=firmware; 60-nnnn-xx=part number."
- id: link_status_message
  type: string
  description: "Unsolicited link/input change: '2Lnk{n}•SigI{n}•Res{x}•HdcpI{y}•AudI{n}•AudO{n}•EdidMdr{a}•TX'. n=0/1 (not/detected), x=resolution, y=HDCP source (0/1/2), a=rotary switch 00-15."
- id: edid_resolution
  type: enum
  description: "EDID resolution code X! (01-58) returned by EAEDID."
- id: native_edid_resolution
  type: string
  description: "Plain-language resolution X# (e.g. '720p•@60Hz') returned by ENEDID."
- id: video_mute_status
  type: enum
  values: [off, video_mute, video_and_sync_mute]
  description: "X$ from B query: 0/1/2."
- id: hdcp_notification_status
  type: enum
  values: [disabled, enabled]
  description: "X% from ENHDCP."
- id: video_bit_depth
  type: enum
  values: [auto, eight_bit]
  description: "X^ from EVBITD."
- id: hdcp_authorized_device_status
  type: enum
  values: [off, on]
  description: "X% from EEHDCP."
- id: hdcp_mode
  type: enum
  values: [auto, on]
  description: "X& from ESHDCP."
- id: digital_output_format
  type: enum
  values: [auto, dvi, hdmi]
  description: "X* from EVTPO."
- id: audio_input_level
  type: integer
  description: "X1) from G query: -18 to +24 dB."
- id: audio_input_format
  type: enum
  values: [auto, digital, analog]
  description: "X1@ from EIAFMT."
- id: audio_mute_status
  type: enum
  description: "X% from {X1$}Z query - on/off per queried output (X1$=1 digital, 2 analog)."
- id: color_bars_status
  type: enum
  values: [off, bars_720p60, bars_1080p60]
  description: "X1% from ETest."
- id: device_name
  type: string
  description: "X1^ from ECN (default 'FOX-II-T-HD-4K')."
- id: rx_link_status
  type: enum
  values: [not_detected, detected]
  description: "X1& from 2S."
- id: input_video_status
  type: enum
  values: [not_detected, detected]
  description: "X1& from 4S."
- id: audio_input_signal_status
  type: enum
  values: [not_detected, detected]
  description: "X1& from 5S."
- id: input_hdcp_status
  type: enum
  values: [no_source, source_with_hdcp, source_no_hdcp]
  description: "X1* from 6S: 0/1/2."
- id: temperature
  type: string
  description: "X1( from 20S: 'nnn F•nnn C'."
- id: firmware_version
  type: string
  description: "X2@ from Q (v.vv)."
- id: hdcp_output_status
  type: enum
  values: [no_sink, hdcp_sink, non_hdcp_sink]
  description: "X2# from EOHDCP: 0/1/2."
- id: part_number
  type: string
  description: "60-nnnn-nn from N."
- id: sfp_status
  type: string
  description: "From 40S: module manufacturer (X2$), Tx power (X2%), Rx power (X2%), module operating temp (X2^)."
- id: error_response
  type: enum
  values: [E10_invalid_command, E13_invalid_parameter, E14_invalid_for_configuration, E17_invalid_for_signal_type, E22_busy]
  description: "Returned when command invalid or cannot execute."
```

## Variables
```yaml
# Settable parameters (mirror of the action setters above).
- id: edid_resolution
  type: enum
  range: "01-58 (X! code)"
  set_command: "EA{X!}EDID"
- id: video_mute_mode
  type: enum
  values: [off, video_mute, video_and_sync_mute]
  set_command: "{X$}B"
- id: hdcp_notification
  type: enum
  values: [disabled, enabled]
  set_command: "EN{X%}HDCP"
- id: video_bit_depth
  type: enum
  values: [auto, eight_bit]
  set_command: "EV{X^}BITD"
- id: hdcp_authorized_device
  type: enum
  values: [off, on]
  set_command: "EE{X%}HDCP"
- id: hdcp_mode
  type: enum
  values: [auto, on]
  set_command: "ES{X&}HDCP"
- id: digital_output_format
  type: enum
  values: [auto, dvi, hdmi]
  set_command: "E{X*}VTPO"
- id: audio_input_level
  type: integer
  range: "-18 to +24 dB"
  set_command: "{X(}G / {X1!}g"
- id: audio_input_format
  type: enum
  values: [auto, digital, analog]
  set_command: "EI{X1@}AFMT"
- id: color_bars_test_pattern
  type: enum
  values: [off, bars_720p60, bars_1080p60]
  set_command: "E{X1%}Test"
- id: device_name
  type: string
  range: "up to 24 chars"
  set_command: "E{X1^}CN"
```

## Events
```yaml
# Unsolicited unit-initiated messages (all end with CR/LF).
- id: power_on_banner
  description: "Issued at power-up: '(c) Copyright 20nn, Extron Electronics FOX II T HD 4K •YY, Vx.xx, 60-nnnn-xx'."
- id: link_input_status_change
  description: "Sent on any fiber-link/video-connection change: '2Lnk{n}•SigI{n}•Res{x}•HdcpI{y}•AudI{n}•AudO{n}•EdidMdr{a}•TX'."
- id: edid_minder_change
  description: "Sent on front-panel DDC/HEX switch change: 'EdidMdr{nn}' (position 00-15)."
- id: hot_plug
  description: "Sent when HDMI connector is plugged/unplugged: 'HplgO'."
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - system_reset  # EZXXX: erases ALL user settings to factory defaults (equivalent to mode-5 reset)
  - reset_audio   # EZA: resets audio levels
interlocks: []
notes:
  - "Hardware reset modes (mode 1 = temporary factory firmware for one power cycle; mode 5 = factory defaults except firmware) are front-panel recessed Reset button sequences, not SIS commands. Mode 5 is equivalent to the EZXXX SIS command."
  - "Alarm port (rear, 5-pole captive screw pins 1+2): pins short together when no light detected on Rx fiber link - hardware dry-contact, not a command."
  - "EDID commands EA*/ES* require front-panel HEX switch in position 1 (else E14). ESEDID save requires an active monitor on Tx loop-through (X@=1) or Rx output (X@=2) (else E13)."
# UNRESOLVED: no power-on sequencing interlock or voltage/current specs stated in this excerpt.
```

## Notes
- Control interfaces: rear-panel **Remote RS-232** (5-pole captive screw: Tx, Rx, G) and front-panel **Configuration** mini USB-B port. Both can be active simultaneously; first command to reach the processor wins. The USB port is serial-over-USB using the same SIS protocol at 9600 baud.
- Serial config (host control): **9600 baud, 8 data bits, no parity, 1 stop bit, no flow control**.
- A distinct **RS-232 OVER FIBER** 3.5 mm 5-pole port passes a *controlled device's* serial/IR signal transparently over the fiber at **up to 115200 baud** — this is a signal pass-through, not the host control interface. Two fiber cables are required to receive pass-through responses.
- RS-232 and IR can be active simultaneously on the over-fiber port.
- EDID Select rotary switch positions 0–F select EDID source/resolution (see source page 12 table); position 1 = RS-232 selected (factory default, required for EA/ES EDID SIS commands).
- Case sensitivity: set-gain `G` (uppercase) vs set-attenuation `g` (lowercase) are case sensitive; increment `+G`, decrement `–G`, and show `G` are not case sensitive.

<!-- UNRESOLVED: firmware version compatibility range not stated (only queryable at runtime via Q). -->
<!-- UNRESOLVED: protocol/firmware version label of the SIS dialect not stated. -->
<!-- UNRESOLVED: exact part-number suffixes (60-1351-11 MM / 60-1351-12 SM) not confirmed in this excerpt — referenced in prior recovery notes only. -->
<!-- UNRESOLVED: no voltage/current/power specifications present in this control-protocol excerpt. -->
````

## Provenance

```yaml
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2300-01_C.pdf
  - https://www.extron.com/download/files/userman/68-2300-50_C_FOXIITHD4K.pdf
  - https://www.extron.com/product/fox2thd4k
retrieved_at: 2026-07-02T20:29:45.793Z
last_checked_at: 2026-07-07T11:40:27.056Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:40:27.056Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 SIS commands matched verbatim in source command table; transport parameters (9600 8N1) confirmed; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "companion receiver (FOX II R HD 4K) commands not covered — this is the transmitter-only manual excerpt."
- "IP/Ethernet control not described in source; only serial/USB serial control documented."
- "no multi-step command sequences described in source."
- "no power-on sequencing interlock or voltage/current specs stated in this excerpt."
- "firmware version compatibility range not stated (only queryable at runtime via Q)."
- "protocol/firmware version label of the SIS dialect not stated."
- "exact part-number suffixes (60-1351-11 MM / 60-1351-12 SM) not confirmed in this excerpt — referenced in prior recovery notes only."
- "no voltage/current/power specifications present in this control-protocol excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
