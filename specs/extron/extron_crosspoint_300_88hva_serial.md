---
spec_id: admin/extron-crosspoint-300-88hva-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron CrossPoint 300 / 88 HVA Control Spec"
manufacturer: Extron
model_family: "CrossPoint 300 84"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "CrossPoint 300 84"
    - "CrossPoint 300 88"
    - "CrossPoint 300 124"
    - "CrossPoint 300 128"
    - "CrossPoint 300 168"
    - "CrossPoint 300 816"
    - "CrossPoint 300 1212"
    - "CrossPoint 300 1616"
    - "CrossPoint 300 88 HVA"
    - "CrossPoint 300 816 HVA"
    - "CrossPoint 300 128 HVA"
    - "CrossPoint 300 168 HVA"
    - "CrossPoint 300 1616 HVA"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/XP300_Matrix_B.pdf
  - https://www.extron.com/article/tech92
retrieved_at: 2026-06-11T04:03:08.249Z
last_checked_at: 2026-06-23T11:45:14.739Z
generated_at: 2026-06-23T11:45:14.739Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not mentioned in this source document; spec covers serial control only"
  - "no multi-step macros described in source beyond the direct-write preset procedure (documented in Actions)"
  - "TCP/IP control (Telnet, IP control) not documented in this source; if an IP-equipped variant exists, a separate spec is needed."
  - "Firmware version compatibility range not stated."
  - "Whether the \"front panel Configuration port baud rate\" can be changed via SIS serial command is mentioned in passing but the specific SIS command to change it is not given in this source extract."
verification:
  verdict: verified
  checked_at: 2026-06-23T11:45:14.739Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions matched literally in source SIS table; transport 9600 8N1 confirmed; full coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Extron CrossPoint 300 / 88 HVA Control Spec

## Summary

The Extron CrossPoint 300 series are matrix switchers with video and audio routing capability. HVA variants add per-input audio gain/attenuation and per-output volume control. This spec covers serial (RS-232 / RS-422) control via Extron's Simple Instruction Set (SIS) protocol over either the rear panel Remote port (9-pin D female, RS-232 or RS-422) or the front panel Configuration port (2.5 mm mini stereo jack, RS-232 only). All commands are ASCII; responses end with CR/LF.

<!-- UNRESOLVED: TCP/IP control not mentioned in this source document; spec covers serial control only -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable to 9600, 19200, 38400, or 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable    # inferred from routing command examples
- queryable   # inferred from query command examples
- levelable   # inferred from audio gain/volume/attenuation commands (HVA models)
```

## Actions

```yaml
# --- Create Ties ---

- id: tie_input_to_output_video_audio
  label: Tie Input to Output (Video and Audio)
  kind: action
  command: "{X2}*{X3}!"
  params:
    - name: X2
      type: integer
      description: Input number (0 = disconnected, 1–max inputs)
    - name: X3
      type: integer
      description: Output number (1–max outputs)
  notes: "Response: Out•{X3}•In•{X2}•All. Example: 1*3! → Out03 In01 All"

- id: tie_input_to_output_rgbhv
  label: Tie Input to Output (RGBHV only)
  kind: action
  command: "{X2}*{X3}&"
  params:
    - name: X2
      type: integer
      description: Input number
    - name: X3
      type: integer
      description: Output number
  notes: "Audio breakaway. Response: Out•{X3}•In•{X2}•RGB"

- id: tie_input_to_output_video_only
  label: Tie Input to Output (Video only)
  kind: action
  command: "{X2}*{X3}%"
  params:
    - name: X2
      type: integer
      description: Input number
    - name: X3
      type: integer
      description: Output number
  notes: "Audio breakaway. Response: Out•{X3}•In•{X2}•Vid. & and % tie commands are interchangeable on all video models."

- id: tie_input_to_output_audio_only
  label: Tie Input to Output (Audio only)
  kind: action
  command: "{X2}*{X3}$"
  params:
    - name: X2
      type: integer
      description: Input number
    - name: X3
      type: integer
      description: Output number
  notes: "Audio breakaway. Response: Out•{X3}•In•{X2}•Aud"

- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  command: "\x1BQ{ties}"
  params:
    - name: ties
      type: string
      description: "One or more tie commands concatenated, e.g. 3*4!3*5%3*6$"
  notes: "Esc+Q prefix. All ties activate simultaneously. Response: Qik"

- id: tie_input_to_all_outputs_video_audio
  label: Tie Input to All Outputs (Video and Audio)
  kind: action
  command: "{X2}*!"
  params:
    - name: X2
      type: integer
      description: Input number
  notes: "Response: In•{X2}•All. Example: 5*! → In05 All"

- id: tie_input_to_all_outputs_rgbhv
  label: Tie Input to All Outputs (RGBHV only)
  kind: action
  command: "{X2}*&"
  params:
    - name: X2
      type: integer
      description: Input number
  notes: "Response: In•{X2}•RGB"

- id: tie_input_to_all_outputs_video_only
  label: Tie Input to All Outputs (Video only)
  kind: action
  command: "{X2}*%"
  params:
    - name: X2
      type: integer
      description: Input number
  notes: "Response: In•{X2}•Vid"

- id: tie_input_to_all_outputs_audio_only
  label: Tie Input to All Outputs (Audio only)
  kind: action
  command: "{X2}*$"
  params:
    - name: X2
      type: integer
      description: Input number
  notes: "Response: In•{X2}•Aud"

# --- Read Ties ---

- id: read_rgbhv_output_tie
  label: Read RGBHV Output Tie
  kind: query
  command: "{X3}&"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2 (RGBHV input number tied to output X3)"

- id: read_video_output_tie
  label: Read Video Output Tie
  kind: query
  command: "{X3}%"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2 (video input tied to output X3)"

- id: read_audio_output_tie
  label: Read Audio Output Tie
  kind: query
  command: "{X3}$"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2 (audio input tied to output X3)"

# --- Video Mute Commands ---

- id: video_mute_output
  label: RGB/Video Mute Output
  kind: action
  command: "{X3}*1B"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: Vmt•{X3}*1"

- id: video_unmute_output
  label: RGB/Video Unmute Output
  kind: action
  command: "{X3}*0B"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: Vmt•{X3}*0"

- id: read_video_mute
  label: Read RGB/Video Mute Status
  kind: query
  command: "{X3}B"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X4 (1 = mute on, 0 = mute off)"

- id: global_video_mute
  label: Global RGB/Video Mute (All Outputs)
  kind: action
  command: "1*B"
  params: []
  notes: "Response: Vmt1. Mutes all RGB outputs."

- id: global_video_unmute
  label: Global RGB/Video Unmute (All Outputs)
  kind: action
  command: "0*B"
  params: []
  notes: "Response: Vmt0. Unmutes all RGB outputs."

# --- Audio Input Gain and Attenuation (HVA Models) ---

- id: set_audio_input_gain
  label: Set Audio Input Gain (HVA)
  kind: action
  command: "{X1}*{X6}G"
  params:
    - name: X1
      type: integer
      description: "Input number (01–08, 01–12, or 01–16 depending on model)"
    - name: X6
      type: integer
      description: "Audio gain value 0–24 (1 dB/step, default 0 dB)"
  notes: "Case-sensitive: G is uppercase. Response: In•{X1}•Aud•{X5}. Example: 1*2G → In01 Aud+02"

- id: set_audio_input_attenuation
  label: Set Audio Input Attenuation (HVA)
  kind: action
  command: "{X1}*{X7}g"
  params:
    - name: X1
      type: integer
      description: Input number
    - name: X7
      type: integer
      description: "Audio attenuation value 1–18 (1 dB/step)"
  notes: "Case-sensitive: g is lowercase. Response: In•{X1}•Aud•{X5}"

- id: increment_audio_input_gain
  label: Increment Audio Input Gain (HVA)
  kind: action
  command: "{X1}+G"
  params:
    - name: X1
      type: integer
      description: Input number
  notes: "Increases gain by 1 dB. Case-sensitive: G is uppercase. Response: In•{X1}•Aud•{X5}"

- id: decrement_audio_input_gain
  label: Decrement Audio Input Gain (HVA)
  kind: action
  command: "{X1}\x2DG"
  params:
    - name: X1
      type: integer
      description: Input number
  notes: "Decreases gain by 1 dB. Command uses – (minus/dash). Case-sensitive: G uppercase. Response: In•{X1}•Aud•{X5}"

- id: read_audio_input_gain
  label: Read Audio Input Gain (HVA)
  kind: query
  command: "{X1}G"
  params:
    - name: X1
      type: integer
      description: Input number
  notes: "Response: X5 (numeric dB value –18 to +24)"

# --- Audio Output Volume (HVA Models) ---

- id: set_audio_output_volume
  label: Set Audio Output Volume (HVA)
  kind: action
  command: "{X3}*{X8}V"
  params:
    - name: X3
      type: integer
      description: Output number
    - name: X8
      type: integer
      description: "Volume adjustment 0–64 (0 = -85 dB / 0%; 64 = 0 dB / 100%)"
  notes: "Response: Out•{X3}•Vol•{X8}. Example: 1*50v → Out01 Vol50"

- id: increment_audio_output_volume
  label: Increment Audio Output Volume (HVA)
  kind: action
  command: "{X3}+V"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Increases volume by 1 step. Response: Out•{X3}•Vol•{X8}"

- id: decrement_audio_output_volume
  label: Decrement Audio Output Volume (HVA)
  kind: action
  command: "{X3}\x2DV"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Decreases volume by 1 step. Command uses – (minus/dash). Response: Out•{X3}•Vol•{X8}"

- id: read_audio_output_volume
  label: Read Audio Output Volume (HVA)
  kind: query
  command: "{X3}V"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X8 (0–64)"

# --- Audio Mute Commands (HVA Models) ---

- id: audio_mute_output
  label: Audio Mute Output (HVA)
  kind: action
  command: "{X3}*1Z"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: Amt•{X3}*1"

- id: audio_unmute_output
  label: Audio Unmute Output (HVA)
  kind: action
  command: "{X3}*0Z"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: Amt•{X3}*0"

- id: read_audio_mute
  label: Read Audio Mute Status (HVA)
  kind: query
  command: "{X3}Z"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X4 (1 = mute on, 0 = mute off)"

- id: global_audio_mute
  label: Global Audio Mute All Outputs (HVA)
  kind: action
  command: "1*Z"
  params: []
  notes: "Response: Amt1"

- id: global_audio_unmute
  label: Global Audio Unmute All Outputs (HVA)
  kind: action
  command: "0*Z"
  params: []
  notes: "Response: Amt0"

# --- Names ---

- id: write_global_preset_name
  label: Write Global Preset Name
  kind: action
  command: "\x1B {X9},{X13}NG"
  params:
    - name: X9
      type: integer
      description: "Global preset number 0–32"
    - name: X13
      type: string
      description: "Preset name up to 12 characters (alphanumeric, underscore, slash, space; invalid: + ~ , @ = ' [ ] { } < > ' \" ; : | \\ ?)"
  notes: "Esc + space + preset# + comma + name + NG. Response: Nmg•{X9},{X13}"

- id: read_global_preset_name
  label: Read Global Preset Name
  kind: query
  command: "\x1B {X9}NG"
  params:
    - name: X9
      type: integer
      description: "Global preset number 0–32"
  notes: "Response: X13 (name string; [unassigned] if not assigned; default name Global Pr#{X9} if saved but not named)"

# --- Save, Recall, and Directly Write Presets ---

- id: save_global_preset
  label: Save Current Ties as Global Preset
  kind: action
  command: "{X9},"
  params:
    - name: X9
      type: integer
      description: "Global preset number 0–32"
  notes: "Command character is a comma. Response: Spr•{X9}. Example: 9, → Spr09"

- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  command: "{X9}."
  params:
    - name: X9
      type: integer
      description: "Global preset number 0–32"
  notes: "Command character is a period. Response: Rpr•{X9}. Error E11 if preset not saved."

- id: clear_global_preset
  label: Clear a Global Preset Number
  kind: action
  command: "\x1B+{X9}P0*!"
  params:
    - name: X9
      type: integer
      description: "Global preset number to clear"
  notes: "Clears all ties in preset X9. Response: Spr•{X9}. Should be issued before direct write."

- id: directly_write_global_preset
  label: Directly Write Global Preset
  kind: action
  command: "\x1B+{X9}P{ties}"
  params:
    - name: X9
      type: integer
      description: "Global preset number to write"
    - name: ties
      type: string
      description: "One or more tie commands using !, &, %, $ operators"
  notes: "Esc+{X9}P followed by tie commands. Response: Spr•{X9}. Always clear the preset number first."

# --- Lock (Executive) Modes ---

- id: lock_all_front_panel
  label: Lock All Front Panel Functions (Mode 1)
  kind: action
  command: "1X"
  params: []
  notes: "Response: Exe1. Enables Lock mode 1."

- id: lock_advanced_front_panel
  label: Lock Advanced Front Panel Functions (Mode 2)
  kind: action
  command: "2X"
  params: []
  notes: "Response: Exe2. Enables Lock mode 2."

- id: unlock_front_panel
  label: Unlock All Front Panel Functions (Mode 0)
  kind: action
  command: "0X"
  params: []
  notes: "Response: Exe0. Enables Lock mode 0."

- id: view_lock_mode
  label: View Front Panel Lock Mode
  kind: query
  command: "X"
  params: []
  notes: "Response: X4 (0 = unlocked, 1 = mode 1, 2 = mode 2)"

# --- Resets ---

- id: reset_global_presets_and_names
  label: Reset All Global Presets and Names
  kind: action
  command: "\x1BZG"
  params: []
  notes: "EscZG. Clears all global presets and their names. Response: Zpg"

- id: reset_individual_global_preset
  label: Reset Individual Global Preset
  kind: action
  command: "\x1B {X9}ZG"
  params:
    - name: X9
      type: integer
      description: "Global preset number to clear"
  notes: "Esc + space + X9 + ZG. Response: Zpg•{X9}"

- id: reset_audio_input_levels
  label: Reset All Audio Input Levels to 0 dB
  kind: action
  command: "\x1BZA"
  params: []
  notes: "EscZA. Resets all audio input gain and attenuation to 0 dB. Response: Zpa"

- id: reset_all_mutes
  label: Reset All Video and Audio Mutes
  kind: action
  command: "\x1BZZ"
  params: []
  notes: "EscZZ. Response: Zpz"

- id: system_reset_factory_defaults
  label: System Reset to Factory Defaults
  kind: action
  command: "\x1BZXXX"
  params: []
  notes: "EscZXXX. Clears all ties and presets, resets all audio gains to 0 dB. Response: Zpx"

# --- View Ties, Gain, Mutes, and Presets ---

- id: view_rgbhv_output_tie
  label: View RGBHV Output Tie
  kind: query
  command: "{X3}&"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2 (RGBHV input tied to output X3). Example: 15& → 27"

- id: view_video_output_tie
  label: View Video Output Tie
  kind: query
  command: "{X3}%"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2. Example: 7% → 02"

- id: view_audio_output_tie
  label: View Audio Output Tie
  kind: query
  command: "{X3}$"
  params:
    - name: X3
      type: integer
      description: Output number
  notes: "Response: X2. Example: 3$ → 06"

- id: view_input_gain
  label: View Input Gain
  kind: query
  command: "{X2}G"
  params:
    - name: X2
      type: integer
      description: Input number
  notes: "Response: X5 (dB value –18 to +24). Example: 4G → -02"

- id: view_output_mutes
  label: View All Output Mutes
  kind: query
  command: "\x1BVM"
  params: []
  notes: "EscVM. Response: space-separated X10 values for each output (1 = video mute, 2 = audio mute, 3 = both, 0 = no mute)"

- id: view_video_global_preset_config
  label: View Video Global Preset Configuration
  kind: query
  command: "\x1B {X9}*1*1VC"
  params:
    - name: X9
      type: integer
      description: "Global preset number (0 = current configuration)"
  notes: "Esc + space + X9 + *1*1VC. Response: X2[1]•X2[2]•...•X2[16]•Vid (video input tied to each output)"

- id: view_audio_global_preset_config
  label: View Audio Global Preset Configuration
  kind: query
  command: "\x1B {X9}*1*2VC"
  params:
    - name: X9
      type: integer
      description: "Global preset number (0 = current configuration)"
  notes: "Esc + space + X9 + *1*2VC. Response: X2[1]•X2[2]•...•X2[16]•Aud (audio input tied to each output)"

- id: view_file_directory
  label: View File Directory
  kind: query
  command: "\x1BDF"
  params: []
  notes: "EscDF. Lists user-supplied files. Response: filename,date/time,length per line, then space_remaining Bytes Left"

# --- Serial Port Configuration ---

- id: read_port_parameters
  label: Read Serial Port Parameters
  kind: query
  command: "\x1B 1CP"
  params: []
  notes: "Esc + space + 1CP. Response: X14,X15,X16,X17 (baud,parity,data_bits,stop_bits)"

- id: set_serial_port_mode
  label: Set Serial Port Mode (RS-232/RS-422)
  kind: action
  command: "\x1B 1*{X18}CY"
  params:
    - name: X18
      type: integer
      description: "Port type: 0 = RS-232, 1 = RS-422"
  notes: "Esc + space + 1*X18CY. Response: Cpn1•Cty{X18}"

- id: read_serial_port_mode
  label: Read Serial Port Mode
  kind: query
  command: "\x1B 1CY"
  params: []
  notes: "Esc + space + 1CY. Response: X18 (0 = RS-232, 1 = RS-422)"

# --- Information Requests ---

- id: information_request
  label: Information Request (I/O Size)
  kind: query
  command: "I"
  params: []
  notes: "Response: V{X2}X{X3}•A{X2}X{X3} (video and audio input/output counts). Example: I → V08X16 A08X16"

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
  notes: "Response: xx-xxx-xx (part number). Example: N → 60-330-16"

- id: query_firmware_version
  label: Query Controller Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "Response: X11 (firmware version x.xx). Example: Q → 1.23"

- id: query_software_version_verbose
  label: Query Software Version (Verbose)
  kind: query
  command: "0Q"
  params: []
  notes: "Response: X12 - X12 (running firmware marked with *, bad checksum with ^, unloaded firmware shown as ?.??)"

- id: request_system_status
  label: Request System Status
  kind: query
  command: "S"
  params: []
  notes: "Response: +3.3V•+5V•-5V•+15V•-15V•Temp (degrees Fahrenheit). Example: S → 3.24•4.94•-5.23•15.03•-14.91•114.80"
```

## Feedbacks

```yaml
- id: tie_all_response
  type: string
  pattern: "Out•{X3}•In•{X2}•All"
  description: Confirmation that video and audio of input X2 were tied to output X3

- id: tie_rgb_response
  type: string
  pattern: "Out•{X3}•In•{X2}•RGB"
  description: Confirmation that RGBHV of input X2 was tied to output X3

- id: tie_vid_response
  type: string
  pattern: "Out•{X3}•In•{X2}•Vid"
  description: Confirmation that video of input X2 was tied to output X3

- id: tie_aud_response
  type: string
  pattern: "Out•{X3}•In•{X2}•Aud"
  description: Confirmation that audio of input X2 was tied to output X3

- id: qik_response
  type: string
  pattern: "Qik"
  description: Confirmation of quick multiple tie or front panel switching/preset recall

- id: input_all_response
  type: string
  pattern: "In•{X2}•All"
  description: Confirmation that input X2 tied to all outputs (video and audio)

- id: video_mute_status
  type: string
  pattern: "Vmt•{X3}*{X4}"
  description: Video mute status change for output X3 (1 = muted, 0 = unmuted)

- id: audio_mute_status
  type: string
  pattern: "Amt•{X3}*{X4}"
  description: Audio mute status change for output X3 (1 = muted, 0 = unmuted)

- id: global_vmt
  type: string
  pattern: "Vmt{X4}"
  description: Global video mute confirmation (Vmt1 = all muted, Vmt0 = all unmuted)

- id: global_amt
  type: string
  pattern: "Amt{X4}"
  description: Global audio mute confirmation

- id: audio_level_response
  type: string
  pattern: "In•{X1}•Aud•{X5}"
  description: Input audio gain/attenuation level (X5 = –18 to +24 dB)

- id: output_volume_response
  type: string
  pattern: "Out•{X3}•Vol•{X8}"
  description: Output volume level (X8 = 0–64)

- id: preset_save_response
  type: string
  pattern: "Spr•{X9}"
  description: Global preset saved (X9 = preset number)

- id: preset_recall_response
  type: string
  pattern: "Rpr•{X9}"
  description: Global preset recalled (X9 = preset number)

- id: executive_mode_response
  type: string
  pattern: "Exe{X4}"
  description: Front panel lock mode (0 = unlocked, 1 = lock mode 1, 2 = lock mode 2)

- id: error_response
  type: enum
  values:
    - "E01"  # Invalid input channel number (too large)
    - "E10"  # Invalid command
    - "E11"  # Invalid preset number
    - "E12"  # Invalid output number (too large)
    - "E13"  # Invalid value (out of range)
    - "E14"  # Illegal command for this configuration
    - "E17"  # Timeout (direct write of global presets)
    - "E22"  # Busy
    - "E25"  # Device not present
    - "E28"  # Bad filename/File not found
  description: Error response codes returned when a command is invalid or has invalid parameters
```

## Variables

```yaml
- id: audio_input_gain
  label: Audio Input Gain (HVA)
  type: integer
  range: [-18, 24]
  unit: dB
  description: Per-input gain/attenuation value; 45 steps; set via G (gain) or g (attenuation) commands

- id: audio_output_volume
  label: Audio Output Volume (HVA)
  type: integer
  range: [0, 64]
  unit: steps
  description: Per-output volume; 0 = 0% (-85 dB), 64 = 100% (0 dB); 1 dB steps except 0→1 = 22 dB
```

## Events

```yaml
- id: power_on_copyright
  pattern: "(c) Copyright 2007, Extron Electronics, CP 300 450 MAV IP, V{X11}, 60-{nnn}-{nn}"
  description: Sent by switcher on power-on; includes firmware version and part number

- id: front_panel_switching
  pattern: "Qik"
  description: Sent when front panel switching operation or preset recall occurs

- id: front_panel_preset_save
  pattern: "Spr{X9}"
  description: Sent when a memory preset is saved from the front panel

- id: front_panel_preset_recall
  pattern: "Rpr{X9}"
  description: Sent when a memory preset is recalled from the front panel

- id: front_panel_audio_level_change
  pattern: "In{X1} Aud{X5}"
  description: Sent when front panel input audio level changes; X1 = input number, X5 = dB level

- id: front_panel_video_mute_toggle
  pattern: "Vmt{X3} {X4}"
  description: Sent when video output mute toggled from front panel; X3 = output, X4 = 1/0

- id: front_panel_audio_mute_toggle
  pattern: "Amt{X3} {X4}"
  description: Sent when audio output mute toggled from front panel (HVA); X3 = output, X4 = 1/0

- id: front_panel_lock_toggle
  pattern: "Exe{X4}"
  description: Sent when front panel lock toggled from front panel; X4 = 1 (locked) / 0 (unlocked)
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described in source beyond the direct-write preset procedure (documented in Actions)
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "When front panel lock mode 2 is active, Remote port settings can be viewed but not changed from the front panel via front panel controls."
  - description: "Direct write of a global preset should always be preceded by a clear global preset command for the same preset number to avoid merging with old ties."
  - description: "After changing serial port settings from the front panel, wait at least 5 minutes before removing power to avoid losing the new settings."
```

## Notes

- SIS commands are ASCII and do not require a special start character; each switcher response ends with CR/LF.
- Commands can be made back-to-back in a string with no spaces (e.g. `1*1!02*02&003*003%4*16$`).
- Input and output numbers can be entered as 1-, 2-, or 3-digit numbers but are always reported as 2-digit numbers in responses.
- The G (set gain) and g (set attenuation) commands are case-sensitive; all other commands accept lowercase.
- The rear panel Remote port supports RS-232 or RS-422 (switchable); the front panel Configuration port is RS-232 only and not affected by changes to the rear panel port protocol.
- Both ports are independent and can be active simultaneously.
- Maximum cable distance: up to 200 feet (61 m) from matrix switcher to controlling device.
- Extron recommends leaving serial ports at the default 9600 baud rate.
- HVA suffix models include audio input gain/attenuation and audio output volume control; non-HVA models do not have these audio level commands.
- X8 volume table: 0 = 0% output (85 dB attenuation), 64 = 100% output (0 dB attenuation); step 0→1 is a 22 dB jump, all other steps are 1 dB.
- The front panel Configuration port protocol can be changed under SIS command control only (not from front panel lock mode 2).

<!-- UNRESOLVED: TCP/IP control (Telnet, IP control) not documented in this source; if an IP-equipped variant exists, a separate spec is needed. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->
<!-- UNRESOLVED: Whether the "front panel Configuration port baud rate" can be changed via SIS serial command is mentioned in passing but the specific SIS command to change it is not given in this source extract. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/XP300_Matrix_B.pdf
  - https://www.extron.com/article/tech92
retrieved_at: 2026-06-11T04:03:08.249Z
last_checked_at: 2026-06-23T11:45:14.739Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:45:14.739Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions matched literally in source SIS table; transport 9600 8N1 confirmed; full coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not mentioned in this source document; spec covers serial control only"
- "no multi-step macros described in source beyond the direct-write preset procedure (documented in Actions)"
- "TCP/IP control (Telnet, IP control) not documented in this source; if an IP-equipped variant exists, a separate spec is needed."
- "Firmware version compatibility range not stated."
- "Whether the \"front panel Configuration port baud rate\" can be changed via SIS serial command is mentioned in passing but the specific SIS command to change it is not given in this source extract."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
