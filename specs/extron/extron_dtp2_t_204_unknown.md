---
spec_id: admin/extron-dtp2-t-204
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP2 T 204 Control Spec"
manufacturer: Extron
model_family: "DTP2 T 212"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP2 T 212"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dtp2_t_212_68-2915-01_B.pdf
  - https://www.extron.com/download/files/userman/dtp2_tr_211_68-2938-01_L.pdf
  - https://www.extron.com/download/files/userman/68-3438-01_D_DTP_2_CrossPoint_82.pdf
  - https://media.extron.com/public/download/files/userman/dtp2_t_203_68-3117-01_F.pdf
  - https://media.extron.com/public/download/files/userman/68-2938-50_A_dtp2_t-r_211.pdf
retrieved_at: 2026-05-14T16:35:17.372Z
last_checked_at: 2026-06-23T11:45:16.583Z
generated_at: 2026-06-23T11:45:16.583Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The refined source document references the DTP2 T 212 model throughout; the device in the entity_id is DTP2 T 204. Commands and protocol parameters are sourced from the DTP2 T 212 SIS reference."
  - "flow control not stated in source"
  - "no persistent variable-state model documented beyond per-command query responses"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures documented in source."
  - "The 5V output hot plug mode documentation in the source lists values \"0 = Auto\" and \"1 = 5V always enabled (default)\" in the Symbol Definitions section, but the Command Table KEY states \"1 = Auto (5V enabled when source present with 5V), 2 = 5V always enabled (default)\" — the command table values are used here as they appear more complete."
  - "Flow control (hardware/software) not specified in source."
  - "USB connection parameters (e.g., virtual COM port settings) not specified in source."
verification:
  verdict: verified
  checked_at: 2026-06-23T11:45:16.583Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions matched verbatim against source SIS table; full catalogue covered; transport 9600 8N1 verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Extron DTP2 T 204 Control Spec

## Summary

The Extron DTP2 T 212 is a 2-input HDMI switcher with DTP and HDMI outputs. This spec covers RS-232C serial control via Extron SIS (Simple Instruction Set) commands. SIS commands can also be issued via USB from the front panel Config port.

<!-- UNRESOLVED: The refined source document references the DTP2 T 212 model throughout; the device in the entity_id is DTP2 T 204. Commands and protocol parameters are sourced from the DTP2 T 212 SIS reference. -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable        # inferred from input selection routing commands
- queryable       # inferred from query commands returning state
- levelable       # inferred from audio mute/volume commands
```

## Actions

```yaml
# Symbol key used throughout:
# ] = CR/LF (hex 0D 0A) — response terminator
# } or | = Soft carriage return (no line feed) — command terminator for Escape-prefixed commands
# • = Space
# E or W = Escape character
# X! = Input number 0–2 (0 = deselect/break tie)
# X@ = On/Off (0 = Off/disabled, 1 = On/enabled)
# X# = Auto switch mode (0 = Disabled, 1 = Highest active, 2 = Lowest active)
# X$ = Video color bit depth mode (1 = Auto, 2 = Force 8-bit)
# X% = Input HDCP status
# X^ = Output HDCP status
# X& = Device name string
# X( = Verbose mode (0–3)
# X1) = TMDS output format (1–6)
# X1! = EDID memory location (1–4)
# X1$ = Tally pin mode (0–2)
# X1% = DTP/HDBT switch position (0 = DTP, 1 = HDBT)
# X1& = Permanent tie mode (0 = Disable, 1 = Tie to input 1, 2 = Tie to input 2)
# X1* = Audio input (1 = Auto, 2 = Digital, 3 = Analog)
# X2) = Video output (1 = A, 2 = B)
# X2! = Video and sync mute (0 = Unmute, 1 = Mute video to black, 2 = Mute video and sync)
# X2@ = Analog audio (1 = Follow input, 2 = Lock to input 1, 3 = Lock to input 2)
# X2# = HDCP output mode (1 = Encrypt as required, 2 = Always encrypt)
# X2$ = 5V output mode (1 = Auto, 2 = Always enabled)
# X2% = Remote power (0 = Off, 1 = DTP2 48 VDC/On)
# X2^ = Green screen (0 = Disabled, 1 = Enabled)
# X2& = Over TP control (0 = Pass-through, 1 = Serial device control)
# X2* = CEC mode (0 = Disable, 2 = Enable unidirectional, 4 = Enable bidirectional)
# X2( = CEC status
# X3) = CEC source logical address
# X3! = CEC destination logical address
# X3@ = CEC predefined command string ("PwrOn", "PwrOff", "ShowMe")
# X3# = CEC send result (0 = Failed, 1 = Success, 2 = Unable to send)
# X3$ = CEC physical address (4 hex digits)
# X3% = CEC device presence
# X3^ = CEC data (percent-encoded hex bytes)
# X3& = CEC address byte (percent-encoded hex byte)

# --- Input Selection ---

- id: select_input
  label: Select Input (Audio and Video)
  kind: action
  command: "{input}!!"
  params:
    - name: input
      type: integer
      range: "0–2"
      description: "Input number to select; 0 = Deselect (break tie, output disabled)"
  notes: "Unsolicited response sent on local input change."

- id: view_input
  label: View Current Input
  kind: query
  command: ""
  notes: "No explicit command documented; response is X!]"

# --- Permanent Tie ---

- id: permanent_tie_disable
  label: Disable Permanent Tie to Output A
  kind: action
  command: "E0OMOD}"
  params: []

- id: permanent_tie_input1
  label: Tie Input 1 to Output A (Permanent)
  kind: action
  command: "E1OMOD}"
  params: []

- id: permanent_tie_input2
  label: Tie Input 2 to Output A (Permanent)
  kind: action
  command: "E2OMOD}"
  params: []

- id: view_permanent_tie
  label: View Permanent Tie to Output A
  kind: query
  command: "EOMOD}"
  params: []

# --- Auto Switch Mode ---

- id: auto_switch_disable
  label: Disable Auto Switch (Manual Input Switching)
  kind: action
  command: "E0AUSW}"
  params: []

- id: auto_switch_highest
  label: Auto Switch — Priority to Highest Active Input
  kind: action
  command: "E1AUSW}"
  params: []

- id: auto_switch_lowest
  label: Auto Switch — Priority to Lowest Active Input
  kind: action
  command: "E2AUSW}"
  params: []

- id: view_auto_switch
  label: View Auto Switch Setting
  kind: query
  command: "EAUSW}"
  params: []

# --- Video Output Color Bit Depth ---

- id: set_video_bit_depth_per_output
  label: Set Video Color Bit Depth Mode (Per Output)
  kind: action
  command: "EV{output}*{mode}BITD}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Auto (based on sink EDID), 2 = Force 8-bit"

- id: set_video_bit_depth_all
  label: Set Video Color Bit Depth Mode (All Outputs)
  kind: action
  command: "EV{mode}BITD}"
  params:
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Auto (based on sink EDID), 2 = Force 8-bit"

- id: view_video_bit_depth
  label: View Video Color Bit Depth Mode
  kind: query
  command: "EVBITD}"
  params: []

# --- Signal Status ---

- id: request_signal_status
  label: Request Status of All Signals
  kind: query
  command: "E0LS}"
  params: []
  notes: "Response: Sig X@•X@*X@•X@] (input 1 • input 2 * output 1 • output 2)"

# --- Front Panel Lockout (Executive Mode) ---

- id: set_executive_mode
  label: Enable or Disable Executive Mode (Front Panel Lockout)
  kind: action
  command: "{state}X"
  params:
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Disable (default), 1 = Enable lockout"
  notes: "Unsolicited response sent on change."

- id: view_executive_mode
  label: View Executive Mode (Lockout) Status
  kind: query
  command: "X"
  params: []

# --- HDCP Status ---

- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "EIHDCP}"
  params: []
  notes: "Response: X%•X%] (input 1 status • input 2 status)"

- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "EOHDCP}"
  params: []
  notes: "Response: X^•X^]"

# --- Output HDCP Mode ---

- id: set_output_hdcp_mode_per_output
  label: Set Output HDCP Mode (Single Output)
  kind: action
  command: "ES {output}*{mode}HDCP}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Encrypt as required (default), 2 = Always encrypt"

- id: set_output_hdcp_mode_all
  label: Set Output HDCP Mode (All Outputs)
  kind: action
  command: "ES {mode}HDCP}"
  params:
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Encrypt as required (default), 2 = Always encrypt"

- id: view_output_hdcp_mode
  label: View Output HDCP Mode
  kind: query
  command: "ESHDCP}"
  params: []

# --- Video Output Format ---

- id: set_video_output_format
  label: Set Video Output Format (Per Output)
  kind: action
  command: "E{output}*{format}VTPO}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: format
      type: integer
      range: "1–6"
      description: "1 = Auto (default), 2 = DVI RGB 444, 3 = HDMI RGB Full, 4 = HDMI RGB Limited, 5 = HDMI YUV 444 Limited, 6 = HDMI YUV 422 Limited"

- id: view_video_output_format
  label: View Video Output Format Setting
  kind: query
  command: "EVTPO}"
  params: []

# --- HDCP Authorized Device ---

- id: set_hdcp_auth_per_input
  label: Set HDCP Authorization on an Input
  kind: action
  command: "EE {input}*{state}HDCP}"
  params:
    - name: input
      type: integer
      range: "1–2"
      description: "Input number (X!)"
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off, 1 = On (default)"

- id: set_hdcp_auth_all
  label: Set HDCP Authorization (All Inputs)
  kind: action
  command: "EE {state}HDCP}"
  params:
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off, 1 = On (default)"

- id: view_hdcp_auth_status
  label: View HDCP Authorization Status
  kind: query
  command: "EEHDCP}"
  params: []

# --- HDCP Notification (Green Screen) ---

- id: hdcp_green_screen_disable
  label: Disable HDCP Green Screen Notification
  kind: action
  command: "EN0HDCP}"
  params: []

- id: hdcp_green_screen_enable
  label: Enable HDCP Green Screen Notification
  kind: action
  command: "EN1HDCP}"
  params: []

- id: view_hdcp_notification
  label: View HDCP Green Screen Notification Setting
  kind: query
  command: "ENHDCP}"
  params: []

# --- DTP Remote Power Status ---

- id: view_remote_power_status
  label: View Output Remote Power Status
  kind: query
  command: "ERPWR}"
  params: []
  notes: "Response: X2%] — 0 = No remote power (Off), 1 = DTP2 48 VDC (On)"

# --- EDID Minder ---

- id: view_edid_hex
  label: View EDID in Hex Format
  kind: query
  command: "ER{edid_location}EDID}"
  params:
    - name: edid_location
      type: integer
      range: "1–2"
      description: "EDID memory location (X1!)"
  notes: "Response: X1@ — 128 or 256 bytes of hex data"

- id: query_edid_native_resolution
  label: Query EDID Native Resolution
  kind: query
  command: "EN{edid_location}EDID}"
  params:
    - name: edid_location
      type: integer
      range: "1–2"
      description: "EDID memory location (X1!)"
  notes: "Response: X1# — Example: 1920x1200 @ 60 Hz"

# --- Channel Mute Mode ---

- id: set_channel_mute_mode
  label: Set Channel Mute (Deselect) Mode via Contact and Tally Pins
  kind: action
  command: "E{state}*{tally_mode}MUTM}"
  params:
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off (default), 1 = On"
    - name: tally_mode
      type: integer
      range: "0–2"
      description: "Tally pin mode: 0 = Always on (default), 1 = Off when muted, 2 = Blink when muted"

- id: view_channel_mute_mode
  label: View Channel Mute Mode Setting
  kind: query
  command: "EMUTM}"
  params: []

# --- Verbose Mode ---

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E{mode}CV}"
  params:
    - name: mode
      type: integer
      range: "0–3"
      description: "0 = Clear/none, 1 = Verbose (default), 2 = Tagged responses for queries, 3 = Verbose and tagged responses"

- id: view_verbose_mode
  label: View Verbose Mode Setting
  kind: query
  command: "ECV}"
  params: []

# --- Device Name ---

- id: set_device_name
  label: Set Unit Name
  kind: action
  command: "E{name}CN}"
  params:
    - name: name
      type: string
      description: "Up to 24 alphanumeric characters including hyphens; first char must be a letter; last char cannot be a hyphen; no spaces"

- id: set_device_name_factory_default
  label: Set Device Name to Factory Default
  kind: action
  command: "E•CN}"
  params: []
  notes: "Restores name to DTP2-T-212"

- id: view_device_name
  label: View Unit Name
  kind: query
  command: "ECN}"
  params: []

# --- 5V Output Hot Plug Mode ---

- id: set_hotplug_mode_per_output
  label: Set Output Hot Plug Mode (5V) Per Output
  kind: action
  command: "EM{output}*{mode}HPLG}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Auto (5V enabled when source present with 5V), 2 = 5V always enabled (default)"

- id: set_hotplug_mode_all
  label: Set Output Hot Plug Mode (5V) All Outputs
  kind: action
  command: "EM{mode}HPLG}"
  params:
    - name: mode
      type: integer
      range: "1–2"
      description: "1 = Auto, 2 = Always enabled (default)"

- id: view_hotplug_mode
  label: View Output Hot Plug Mode (5V) Status
  kind: query
  command: "EMHPLG}"
  params: []

# --- Information Requests ---

- id: request_information
  label: Request Information (Input, Auto Switch, Mute States)
  kind: query
  command: "I"
  params: []
  notes: "Response: In X!•Ausw X#•Vmt X2!*X2!•Amt X@*X@]"

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
  notes: "Response: 60-nnnn-nn]"

- id: request_model_name
  label: Request Model Name
  kind: query
  command: "1I"
  params: []
  notes: "Response: DTP2 T 212]"

- id: request_model_description
  label: Request Model Description
  kind: query
  command: "2I"
  params: []
  notes: "Response: HDMI SWITCHER WITH DTP AND HDMI OUTPUTS]"

- id: query_active_line_count
  label: Query Incoming Active Line Count
  kind: query
  command: "33I"
  params: []
  notes: "Response: <Active horizontal lines>*<Active vertical lines>@<freq>]"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "Response: n.nn] (firmware build with 2 decimals)"

- id: query_firmware_version_with_build
  label: Query Firmware Version with Build Number
  kind: query
  command: "*Q"
  params: []
  notes: "Response: n.nn.nnnn]"

- id: query_detailed_firmware_version
  label: Query Detailed Firmware Version
  kind: query
  command: "0Q"
  params: []
  notes: "Response: n.nn]"

- id: query_embedded_os_type
  label: Query Embedded OS Type
  kind: query
  command: "14Q"
  params: []
  notes: "Response: n.nn.nnnn]"

- id: query_dtp_hdbt_switch_position
  label: Query DTP/HDBT Toggle Switch Position
  kind: query
  command: "EO1HDBT}"
  params: []
  notes: "Response: X1%] — 0 = DTP (default), 1 = HDBT"

# --- Video Mute ---

- id: video_mute_per_output
  label: Video Mute Specific Output
  kind: action
  command: "{output}*{mode}B"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: mode
      type: integer
      range: "0–2"
      description: "0 = Unmute (default), 1 = Mute to black with sync on, 2 = Mute video and sync"

- id: video_mute_all
  label: Video Mute All Outputs
  kind: action
  command: "{mode}B"
  params:
    - name: mode
      type: integer
      range: "0–2"
      description: "0 = Unmute (default), 1 = Mute to black with sync on, 2 = Mute video and sync"

- id: query_video_mute_status
  label: Query Video Mute Status
  kind: query
  command: "B"
  params: []
  notes: "Response: X2!•X2!]"

# --- Analog Audio Follow Mode ---

- id: analog_audio_follow_input
  label: Set Analog Audio to Follow Input Selection
  kind: action
  command: "E1AFLW}"
  params: []

- id: analog_audio_lock_input1
  label: Lock Analog Audio to Input 1
  kind: action
  command: "E2AFLW}"
  params: []

- id: analog_audio_lock_input2
  label: Lock Analog Audio to Input 2
  kind: action
  command: "E3AFLW}"
  params: []

- id: view_analog_audio_follow
  label: View Analog Audio Follow Mode
  kind: query
  command: "EAFLW}"
  params: []

# --- Analog Audio Mute ---

- id: analog_audio_mute
  label: Mute/Unmute Analog Audio (All Outputs)
  kind: action
  command: "{state}Z"
  params:
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off (unmute), 1 = On (mute, default)"

- id: query_audio_mute_status
  label: Query Audio Mute Status
  kind: query
  command: "Z"
  params: []
  notes: "Response: X@]"

# --- Output Audio Configuration (TMDS Output Audio) ---

- id: set_tmds_audio_per_output
  label: Set TMDS Output Audio Per Output
  kind: action
  command: "EO{output}*{state}AFMT}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Output number (X2))"
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off, 1 = Enabled (default)"

- id: set_tmds_audio_all
  label: Set TMDS Output Audio Both Outputs
  kind: action
  command: "EO{state}AFMT}"
  params:
    - name: state
      type: integer
      range: "0–1"
      description: "0 = Off, 1 = Enabled (default)"

- id: view_tmds_audio
  label: View TMDS Output Audio Setting
  kind: query
  command: "EOAFMT}"
  params: []

# --- Audio Input Format ---

- id: set_audio_input_format
  label: Set Audio Input Format
  kind: action
  command: "EI{input}*{format}AFMT}"
  params:
    - name: input
      type: integer
      range: "1–2"
      description: "Input number (X!)"
    - name: format
      type: integer
      range: "1–3"
      description: "1 = Auto (default), 2 = Digital, 3 = Analog"

- id: view_audio_input_format
  label: View Audio Input Format
  kind: query
  command: "EIAFMT}"
  params: []

# --- Serial Host Control Port Mode ---

- id: serial_host_mode_passthrough
  label: Set Over TP Pass-Through (Serial Host Control Port)
  kind: action
  command: "E1HSTM}"
  params: []

- id: serial_host_mode_serial_device_control
  label: Set Over TP Serial Device Control (Serial Host Control Port)
  kind: action
  command: "E2HSTM}"
  params: []

- id: view_serial_host_mode
  label: View Host Control Port Mode
  kind: query
  command: "EHSTM}"
  params: []

# --- Reset ---

- id: factory_reset
  label: Reset Switcher to Factory Default Values
  kind: action
  command: "EZXXX}"
  params: []
  notes: "Resets all settings to factory defaults."

# --- CEC Commands ---

- id: cec_enable_disable_per_output
  label: Enable/Disable CEC on One Output
  kind: action
  command: "EO{output}*{mode}CCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: mode
      type: integer
      description: "0 = Disable (default), 2 = Enable unidirectional, 4 = Enable bidirectional"

- id: cec_enable_disable_all
  label: Enable/Disable CEC on All Outputs
  kind: action
  command: "EO{mode}*CCEC}"
  params:
    - name: mode
      type: integer
      description: "0 = Disable (default), 2 = Enable unidirectional, 4 = Enable bidirectional"

- id: view_cec_status_per_output
  label: View CEC Status for an Output
  kind: query
  command: "EO{output}CCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
  notes: "Response: X2(*X3)*X3!]"

- id: send_cec_predefined_command
  label: Send CEC Predefined Command to Output (Default Target Address)
  kind: action
  command: "EO{output}*{cec_command}DCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: cec_command
      type: string
      description: 'Predefined action string in double quotes: "PwrOn", "PwrOff", or "ShowMe"'

- id: send_cec_raw_data
  label: Send CEC Raw Data to Output (Default Target Address)
  kind: action
  command: "EO{output}*{cec_data}DCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: cec_data
      type: string
      description: "CEC data: user-selected elements in percent-encoded hex (e.g. %2A%07%FF)"

- id: send_cec_predefined_command_broadcast
  label: Send CEC Predefined Command to Output (Broadcast to All Devices)
  kind: action
  command: "EO{output}*15*{cec_command}DCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: cec_command
      type: string
      description: 'Predefined action string in double quotes: "PwrOn", "PwrOff", or "ShowMe"'

- id: send_cec_raw_data_broadcast
  label: Send CEC Raw Data to Output (Broadcast to All Devices)
  kind: action
  command: "EO{output}*15*{cec_data}DCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
    - name: cec_data
      type: string
      description: "CEC data in percent-encoded hex (e.g. %82%20%00)"

- id: cec_list_device_presence
  label: List CEC Device Presence
  kind: query
  command: "ELQCEC}"
  params: []
  notes: "Response: X3%*X3%...X3%] (input * output 1 ... output x)"

- id: cec_rediscover_devices_input
  label: Rediscover CEC Devices on Input
  kind: action
  command: "EI{input}QCEC}"
  params:
    - name: input
      type: integer
      range: "1–2"
      description: "Input number (X!)"

- id: cec_rediscover_devices_output
  label: Rediscover CEC Device on Output
  kind: action
  command: "EO{output}QCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"

- id: cec_report_physical_address
  label: Report Physical Address of Output Port
  kind: query
  command: "EO{output}PCEC}"
  params:
    - name: output
      type: integer
      range: "1–2"
      description: "Video output number (X2))"
  notes: "Response: X3$] — CEC physical address as 4 hex digits (e.g. %10%00 for 1000)"
```

## Feedbacks

```yaml
- id: input_selected
  type: integer
  description: "Currently selected input; 0 = no input (break tie), 1–2 = input number"
  unsolicited: true

- id: permanent_tie_mode
  type: enum
  values:
    - "0: Disabled"
    - "1: Output A tied to input 1"
    - "2: Output A tied to input 2"
  unsolicited: true

- id: auto_switch_mode
  type: enum
  values:
    - "0: Disabled"
    - "1: Highest active input priority"
    - "2: Lowest active input priority"
  unsolicited: true

- id: signal_status
  type: object
  description: "Signal status for all inputs and outputs: input 1, input 2, output 1, output 2 (0 = not detected, 1 = detected)"
  unsolicited: true

- id: executive_mode_state
  type: enum
  values:
    - "0: Disabled (front panel active)"
    - "1: Enabled (front panel locked)"
  unsolicited: true

- id: input_hdcp_status
  type: array
  description: "Per-input HDCP status: 0 = No video detected, 1 = Video detected with HDCP, 2 = Video detected without HDCP"
  unsolicited: true

- id: output_hdcp_status
  type: array
  description: "Per-output HDCP status: 0 = No sink detected, 1 = Sink detected with HDCP, 2 = Sink detected without HDCP"
  unsolicited: true

- id: video_mute_status
  type: array
  description: "Per-output video mute: 0 = Unmuted, 1 = Muted to black (sync on), 2 = Muted video and sync"
  unsolicited: false

- id: audio_mute_status
  type: enum
  values:
    - "0: Unmuted"
    - "1: Muted"
  unsolicited: false

- id: remote_power_status
  type: enum
  values:
    - "0: No remote power (Off)"
    - "1: DTP2 48 VDC (On)"
  unsolicited: false

- id: verbose_mode
  type: enum
  values:
    - "0: Clear/none"
    - "1: Verbose"
    - "2: Tagged responses for queries"
    - "3: Verbose and tagged responses"

- id: dtp_hdbt_switch_position
  type: enum
  values:
    - "0: DTP (default)"
    - "1: HDBT"
  unsolicited: true

- id: cec_mode_status
  type: object
  description: "Per-output CEC status including mode, source/destination logical addresses"
  unsolicited: false

- id: cec_send_result
  type: enum
  values:
    - "0: Failed (NAK) — device not detected"
    - "1: Success (ACK) — device detected"
    - "2: Unable to send"
  unsolicited: false

- id: cec_unsolicited_received_input
  type: object
  description: "Async CEC received data on input (bidirectional mode): Ceci X!*X3&X3$*X3#]"
  unsolicited: true

- id: cec_unsolicited_received_output
  type: object
  description: "Async CEC received data on output (bidirectional mode): Ceco X2)*X3&X3$*X3#]"
  unsolicited: true

- id: error_response
  type: enum
  description: "Error code returned when a command cannot be executed"
  values:
    - "E01: Invalid input number"
    - "E06: Invalid channel change"
    - "E10: Invalid command"
    - "E13: Invalid parameter"
    - "E14: Invalid for this configuration"
    - "E17: Invalid command for signal type"

- id: power_on_message
  type: string
  description: "(C) Copyright 2019, Extron Electronics DTP2 T 212, Vn.nn, 60-1587-52 — sent at power-up via RS-232 only"
  unsolicited: true
```

## Variables

```yaml
# UNRESOLVED: no persistent variable-state model documented beyond per-command query responses
```

## Events

```yaml
- id: input_selection_change
  description: "Unsolicited notification when input selection changes (local front panel or signal-driven)"

- id: signal_status_change
  description: "Unsolicited notification when input or output signal status changes"

- id: hdcp_input_status_change
  description: "Unsolicited notification when HDCP status changes on an input"

- id: hdcp_output_status_change
  description: "Unsolicited notification when HDCP status changes on an output"

- id: executive_mode_change
  description: "Unsolicited notification when executive mode (front panel lockout) is enabled or disabled"

- id: auto_switch_mode_change
  description: "Unsolicited notification when auto switch mode changes"

- id: dtp_hdbt_switch_change
  description: "Unsolicited notification when DTP/HDBT switch position changes"

- id: cec_received_data
  description: "Unsolicited CEC data received in bidirectional mode (mode 4); format: Ceci/Ceco X*X3&X3$*X3#]"

- id: power_on_banner
  description: "Copyright/firmware banner sent to RS-232 host at power-up"
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source.
# Note: timeout of 10 seconds or longer between command ASCII characters aborts the command with no indication.
```

## Notes

- The source document consistently refers to the model as **DTP2 T 212** (part number 60-1587-52). The entity in this spec is `extron_dtp2_t_204`. Verify the correct model designation before deploying.
- SIS commands are **not case-sensitive** unless otherwise indicated.
- Command terminator for Escape-prefixed (E/W) commands is `}` (soft CR, hex varies) or `|`; the device executes on receipt of the terminator.
- Responses end with CR/LF (`]` = hex 0D 0A).
- A pause of **10 seconds or longer** between command ASCII characters causes a timeout; the command is silently aborted.
- Verbose mode controls response format: mode 0 = minimal, mode 1 = verbose labels, modes 2/3 = tagged query responses (constant string + value).
- CEC Communications on the HDMI output always pass through. On the DTP2 output, CEC pass-through only works when connected to a DTP2 or DTP standalone receiver; it does not pass through to IN1804, IN1808, or similar devices.
- Sending a CEC command to a disabled input or output returns `E14`.
- SIS commands can be issued via RS-232 (rear panel Remote port) or USB (front panel Config port). The Over TP RS-232 port uses a 5-pole captive screw connector; RS-232 and IR share the ground pole.

<!-- UNRESOLVED: The 5V output hot plug mode documentation in the source lists values "0 = Auto" and "1 = 5V always enabled (default)" in the Symbol Definitions section, but the Command Table KEY states "1 = Auto (5V enabled when source present with 5V), 2 = 5V always enabled (default)" — the command table values are used here as they appear more complete. -->
<!-- UNRESOLVED: Flow control (hardware/software) not specified in source. -->
<!-- UNRESOLVED: USB connection parameters (e.g., virtual COM port settings) not specified in source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/dtp2_t_212_68-2915-01_B.pdf
  - https://www.extron.com/download/files/userman/dtp2_tr_211_68-2938-01_L.pdf
  - https://www.extron.com/download/files/userman/68-3438-01_D_DTP_2_CrossPoint_82.pdf
  - https://media.extron.com/public/download/files/userman/dtp2_t_203_68-3117-01_F.pdf
  - https://media.extron.com/public/download/files/userman/68-2938-50_A_dtp2_t-r_211.pdf
retrieved_at: 2026-05-14T16:35:17.372Z
last_checked_at: 2026-06-23T11:45:16.583Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:45:16.583Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions matched verbatim against source SIS table; full catalogue covered; transport 9600 8N1 verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The refined source document references the DTP2 T 212 model throughout; the device in the entity_id is DTP2 T 204. Commands and protocol parameters are sourced from the DTP2 T 212 SIS reference."
- "flow control not stated in source"
- "no persistent variable-state model documented beyond per-command query responses"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures documented in source."
- "The 5V output hot plug mode documentation in the source lists values \"0 = Auto\" and \"1 = 5V always enabled (default)\" in the Symbol Definitions section, but the Command Table KEY states \"1 = Auto (5V enabled when source present with 5V), 2 = 5V always enabled (default)\" — the command table values are used here as they appear more complete."
- "Flow control (hardware/software) not specified in source."
- "USB connection parameters (e.g., virtual COM port settings) not specified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
