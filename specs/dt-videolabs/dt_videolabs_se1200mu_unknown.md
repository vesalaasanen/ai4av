---
spec_id: admin/dt_videolabs-se1200mu
schema_version: ai4av-public-spec-v1
revision: 1
title: "DT Videolabs SE-1200MU Control Spec"
manufacturer: "DT Videolabs"
model_family: SE-1200MU
aliases: []
compatible_with:
  manufacturers:
    - "DT Videolabs"
  models:
    - SE-1200MU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - agneovo.com
  - resource.datavideo.com
  - github.com
  - dtvideolabs.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.dtvideolabs.com/user-guide-playbackproplus
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-05-20T11:47:46.179Z
generated_at: 2026-05-20T11:47:46.179Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:47:46.179Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# DT Videolabs SE-1200MU Control Spec

## Summary
Video switcher with two TCP/IP control channels: Command Protocol (async command-response) and Real-Time Protocol (field-synchronous parameter exchange). Default IP 192.168.100.101. Ports 5001–5008 for 4 controllers; port 5009 for connection request. Over 300 control variables via SET_CONTROL/GET_CONTROL.

<!-- UNRESOLVED: RS-232 serial control not documented -->
<!-- UNRESOLVED: authentication/credentials not stated in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 5002
  base_url: ""  # UNRESOLVED: configurable IP not documented; default 192.168.100.101
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable:    # UNRESOLVED: no explicit power on/off commands in source
routable:       # inferred: PGM_SRC/PST_SRC input routing present
queryable:      # inferred: GET_CONTROL returns variable state
levelable:      # inferred: wipe level, chroma gain, luma controls present
```

## Actions
```yaml
- id: set_control
  label: Set Control Value
  kind: action
  params:
    - name: section
      type: integer
      description: Section number (high 16 bits of Parameter1)
    - name: control
      type: integer
      description: Control number (low 16 bits of Parameter1)
    - name: value
      type: integer
      description: Control value (32-bit)

- id: get_control
  label: Get Control Value
  kind: action
  params:
    - name: section
      type: integer
    - name: control
      type: integer

- id: open_still_file
  label: Open Still File
  kind: action
  params:
    - name: still_num
      type: integer
    - name: mode
      type: integer
      description: "0=Read, 1=Write"

- id: open_mini_pic_file
  label: Open Mini Pic File
  kind: action
  params:
    - name: still_num
      type: integer
    - name: mode
      type: integer

- id: close_data_file
  label: Close Data File
  kind: action
  params: []

- id: get_file_data
  label: Get File Data
  kind: action
  params:
    - name: num_bytes
      type: integer

- id: store_file_data
  label: Store File Data
  kind: action
  params:
    - name: length
      type: integer
    - name: chunk_num
      type: integer
    - name: data
      type: string

- id: get_input_name
  label: Get Input Name
  kind: action
  params:
    - name: input_num
      type: integer

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: input_num
      type: integer
    - name: name
      type: string
      description: Unicode string

- id: get_file_name
  label: Get File Name
  kind: action
  params:
    - name: type
      type: integer
      description: "0=Mem, 1=Still"
    - name: file_num
      type: integer

- id: set_file_name
  label: Set File Name
  kind: action
  params:
    - name: type
      type: integer
    - name: file_num
      type: integer
    - name: name
      type: string

- id: get_user_mem
  label: Get User Memory
  kind: action
  params:
    - name: num
      type: integer

- id: store_user_mem
  label: Store User Memory
  kind: action
  params:
    - name: num
      type: integer
    - name: data
      type: string

- id: streamer_control
  label: Streamer Control
  kind: action
  params:
    - name: command
      type: integer
      description: DV_STREAMER_LAUNCH=0, DV_STREAMER_STOP=1

- id: recorder_control
  label: Recorder Control
  kind: action
  params:
    - name: command
      type: integer

- id: chroma_keyer_auto
  label: Chroma Keyer Auto
  kind: action
  params: []
- id: get_mini_pic
  label: Get Mini Pic
  kind: action
  params:
    - name: num
      type: integer
      description: Mini pic number

- id: open_software_file
  label: Open Software File
  kind: action
  params:
    - name: exe_flag
      type: integer
      description: Flag file as executable
    - name: file_name
      type: string
      description: File name including null terminator

- id: install_software
  label: Install Software
  kind: action
  params: []

- id: open_names_file
  label: Open Names File
  kind: action
  params: []
```

## Feedbacks
```yaml
# Real-Time Protocol sends parameter/value packets unsolicited at field rate
# Command Protocol responds with SET_CONTROL message
- id: connection_status
  type: enum
  values:
    - 0  # no connection
    - 1  # pending
    - 2  # connected
  description: STATUS_SYSTEM_CONNECTION_STATUS

- id: software_version
  type: integer
  description: STATUS_SOFTWARE_VERSION - bits [31:24] major, [23:16] minor, [15:0] build

- id: system_version
  type: integer
  description: STATUS_SYSTEM_VERSION

- id: main_version
  type: integer
  description: STATUS_MAIN_VERSION

- id: fpga_version
  type: integer
  description: STATUS_FPGA_VERSION

- id: bus_tally_pgm
  type: integer
  description: STATUS_TALLY_PGM_SRC - program bus tally source

- id: bus_tally_pst
  type: integer
  description: STATUS_TALLY_PST_SRC - preset bus tally source

- id: bus_tally_key1_fill
  type: integer
- id: bus_tally_key1_key
  type: integer
- id: bus_tally_key2_fill
  type: integer
- id: bus_tally_key2_key
  type: integer
- id: bus_tally_dsk1_fill
  type: integer
- id: bus_tally_dsk1_key
  type: integer
- id: bus_tally_dsk2_fill
  type: integer
- id: bus_tally_dsk2_key
  type: integer
```

## Variables
```yaml
# 13 control sections with 300+ variables; representative subset key ones:
# Section 0 - STATUS (read-only)
- id: status_section_status
  type: section
  description: STATUS section - read-only status variables

# Section 1 - SYSTEM
- id: system_standard
  type: integer
  values: [0, 1, 2, 3, 4, 5]
  description: "0=1080i/60, 1=1080i/59.94, 2=1080i/50, 3=720p/60, 4=720p/59.94, 5=720p/50"

# Section 2 - SWITCHER
- id: switcher_pgm_src
  type: integer
  description: Program source selection (1-4 = inputs; 17=matte; 19=still1; 20=still2)

- id: switcher_pst_src
  type: integer
  description: Preview source selection

- id: switcher_trans_type
  type: integer
  values: [0, 1]
  description: "0=mix, 1=wipe"

- id: switcher_trans_level
  type: float
  description: Transition level 0.0-100.0

- id: switcher_wipe_pattern_num
  type: integer
  range: [1, 32]

- id: switcher_wipe_level
  type: float
  range: [0.0, 100.0]

- id: switcher_key1_keyer_on
  type: flag
- id: switcher_key2_keyer_on
  type: flag
- id: switcher_dsk1_keyer_on
  type: flag
- id: switcher_dsk2_keyer_on
  type: flag

- id: switcher_ftb_level
  type: float
  range: [0.0, 100.0]
  description: Fade-to-black level

# Section 3 - INPUT (per-channel, bits [7:4] select channel)
- id: input_black_level
  type: float
- id: input_chroma_gain
  type: float
  range: [0.0, 16.0]
- id: input_white_clip
  type: float
- id: input_freeze_mode
  type: integer
  values: [0, 1, 2, 3, 4]
  description: "0=live, 1=frozen, 2=still, 3=clip, 4=capture"
```

## Events
```yaml
# Real-Time Protocol: processor unit sends state changes unsolicited at field rate
# Any controller change propagates to all other controllers automatically
# UNRESOLVED: specific event codes not enumerated in source
```

## Macros
```yaml
# Connection request flow:
# 1. Open port 5009
# 2. Send packet size 0x08, command 0x55aa0001
# 3. Receive connection info with free port number (real-time port = returned value, command port = +1)
# UNRESOLVED: explicit multi-step sequences not named as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings not found in source
```

## Notes
- Command protocol: even ports only (5002, 5004, 5006, 5008); do NOT use odd ports with command protocol.
- Real-time protocol requires controller reply to every packet (even null) before next packet is sent.
- First real-time packet from processor contains full machine state; controller must zero-initialize local state before connection.
- IP address is fixed at 192.168.100.101 by default; configurable IP requires host config files not made available to end users.
- Multi-controller: processor auto-broadcasts all state changes to all controllers.
- Software version v1.3.3.x referenced; exact compatibility range not stated.
<!-- UNRESOLVED: baud rate / RS-232 serial — not documented in source -->
<!-- UNRESOLVED: firmware upgrade security — not documented -->

## Provenance

```yaml
source_domains:
  - agneovo.com
  - resource.datavideo.com
  - github.com
  - dtvideolabs.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.dtvideolabs.com/user-guide-playbackproplus
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-05-20T11:47:46.179Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:47:46.179Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
