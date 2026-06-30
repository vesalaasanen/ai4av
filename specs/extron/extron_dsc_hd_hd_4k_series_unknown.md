---
spec_id: admin/extron-dsc-hd-hd-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DSC HD-HD 4K A Series Control Spec"
manufacturer: Extron
model_family: "DSC HD-HD 4K A"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DSC HD-HD 4K A"
    - "DSC HD-HD 4K PLUS A"
    - "DSC HD-HD 4K PLUS A xi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2803-01_E.pdf
  - https://www.extron.com/download/files/userman/68-2803-01_E.pdf
  - https://media.extron.com/public/download/files/userman/68-2803-51_B.pdf
  - https://media.extron.com/public/download/files/userman/68-2803-50_A_DSCHD-HD4KSUG.pdf
  - https://www.manua.ls/extron/dsc-hd-hd-4k-plus-a/manual
retrieved_at: 2026-06-15T20:53:52.496Z
last_checked_at: 2026-06-16T07:05:18.285Z
generated_at: 2026-06-16T07:05:18.285Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source. Voltage/power specs not in this extract. xi-model-only commands (input B, output B, column mode) are flagged where relevant."
  - "no multi-step sequences explicitly described as macros in source."
  - "firmware version compatibility range not stated."
  - "rear-panel Reset mode 1 full activation procedure is hardware-only (no SIS equivalent)."
  - "OSD menu-emulation command set (E M...) referenced but full table is on source page 64, not in this extract."
  - "voltage / current / power specs not present in this refined extract."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:05:18.285Z
  matched_actions: 213
  action_count: 213
  confidence: medium
  summary: "All 213 spec actions have verbatim command matches in the source command table; transport (9600 baud, port 23, password auth) fully supported; source command catalogue fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Extron DSC HD-HD 4K A Series Control Spec

## Summary
Extron DSC HD-HD 4K A Series 4K scaling converters (DSC HD-HD 4K A, DSC HD-HD 4K PLUS A, DSC HD-HD 4K PLUS A xi), controlled via Extron SIS (Simple Instruction Set) over RS-232, front-panel USB, or Ethernet LAN. Covers the full SIS command/response table from User Guide 68-2803-01 Rev. E.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. Voltage/power specs not in this extract. xi-model-only commands (input B, output B, column mode) are flagged where relevant. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet/SIS port default per source (reset to 23 via "E 23 MT }"); web port 80, SNMP 161
  base_url: ""  # N/A - SIS is Telnet/serial framing, not HTTP
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # password prompt after copyright banner; admin or user level
  # Factory default password = device serial number (case-sensitive).
  # After absolute system reset (E ZQQQ } or mode 5 reset) password resets to "extron".
```

Notes:
- SIS framing: no begin/end delimiters; responses end with CR/LF (denoted `]` in source); `}` = CR with no LF; `E` = Escape char; `•` = Space.
- USB mini-B config port (front panel) carries the same SIS command set.
- All commands case-insensitive unless otherwise stated.

## Traits
```yaml
traits:
  - queryable  # inferred: many view/query commands (X! *I, Q, N, E 1 CONT }, etc.)
  - levelable  # inferred: contrast/brightness/detail/volume/gain/shift/size settable
  - powerable  # inferred: power save on/off commands present (E 1 PSAV })
```

## Actions
```yaml
# All command payloads verbatim from source Command and Response Table.
# Symbols preserved: E=Escape, }=CR(no LF), ]=CR/LF, •=space, X<n>(<c>)=parameter placeholders.

# ---- Input Configuration - Input EDID ----
- id: assign_edid_to_input
  label: Assign EDID to Input
  kind: action
  command: "E A X! * X2) EDID }"
  params:
    - {name: X!, type: integer, description: "Input: 1=HDMI(A), 2=HDMI B (xi only)"}
    - {name: X2), type: integer, description: "EDID resolution/rate code (0=auto default, 10..118, 201/202/203 custom)"}

- id: view_input_edid
  label: View Input EDID
  kind: query
  command: "E A X! EDID }"
  params:
    - {name: X!, type: integer, description: "Input number"}

- id: save_hdmi_output_edid
  label: Save HDMI Output EDID to Custom Slot
  kind: action
  command: "E S X@ * X2) EDID }"
  params:
    - {name: X@, type: integer, description: "Output: 1=HDMI(A), 2=HDMI B (xi only)"}
    - {name: X2), type: integer, description: "Custom EDID slot 201/202/203"}

- id: export_edid_file
  label: Export EDID File
  kind: action
  command: "E E X2) , filename EDID }"
  params:
    - {name: X2), type: integer, description: "EDID table number"}
    - {name: filename, type: string, description: "Destination filename (.bin, 128 or 256 bytes)"}

- id: import_edid_file
  label: Import EDID File
  kind: action
  command: "E I X2) , filename EDID }"
  params:
    - {name: X2), type: integer, description: "Custom EDID slot (201/202/203 only)"}
    - {name: filename, type: string, description: "Source filename"}

# ---- Input Configuration - Auto-Image ----
- id: auto_image_execute
  label: Auto-Image (current aspect)
  kind: action
  command: "1*0A"
  params: []

- id: auto_image_fill
  label: Auto-Image and Fill
  kind: action
  command: "1*1A"
  params: []

- id: auto_image_follow
  label: Auto-Image and Follow
  kind: action
  command: "1*2A"
  params: []

# ---- Input Configuration - Pixels/Lines views ----
- id: view_active_pixels
  label: View Active Pixels
  kind: query
  command: "E 1 APIX }"
  params: []

- id: view_active_lines
  label: View Active Lines
  kind: query
  command: "E 1 ALIN }"
  params: []

- id: view_total_lines
  label: View Total Lines
  kind: query
  command: "E 1 TLIN }"
  params: []

- id: view_total_pixels
  label: View Total Pixels
  kind: query
  command: "E 1 TPIX }"
  params: []

# ---- Input Configuration - Film Detection ----
- id: enable_film_detect
  label: Enable Film Detection
  kind: action
  command: "E 1*1 FILM }"
  params: []

- id: disable_film_detect
  label: Disable Film Detection
  kind: action
  command: "E 1 * 0 FILM }"
  params: []

- id: view_film_detect
  label: View Film Detect Setting
  kind: query
  command: "E 1 FILM }"
  params: []

# ---- Input Configuration - HDCP Authorized / Status ----
- id: set_hdcp_authorized
  label: Set HDCP Authorized
  kind: action
  command: "E E 1* X6^ HDCP }"
  params:
    - {name: X6^, type: integer, description: "0=disabled, 1=enabled (default)"}

- id: view_hdcp_authorized
  label: View HDCP Authorized Status
  kind: query
  command: "E E 1 HDCP }"
  params: []

- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "E I X! HDCP }"
  params:
    - {name: X!, type: integer, description: "Input number"}

- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "E O X@ HDCP }"
  params:
    - {name: X@, type: integer, description: "Output number"}

# ---- Picture Adjustment - Video Mute (Individual Output) ----
- id: mute_video_black_output
  label: Mute Video to Black (Output)
  kind: action
  command: "X@ *1B"
  params:
    - {name: X@, type: integer, description: "Output number"}

- id: mute_sync_video_output
  label: Mute Sync and Video (Output)
  kind: action
  command: "X@ *2B"
  params:
    - {name: X@, type: integer, description: "Output number"}

- id: unmute_output_video_sync
  label: Unmute Video and Sync (Output)
  kind: action
  command: "X@ *0B"
  params:
    - {name: X@, type: integer, description: "Output number"}

- id: view_output_mute
  label: View Output Mute
  kind: query
  command: "X@ *B"
  params:
    - {name: X@, type: integer, description: "Output number"}

# ---- Picture Adjustment - Video Mute (Global) ----
- id: mute_video_black_global
  label: Mute Video to Black (Global)
  kind: action
  command: "1B"
  params: []

- id: mute_sync_video_global
  label: Mute Sync and Video (Global)
  kind: action
  command: "2B"
  params: []

- id: unmute_global
  label: Unmute Video and Sync (Global)
  kind: action
  command: "0B"
  params: []

- id: view_global_mute
  label: View Global Mute
  kind: query
  command: "B"
  params: []

# ---- Picture Adjustment - Contrast / Brightness / Detail ----
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "E 1* X1% CONT }"
  params:
    - {name: X1%, type: integer, description: "0..127, default 64"}

- id: increment_contrast
  label: Increment Contrast
  kind: action
  command: "E 1+ CONT }"
  params: []

- id: decrement_contrast
  label: Decrement Contrast
  kind: action
  command: "E 1 - CONT }"
  params: []

- id: view_contrast
  label: View Contrast
  kind: query
  command: "E 1 CONT }"
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "E 1* X1% BRIT }"
  params:
    - {name: X1%, type: integer, description: "0..127, default 64"}

- id: increment_brightness
  label: Increment Brightness
  kind: action
  command: "E 1+ BRIT }"
  params: []

- id: decrement_brightness
  label: Decrement Brightness
  kind: action
  command: "E 1 - BRIT }"
  params: []

- id: view_brightness
  label: View Brightness
  kind: query
  command: "E 1 BRIT }"
  params: []

- id: set_detail
  label: Set Detail
  kind: action
  command: "E 1* X1% HDET }"
  params:
    - {name: X1%, type: integer, description: "0..127, default 64"}

- id: increment_detail
  label: Increment Detail
  kind: action
  command: "E 1+ HDET }"
  params: []

- id: decrement_detail
  label: Decrement Detail
  kind: action
  command: "E 1 - HDET }"
  params: []

- id: view_detail
  label: View Detail
  kind: query
  command: "E 1 HDET }"
  params: []

# ---- Picture Adjustment - Horizontal/Vertical Shift/Size (Image) ----
- id: set_horizontal_shift
  label: Set Horizontal Shift
  kind: action
  command: "E I 1* X1^ HCTR }"
  params:
    - {name: X1^, type: integer, description: "-4096..+4096"}

- id: increment_horizontal_shift
  label: Increment Horizontal Shift
  kind: action
  command: "E I 1 + HCTR }"
  params: []

- id: decrement_horizontal_shift
  label: Decrement Horizontal Shift
  kind: action
  command: "E I 1 - HCTR }"
  params: []

- id: view_horizontal_shift
  label: View Horizontal Shift
  kind: query
  command: "E I 1 HCTR }"
  params: []

- id: set_vertical_shift
  label: Set Vertical Shift
  kind: action
  command: "E I 1* X1^ VCTR }"
  params:
    - {name: X1^, type: integer, description: "-2400..+2400"}

- id: increment_vertical_shift
  label: Increment Vertical Shift
  kind: action
  command: "E I 1+ VCTR }"
  params: []

- id: decrement_vertical_shift
  label: Decrement Vertical Shift
  kind: action
  command: "E I 1 - VCTR }"
  params: []

- id: view_vertical_shift
  label: View Vertical Shift
  kind: query
  command: "E I 1 VCTR }"
  params: []

- id: set_horizontal_size
  label: Set Horizontal Size
  kind: action
  command: "E I 1* X1& HSIZ }"
  params:
    - {name: X1&, type: integer, description: "Four-digit padded value"}

- id: increment_horizontal_size
  label: Increment Horizontal Size
  kind: action
  command: "E I 1+ HSIZ }"
  params: []

- id: decrement_horizontal_size
  label: Decrement Horizontal Size
  kind: action
  command: "E I 1 - HSIZ }"
  params: []

- id: view_horizontal_size
  label: View Horizontal Size
  kind: query
  command: "E I 1 HSIZ }"
  params: []

- id: set_vertical_size
  label: Set Vertical Size
  kind: action
  command: "E I 1* X1& VSIZ }"
  params:
    - {name: X1&, type: integer, description: "Four-digit padded value"}

- id: increment_vertical_size
  label: Increment Vertical Size
  kind: action
  command: "E I 1+ VSIZ }"
  params: []

- id: decrement_vertical_size
  label: Decrement Vertical Size
  kind: action
  command: "E I 1 - V SIZ }"
  params: []

- id: view_vertical_size
  label: View Vertical Size
  kind: query
  command: "E I 1 VSIZ }"
  params: []

# ---- Compound Image Position/Size ----
- id: set_compound_image
  label: Set Compound Image Position and Size
  kind: action
  command: "E 1, X1^ * X1^ * X1& * X1& XIMG }"
  params:
    - {name: X1^, type: integer, description: "Horizontal then vertical position"}
    - {name: X1&, type: integer, description: "Horizontal then vertical size"}

- id: view_compound_image
  label: View Compound Image Position and Size
  kind: query
  command: "E 1 XIMG }"
  params: []

# ---- Auto Memories ----
- id: enable_auto_memory
  label: Enable Auto Memory
  kind: action
  command: "E 1*1 AMEM }"
  params: []

- id: disable_auto_memory
  label: Disable Auto Memory
  kind: action
  command: "E 1*0 AMEM }"
  params: []

- id: view_auto_memory
  label: View Auto Memory Setting
  kind: query
  command: "E 1 AMEM }"
  params: []

# ---- Input Presets ----
- id: recall_input_preset
  label: Recall Input Preset
  kind: action
  command: "2*1* X2^ . 2"
  params:
    - {name: X2^, type: integer, description: "Preset 1..128"}

- id: save_input_preset
  label: Save Input Preset
  kind: action
  command: "2*1* X2^ , 2"
  params:
    - {name: X2^, type: integer, description: "Preset 1..128"}

- id: delete_input_preset
  label: Delete Input Preset
  kind: action
  command: "E X 2 * X2^ PRST }"
  params:
    - {name: X2^, type: integer, description: "Preset 1..128"}

# ---- Input Preset Name ----
- id: write_preset_name
  label: Write Input Preset Name
  kind: action
  command: "E 2* X2^ , X1$ PNAM }"
  params:
    - {name: X2^, type: integer, description: "Preset 1..128"}
    - {name: X1$, type: string, description: "Name up to 32 chars; space = default name"}

- id: view_preset_name
  label: View Input Preset Name
  kind: query
  command: "E 2* X2^ PNAM }"
  params:
    - {name: X2^, type: integer, description: "Preset 1..128"}

# ---- Output Configuration - Output Scaler Rate ----
- id: set_output_rate
  label: Set Output Scaler Rate
  kind: action
  command: "E 1* X2! RATE }"
  params:
    - {name: X2!, type: integer, description: "Rate code 10..203 (see Output Resolutions table)"}

- id: view_output_rate
  label: View Output Scaler Rate
  kind: query
  command: "E 1 RATE  }"
  params: []

# ---- Output Configuration - Power Save Mode ----
- id: power_save_off
  label: Power Save Off (Full Power)
  kind: action
  command: "E 0 PSAV }"
  params: []

- id: power_save_on
  label: Power Save On (Low Power)
  kind: action
  command: "E 1 PSAV }"
  params: []

- id: view_power_save
  label: View Power Save Mode
  kind: query
  command: "E PSAV }"
  params: []

# ---- Output Configuration - HDCP Output Mode ----
- id: set_hdcp_output_mode
  label: Set HDCP Output Mode
  kind: action
  command: "E S X@ * X4^ HDCP }"
  params:
    - {name: X@, type: integer, description: "Output number"}
    - {name: X4^, type: integer, description: "0=Off, 1=Auto(default), 2=On"}

- id: view_hdcp_output_mode
  label: View HDCP Output Mode
  kind: query
  command: "E S X@ HDCP }"
  params:
    - {name: X@, type: integer, description: "Output number"}

# ---- Output Configuration - Screen Saver ----
- id: set_screen_saver_mode
  label: Set Screen Saver Mode
  kind: action
  command: "E M 1* X4) SSAV }"
  params:
    - {name: X4), type: integer, description: "1=Black(default), 2=Blue+OSD, 3=User logo"}

- id: view_screen_saver_mode
  label: View Screen Saver Mode
  kind: query
  command: "E M 1 SSAV }"
  params: []

- id: set_screen_saver_duration
  label: Set Screen Saver Duration
  kind: action
  command: "E T 1* X2* SSAV }"
  params:
    - {name: X2*, type: integer, description: "1..500 sec, 0=instant, 501=never(default)"}

- id: view_screen_saver_duration
  label: View Screen Saver Duration
  kind: query
  command: "E T 1 SSAV }"
  params: []

- id: view_screen_saver_status
  label: View Screen Saver Status
  kind: query
  command: "E S 1 SSAV }"
  params: []

# ---- Output Configuration - HDMI Output Format ----
- id: set_hdmi_output_format
  label: Set HDMI Output Format
  kind: action
  command: "E X@ * X4* VTPO }"
  params:
    - {name: X@, type: integer, description: "Output number"}
    - {name: X4*, type: integer, description: "0=Auto, 1=DVI, 2=RGB Full, 3=RGB Limited, 5=YUV444, 7=YUV422, 9=YUV420"}

- id: view_hdmi_output_format
  label: View HDMI Output Format
  kind: query
  command: "E X@ VTPO }"
  params:
    - {name: X@, type: integer, description: "Output number"}

# ---- Output Configuration - Input Lock (AFL) ----
- id: disable_input_afl
  label: Disable Input Lock (AFL)
  kind: action
  command: "E 1*0 GLOK }"
  params: []

- id: enable_input_afl
  label: Enable Input Lock (AFL)
  kind: action
  command: "E 1*1 GLOK }"
  params: []

- id: view_afl_setting
  label: View AFL Setting
  kind: query
  command: "E 1 GLOK }"
  params: []

- id: view_afl_status
  label: View AFL Status
  kind: query
  command: "E  41 STAT }"
  params: []

# ---- Logos - User Supplied Image ----
- id: select_logo_image
  label: Select Logo Image File
  kind: action
  command: "E A X4# , filename LOGO }"
  params:
    - {name: X4#, type: integer, description: "Logo slot 1..16, 101=screensaver, 201=HDCP"}
    - {name: filename, type: string, description: "Image filename"}

- id: view_logo_image
  label: View Logo Image File
  kind: query
  command: "E A X4# LOGO }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: clear_logo
  label: Clear Logo
  kind: action
  command: "E X 3* X4# PRST }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: disable_logo
  label: Disable Logo Display
  kind: action
  command: "E E 1*0 LOGO }"
  params: []

- id: enable_logo
  label: Enable Logo Display
  kind: action
  command: "E 1* X4# LOGO }"
  params:
    - {name: X4#, type: integer, description: "Logo slot to display"}

- id: view_logo_status
  label: View Logo Status
  kind: query
  command: "E E 1 LOGO }"
  params: []

- id: write_logo_name
  label: Write Logo Name
  kind: action
  command: "E L X4# , X1$ UNAM }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}
    - {name: X1$, type: string, description: "Logo name up to 32 chars"}

- id: view_logo_name
  label: View Logo Name
  kind: query
  command: "E L X4# UNAM }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: view_logo_availability
  label: View Logo Availability
  kind: query
  command: "E Q LOGO }"
  params: []

# ---- Logos - Horizontal/Vertical Shift (Logo) ----
- id: set_logo_horizontal_shift
  label: Set Logo Horizontal Shift
  kind: action
  command: "E L X4# * X1^ HCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}
    - {name: X1^, type: integer, description: "-4096..+4096"}

- id: increment_logo_horizontal_shift
  label: Increment Logo Horizontal Shift
  kind: action
  command: "E L X4# + HCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: decrement_logo_horizontal_shift
  label: Decrement Logo Horizontal Shift
  kind: action
  command: "E L X4# - HCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: view_logo_horizontal_shift
  label: View Logo Horizontal Shift
  kind: query
  command: "E L X4# HCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: set_logo_vertical_shift
  label: Set Logo Vertical Shift
  kind: action
  command: "E L X4# * X1^ VCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}
    - {name: X1^, type: integer, description: "-2400..+2400"}

- id: increment_logo_vertical_shift
  label: Increment Logo Vertical Shift
  kind: action
  command: "E L X4# + VCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: decrement_logo_vertical_shift
  label: Decrement Logo Vertical Shift
  kind: action
  command: "E L X4# - VCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: view_logo_vertical_shift
  label: View Logo Vertical Shift
  kind: query
  command: "E L X4# VCTR }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

# ---- Logos - Key Effect / Key Effect Level ----
- id: disable_logo_key_effect
  label: Disable Logo Key Effect
  kind: action
  command: "E X4# *0 LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: logo_key_effect_transparency
  label: Logo Key Effect - Transparency
  kind: action
  command: "E X4# *1 LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: logo_key_effect_rgb
  label: Logo Key Effect - RGB Key
  kind: action
  command: "E X4# *2 LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: logo_key_effect_level
  label: Logo Key Effect - Level Key
  kind: action
  command: "E X4# *3 LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: logo_key_effect_alpha
  label: Logo Key Effect - Alpha Key
  kind: action
  command: "E X4# *4 LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: view_logo_key_effect
  label: View Logo Key Effect
  kind: query
  command: "E X4# LKEF }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}

- id: set_logo_key_effect_level
  label: Set Logo Key Effect Level
  kind: action
  command: "E X4# * X7) * X7! *LKEY }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}
    - {name: X7), type: integer, description: "Key effect variable (0..5)"}
    - {name: X7!, type: integer, description: "Level 0..255"}

- id: view_logo_key_effect_level
  label: View Logo Key Effect Level
  kind: query
  command: "E X4# * X7) LKEY }"
  params:
    - {name: X4#, type: integer, description: "Logo slot"}
    - {name: X7), type: integer, description: "Key effect variable"}

# ---- Audio Configuration - Audio Mute ----
- id: enable_global_audio_mute
  label: Enable Global Audio Mute
  kind: action
  command: "1Z"
  params: []

- id: disable_global_audio_mute
  label: Disable Global Audio Mute
  kind: action
  command: "0Z"
  params: []

- id: set_discrete_audio_mute
  label: Set Discrete Audio Mute
  kind: action
  command: "X7@ * X1) Z"
  params:
    - {name: X7@, type: integer, description: "1=analog 5-pole, 2=embedded TMDS"}
    - {name: X1), type: integer, description: "0=off, 1=on"}

- id: view_discrete_audio_mute
  label: View Discrete Audio Mute
  kind: query
  command: "X7@ *Z"
  params:
    - {name: X7@, type: integer, description: "1=analog, 2=embedded"}

- id: view_global_audio_mute
  label: View Global Audio Mute
  kind: query
  command: "Z"
  params: []

# ---- Audio Configuration - Audio Input Gain ----
- id: set_audio_gain
  label: Set Audio Input Gain
  kind: action
  command: "X5$ G"
  params:
    - {name: X5$, type: integer, description: "-18..+24 dB, default 12"}

- id: increment_audio_gain
  label: Increment Audio Gain
  kind: action
  command: "+G"
  params: []

- id: decrement_audio_gain
  label: Decrement Audio Gain
  kind: action
  command: "- G"
  params: []

- id: view_audio_gain
  label: View Audio Gain
  kind: query
  command: "G"
  params: []

# ---- Audio Configuration - Format / Volume ----
- id: set_input_audio_format
  label: Set Input Audio Format
  kind: action
  command: "E I 1 * X5* AFMT }"
  params:
    - {name: X5*, type: integer, description: "0=None,1=Analog,2=LPCM-2Ch,3=Multi-Ch,4=LPCM-2Ch Auto(default),5=Multi-Ch Auto"}

- id: view_input_audio_format
  label: View Input Audio Format
  kind: query
  command: "E I 1 AFMT }"
  params: []

- id: set_volume
  label: Set Output Volume
  kind: action
  command: "X5) V"
  params:
    - {name: X5), type: integer, description: "0..-100 dB in 1 dB steps, default -10"}

- id: increment_volume
  label: Increment Volume
  kind: action
  command: "+ V"
  params: []

- id: decrement_volume
  label: Decrement Volume
  kind: action
  command: "- V"
  params: []

- id: view_volume
  label: View Volume
  kind: query
  command: "V"
  params: []

- id: set_audio_output_format
  label: Set Audio Output Format
  kind: action
  command: "E O 1* X5! AFMT }"
  params:
    - {name: X5!, type: integer, description: "1=Dual mono, 2=Stereo(default)"}

- id: view_audio_output_format
  label: View Audio Output Format
  kind: query
  command: "E O 1 AFMT }"
  params: []

# ---- Advanced Configuration - Test Pattern ----
- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "E 1* X2@ TEST }"
  params:
    - {name: X2@, type: integer, description: "0=Off(default),1=Crop,2=Alt pixels,3=Crosshatch,4=Color bars,5=Grayscale,6=Audio Test"}

- id: view_test_pattern
  label: View Test Pattern
  kind: query
  command: "E 1TEST }"
  params: []

# ---- Advanced Configuration - Freeze ----
- id: enable_freeze
  label: Enable Freeze
  kind: action
  command: "1*1 F"
  params: []

- id: disable_freeze
  label: Disable Freeze
  kind: action
  command: "1*0 F"
  params: []

- id: view_freeze
  label: View Freeze Status
  kind: query
  command: "1F"
  params: []

# ---- Advanced Configuration - Aspect Ratio ----
- id: set_aspect_fill
  label: Set Aspect Ratio Fill
  kind: action
  command: "E 1*1 ASPR }"
  params: []

- id: set_aspect_follow
  label: Set Aspect Ratio Follow
  kind: action
  command: "E 1*2 ASPR }"
  params: []

- id: view_aspect_ratio
  label: View Aspect Ratio
  kind: query
  command: "E 1 ASPR }"
  params: []

# ---- Advanced Configuration - Front Panel Lock (Executive Mode) ----
- id: enable_front_panel_lock
  label: Enable Front Panel Lock
  kind: action
  command: "1 X"
  params: []

- id: disable_front_panel_lock
  label: Disable Front Panel Lock
  kind: action
  command: "0 X"
  params: []

- id: view_front_panel_lock
  label: View Front Panel Lock Status
  kind: query
  command: "X"
  params: []

# ---- Advanced Configuration - Overscan ----
- id: set_overscan
  label: Set Overscan Mode
  kind: action
  command: "E 6* X3* OSCN }"
  params:
    - {name: X3*, type: integer, description: "0=0.0%(default),1=2.5%,2=5.0%"}

- id: view_overscan
  label: View Overscan Status
  kind: query
  command: "E 6 OSCN }"
  params: []

# ---- Advanced Configuration - Video Signal Presence ----
- id: view_signal_presence
  label: View Video Signal Presence
  kind: query
  command: "E 0LS }"
  params: []

# ---- Advanced Configuration - HDCP Notification ----
- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  command: "E N 1* X4& HDCP }"
  params:
    - {name: X4&, type: integer, description: "0=Black,1=Green+OSD(default),2=User image"}

- id: view_hdcp_notification
  label: View HDCP Notification
  kind: query
  command: "E N 1 HDCP }"
  params: []

# ---- Advanced Configuration - Unsolicited Signal Statuses ----
- id: enable_unsolicited_signal_responses
  label: Enable Unsolicited Signal Responses
  kind: action
  command: "E S 1 NTFY }"
  params: []

- id: disable_unsolicited_signal_responses
  label: Disable Unsolicited Signal Responses
  kind: action
  command: "E S 0 NTFY }"
  params: []

- id: view_unsolicited_signal_responses
  label: View Unsolicited Signal Responses State
  kind: query
  command: "E S NTFY }"
  params: []

# ---- Advanced Configuration - Unsolicited HDCP Statuses ----
- id: enable_unsolicited_hdcp_responses
  label: Enable Unsolicited HDCP Responses
  kind: action
  command: "E H 1 NTFY }"
  params: []

- id: disable_unsolicited_hdcp_responses
  label: Disable Unsolicited HDCP Responses
  kind: action
  command: "E H 0 NTFY }"
  params: []

- id: view_unsolicited_hdcp_responses
  label: View Unsolicited HDCP Responses State
  kind: query
  command: "E H NTFY }"
  params: []

# ---- Resets ----
- id: system_reset
  label: System Reset
  kind: action
  command: "E ZXXX }"
  params: []

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  command: "E ZQQQ }"
  params: []

- id: ip_settings_reset
  label: IP Settings Reset
  kind: action
  command: "E 1 ZQQQ }"
  params: []

- id: absolute_system_reset_retain_ip
  label: Absolute System Reset (Retain IP)
  kind: action
  command: "E ZY }"
  params: []

# ---- Information Requests ----
- id: general_information
  label: General Information
  kind: query
  command: "X! *I"
  params:
    - {name: X!, type: integer, description: "Input number"}

- id: query_model_name
  label: Query Model Name
  kind: query
  command: "1I"
  params: []

- id: view_unit_description
  label: View Unit Description
  kind: query
  command: "2I"
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []

- id: query_firmware_build_version
  label: Query Firmware Build Version
  kind: query
  command: "* Q"
  params: []

- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []

- id: view_internal_temperature
  label: View Internal Temperature
  kind: query
  command: "E 20STAT }"
  params: []

# ---- IP Setup ----
- id: set_unit_name
  label: Set Unit Name (Hostname)
  kind: action
  command: "E X3@ CN }"
  params:
    - {name: X3@, type: string, description: "Up to 63 chars, A-Z/0-9/-, first must be letter, last not hyphen"}

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []

- id: reset_unit_name_default
  label: Reset Unit Name to Factory Default
  kind: action
  command: "E •  CN }"
  params: []

- id: view_mac_address
  label: View MAC Address
  kind: query
  command: "E CH }"
  params: []

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X3! CV }"
  params:
    - {name: X3!, type: integer, description: "0=None,1=Verbose,2=Tagged,3=Verbose+Tagged"}

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []

- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "E 1DH }"
  params: []

- id: set_dhcp_off
  label: Set DHCP Off
  kind: action
  command: "E 0DH }"
  params: []

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "E DH }"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "E X7% CI }"
  params:
    - {name: X7%, type: string, description: "IP nnn.nnn.nnn.nnn, default 192.168.254.254"}

- id: view_ip_address
  label: View IP Address
  kind: query
  command: "E CI }"
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "E X7^ CS }"
  params:
    - {name: X7^, type: string, description: "Mask nnn.nnn.nnn.nnn, default 255.255.0.0"}

- id: set_gateway_ip
  label: Set Gateway IP Address
  kind: action
  command: "E X7& CG }"
  params:
    - {name: X7&, type: string, description: "Gateway nnn.nnn.nnn.nnn, default 0.0.0.0"}

- id: view_gateway_ip
  label: View Gateway IP Address
  kind: query
  command: "E CG }"
  params: []

- id: view_connections_listing
  label: View Connections Listing
  kind: query
  command: "E CC }"
  params: []

- id: set_date_time
  label: Set Date and Time
  kind: action
  command: "E X8% CT }"
  params:
    - {name: X8%, type: string, description: "MM/DD/YY-HH:MM:SS"}

- id: view_date_time
  label: View Date and Time
  kind: query
  command: "E CT }"
  params: []

- id: view_gmt_offset
  label: View GMT Offset
  kind: query
  command: "E CZ }"
  params: []

- id: read_available_timezones
  label: Read Available Time Zones
  kind: query
  command: "E * TZON }"
  params: []

- id: set_timezone
  label: Set Time Zone
  kind: action
  command: "E X8& * TZON }"
  params:
    - {name: X8&, type: string, description: "2-6 digit timezone code (e.g. PST)"}

- id: view_current_timezone
  label: View Current Time Zone
  kind: query
  command: "E TZON }"
  params: []

# ---- IP Setup - All IP Addresses ----
- id: set_all_ip_addresses
  label: Set All IP Addresses at Once
  kind: action
  command: "E 1* X7% / X8( * X7& CISG }"
  params:
    - {name: X7%, type: string, description: "IP address"}
    - {name: X8(, type: string, description: "Subnet mask (2-digit CISG code)"}
    - {name: X7&, type: string, description: "Gateway IP"}

- id: view_all_ip_addresses
  label: View All IP Addresses
  kind: query
  command: "E 1 CISG }"
  params: []

# ---- Password and Security Settings ----
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E X7* CA }"
  params:
    - {name: X7*, type: string, description: "Up to 128 chars; no / \\ | * or space; case-sensitive"}

- id: clear_admin_password
  label: Clear Administrator Password
  kind: action
  command: "E •  CA }"
  params: []

- id: view_admin_password
  label: View Administrator Password
  kind: query
  command: "E CA }"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E X7* CU }"
  params:
    - {name: X7*, type: string, description: "Up to 128 chars; case-sensitive"}

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E •  CU }"
  params: []

- id: view_user_password
  label: View User Password
  kind: query
  command: "E CU }"
  params: []

# ---- Ethernet Data Port ----
- id: set_current_connection_timeout
  label: Set Current Connection Port Timeout
  kind: action
  command: "E 0 * X8$ TC }"
  params:
    - {name: X8$, type: integer, description: "1..65000 (in 10s units); default 30=300s"}

- id: view_current_connection_timeout
  label: View Current Connection Port Timeout
  kind: query
  command: "E 0 TC }"
  params: []

- id: set_global_ip_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "E 1 * X8$ TC }"
  params:
    - {name: X8$, type: integer, description: "1..65000 (in 10s units); default 30=300s"}

- id: view_global_ip_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "E 1 TC }"
  params: []

# ---- Serial Data Port ----
- id: view_serial_parameters
  label: View Serial Port Parameters
  kind: query
  command: "E 1  CP }"
  params: []

# ---- Directories ----
- id: create_or_change_directory
  label: Create or Change Directory
  kind: action
  command: "E {path}/{directory}/ CJ }"
  params:
    - {name: path, type: string, description: "Directory path"}

- id: move_to_root_directory
  label: Move to Root Directory
  kind: action
  command: "E /CJ }"
  params: []

- id: move_up_one_directory
  label: Move Up One Directory
  kind: action
  command: "E .. CJ }"
  params: []

- id: view_current_directory
  label: View Current Directory
  kind: query
  command: "E CJ }"
  params: []

# ---- File Commands ----
- id: erase_file
  label: Erase File
  kind: action
  command: "E filename EF }"
  params:
    - {name: filename, type: string, description: "File to erase"}

- id: erase_current_directory_files
  label: Erase Current Directory and Files
  kind: action
  command: "E / EF }"
  params: []

- id: erase_directory_subdirs
  label: Erase Current Directory and Subdirectories
  kind: action
  command: "E // EF }"
  params: []

- id: list_files
  label: List Files (Current Directory)
  kind: query
  command: "E DF }"
  params: []

- id: list_files_recursive
  label: List Files (Recursive)
  kind: query
  command: "E LF }"
  params: []

# ---- Port Assignment ----
- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  command: "E { port number } MT }"
  params:
    - {name: port_number, type: integer, description: "Port; >=1024 for custom, 23=default, 0=disable"}

- id: reset_telnet_port
  label: Reset Telnet Port to Default
  kind: action
  command: "E 23 MT }"
  params: []

- id: disable_telnet_port
  label: Disable Telnet Port
  kind: action
  command: "E 0 MT }"
  params: []

- id: view_telnet_port
  label: View Telnet Port
  kind: query
  command: "E MT }"
  params: []

- id: set_web_port
  label: Set Web Port
  kind: action
  command: "E { port number } MH }"
  params:
    - {name: port_number, type: integer, description: "Port; 80=default, 0=disable"}

- id: reset_web_port
  label: Reset Web Port to Default
  kind: action
  command: "E 80 MH }"
  params: []

- id: disable_web_port
  label: Disable Web Port
  kind: action
  command: "E 0 MH }"
  params: []

- id: view_web_port
  label: View Web Port
  kind: query
  command: "E MH }"
  params: []

- id: set_snmp_port
  label: Set SNMP Port
  kind: action
  command: "E A { port number } PMAP }"
  params:
    - {name: port_number, type: integer, description: "Port; 161=default, 0=disable"}

- id: reset_snmp_port
  label: Reset SNMP Port to Default
  kind: action
  command: "E A 0 161 PMAP }"
  params: []

- id: disable_snmp_port
  label: Disable SNMP Port
  kind: action
  command: "E A 161 PMAP }"
  params: []

- id: view_snmp_port
  label: View SNMP Port
  kind: query
  command: "E A PMAP }"
  params: []
```

## Feedbacks
```yaml
- id: video_mute_state
  type: enum
  values: [off, mute_black, mute_sync_video]
  source_symbol: X4@

- id: audio_mute_state
  type: enum
  values: [off, on]
  source_symbol: X1)

- id: input_signal_presence
  type: enum
  values: [not_detected, detected]
  source_symbol: X6!

- id: input_video_format
  type: enum
  values: [no_signal, hdmi, dvi]
  source_symbol: X#

- id: input_hdcp_status
  type: enum
  values: [no_source, source_no_hdcp, source_hdcp]
  source_symbol: X4$

- id: output_hdcp_status
  type: enum
  values: [no_sink, sink_no_hdcp, sink_hdcp]
  source_symbol: X4$

- id: hdcp_authorized_status
  type: enum
  values: [disabled, enabled]
  source_symbol: X6^

- id: power_save_status
  type: enum
  values: [full_power, low_power, overheat_low_power]
  source_symbol: X6@

- id: screen_saver_status
  type: enum
  values: [active_input_timer_off, no_input_timer_running, no_input_timer_expired]
  source_symbol: X6#

- id: afl_setting
  type: enum
  values: [disabled, enabled]
  source_symbol: X6$

- id: afl_status
  type: enum
  values: [disabled, enabled_not_locked, enabled_locked]
  source_symbol: X6%

- id: freeze_state
  type: enum
  values: [off, on]
  source_symbol: X1)

- id: front_panel_lock
  type: enum
  values: [unlocked, locked]
  source_symbol: X2(

- id: auto_memory_state
  type: enum
  values: [off, on]
  source_symbol: X1)

- id: film_detect_state
  type: enum
  values: [disabled, enabled]
  source_symbol: X1)

- id: model_name
  type: enum
  values: [DSC_HD_HD_4K_PLUS_A, DSC_HD_HD_4K_PLUS_A_xi, DSC_HD_HD_4K_A]
  source_symbol: X3$

- id: part_number
  type: enum
  values: ["60-1573-01", "60-1573-02", "60-1573-03"]
  source_symbol: X3%

- id: firmware_version
  type: string
  source_query: "Q"

- id: firmware_build_version
  type: string
  source_query: "* Q"

- id: internal_temperature_celsius
  type: integer
  source_symbol: X1@
```

## Variables
```yaml
- id: contrast
  range: [0, 127]
  default: 64
  source_symbol: X1%

- id: brightness
  range: [0, 127]
  default: 64
  source_symbol: X1%

- id: detail
  range: [0, 127]
  default: 64
  source_symbol: X1%

- id: horizontal_shift
  range: [-4096, 4096]
  source_symbol: X1^

- id: vertical_shift
  range: [-2400, 2400]
  source_symbol: X1^

- id: horizontal_size
  type: integer
  source_symbol: X1&

- id: vertical_size
  type: integer
  source_symbol: X1&

- id: audio_input_gain_db
  range: [-18, 24]
  default: 12
  source_symbol: X5$

- id: output_volume_db
  range: [-100, 0]
  default: -10
  source_symbol: X5)

- id: output_scaler_rate
  range: [10, 203]
  source_symbol: X2!

- id: input_edid_mnu
  type: integer
  source_symbol: X2)

- id: test_pattern
  type: enum
  values: [off, crop, alternating_pixels, crosshatch, color_bars, grayscale, audio_test]
  source_symbol: X2@

- id: screen_saver_mode
  type: enum
  values: [black, blue_osd, user_logo]
  source_symbol: X4)

- id: screen_saver_duration_seconds
  range: [0, 501]
  default: 501
  source_symbol: X2*

- id: hdmi_output_format
  type: enum
  values: [auto, dvi, hdmi_rgb_full, hdmi_rgb_limited, hdmi_yuv444, hdmi_yuv422, hdmi_yuv420]
  source_symbol: X4*

- id: aspect_ratio
  type: enum
  values: [fill, follow]
  source_symbol: X3(

- id: overscan_mode
  type: enum
  values: ["0.0", "2.5", "5.0"]
  source_symbol: X3*

- id: input_audio_format
  type: enum
  values: [none, analog, lpcm_2ch, multi_ch, lpcm_2ch_auto, multi_ch_auto]
  source_symbol: X5*

- id: audio_output_format
  type: enum
  values: [dual_mono, stereo]
  source_symbol: X5!

- id: hdcp_output_mode
  type: enum
  values: [off, auto, on]
  source_symbol: X4^

- id: hdcp_notification
  type: enum
  values: [black_screen, green_osd, user_image]
  source_symbol: X4&

- id: verbose_mode
  type: enum
  values: [none, verbose, tagged, verbose_tagged]
  source_symbol: X3!

- id: unit_name
  type: string
  max_length: 63
  source_symbol: X3@

- id: ip_address
  type: string
  default: "192.168.254.254"
  source_symbol: X7%

- id: subnet_mask
  type: string
  default: "255.255.0.0"
  source_symbol: X7^

- id: gateway_ip
  type: string
  default: "0.0.0.0"
  source_symbol: X7&

- id: dhcp_mode
  type: enum
  values: [off, on]
  default: off

- id: telnet_port
  type: integer
  default: 23

- id: web_port
  type: integer
  default: 80

- id: snmp_port
  type: integer
  default: 161

- id: timezone_code
  type: string
  source_symbol: X8&
```

## Events
```yaml
# Unsolicited messages the DSC sends to the host without a query.
- id: reconfig
  description: Sent on change in input frequency
  payload: "Reconfig ]"

- id: hotplug_output
  description: Sent on hot plug event X6( on output X@
  payload: "HplgO X@ * X6( ]"
  params:
    - {name: X@, type: integer, description: "1=HDMI A, 2=HDMI B (xi only)"}
    - {name: X6(, type: integer, description: "1=new sink, 2=sink disconnected"}

- id: input_signal_change_nonxi
  description: Non-xi models - sent on input signal presence change
  payload: "In00 • X6! ]"
  params:
    - {name: X6!, type: integer, description: "0=not detected, 1=detected"}

- id: input_signal_change_xi
  description: xi model - sent on input signal presence change on A or B
  payload: "In00 • X6! * X6! ]"
  params:
    - {name: X6!, type: integer, description: "INA then INB; 0=not detected, 1=detected"}

- id: input_hdcp_change
  description: Sent on change in HDCP status of input X!
  payload: "HdcpI X! * X4$ ]"

- id: output_hdcp_change
  description: Sent on change in HDCP status of output X@
  payload: "HdcpO X@ * X4$ ]"

- id: power_save_overheat
  description: Sent when unit enters power save due to exceeding max operating temperature
  payload: "Psav9 ]"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - system_reset                # E ZXXX } - resets all device settings
  - absolute_system_reset       # E ZQQQ } - factory reset incl. IP
  - ip_settings_reset           # E 1 ZQQQ }
  - absolute_system_reset_retain_ip  # E ZY }
interlocks:
  - front_panel_lock_blocks_menu_emulation  # E14 returned if menu emulation sent while locked
  - dhcp_on_blocks_static_ip                # E14 if setting IP/subnet/gateway while DHCP on
  - power_save_exits_on_command             # unit exits power save when any SIS menu cmd received
notes:
  - "Overheat protection: unit auto-enters low-power mode (Psav9 event) when exceeding max operating temperature."
  - "Absolute system reset (E ZQQQ } or rear-panel Reset mode 5) changes serial-number password to 'extron'."
  - "Rear-panel Reset mode 4 ≈ SIS 'E 1 ZQQQ }' (IP only). Rear-panel Reset mode 5 ≈ SIS 'E ZQQQ }' (full)."
  - "Rear-panel Reset mode 1 reverts firmware for one power cycle only; Extron warns DO NOT operate in that state."
```

## Notes
- Three models share this spec: DSC HD-HD 4K A (`60-1573-03`), DSC HD-HD 4K PLUS A (`60-1573-01`), DSC HD-HD 4K PLUS A xi (`60-1573-02`). xi model adds input B, output B, left-right column mode, buffered output mode, and 4096x2160 column EDID.
- SIS framing tokens (verbatim): `•` = space, `]` = CR+LF, `}` = CR (no LF), `E` = Escape. Preserve in command payloads.
- Verbose mode (X3!) changes many query response shapes — tagged variants shown in source under "verbose modes 2 and 3" rows. Default: verbose on for RS-232/USB, off for LAN.
- Error codes: `E01` invalid input, `E10` invalid command, `E11` invalid preset, `E12` invalid port, `E13` invalid parameter, `E14` invalid for config, `E17` invalid for signal type, `E22` busy, `E24` privilege violation, `E28` bad filename, `E33` bad file type/size. Unknown commands receive no response at all.
- EDID rate-code table and Output Resolution/Refresh table (X2! codes 10..203) are large enumerations documented in source lines 60–191; not duplicated here per granularity rule (one parameterized `set_output_rate` action covers the range).
- Custom output rates (201/202/203) limited to 300 MHz pixel clock; supported only as buffered outputs (xi model).

<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: rear-panel Reset mode 1 full activation procedure is hardware-only (no SIS equivalent). -->
<!-- UNRESOLVED: OSD menu-emulation command set (E M...) referenced but full table is on source page 64, not in this extract. -->
<!-- UNRESOLVED: voltage / current / power specs not present in this refined extract. -->
````

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2803-01_E.pdf
  - https://www.extron.com/download/files/userman/68-2803-01_E.pdf
  - https://media.extron.com/public/download/files/userman/68-2803-51_B.pdf
  - https://media.extron.com/public/download/files/userman/68-2803-50_A_DSCHD-HD4KSUG.pdf
  - https://www.manua.ls/extron/dsc-hd-hd-4k-plus-a/manual
retrieved_at: 2026-06-15T20:53:52.496Z
last_checked_at: 2026-06-16T07:05:18.285Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:05:18.285Z
matched_actions: 213
action_count: 213
confidence: medium
summary: "All 213 spec actions have verbatim command matches in the source command table; transport (9600 baud, port 23, password auth) fully supported; source command catalogue fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source. Voltage/power specs not in this extract. xi-model-only commands (input B, output B, column mode) are flagged where relevant."
- "no multi-step sequences explicitly described as macros in source."
- "firmware version compatibility range not stated."
- "rear-panel Reset mode 1 full activation procedure is hardware-only (no SIS equivalent)."
- "OSD menu-emulation command set (E M...) referenced but full table is on source page 64, not in this extract."
- "voltage / current / power specs not present in this refined extract."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
