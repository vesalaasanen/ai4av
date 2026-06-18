---
spec_id: admin/sharp-nec-ea242f-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EA242F BK SV Control Spec"
manufacturer: Sharp/NEC
model_family: "EA242F BK SV"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA242F BK SV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:15:01.934Z
last_checked_at: 2026-06-17T19:46:43.850Z
generated_at: 2026-06-17T19:46:43.850Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is a generic projector command reference and does not explicitly name the \"EA242F BK SV\" model. Model name in compatible_with is taken from the ingest request, not from a verbatim statement in the source. Confirm the device actually implements this command set before publishing."
  - "firmware version compatibility not stated in source"
  - "ID2 (model code) value not enumerated in source — varies by model"
  - "input-terminal value table (DATA01 of command 018, etc.) is referenced as \"Supplementary Information by Command\" appendix, which is not present in the refined source excerpt"
  - "source does not state a single default baud rate; populated with highest option"
  - "flow_control not stated in source (full-duplex communication mode stated)"
  - "complete per-command success-ACK payloads for queries (037, 053-1, 060-1,"
  - "no async event mechanism described in source."
  - "source documents no multi-step command sequences as named macros."
  - "source describes no electrical safety interlocks, power-on sequencing"
  - "input-terminal value table (referenced by Appendix \"Supplementary Information by Command\" for commands 018, 030-12, 098-198 sub-input, 319-10) not present in refined source."
  - "base-model-type code table (305-1, 078-1) referenced but absent from refined source."
  - "eco-mode value table (097-8 / 098-8) referenced but absent."
  - "aspect value table (030-12) referenced but absent."
  - "complete serial flow_control setting not stated (only \"Full duplex\" communication mode stated)."
  - "serial default baud rate not stated; five options listed (115200/38400/19200/9600/4800)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:46:43.850Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified as literal hex-command matches against source; transport parameters all supported. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC EA242F BK SV Control Spec

## Summary
RS-232C and TCP (wired/wireless LAN) control spec for a Sharp/NEC projector, derived from the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Commands are binary frames with a leading header byte, model/control ID, length, data payload, and a checksum byte (low-order 8 bits of the sum of preceding bytes).

<!-- UNRESOLVED: The source document is a generic projector command reference and does not explicitly name the "EA242F BK SV" model. Model name in compatible_with is taken from the ingest request, not from a verbatim statement in the source. Confirm the device actually implements this command set before publishing. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 (model code) value not enumerated in source — varies by model -->
<!-- UNRESOLVED: input-terminal value table (DATA01 of command 018, etc.) is referenced as "Supplementary Information by Command" appendix, which is not present in the refined source excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; one value shown, others valid
  # UNRESOLVED: source does not state a single default baud rate; populated with highest option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated in source (full-duplex communication mode stated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous REQUEST commands
  - levelable    # inferred from PICTURE/VOLUME/LAMP adjust commands
  - routable     # inferred from INPUT SW CHANGE and audio select
```

## Actions
```yaml
# Frame format: <HEADER> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model, UNRESOLVED).
# CKS = checksum = low-order byte of sum of all preceding bytes.
# Commands below show the literal request payloads from the source verbatim, with
# parameter placeholders (<DATA...>, <ID1>, <ID2>, <CKS>) preserved as written.

- id: cmd_009_error_status_request
  label: 009 Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: 015 Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: cmd_016_power_off
  label: 016 Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: 018 Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command"; e.g. 06h = video port)

- id: cmd_020_picture_mute_on
  label: 020 Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: 021 Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: 022 Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: 023 Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: 024 Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: 025 Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: 030-1 Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_030_2_volume_adjust
  label: 030-2 Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_030_12_aspect_adjust
  label: 030-12 Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: cmd_030_15_other_adjust
  label: 030-15 Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh when DATA01=96h)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: 037 Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: 037-3 Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: 037-4 Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h=usage time seconds, 04h=remaining life %)

- id: cmd_037_6_carbon_savings_information_request
  label: 037-6 Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Content (00h=Total Carbon Savings, 01h=Carbon Savings during operation)

- id: cmd_050_remote_key_code
  label: 050 Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (see Key code list in source, e.g. 02h=POWER ON, 05h=AUTO, 0Bh=ENTER)
    - name: DATA02
      type: integer
      description: Key code high byte (always 00h in listed codes)

- id: cmd_051_shutter_close
  label: 051 Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: 052 Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: 053 Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (06h = Periphery Focus)
    - name: DATA02
      type: integer
      description: Drive command (00h=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s)

- id: cmd_053_1_lens_control_request
  label: 053-1 Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (same codes as cmd_053 DATA01)

- id: cmd_053_2_lens_control_2
  label: 053-2 Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (FFh=Stop; otherwise same target codes)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_053_3_lens_memory_control
  label: 053-3 Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: cmd_053_4_reference_lens_memory_control
  label: 053-4 Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: cmd_053_5_lens_memory_option_request
  label: 053-5 Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: cmd_053_6_lens_memory_option_set
  label: 053-6 Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: cmd_053_7_lens_information_request
  label: 053-7 Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: 053-10 Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

- id: cmd_053_11_lens_profile_request
  label: 053-11 Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: 060-1 Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust)

- id: cmd_078_1_setting_request
  label: 078-1 Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: 078-2 Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: 078-3 Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: 078-4 Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: 078-5 Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: 078-6 Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: 079 Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Freeze state (01h=ON, 02h=OFF)

- id: cmd_084_information_string_request
  label: 084 Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

- id: cmd_097_8_eco_mode_request
  label: 097-8 Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: 097-45 LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: 097-155 LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: 097-198 PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

- id: cmd_097_243_1_edge_blending_mode_request
  label: 097-243-1 Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: 098-8 Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: cmd_098_45_lan_projector_name_set
  label: 098-45 LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_to_DATA16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: cmd_098_198_pip_picture_by_picture_set
  label: 098-198 PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (e.g. MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input values per appendix)

- id: cmd_098_243_1_edge_blending_mode_set
  label: 098-243-1 Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: cmd_305_1_base_model_type_request
  label: 305-1 Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: 305-2 Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: 305-3 Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: 319-10 Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
# Generic response framing (applies to every action above):
#   Success (no data):   <2xh> <MT> <ID1> <ID2> <LEN=00h> <CKS>
#   Success (with data): <2xh> <MT> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure:             <Axh> <MT> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# where MT = message-type byte mirrored from the request, and x = request header nibble.
# Per-command ACK payloads are listed verbatim in the source; representative samples:

- id: ack_009_error_status
  type: binary
  values: ["A0h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"]
  notes: DATA01-DATA12 bitfield error info; bit=0 normal, bit=1 error.

- id: ack_015_power_on
  type: binary
  values: ["22h 00h <ID1> <ID2> 00h <CKS>"]

- id: ack_016_power_off
  type: binary
  values: ["22h 01h <ID1> <ID2> 00h <CKS>"]

- id: ack_018_input_sw_change
  type: binary
  values: ["22h 03h <ID1> <ID2> 01h <DATA01> <CKS>", "FFh on error (no switch made)"]

- id: ack_030_1_picture_adjust
  type: binary
  values: ["23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"]

- id: ack_050_remote_key_code
  type: binary
  values: ["22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>", "FFh on error"]

- id: ack_053_lens_control
  type: binary
  values: ["22h 18h <ID1> <ID2> 01h <DATA01> <CKS>", "FFh on error"]

- id: ack_053_3_lens_memory_control
  type: binary
  values: ["22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>", "FFh on error"]

- id: ack_079_freeze_control
  type: binary
  values: ["21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"]

- id: ack_098_8_eco_mode_set
  type: binary
  values: ["23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"]

- id: ack_098_198_pip_picture_by_picture_set
  type: binary
  values: ["23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"]

- id: ack_098_243_1_edge_blending_mode_set
  type: binary
  values: ["23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"]

- id: ack_319_10_audio_select_set
  type: binary
  values: ["23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS> (00h=success, 01h=error)"]

- id: error_response_generic
  type: binary
  values: ["<Axh> <MT> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"]
  notes: |
    ERR1/ERR2 code pairs (source §2.4):
      00h/00h=unrecognized cmd; 00h/01h=cmd not supported by model;
      01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language;
      02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set;
      02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal;
      02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory op error;
      02h/0Ch=entry list displayed; 02h/0Dh=command rejected (power off);
      02h/0Eh=execution failed; 02h/0Fh=no authority;
      03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
# UNRESOLVED: complete per-command success-ACK payloads for queries (037, 053-1, 060-1,
# 078-*, 084, 097-*, 305-*) are documented in source §3 and reproduced in the command
# `command:` field above; only representative ACKs are duplicated here.
```

## Variables
```yaml
# Query-return parameters (state values the device reports, not directly set).
# Each corresponds to a `kind: query` action's response DATA fields.

- id: var_power_status
  type: enum
  source: 078-2 DATA03 / 305-3 DATA01
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]

- id: var_operation_status
  type: enum
  source: 078-2 DATA06
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: var_cooling_process
  type: enum
  source: 078-2 DATA04
  values: [not_executed, during_execution, not_supported]

- id: var_power_on_off_process
  type: enum
  source: 078-2 DATA05
  values: [not_executed, during_execution, not_supported]

- id: var_picture_mute
  type: enum
  source: 078-4 DATA01 / 305-3 DATA06
  values: [off, on]

- id: var_sound_mute
  type: enum
  source: 078-4 DATA02 / 305-3 DATA07
  values: [off, on]

- id: var_onscreen_mute
  type: enum
  source: 078-4 DATA03 / 305-3 DATA08
  values: [off, on]

- id: var_forced_onscreen_mute
  type: enum
  source: 078-4 DATA04
  values: [off, on]

- id: var_freeze_status
  type: enum
  source: 305-3 DATA09
  values: [off, on]

- id: var_cover_status
  type: enum
  source: 078-6 DATA01
  values: [normal_opened, closed]

- id: var_selection_signal_type_2
  type: enum
  source: 078-3 DATA04 / 305-3 DATA04
  values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer_1_5, viewer_6_10, not_source_input]

- id: var_content_displayed
  type: enum
  source: 078-3 DATA09 / 305-3 DATA02
  values: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_switching]

- id: var_lens_operation
  type: bitfield
  source: 053-7 DATA01
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]

- id: var_lamp_usage_time_seconds
  type: integer
  source: 037 DATA83-86 / 037-4 DATA03-06

- id: var_filter_usage_time_seconds
  type: integer
  source: 037 DATA87-90 / 037-3 DATA01-04

- id: var_filter_alarm_start_time_seconds
  type: integer
  source: 037-3 DATA05-08

- id: var_lamp_remaining_life_pct
  type: integer
  source: 037-4 (DATA02=04h) DATA03-06

- id: var_carbon_savings_kg
  type: number
  source: 037-6 DATA02-05

- id: var_model_name
  type: string
  source: 078-5 DATA01-32

- id: var_projector_name
  type: string
  source: 097-45 DATA01-17

- id: var_mac_address
  type: string
  source: 097-155 DATA01-06

- id: var_serial_number
  type: string
  source: 305-2 DATA01-16

- id: var_base_model_type
  type: binary
  source: 305-1 DATA01-02 / DATA12-13

- id: var_horizontal_sync_frequency
  type: string
  source: 084 (DATA01=03h) DATA03-??

- id: var_vertical_sync_frequency
  type: string
  source: 084 (DATA01=04h) DATA03-??

- id: var_sound_function_available
  type: enum
  source: 078-1 DATA04
  values: [not_available, available]

- id: var_lens_memory_option_load_by_signal
  type: enum
  source: 053-5/053-6 (DATA01=00h) DATA02
  values: [off, on]

- id: var_lens_memory_option_forced_mute
  type: enum
  source: 053-5/053-6 (DATA01=01h) DATA02
  values: [off, on]

- id: var_lens_profile
  type: enum
  source: 053-10/053-11 DATA01
  values: [profile_1, profile_2]

- id: var_eco_mode
  type: integer
  source: 097-8/098-8 DATA01
  notes: meaning varies by model (Light mode / Lamp mode); see Appendix "Supplementary Information by Command"

- id: var_edge_blending_mode
  type: enum
  source: 097-243-1/098-243-1 DATA01
  values: [off, on]

- id: var_pip_pbp_mode
  type: enum
  source: 097-198/098-198 (DATA01=00h) DATA02
  values: [pip, picture_by_picture]

- id: var_pip_pbp_start_position
  type: enum
  source: 097-198/098-198 (DATA01=01h) DATA02
  values: [top_left, top_right, bottom_left, bottom_right]

- id: var_gain_adjustment_status
  type: enum
  source: 060-1 DATA01
  values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_does_not_exist]
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited ACKs to
# commands listed in Actions/Feedbacks.
# UNRESOLVED: no async event mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences as named macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: While POWER ON is executing, no other command can be accepted (source §3.2).
  - id: power_off_lockout
    description: While POWER OFF is executing (including cooling time), no other command can be accepted (source §3.3).
  - id: error_02_0d_power_off
    description: Commands are rejected with ERR1=02h/ERR2=0Dh when power is off.
  - id: error_02_0f_no_authority
    description: Operations without required authority fail with ERR1=02h/ERR2=0Fh.
# UNRESOLVED: source describes no electrical safety interlocks, power-on sequencing
# procedures, or mandatory operator confirmation steps beyond the lockouts above.
```

## Notes
- Source is the Sharp/NEC "Projector Control Command Reference Manual", document BDT140013 Revision 7.1. It is a generic projector-family manual; the EA242F BK SV is named only in the ingest request, not in the source body.
- All commands are binary frames over RS-232C (D-SUB 9P, cross cable) or TCP port 7142 (wired/wireless LAN). Full-duplex.
- Checksum = low-order byte of the unsigned sum of all preceding bytes (source §2.2 worked example: 20h+81h+01h+60h+01h+00h=103h → CKS=03h).
- ID1 is the projector's configured control ID; ID2 is the per-model code. Neither is enumerated for the EA242F BK SV in this source.
- Lamp/filter usage times update at 1-minute granularity despite 1-second resolution (source §3.15, §3.17).
- Negative lamp remaining-life % is returned once the replacement deadline is exceeded (source §3.17).
- PICTURE/SOUND/ONSCREEN mute auto-clear on input terminal switch or video signal switch (source §3.5, §3.7, §3.9); SOUND mute also clears on volume adjustment.
- Lens control continuous-drive values (7Fh / 81h) require a follow-up 00h stop command (source §3.22).

<!-- UNRESOLVED: input-terminal value table (referenced by Appendix "Supplementary Information by Command" for commands 018, 030-12, 098-198 sub-input, 319-10) not present in refined source. -->
<!-- UNRESOLVED: base-model-type code table (305-1, 078-1) referenced but absent from refined source. -->
<!-- UNRESOLVED: eco-mode value table (097-8 / 098-8) referenced but absent. -->
<!-- UNRESOLVED: aspect value table (030-12) referenced but absent. -->
<!-- UNRESOLVED: complete serial flow_control setting not stated (only "Full duplex" communication mode stated). -->
<!-- UNRESOLVED: serial default baud rate not stated; five options listed (115200/38400/19200/9600/4800). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:15:01.934Z
last_checked_at: 2026-06-17T19:46:43.850Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:46:43.850Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified as literal hex-command matches against source; transport parameters all supported. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is a generic projector command reference and does not explicitly name the \"EA242F BK SV\" model. Model name in compatible_with is taken from the ingest request, not from a verbatim statement in the source. Confirm the device actually implements this command set before publishing."
- "firmware version compatibility not stated in source"
- "ID2 (model code) value not enumerated in source — varies by model"
- "input-terminal value table (DATA01 of command 018, etc.) is referenced as \"Supplementary Information by Command\" appendix, which is not present in the refined source excerpt"
- "source does not state a single default baud rate; populated with highest option"
- "flow_control not stated in source (full-duplex communication mode stated)"
- "complete per-command success-ACK payloads for queries (037, 053-1, 060-1,"
- "no async event mechanism described in source."
- "source documents no multi-step command sequences as named macros."
- "source describes no electrical safety interlocks, power-on sequencing"
- "input-terminal value table (referenced by Appendix \"Supplementary Information by Command\" for commands 018, 030-12, 098-198 sub-input, 319-10) not present in refined source."
- "base-model-type code table (305-1, 078-1) referenced but absent from refined source."
- "eco-mode value table (097-8 / 098-8) referenced but absent."
- "aspect value table (030-12) referenced but absent."
- "complete serial flow_control setting not stated (only \"Full duplex\" communication mode stated)."
- "serial default baud rate not stated; five options listed (115200/38400/19200/9600/4800)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
