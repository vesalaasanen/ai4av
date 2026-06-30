---
spec_id: admin/theatrixx-vio-4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Theatrixx VIO 4K Control Spec"
manufacturer: Theatrixx
model_family: "VIO 4K (Ref. V701)"
aliases: []
compatible_with:
  manufacturers:
    - Theatrixx
  models:
    - "VIO 4K (Ref. V701)"
  firmware: v02.00.7X
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
  - analogway.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/VIO+4K/Programmer's+Guide/vio4k_tpp_programmers-guide_for-v02-00-7x.pdf"
  - https://www.analogway.com/products/vio-4k/
retrieved_at: 2026-06-30T05:31:10.822Z
last_checked_at: 2026-06-30T07:14:28.669Z
generated_at: 2026-06-30T07:14:28.669Z
firmware_coverage: v02.00.7X
protocol_coverage: []
known_gaps:
  - "Full register catalogue (value ranges, enumerations, pattern sub-options) lives in external \"VIO4K_TPP_variables_for_v02-00-7X.xls\", which is referenced but not included in the source text. Pattern-specific configuration registers (COLOR RGB, GRID CUSTOM size/bg/thickness/ID, CROSSHATCH size, CHECKERBOARD square size/start color) are named but their exact register mnemonics/values are not in the source."
  - "http port not stated in source (do not assume 80)"
  - "source states range 1200-115200 baud, no single default; configurable via front panel / Web RCS"
  - "pattern-specific configuration registers (COLOR RGB value, GRID CUSTOM"
  - "full register value ranges / enumerations / pattern sub-option registers require the external \"VIO4K_TPP_variables_for_v02-00-7X.xls\" referenced but not provided in source."
  - "HTTP snapshot port not stated in source (do not assume 80)."
  - "exact read syntax for device-type query garbled in extracted source; reconstructed from documented protocol read-structure + answer \"DEV<value>\"."
  - "default serial baud rate not stated (only the configurable range 1200–115200)."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:14:28.669Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match wire-level commands in source; transport parameters (TCP port 10600, RS-232 1200-115200 baud, HTTP URLs) confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Theatrixx VIO 4K Control Spec

## Summary
The VIO 4K (Ref. V701, firmware v02.00.7X) is a 4K multilayer image processor / seamless switcher controllable via the TPP (Third Party Protocol) register-based interface over TCP/IP (default port 10600), RS-232, and HTTP (live snapshot retrieval). This spec covers the TPP command set documented in the official TPP Programmer's Guide: connection handling, power/standby/reboot control, preset and view recall, layer source routing, test patterns, and live snapshot URLs.

<!-- UNRESOLVED: Full register catalogue (value ranges, enumerations, pattern sub-options) lives in external "VIO4K_TPP_variables_for_v02-00-7X.xls", which is referenced but not included in the source text. Pattern-specific configuration registers (COLOR RGB, GRID CUSTOM size/bg/thickness/ID, CROSSHATCH size, CHECKERBOARD square size/start color) are named but their exact register mnemonics/values are not in the source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
# --- TCP (primary control: TPP) ---
addressing:
  port: 10600  # default TPP port, stated in source
  base_url: "http://<machine_ip>"  # used for HTTP snapshot retrieval; IP via DHCP (client: yes)
# HTTP snapshot port not stated in source
# port (http): null  # UNRESOLVED: http port not stated in source (do not assume 80)
# --- RS-232 (secondary control) ---
serial:
  baud_rate: null  # UNRESOLVED: source states range 1200-115200 baud, no single default; configurable via front panel / Web RCS
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# --- Auth ---
auth:
  type: none  # inferred: no auth procedure in source
# Notes:
# - Ethernet RJ45, 10/100 Mbps, auto-MDIX.
# - TCP TPP server accepts at most 5 clients simultaneously.
# - DHCP client enabled by default.
# - All TPP commands are displayable ASCII (0x21-0x7E) terminated with LF (0x0A).
# - Device answers end with CR LF (0x0D 0x0A).
```

## Traits
```yaml
- powerable   # inferred: power off / standby / wake / reboot commands present (SBreq, SBreb)
- queryable   # inferred: read commands return register values (DEV, TPver, TPcon, #, etc.)
- routable    # inferred: layer source change + preset/view recall commands present (PRinp, PKrcr, PBrcr, PBirr)
```

## Actions
```yaml
# All commands terminated with LF (0x0A). Device answers end with CR LF (0x0D 0x0A).
# Write command = [indexes,] value, registername ; Read command = [indexes,] registername (value omitted).

# --- Connection / system ---
- id: device_type_query
  label: Device Type Query
  kind: query
  command: "DEV"
  params: []
  notes: "Answer DEV<value>CRLF. Value 1024 = VIO 4K. Other values = other Analog Way devices."

- id: command_set_version_query
  label: Command Set Version Query
  kind: query
  command: "TPver"
  params: []
  notes: "Answer TPver<value>CRLF. Current value is 1 for firmware v02.00.7X."

- id: tpp_client_count_query
  label: TPP Connected Clients Query
  kind: query
  command: "TPcon"
  params: []
  notes: "Answer TPcon<value>CRLF. <value> = number of connected controllers (0-5). Register COMM_TPP_NB_OF_CLIENTS."

- id: diese_status_query
  label: DIESE Enumeration Status Query
  kind: query
  command: "#"
  params: []
  notes: "Answer #<value>CRLF. Wait until value == 0 (no enumeration running) before starting one."

- id: diese_enumerate_all
  label: DIESE Enumerate All Registers
  kind: action
  command: "1#"
  params: []
  notes: "Enumerates ALL register values for all indexes. Produces a huge amount of data. Completes when DIESE auto-returns to 0 (#0CRLF)."

- id: diese_enumerate_non_default
  label: DIESE Enumerate Non-Default Registers
  kind: action
  command: "3#"
  params: []
  notes: "Same as enumerate-all but skips registers at their default value, reducing data volume. Completes on #0CRLF."

- id: ping_keepalive
  label: Keepalive Ping
  kind: action
  command: "{val1}SYpig"
  params:
    - name: val1
      type: integer
      description: "Any numerical value; device returns it binary-inverted (32-bit)."
  notes: "Answer SYpig<val2>CRLF where val2 = bitwise NOT of val1 (e.g. 0→4294967295, 1→4294967294, 170→4294967125). Send only when idle."

# --- Power / standby / reboot (SBreb, SBreq) ---
- id: reboot_device
  label: Reboot Device
  kind: action
  command: "1SBreb"
  params: []
  notes: "Restarts the device (writes value 1 to SBreb)."

- id: power_off
  label: Power Off
  kind: action
  command: "2SBreq"
  params: []
  notes: "Shuts down and powers off the device (writes value 2 to SBreq). Manual restart required."

- id: standby
  label: Standby
  kind: action
  command: "1SBreq"
  params: []
  notes: "Puts device on standby (writes value 1 to SBreq)."

- id: wake_up
  label: Wake Up
  kind: action
  command: "0SBreq"
  params: []
  notes: "Wakes device from standby (writes value 0 to SBreq)."

# --- Commutation mode (PCpum, PCrpr) ---
- id: commutation_mode_manual
  label: Select Manual Commutation Mode
  kind: action
  command: "0PCpum"
  params: []
  notes: "Disables automatic commutation (writes value 0). Commits only on commutation_apply."

- id: commutation_mode_auto
  label: Select Auto-Apply Commutation Mode
  kind: action
  command: "1PCpum"
  params: []
  notes: "Enables automatic commutation (writes value 1). Commands applied immediately."

- id: commutation_apply
  label: Apply Pending Commutation (Manual Mode)
  kind: action
  command: "1PCrpr"
  params: []
  notes: "Applies previously sent commutation commands. Answer sequence: 0PRrprCRLF, CIava0CRLF, CIava1CRLF. CIava 0 = commutation running, 1 = finished."

# --- Preset recall (PKrcr) ---
- id: preset_recall
  label: Recall Preset From Memory
  kind: action
  command: "{bank},1PKrcr"
  params:
    - name: bank
      type: integer
      description: "Memory index, 0-15 (16 memories)."
  notes: "Register PRESET_BANK_RECALL_REQUEST. In auto-apply mode applies with transition immediately; in manual mode waits for commutation_apply."

# --- Layer source change (PRinp / PE_INPUTNUM) ---
- id: layer_source_change
  label: Change Layer Source
  kind: action
  command: "{source} PRinp"
  params:
    - name: source
      type: integer
      description: "Source key: 0 = none, 1-9 = source key (e.g. 3 = HD15 input)."
  notes: "Register PE_INPUTNUM. Answer PRinp<source>CRLF."

# --- View recall (PBrcr, PBirr) ---
- id: view_recall_to_input
  label: Recall View To Specific Input
  kind: action
  command: "{bank},{screen},{input},1PBrcr"
  params:
    - name: bank
      type: integer
      description: "Memory index, 0-63 (64 memories)."
    - name: screen
      type: integer
      description: "Destination screen index, 0-5 (6 screens)."
    - name: input
      type: integer
      description: "Source index, 0-8 (9 inputs)."
  notes: "Register PRESET_VIEW_BANK_RECALL_REQUEST. Auto-apply: applied without transition; manual: applied with transition on commutation_apply."

- id: view_recall_to_active_input
  label: Recall View To Active Input
  kind: action
  command: "{bank},{screen},1PBirr"
  params:
    - name: bank
      type: integer
      description: "Memory index, 0-63 (64 memories)."
    - name: screen
      type: integer
      description: "Destination screen index, 0-5 (6 screens)."
  notes: "Register PRESET_VIEW_BANK_ACTIVE_RECALL_REQUEST. Loads view to the currently active input."

# --- Test patterns (output-indexed, output 0-5) ---
- id: pattern_enable
  label: Enable/Disable Pattern
  kind: action
  command: "{output},{value}OUpin"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5 (6 outputs)."
    - name: value
      type: integer
      description: "0 = enable pattern, 1 = disable pattern."
  notes: "Source documents enable as writing 0 and disable as writing 1."

- id: raster_box_format_toggle
  label: Show Raster Box On Format
  kind: action
  command: "{output},{value}OUpct"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "1 = enable format edge view, 0 = disable."
  notes: "Shows edge of the output format."

- id: raster_box_aoi_toggle
  label: Show Raster Box On AOI
  kind: action
  command: "{output},{value}OUact"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "1 = enable area-of-interest edge view, 0 = disable."
  notes: "Shows edge of the area of interest."

- id: pattern_fit_area_select
  label: Select Pattern Fit Area
  kind: action
  command: "{output},{value}OUfai"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "0 = fit on full format area, 1 = fit on defined area of interest."
  notes: "Defines whether pattern is shown on format area or AOI."

- id: pattern_select
  label: Select Pattern
  kind: action
  command: "{output},{value}OUpat"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "Pattern index: 0 = none, 1-15 = pattern keys."
  notes: "Selects the active test pattern."

- id: pattern_colorimetry_disable
  label: Disable Pattern Colorimetry Settings
  kind: action
  command: "{output},{value}OUpdc"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "1 = disable colorimetry settings, 0 = enable."
  notes: "Applicable to all patterns except COLOR and CHECKERBOARD (which keep colorimetry)."

- id: pattern_moving_option
  label: Pattern Moving Option
  kind: action
  command: "{output},{value}OUmov"
  params:
    - name: output
      type: integer
      description: "Destination output index, 0-5."
    - name: value
      type: integer
      description: "1 = enable motion, 0 = disable."
  notes: "Enables pattern motion (most patterns support it)."

# --- HTTP live snapshots (read-only image retrieval) ---
- id: live_input_snapshot
  label: Get Live Input Snapshot
  kind: query
  command: "GET http://<machine_ip>/LIVE_SNAPSHOT/SNAP_INPUT_{n}.png"
  params:
    - name: n
      type: integer
      description: "Input snapshot index; SNAP_INPUT_1 .. SNAP_INPUT_OPT_2."
  notes: "PNG, refreshed regularly. Max ~256×256px. Request rate ≤ 1/sec."

- id: live_output_snapshot
  label: Get Live Output Snapshot
  kind: query
  command: "GET http://<machine_ip>/LIVE_SNAPSHOT/SNAP_OUTPUT_{name}.png"
  params:
    - name: name
      type: string
      description: "Output snapshot name, e.g. MAIN."
  notes: "PNG, refreshed regularly. Max ~512×512px. Request rate ≤ 1/sec."

- id: frame_library_thumbnail
  label: Get Frame Library Thumbnail
  kind: query
  command: "GET http://<machine_ip>/FRAMELIB_THUMBNAIL/STILL_LIBRARY_{n}.png"
  params:
    - name: n
      type: integer
      description: "Frame index, 1-50."
  notes: "PNG, refreshed only on change. Request rate ≤ 1/sec."
```

## Feedbacks
```yaml
- id: device_type
  type: enum
  values: [1024]  # 1024 = VIO 4K; other values = other Analog Way devices (not enumerated in source)
  notes: "From DEV query. Register DEV."

- id: command_set_version
  type: integer
  values: [1]
  notes: "Current value 1 for firmware v02.00.7X. From TPver query."

- id: tpp_client_count
  type: integer
  values: "0-5"
  notes: "Connected TPP controllers. From TPcon query / unsolicited notification. Register COMM_TPP_NB_OF_CLIENTS."

- id: diese_status
  type: enum
  values: [0, 1, 3]
  notes: "0 = idle, 1 = enumerating all, 3 = enumerating non-default. From # query."

- id: commutation_ava
  type: enum
  values: [0, 1]
  notes: "0 = commutation running, 1 = commutation finished. Register COMMUTATION_AVA, code CIava."

- id: layer_source
  type: integer
  values: "0-9"
  notes: "Current layer source: 0 = none, 1-9 = source key. From PRinp query."
```

## Variables
```yaml
# UNRESOLVED: pattern-specific configuration registers (COLOR RGB value, GRID CUSTOM
# size/background/thickness/block-ID, CROSSHATCH size, CHECKERBOARD square size /
# start color) are named in the source but their exact mnemonics and value layouts
# are defined in the external "VIO4K_TPP_variables_for_v02-00-7X.xls" document,
# which is not part of the provided source text. Populate after obtaining that file.
```

## Events
```yaml
- id: tpp_client_count_notification
  description: "Unsolicited TPcon<value>CRLF sent when a TCP connection is established (and on client-count changes). <value> = number of connected controllers."
  payload: "TPcon<value>"

- id: diese_enumeration_complete
  description: "Sent when a DIESE enumeration finishes; DIESE register auto-returns to 0."
  payload: "#0"
```

## Macros
```yaml
- id: establish_connection
  description: "Recommended connection sequence (source §3.1)."
  steps:
    - "Open TCP socket to TPP port 10600; device sends TPcon<value>CRLF on connect."
    - "Device type check: send DEV; confirm answer 1024 (VIO 4K)."
    - "Command set version check: send TPver; confirm value matches controller (1 for v02.00.7X)."
    - "Registers read-back: send 3# (non-default enumeration) or read needed registers individually; wait for #0."

- id: manual_commutation_sequence
  description: "Manual commutation macro (source §3.4). WARNING: unsafe with multiple simultaneous controllers."
  steps:
    - "Select manual mode: send 0PCpum."
    - "Queue commutation commands (preset/view/source recall)."
    - "Apply: send 1PCrpr; wait for CIava1 (commutation finished)."
```

## Safety
```yaml
confirmation_required_for:
  - power_off        # requires manual restart after shutdown
  - reboot_device    # restarts the device
  - standby          # blanks output until wake_up
interlocks:
  - "RS-232 enabled alongside low baud rate slows down device operations (source warning §2.2)."
  - "Manual commutation mode with multiple controllers causes unpredictable results / command intermixing (source warning §3.4). Use a single controller in manual mode."
  - "Live snapshot request rate must not exceed 1 per second (source §3.9)."
  - "TPP server limited to 5 simultaneous TCP clients (source §2.3)."
# No hardware interlock / power-on sequencing procedure stated in source beyond the above warnings.
```

## Notes
- TPP = Third Party Protocol. The device is a register-based state machine: writing registers changes state, reading registers reports current state. Write and read share one syntax; a write is distinguished only by the presence of a value before the register name.
- Command grammar: `[idx1,[idx2,[idx3,]]][value,]REGNAME LF`. Register names are ≤5 letters (3 single-letter exceptions, e.g. `#`/DIESE). Reads omit the value field. Index counts range 0–3 depending on register.
- Answers mirror the command: `REGNAME[idx,][value] CR LF`. Errors: `E10` register-name error, `E11` index out of range, `E12` wrong index count, `E13` value out of range — each terminated with CR LF.
- Command processing is asynchronous; answer delay is not constant/predictable, but multiple commands may be sent in advance. Best practice: check acknowledgements before sending the next command block.
- String values are quoted (`"..."`); embedded quotes escaped as `\"`, literal backslash as `\\`.
- Descriptive register names referenced in §3.4 map to TPP mnemonics: PE_INPUTNUM → `PRinp`, PRESET_BANK_RECALL_REQUEST → `PKrcr`, PRESET_VIEW_BANK_RECALL_REQUEST → `PBrcr`, PRESET_VIEW_BANK_ACTIVE_RECALL_REQUEST → `PBirr`.
- Index ranges: preset banks 0–15; view banks 0–63; screens/outputs 0–5; inputs 0–8; pattern keys 1–15.

<!-- UNRESOLVED: full register value ranges / enumerations / pattern sub-option registers require the external "VIO4K_TPP_variables_for_v02-00-7X.xls" referenced but not provided in source. -->
<!-- UNRESOLVED: HTTP snapshot port not stated in source (do not assume 80). -->
<!-- UNRESOLVED: exact read syntax for device-type query garbled in extracted source; reconstructed from documented protocol read-structure + answer "DEV<value>". -->
<!-- UNRESOLVED: default serial baud rate not stated (only the configurable range 1200–115200). -->

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
  - analogway.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/VIO+4K/Programmer's+Guide/vio4k_tpp_programmers-guide_for-v02-00-7x.pdf"
  - https://www.analogway.com/products/vio-4k/
retrieved_at: 2026-06-30T05:31:10.822Z
last_checked_at: 2026-06-30T07:14:28.669Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:14:28.669Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match wire-level commands in source; transport parameters (TCP port 10600, RS-232 1200-115200 baud, HTTP URLs) confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Full register catalogue (value ranges, enumerations, pattern sub-options) lives in external \"VIO4K_TPP_variables_for_v02-00-7X.xls\", which is referenced but not included in the source text. Pattern-specific configuration registers (COLOR RGB, GRID CUSTOM size/bg/thickness/ID, CROSSHATCH size, CHECKERBOARD square size/start color) are named but their exact register mnemonics/values are not in the source."
- "http port not stated in source (do not assume 80)"
- "source states range 1200-115200 baud, no single default; configurable via front panel / Web RCS"
- "pattern-specific configuration registers (COLOR RGB value, GRID CUSTOM"
- "full register value ranges / enumerations / pattern sub-option registers require the external \"VIO4K_TPP_variables_for_v02-00-7X.xls\" referenced but not provided in source."
- "HTTP snapshot port not stated in source (do not assume 80)."
- "exact read syntax for device-type query garbled in extracted source; reconstructed from documented protocol read-structure + answer \"DEV<value>\"."
- "default serial baud rate not stated (only the configurable range 1200–115200)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
