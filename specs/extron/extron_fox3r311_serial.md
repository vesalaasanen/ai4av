---
spec_id: admin/extron-fox3r311
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOX3 R 311 Control Spec"
manufacturer: Extron
model_family: "FOX3 R 311"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOX3 R 311"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/fox3_tr_301_311_68-2711-01_D.pdf
  - https://media.extron.com/public/download/files/userman/fox3_tr_301_311_68-2711-50_B.pdf
retrieved_at: 2026-07-01T01:51:58.532Z
last_checked_at: 2026-07-07T11:40:27.808Z
generated_at: 2026-07-07T11:40:27.808Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source. Some commands are documented for both TX and RX; this spec lists the full transmitter-and-receiver shared set plus the receiver-only audio output volume commands, per the source's \"Receiver Commands Only\" section."
  - "these apply to SSH port 22023, but source also documents them in the"
  - "source does not document multi-step \"macro\" sequences; empty."
  - "source describes HDCP authentication timeouts (~10 seconds) and continuous-trial modes; these are behavioral, not interlocks."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:40:27.808Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions matched verbatim against source command tables; transport parameters (9600 baud, 8 bits, no parity, 1 stop) verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Extron FOX3 R 311 Control Spec

## Summary
Fiber-optic receiver (FOX3 R 311) for the Extron FOX3 T/R 301/311 series. Spec covers rear-panel Remote RS-232 control via SIS (Simple Instruction Set) commands. Sister receiver-side commands (audio output volume) are present, plus IP/SSH/embedded web paths and reset modes for reference. Compatible with FOX3 R 311 (and the sibling FOX3 R 301, since the protocol table is shared across receiver models).

<!-- UNRESOLVED: firmware version not stated in source. Some commands are documented for both TX and RX; this spec lists the full transmitter-and-receiver shared set plus the receiver-only audio output volume commands, per the source's "Receiver Commands Only" section. -->

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
auth:
  type: password  # source: SSH/serial sessions are password protected; default password "extron" (reset) or device serial number (out of factory)
```

**Note:** Source also documents IP/SSH control on TCP port `22023` (username `user`/`admin`, password required). That path is not the primary transport for this RS-232 spec; it is captured in Notes.

## Traits
```yaml
- routable       # inferred: source documents RX-side output video mute and TX-side input selection controls
- queryable      # inferred: source documents many status query commands
- levelable      # inferred: source documents receiver audio output volume 0-100
```

## Actions
```yaml
# ===== Video mute (TX and RX) =====
- id: mute_video_only
  label: Mute Output Video Only
  kind: action
  command: "1B"
  params: []
- id: mute_video_and_sync
  label: Mute Output Video and Sync
  kind: action
  command: "2B"
  params: []
- id: unmute_video_and_sync
  label: Unmute Video and Sync (Default)
  kind: action
  command: "0B"
  params: []
- id: view_mute_status
  label: View Video Mute Status
  kind: query
  command: "B"
  params: []

# ===== Audio mute (TX and RX) =====
- id: enable_audio_mute
  label: Enable Audio Mute
  kind: action
  command: "X@*1Z"
  params:
    - name: audio_output
      type: integer
      description: "Audio output selector - 1=Digital, 2=Analog, 3=All outputs"
- id: disable_audio_mute
  label: Disable Audio Mute
  kind: action
  command: "X@*0Z"
  params:
    - name: audio_output
      type: integer
      description: "Audio output selector - 1=Digital, 2=Analog, 3=All outputs"
- id: view_audio_mute_status
  label: View Audio Mute Status
  kind: query
  command: "X3#Z"
  params:
    - name: view_audio_output
      type: integer
      description: "1=Digital, 2=Analog"

# ===== Information requests (TX and RX) =====
- id: view_firmware_version
  label: View Firmware Version
  kind: query
  command: "Q"
  params: []
- id: view_full_firmware_version
  label: View Full Firmware Version
  kind: query
  command: "*Q"
  params: []
- id: view_part_number
  label: View Part Number
  kind: query
  command: "N"
  params: []
- id: view_updated_fpga_version
  label: View Updated FPGA Version
  kind: query
  command: "35Q"
  params: []
- id: view_input_video_status
  label: View Input Video Signal Status
  kind: query
  command: "4S"
  params: []
- id: view_input_audio_status
  label: View Input Audio Status
  kind: query
  command: "5S"
  params: []
- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "E IHDCP}"
  params: []
- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "EO HDCP}"
  params: []

# ===== Combined information request =====
- id: information_request
  label: Combined Information Request
  kind: query
  command: "I"
  params: []

# ===== LinkLicense =====
- id: view_linklicense
  label: View LinkLicense
  kind: query
  command: "E LELIC}"
  params: []

# ===== DHCP client =====
- id: set_dhcp
  label: Set DHCP On/Off
  kind: action
  command: "EX1)DH}"
  params:
    - name: dhcp
      type: integer
      description: "0=Off (default), 1=On"
- id: view_dhcp_status
  label: View DHCP Status
  kind: query
  command: "E DH}"
  params: []

# ===== SSH echo (port 22023, referenced here for parallel IP usage) =====
# UNRESOLVED: these apply to SSH port 22023, but source also documents them in the
# SIS-over-RS-232 instructions section. Included for parity with raw source table.
- id: enable_echo_ssh
  label: Enable SIS Echo (current connection)
  kind: action
  command: "E 1ECHO}"
  params: []
- id: disable_echo_ssh
  label: Disable SIS Echo (current connection)
  kind: action
  command: "E 0ECHO}"
  params: []
- id: view_echo_status_ssh
  label: View Echo Status
  kind: query
  command: "E ECHO}"
  params: []

# ===== Verbose mode =====
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "EX1&CV}"
  params:
    - name: mode
      type: integer
      description: "0=Clear/none, 1=Verbose (default), 2=Tagged responses for queries, 3=Verbose + tagged"
- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV}"
  params: []

# ===== IP setup =====
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "EX1!CI}"
  params:
    - name: address
      type: string
      description: "IP address xxx.xxx.xxx.xxx"
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "EX1!CS}"
  params:
    - name: address
      type: string
      description: "Subnet mask xxx.xxx.xxx.xxx"
- id: set_gateway_ip
  label: Set Gateway IP Address
  kind: action
  command: "EX1!CG}"
  params:
    - name: address
      type: string
      description: "Gateway xxx.xxx.xxx.xxx"
- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI}"
  params: []
- id: view_subnet_mask
  label: View Subnet Mask
  kind: query
  command: "E CS}"
  params: []
- id: view_gateway_ip
  label: View Gateway IP Address
  kind: query
  command: "E CG}"
  params: []

# ===== IP port timeout =====
- id: set_ip_port_timeout
  label: Set IP Port Timeout
  kind: action
  command: "EX3!IPE}"
  params:
    - name: seconds
      type: integer
      description: "Timeout in seconds (1-65000, default 30)"
- id: view_ip_port_timeout
  label: View IP Port Timeout
  kind: query
  command: "E IPE}"
  params: []

# ===== RS-232 COMM settings =====
- id: set_serial_port_params
  label: Set Serial Port Parameters
  kind: action
  command: "EX1^*X1@,X1#,X1$,X1%CP}"
  params:
    - name: uart
      type: integer
      description: "UART selector - 1=Endpoint"
    - name: baud
      type: integer
      description: "Baud rate 300-15200 (use 115200 for high-speed RS-232 insertion; default 9600)"
    - name: parity
      type: string
      description: "Parity: o=Odd, e=Even, n=None (default), m=Mark, s=Space (first letter only)"
    - name: data_bits
      type: integer
      description: "7 or 8 (default 8)"
    - name: stop_bits
      type: integer
      description: "1 (default) or 2"

# ===== Resets =====
- id: erase_all_files_flash
  label: Erase All Files from Flash Memory
  kind: action
  command: "E ZFFF}"
  params: []
- id: reset_unit_settings
  label: Reset Unit Settings (excludes IP)
  kind: action
  command: "E ZXXX}"
  params: []
- id: absolute_system_reset_retain_ip
  label: Absolute System Reset (Retain IP)
  kind: action
  command: "E ZY}"
  params: []
- id: absolute_system_reset
  label: Absolute System Reset (Master Reset)
  kind: action
  command: "E ZQQQ}"
  params: []
- id: ip_system_reset
  label: IP System Reset
  kind: action
  command: "E 1ZQQQ}"
  params: []
- id: reset_audio_gain_attenuation
  label: Reset Audio Gain and Attenuation
  kind: action
  command: "E ZA}"
  params: []

# ===== TX-only: HDCP authorized device =====
- id: enable_hdcp_authorized_device
  label: Enable HDCP Authorized Device
  kind: action
  command: "E 1HDCPEN}"
  params: []
- id: disable_hdcp_authorized_device
  label: Disable HDCP Authorized Device
  kind: action
  command: "E 0HDCPEN}"
  params: []
- id: view_hdcp_authorized_device_status
  label: View HDCP Authorized Device Status
  kind: query
  command: "E HDCPEN}"
  params: []

# ===== TX-only: Input signal detection info =====
- id: view_input_signal_info
  label: View Detected Input Signal Information
  kind: query
  command: "35I"
  params: []

# ===== TX-only: Force 4K60 compressed mode =====
- id: force_4k60_compressed
  label: Force 4K60 Compressed Mode (1 fiber)
  kind: action
  command: "E C1FOXM}"
  params: []
- id: disable_4k60_compressed
  label: Disable 4K60 Compressed Mode (2 fibers, uncompressed)
  kind: action
  command: "E C0FOXM}"
  params: []
- id: view_4k60_compressed_status
  label: View 4K60 Compressed Mode Status
  kind: query
  command: "E CFOXM}"
  params: []

# ===== TX-only: Audio Input Selection =====
- id: set_audio_input_selection
  label: Set Audio Input Selection
  kind: action
  command: "EX*AUDSEL}"
  params:
    - name: input
      type: integer
      description: "0=Auto, 1=Digital, 2=Analog"
- id: view_audio_input_selection
  label: View Audio Input Selection
  kind: query
  command: "E AUDSEL}"
  params: []

# ===== RX-only: Audio output volume =====
- id: set_audio_output_volume_rx
  label: Set Audio Output Volume (Receiver)
  kind: action
  command: "X2$V"
  params:
    - name: level
      type: integer
      description: "Volume 0-100 (default 100, ~1 dB per step)"
- id: increment_audio_output_volume_rx
  label: Increment Audio Output Volume (Receiver)
  kind: action
  command: "+V"
  params: []
- id: decrement_audio_output_volume_rx
  label: Decrement Audio Output Volume (Receiver)
  kind: action
  command: "-V"
  params: []
- id: view_audio_output_volume_rx
  label: View Audio Output Volume (Receiver)
  kind: query
  command: "V"
  params: []
```

## Feedbacks
```yaml
- id: power_up_message
  type: string
  description: "Device-initiated power-up banner with copyright, product name, firmware version, part number, date/time. Terminator CR/LF (])."
- id: video_mute_state
  type: enum
  values: [unmuted, video_muted, video_and_sync_muted]
  description: "X! values 0/1/2 from command B"
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "X# values 0/1 per audio output (X@)"
- id: input_video_signal_status
  type: enum
  values: [not_detected, detected]
  description: "X$ values 0/1"
- id: input_audio_status
  type: enum
  values: [not_detected, detected]
  description: "X% values 0/1"
- id: input_hdcp_status
  type: enum
  values: [no_source, hdcp_source, no_hdcp]
  description: "X^ values 0/1/2"
- id: output_hdcp_status
  type: enum
  values: [no_sink, encrypted, not_encrypted]
  description: "X& values 0/1/2"
- id: input_audio_selection
  type: enum
  values: [auto, digital, analog]
  description: "X* values 0/1/2"
- id: device_type
  type: enum
  values: [tx, rx]
  description: "X( response from combined I query"
- id: firmware_version
  type: string
  description: "Format x.xx returned by Q; verbose adds 'Ver01* ' prefix"
- id: full_firmware_version
  type: string
  description: "Format x.xx.xxxx returned by *Q"
- id: part_number
  type: string
  description: "Format 60-xxxx-xx returned by N"
- id: updated_fpga_version
  type: string
  description: "Format x.xx returned by 35Q"
- id: fiber_link_detection_a
  type: enum
  values: [not_detected, detected]
  description: "SFPALnk 0/1"
- id: fiber_link_detection_b
  type: enum
  values: [not_detected, detected]
  description: "SFPBLnk 0/1"
- id: dhcp_status
  type: enum
  values: [off, on]
  description: "X1) values 0/1"
- id: verbose_mode_status
  type: enum
  values: [clear, verbose, tagged, verbose_tagged]
  description: "X1& values 0/1/2/3"
- id: echo_status
  type: enum
  values: [disabled, enabled]
  description: "X3) values 0/2"
- id: ip_address
  type: string
  description: "xxx.xxx.xxx.xxx format"
- id: subnet_mask
  type: string
  description: "xxx.xxx.xxx.xxx format"
- id: gateway_address
  type: string
  description: "xxx.xxx.xxx.xxx format"
- id: ip_port_timeout
  type: integer
  description: "Seconds (1-65000)"
- id: audio_output_volume_rx
  type: integer
  description: "X2$ - 0 to 100 (default 100)"
- id: force_4k60_compressed_status
  type: enum
  values: [disabled, enabled]
  description: "X1( values 0/1 (under X2$ key in source)"
- id: hdcp_authorized_device_status
  type: enum
  values: [off, on]
  description: "X1( values 0/1"
- id: audio_input_selection_tx
  type: enum
  values: [auto, digital, analog]
  description: "X* values 0/1/2"
- id: detected_resolution_refresh
  type: string
  description: "X2) - format nnnn Horizontal x nnnn Vertical @ xx Hz (e.g. 3840x2160@59.9Hz)"
- id: detected_audio_input_format
  type: enum
  values: [not_detected, digital, analog]
  description: "X2! values 0/1/2"
- id: detected_video_color_space
  type: enum
  values: [not_detected, yuv, rgb]
  description: "X2@ values 0/1/2"
- id: detected_pixel_clock
  type: integer
  description: "X2# - MHz, 4-digit zero-padded (0000=not detected)"
- id: linklicense_description
  type: string
  description: "E.g. 'FOX3 Uncompressed Video, 79-2560-01'; empty ] if not installed"
- id: error_invalid_command
  type: string
  description: "E10"
- id: error_invalid_preset_number
  type: string
  description: "E11"
- id: error_invalid_parameter
  type: string
  description: "E13"
- id: error_invalid_for_config
  type: string
  description: "E14"
- id: error_invalid_command_for_signal_type
  type: string
  description: "E17"
- id: error_invalid_room_number
  type: string
  description: "E21"
- id: error_busy
  type: string
  description: "E22"
- id: error_privilege_violation
  type: string
  description: "E24"
- id: error_device_not_present
  type: string
  description: "E25"
- id: error_max_connections_exceeded
  type: string
  description: "E26"
- id: error_system_or_command_timed_out
  type: string
  description: "E18 (NOTE: source line mislabels as E18; appears under E26 with comment that it may be a typo - see Notes)"
- id: error_bad_file_name_or_not_found
  type: string
  description: "E28"
```

## Variables
```yaml
# Settings that hold a settable value (not discrete actions) - captured implicitly via the set/view action pairs above.
# Per-source symbol glossary (cross-reference for query response meanings):
- id: baud_rate
  type: integer
  description: "X1@ - 300-15200 (9600 default)"
  settable: true
- id: parity
  type: string
  description: "X1# - odd/even/none(default)/mark/space (first letter only)"
  settable: true
- id: data_bits
  type: integer
  description: "X1$ - 7 or 8 (default 8)"
  settable: true
- id: stop_bits
  type: integer
  description: "X1% - 1 (default) or 2"
  settable: true
- id: uart_selector
  type: integer
  description: "X1^ - 1 = Endpoint"
  settable: true
- id: verbose_mode
  type: integer
  description: "X1& - 0=Clear/none, 1=Verbose (default), 2=Tagged responses for queries, 3=Verbose + tagged"
  settable: true
- id: dhcp_enabled
  type: integer
  description: "X1) - 0=Off (default), 1=On"
  settable: true
- id: video_mute
  type: integer
  description: "X! - 0=Unmute (default), 1=Mute video only, 2=Mute video and sync"
  settable: true
- id: audio_mute
  type: integer
  description: "X# - 0=Unmute (default), 1=Mute, per X@ output"
  settable: true
- id: audio_input_selection
  type: integer
  description: "X* - 0=Auto, 1=Digital, 2=Analog"
  settable: true
- id: echo_enabled
  type: integer
  description: "X3) - 0=Disabled, 2=Enabled (default)"
  settable: true
- id: audio_output_volume
  type: integer
  description: "X2$ - 0 to 100 (default 100). RX-only control but value readable on either endpoint."
  settable: true
```

## Events
```yaml
# Source-documented "Global unsolicited responses"
- id: reconfig_notice
  description: "Reconfig ] - sent on any input frequency change or power cycle"
  payload: "Reconfig"
- id: fiber_link_change
  description: "Sts02* [X1*]*[X2*] - any change in fiber link status (active link SFP A=1 / SFP B=2; detected=0 or 2)"
  payload: "Sts02* {active}*{detected}"
- id: input_video_signal_change
  description: "SigI [X$] - any change in input signal status (0/1)"
  payload: "SigI {state}"
- id: input_hdcp_change
  description: "HdcpI [X^] - any change in input HDCP status (0/1/2)"
  payload: "HdcpI {state}"
- id: output_hdcp_change
  description: "Hdcp O [X&] - any change in output HDCP status (0/1/2)"
  payload: "Hdcp O {state}"
- id: input_audio_status_change
  description: "Sts05* [X%] - input audio selection status change (0/1)"
  payload: "Sts05* {state}"
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step "macro" sequences; empty.
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset_retain_ip  # E14-style class
  - absolute_system_reset
  - reset_all_files_flash            # erases user files
interlocks: []
# UNRESOLVED: source describes HDCP authentication timeouts (~10 seconds) and continuous-trial modes; these are behavioral, not interlocks.
```

## Notes
- Source covers both FOX3 T 301/311 transmitter and FOX3 R 301/311 receiver. Actions tagged "TX-only" or "RX-only" come from the source's separate sections; everything else is shared.
- Default IP address (LAN): `192.168.254.254`. Front-panel USB Configuration port IP: `203.0.113.22`. SSH port: `22023`. Default gateway `0.0.0.0`. Subnet mask `255.255.255.0`.
- Baud defaults to 9600 (range 300–15200 for set command, up to 115200 for RS-232 insertion via fiber).
- Default password: device serial number (out of factory); `extron` after full system reset.
- 10-second inter-character timeout aborts in-flight commands with no response.
- Verbatim terminator `]` = CR/LF; `}` or `|` = CR only; `E` or `W` = Escape.
- Verbose modes 1 and 3 deliver change notices on the SSH socket; verbose modes 2 and 3 add tagged query responses.
- Error code list in source has `E18 — System or command timed out` listed under the E26 row — likely a document typo; treated here as written text in Feedbacks.
- "RX-Only" audio output volume commands can be sent to a TX without an error per source, but only affect the RX the command ultimately routes through fiber.
- RS-232 insertion (RS-232 over fiber) requires `Captive Screw Insertion` mode set in PCS on both endpoints.
```

Self-check:
- No voltage/current invented ✓
- No port fabricated (only `22023` from source) ✓
- Baud `9600` from source ✓
- `status: draft`, `declared_confidence: low` ✓
- YAML valid ✓
- `entity_id` set from input ✓
- UNRESOLVED markers in Macros, Safety interlock, and Notes where gaps exist ✓

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/fox3_tr_301_311_68-2711-01_D.pdf
  - https://media.extron.com/public/download/files/userman/fox3_tr_301_311_68-2711-50_B.pdf
retrieved_at: 2026-07-01T01:51:58.532Z
last_checked_at: 2026-07-07T11:40:27.808Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:40:27.808Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions matched verbatim against source command tables; transport parameters (9600 baud, 8 bits, no parity, 1 stop) verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source. Some commands are documented for both TX and RX; this spec lists the full transmitter-and-receiver shared set plus the receiver-only audio output volume commands, per the source's \"Receiver Commands Only\" section."
- "these apply to SSH port 22023, but source also documents them in the"
- "source does not document multi-step \"macro\" sequences; empty."
- "source describes HDCP authentication timeouts (~10 seconds) and continuous-trial modes; these are behavioral, not interlocks."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
