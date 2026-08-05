---
spec_id: admin/viewsonic-ls700
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic LS700 Control Spec"
manufacturer: ViewSonic
model_family: LS700HD
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - LS700HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
  - manuals.viewsonic.com
  - manuals.plus
  - projector-database.com
  - manualowl.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/Projector/LS700HD/LS700HD_UG_ENG.pdf
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://manuals.plus/m/0acef2dd3c8a812de94b9dd79be0012d5e433ee90d8a7b770dd8f1b4783fb15a.pdf
  - https://www.projector-database.com/pdf/viewsonicls7004k-qs.pdf
  - https://www.manualowl.com/m/ViewSonic/LS700-4K/Manual/604053
retrieved_at: 2026-07-21T23:12:14.291Z
last_checked_at: 2026-07-22T07:56:24.874Z
generated_at: 2026-07-22T07:56:24.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN/Crestron/PJLink/SNMP/AMX/Xpanel byte-level protocols not documented in source — only port 41794 + IPID 02 are stated."
  - "Other LS700 family variants (LS700-4K VS17455, LS700-4KP) share the RS232 table per recovery notes but not stated in this refined source."
  - "Firmware version compatibility not stated."
  - "Source row 4 references \"Note 7\" but source only contains Notes 1–6."
  - "TCP command payload format for Crestron e-Control not byte-documented."
  - "PJLink / SNMP v1 / AMX DDG / Xpanel protocols mentioned but not documented."
  - "Web admin (HTTP root path) default password \"0000\" stated - affects"
  - "per-setting Read-value response byte encodings reference"
  - "2-byte value mapping table 3.2.2 not in this excerpt."
  - "source does not document unsolicited notifications over RS-232."
  - "source documents no multi-step command sequences."
  - "no formal hardware interlocks or power-sequencing requirements stated."
  - "exact checksum algorithm not documented in this excerpt."
  - "1-byte and 2-byte value mapping tables (source sections 3.2.1 / 3.2.2) referenced by queries but not present in this refined excerpt."
  - "volume \"Write Value\" (row 117) value-byte position not separately specified."
  - "Crestron e-Control / PJLink / SNMP / AMX / Xpanel / web-admin byte-level protocols out of scope (only port 41794 + IPID 02 + web password stated)."
  - "firmware version compatibility not stated."
  - "source row 4 references \"Note 7\" but source contains only Notes 1-6."
  - "other LS700 family models (LS700-4K, LS700-4KP) not explicitly stated in this excerpt; cross-model applicability inferred only from recovery notes."
  - "IR NEC carrier frequency, repeat-frame behavior, and timing not documented in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:56:24.874Z
  matched_actions: 230
  action_count: 230
  confidence: medium
  summary: "All 230 spec actions verified against 194 RS-232 commands + 28 IR buttons + 8 IR address codes in source; exact wire-level match on all hex sequences and transport parameters. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# ViewSonic LS700 Control Spec

## Summary
ViewSonic LS700HD (VS17454) laser projector, controlled via RS-232 binary protocol and infrared (NEC-format IR). The source documents the full RS-232 command catalogue (194 numbered rows) covering power, source selection, picture adjustments, geometry, audio, language, 3D, networking configuration, and status queries. The source also documents an IR remote control table (28 NEC-format buttons, 4 bytes each) and 8 IR remote address codes (Code 1–8) for multi-projector isolation. Auxiliary LAN-based control surfaces (Crestron RoomView on TCP port 41794 with IPID 02, PJLink, SNMP v1, AMX DDG, Xpanel, web browser admin) are mentioned; only the Crestron port/IPID is stated, command bytes are not documented and are noted in Notes, not encoded as actions.

<!-- UNRESOLVED: LAN/Crestron/PJLink/SNMP/AMX/Xpanel byte-level protocols not documented in source — only port 41794 + IPID 02 are stated. -->
<!-- UNRESOLVED: Other LS700 family variants (LS700-4K VS17455, LS700-4KP) share the RS232 table per recovery notes but not stated in this refined source. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: Source row 4 references "Note 7" but source only contains Notes 1–6. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # default per source; menu also exposes 2400/4800/9600/14400/19200/38400/57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 41794  # Crestron RoomView / e-Control reserved control port (source-stated)
  # IPID: 02 (Crestron integration ID, source-stated)
auth:
  type: none  # inferred: no RS-232 login procedure in source
# Pin assignment (DB9, source-documented):
#   Pin 2 = RX, Pin 3 = TX, Pin 5 = GND, Pin 7 = RTSZ, Pin 8 = CTSZ
#   Pins 1, 4, 6, 9 = NC
# UNRESOLVED: TCP command payload format for Crestron e-Control not byte-documented.
# UNRESOLVED: PJLink / SNMP v1 / AMX DDG / Xpanel protocols mentioned but not documented.
# UNRESOLVED: Web admin (HTTP root path) default password "0000" stated - affects
#   HTTP admin surface only; not encoded here because HTTP command set not documented.
# IR transport: source documents NEC-format IR remote codes (see Actions: ir_*).
#   IR is a separate physical transport (optical, modulated) not in the protocols[]
#   enum above; payloads are encoded as Actions for source-coverage completeness.
```

## Traits
```yaml
traits:
  - powerable       # inferred: power ON/OFF commands (rows 1-2)
  - queryable       # inferred: numerous Read/Status query commands
  - levelable       # inferred: volume, brightness, contrast, gain, hue, saturation, sharpness
```

## Actions
```yaml
# All RS-232 command payloads are verbatim hex byte sequences from the source
# RS232 command table. Line breaks in source tables (`<br>`) are concatenation;
# the final byte of each Write command is a checksum. Read commands are 11 bytes;
# Write commands are typically 10 bytes (0x06 lead) or 9 bytes (0x02 lead for
# Remote Key injection). Query responses appear in the Feedbacks section.
#
# IR actions (id prefix ir_) are verbatim 4-byte NEC-format codes from the
# source IR control table - separate physical transport from RS-232.

actions:
  # --- Power & system reset (rows 1-6) ---
  - id: power_on
    label: Power On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x00 0x00 0x5D"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x01 0x00 0x5E"
    params: []

  - id: power_status_query
    label: Power Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x00 0x5E"
    params: []

  - id: projector_status_query
    label: Projector Status Query (warm-up / cool-down / power state)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x26 0x84"
    params: []
    notes: "Source row 4 references 'Note 7' but source contains only Notes 1-6."

  - id: reset_all_settings
    label: Reset All Settings
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x02 0x00 0x5F"
    params: []

  - id: reset_color_settings
    label: Reset Color Settings
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x2A 0x00 0x87"
    params: []

  # --- Splash screen (rows 7-10) ---
  - id: splash_screen_blue
    label: Splash Screen Blue
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x0A 0x01 0x68"
    params: []

  - id: splash_screen_viewsonic
    label: Splash Screen ViewSonic
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x0A 0x02 0x69"
    params: []

  - id: splash_screen_off
    label: Splash Screen Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x0A 0x04 0x6B"
    params: []

  - id: splash_screen_status_query
    label: Splash Screen Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x0A 0x68"
    params: []

  # --- High Altitude Mode (rows 11-13) ---
  - id: high_altitude_off
    label: High Altitude Mode Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x0C 0x00 0x69"
    params: []

  - id: high_altitude_on
    label: High Altitude Mode On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x0C 0x01 0x6A"
    params: []

  - id: high_altitude_status_query
    label: High Altitude Mode Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x0C 0x6A"
    params: []

  # --- Light source mode (rows 14-21) ---
  - id: light_source_mode_normal
    label: Light Source Mode Normal
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x00 0x6D"
    params: []

  - id: light_source_mode_eco
    label: Light Source Mode Eco
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x01 0x6E"
    params: []

  - id: light_source_mode_custom_20
    label: Light Source Mode Custom 20
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x04 0x71"
    params: []

  - id: light_source_mode_custom_40
    label: Light Source Mode Custom 40
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x05 0x72"
    params: []

  - id: light_source_mode_custom_60
    label: Light Source Mode Custom 60
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x06 0x73"
    params: []

  - id: light_source_mode_custom_80
    label: Light Source Mode Custom 80
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x07 0x74"
    params: []

  - id: light_source_mode_custom_100
    label: Light Source Mode Custom 100
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x10 0x08 0x75"
    params: []

  - id: light_source_mode_status_query
    label: Light Source Mode Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x10 0x6E"
    params: []

  # --- Message overlay (rows 22-24) ---
  - id: message_off
    label: Message Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x27 0x00 0x84"
    params: []

  - id: message_on
    label: Message On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x27 0x01 0x85"
    params: []

  - id: message_status_query
    label: Message Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x27 0x85"
    params: []

  # --- Projector Position (rows 25-29) ---
  - id: projector_position_front_table
    label: Projector Position Front Table
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x00 0x00 0x5E"
    params: []

  - id: projector_position_rear_table
    label: Projector Position Rear Table
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x00 0x01 0x5F"
    params: []

  - id: projector_position_rear_ceiling
    label: Projector Position Rear Ceiling
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x00 0x02 0x60"
    params: []

  - id: projector_position_front_ceiling
    label: Projector Position Front Ceiling
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x00 0x03 0x61"
    params: []

  - id: projector_position_status_query
    label: Projector Position Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x00 0x5F"
    params: []

  # --- 3D Sync (rows 30-36) ---
  - id: three_d_sync_off
    label: 3D Sync Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x00 0x7E"
    params: []

  - id: three_d_sync_auto
    label: 3D Sync Auto
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x01 0x7F"
    params: []

  - id: three_d_sync_frame_sequential
    label: 3D Sync Frame Sequential
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x02 0x80"
    params: []

  - id: three_d_sync_frame_packing
    label: 3D Sync Frame Packing
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x03 0x81"
    params: []

  - id: three_d_sync_top_bottom
    label: 3D Sync Top-Bottom
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x04 0x82"
    params: []

  - id: three_d_sync_side_by_side
    label: 3D Sync Side-by-Side
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x20 0x05 0x83"
    params: []

  - id: three_d_sync_status_query
    label: 3D Sync Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x20 0x7F"
    params: []

  # --- 3D Sync Convert (rows 37-39) ---
  - id: three_d_sync_convert_off
    label: 3D Sync Convert Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x21 0x00 0x7F"
    params: []

  - id: three_d_sync_convert_on
    label: 3D Sync Convert On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x21 0x01 0x80"
    params: []

  - id: three_d_sync_convert_status_query
    label: 3D Sync Convert Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x21 0x80"
    params: []

  # --- Contrast (rows 40-42) ---
  - id: contrast_decrease
    label: Contrast Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x02 0x00 0x60"
    params: []

  - id: contrast_increase
    label: Contrast Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x02 0x01 0x61"
    params: []

  - id: contrast_get_value_query
    label: Contrast Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x02 0x61"
    params: []

  # --- Brightness (rows 43-45) ---
  - id: brightness_decrease
    label: Brightness Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x03 0x00 0x61"
    params: []

  - id: brightness_increase
    label: Brightness Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x03 0x01 0x62"
    params: []

  - id: brightness_get_value_query
    label: Brightness Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x03 0x62"
    params: []

  # --- Aspect ratio (rows 46-52) ---
  - id: aspect_ratio_auto
    label: Aspect Ratio Auto
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x04 0x00 0x62"
    params: []

  - id: aspect_ratio_4_3
    label: Aspect Ratio 4:3
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x04 0x02 0x64"
    params: []

  - id: aspect_ratio_16_9
    label: Aspect Ratio 16:9
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x04 0x03 0x65"
    params: []

  - id: aspect_ratio_16_10
    label: Aspect Ratio 16:10
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x04 0x04 0x66"
    params: []

  - id: aspect_ratio_native
    label: Aspect Ratio Native
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x04 0x09 0x6B"
    params: []

  - id: aspect_ratio_cycle
    label: Aspect Ratio Cycle
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x31 0x00 0x90"
    params: []

  - id: aspect_ratio_get_value_query
    label: Aspect Ratio Get Value Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x04 0x63"
    params: []

  # --- Auto Adjust (row 53) ---
  - id: auto_adjust_execute
    label: Auto Adjust Execute
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x05 0x00 0x63"
    params: []
    notes: "Source note 6: only active with non-digital input (VGA/D-sub)."

  # --- Horizontal position (rows 54-56) ---
  - id: horizontal_position_shift_right
    label: Horizontal Position Shift Right
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x06 0x01 0x65"
    params: []

  - id: horizontal_position_shift_left
    label: Horizontal Position Shift Left
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x06 0x00 0x64"
    params: []

  - id: horizontal_position_get_value_query
    label: Horizontal Position Get Value Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x06 0x65"
    params: []

  # --- Vertical position (rows 57-59) ---
  - id: vertical_position_shift_up
    label: Vertical Position Shift Up
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x07 0x00 0x65"
    params: []

  - id: vertical_position_shift_down
    label: Vertical Position Shift Down
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x07 0x01 0x66"
    params: []

  - id: vertical_position_get_value_query
    label: Vertical Position Get Value Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x07 0x66"
    params: []

  # --- Color temperature (rows 60-63) ---
  - id: color_temperature_warm
    label: Color Temperature Warm
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x08 0x00 0x66"
    params: []

  - id: color_temperature_normal
    label: Color Temperature Normal
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x08 0x01 0x67"
    params: []

  - id: color_temperature_cool
    label: Color Temperature Cool
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x08 0x03 0x69"
    params: []

  - id: color_temperature_get_value_query
    label: Color Temperature Get Value Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x08 0x67"
    params: []

  # --- Blank (rows 64-66) ---
  - id: blank_on
    label: Blank On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x09 0x01 0x68"
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x09 0x00 0x67"
    params: []

  - id: blank_status_query
    label: Blank Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x09 0x68"
    params: []

  # --- Keystone vertical (rows 67-69) ---
  - id: keystone_vertical_decrease
    label: Keystone Vertical Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0A 0x00 0x68"
    params: []

  - id: keystone_vertical_increase
    label: Keystone Vertical Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0A 0x01 0x69"
    params: []

  - id: keystone_vertical_get_value_query
    label: Keystone Vertical Get Value Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x0A 0x69"
    params: []

  # --- Keystone horizontal (rows 70-72) ---
  - id: keystone_horizontal_decrease
    label: Keystone Horizontal Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x31 0x00 0x8E"
    params: []

  - id: keystone_horizontal_increase
    label: Keystone Horizontal Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x31 0x01 0x8F"
    params: []

  - id: keystone_horizontal_get_value_query
    label: Keystone Horizontal Get Value Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x31 0x8F"
    params: []

  # --- Color mode (rows 73-78) ---
  - id: color_mode_brightest
    label: Color Mode Brightest
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0B 0x00 0x69"
    params: []

  - id: color_mode_movie
    label: Color Mode Movie
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0B 0x01 0x6A"
    params: []

  - id: color_mode_sports
    label: Color Mode Sports
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0B 0x11 0x7A"
    params: []

  - id: color_mode_gaming
    label: Color Mode Gaming
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0B 0x12 0x7B"
    params: []

  - id: color_mode_presentation
    label: Color Mode Presentation
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0B 0x14 0x7D"
    params: []

  - id: color_mode_status_query
    label: Color Mode Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x0B 0x6A"
    params: []

  # --- Reset current color (row 79) ---
  - id: reset_current_color_settings
    label: Reset Current Color Settings
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x2A 0x00 0x87"
    params: []

  # --- Primary Color (rows 80-86) ---
  - id: primary_color_r
    label: Primary Color R
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x00 0x6E"
    params: []

  - id: primary_color_g
    label: Primary Color G
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x01 0x6F"
    params: []

  - id: primary_color_b
    label: Primary Color B
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x02 0x70"
    params: []

  - id: primary_color_c
    label: Primary Color C
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x03 0x71"
    params: []

  - id: primary_color_m
    label: Primary Color M
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x04 0x72"
    params: []

  - id: primary_color_y
    label: Primary Color Y
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x10 0x05 0x73"
    params: []

  - id: primary_color_status_query
    label: Primary Color Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x10 0x6F"
    params: []

  # --- Hue / Tint (rows 87-89) ---
  - id: hue_tint_decrease
    label: Hue / Tint Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x11 0x00 0x6F"
    params: []

  - id: hue_tint_increase
    label: Hue / Tint Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x11 0x01 0x70"
    params: []

  - id: hue_tint_get_value_query
    label: Hue / Tint Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x11 0x70"
    params: []

  # --- Saturation (rows 90-92) ---
  - id: saturation_decrease
    label: Saturation Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x12 0x00 0x70"
    params: []

  - id: saturation_increase
    label: Saturation Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x12 0x01 0x71"
    params: []

  - id: saturation_get_value_query
    label: Saturation Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x12 0x71"
    params: []

  # --- Gain (rows 93-95) ---
  - id: gain_decrease
    label: Gain Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x13 0x00 0x71"
    params: []

  - id: gain_increase
    label: Gain Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x13 0x01 0x72"
    params: []

  - id: gain_get_value_query
    label: Gain Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x13 0x72"
    params: []

  # --- Sharpness (rows 96-98) ---
  - id: sharpness_decrease
    label: Sharpness Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0E 0x00 0x6C"
    params: []

  - id: sharpness_increase
    label: Sharpness Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0E 0x01 0x6D"
    params: []

  - id: sharpness_get_value_query
    label: Sharpness Get Value Query (2-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x0E 0x6D"
    params: []

  # --- Freeze (rows 99-101) ---
  - id: freeze_on
    label: Freeze On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x00 0x01 0x60"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x00 0x00 0x5F"
    params: []

  - id: freeze_status_query
    label: Freeze Status Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x13 0x00 0x60"
    params: []

  # --- Source input (rows 102-108) ---
  - id: source_input_dsub_comp_1
    label: Source Input D-Sub / Comp. 1
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x00 0x60"
    params: []

  - id: source_input_dsub_comp_2
    label: Source Input D-Sub / Comp. 2
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x08 0x68"
    params: []

  - id: source_input_hdmi_1
    label: Source Input HDMI 1
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x03 0x63"
    params: []

  - id: source_input_hdmi_2
    label: Source Input HDMI 2
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x07 0x67"
    params: []

  - id: source_input_composite_video
    label: Source Input Composite Video
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x05 0x65"
    params: []

  - id: source_input_s_video
    label: Source Input S-Video
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x01 0x06 0x66"
    params: []

  - id: source_input_status_query
    label: Source Input Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x13 0x01 0x61"
    params: []

  # --- Quick Auto Search (rows 109-111) ---
  - id: quick_auto_search_on
    label: Quick Auto Search On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x02 0x01 0x62"
    params: []

  - id: quick_auto_search_off
    label: Quick Auto Search Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x02 0x00 0x61"
    params: []

  - id: quick_auto_search_status_query
    label: Quick Auto Search Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x13 0x02 0x62"
    params: []

  # --- Mute (rows 112-114) ---
  - id: mute_on
    label: Mute On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x14 0x00 0x01 0x61"
    params: []
    notes: "Source note 6: only active when an input source is applied."

  - id: mute_off
    label: Mute Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x14 0x00 0x00 0x60"
    params: []

  - id: mute_status_query
    label: Mute Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x14 0x00 0x61"
    params: []

  # --- Volume (rows 115-118) ---
  - id: volume_increase
    label: Volume Increase
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x14 0x01 0x00 0x61"
    params: []

  - id: volume_decrease
    label: Volume Decrease
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x14 0x02 0x00 0x62"
    params: []

  - id: volume_write_value
    label: Volume Write Value
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x2A 0x11 0x9A"
    params: []
    notes: "Source lists payload verbatim; the value byte position is not separately documented in this excerpt."

  - id: volume_get_value_query
    label: Volume Get Value Query (1-byte response)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x14 0x03 0x64"
    params: []

  # --- Language (rows 119-141) ---
  - id: language_english
    label: Language English
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x00 0x61"
    params: []

  - id: language_francais
    label: Language Français
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x01 0x62"
    params: []

  - id: language_deutsch
    label: Language Deutsch
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x02 0x63"
    params: []

  - id: language_italiano
    label: Language Italiano
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x03 0x64"
    params: []

  - id: language_espanol
    label: Language Español
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x04 0x65"
    params: []

  - id: language_russian
    label: Language Русский
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x05 0x66"
    params: []

  - id: language_traditional_chinese
    label: Language 繁體中文
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x06 0x67"
    params: []

  - id: language_simplified_chinese
    label: Language 简体中文
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x07 0x68"
    params: []

  - id: language_japanese
    label: Language 日本語
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x08 0x69"
    params: []

  - id: language_korean
    label: Language 한국어
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x09 0x6A"
    params: []

  - id: language_swedish
    label: Language Swedish (source-spelled "Swidish")
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0a 0x6B"
    params: []

  - id: language_dutch
    label: Language Dutch
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0b 0x6C"
    params: []

  - id: language_turkish
    label: Language Turkish
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0c 0x6D"
    params: []

  - id: language_czech
    label: Language Czech
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0d 0x6E"
    params: []

  - id: language_portuguese
    label: Language Portuguese (source-spelled "Portugese")
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0e 0x6F"
    params: []

  - id: language_thai
    label: Language Thai
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x0f 0x70"
    params: []

  - id: language_polish
    label: Language Polish
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x10 0x71"
    params: []

  - id: language_finnish
    label: Language Finnish
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x11 0x72"
    params: []

  - id: language_arabic
    label: Language Arabic
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x12 0x73"
    params: []

  - id: language_indonesian
    label: Language Indonesian (source-spelled "Indonesia")
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x13 0x74"
    params: []

  - id: language_hindi
    label: Language Hindi
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x14 0x75"
    params: []

  - id: language_vietnamese
    label: Language Vietnamese (source-spelled "Vie")
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x15 0x00 0x15 0x76"
    params: []

  - id: language_status_query
    label: Language Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x15 0x00 0x62"
    params: []

  # --- HDMI Format (rows 142-145) ---
  - id: hdmi_format_rgb
    label: HDMI Format RGB
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x28 0x00 0x85"
    params: []

  - id: hdmi_format_yuv
    label: HDMI Format YUV
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x28 0x01 0x86"
    params: []

  - id: hdmi_format_auto
    label: HDMI Format Auto
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x28 0x02 0x87"
    params: []

  - id: hdmi_format_status_query
    label: HDMI Format Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x28 0x86"
    params: []

  # --- HDMI Range (rows 146-149) ---
  - id: hdmi_range_enhanced
    label: HDMI Range Enhanced (0-255)
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x29 0x00 0x86"
    params: []

  - id: hdmi_range_normal
    label: HDMI Range Normal (16-235)
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x29 0x01 0x87"
    params: []

  - id: hdmi_range_auto
    label: HDMI Range Auto
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x29 0x02 0x88"
    params: []

  - id: hdmi_range_status_query
    label: HDMI Range Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x29 0x87"
    params: []

  # --- CEC (rows 150-152) ---
  - id: cec_off
    label: CEC Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x2B 0x00 0x88"
    params: []

  - id: cec_on
    label: CEC On
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x2B 0x01 0x89"
    params: []

  - id: cec_status_query
    label: CEC Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x2B 0x89"
    params: []

  # --- Error status (row 153) ---
  - id: error_status_query
    label: Error Status Query (20-item response; service debug)
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x0C 0x0D 0x66"
    params: []

  # --- Brilliant Color (rows 154-165) ---
  - id: brilliant_color_off
    label: Brilliant Color Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x00 0x6D"
    params: []

  - id: brilliant_color_color_1
    label: Brilliant Color Color 1
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x01 0x6E"
    params: []

  - id: brilliant_color_color_2
    label: Brilliant Color Color 2
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x02 0x6F"
    params: []

  - id: brilliant_color_color_3
    label: Brilliant Color Color 3
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x03 0x70"
    params: []

  - id: brilliant_color_color_4
    label: Brilliant Color Color 4
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x04 0x71"
    params: []

  - id: brilliant_color_color_5
    label: Brilliant Color Color 5
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x05 0x72"
    params: []

  - id: brilliant_color_color_6
    label: Brilliant Color Color 6
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x06 0x73"
    params: []

  - id: brilliant_color_color_7
    label: Brilliant Color Color 7
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x07 0x74"
    params: []

  - id: brilliant_color_color_8
    label: Brilliant Color Color 8
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x08 0x75"
    params: []

  - id: brilliant_color_color_9
    label: Brilliant Color Color 9
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x09 0x76"
    params: []

  - id: brilliant_color_color_10
    label: Brilliant Color Color 10
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x12 0x0F 0x0A 0x77"
    params: []

  - id: brilliant_color_status_query
    label: Brilliant Color Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x12 0x0F 0x6E"
    params: []

  # --- Remote Control Code (rows 166-174) ---
  - id: remote_control_code_1
    label: Remote Control Code 1
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x00 0xA0"
    params: []

  - id: remote_control_code_2
    label: Remote Control Code 2
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x01 0xA1"
    params: []

  - id: remote_control_code_3
    label: Remote Control Code 3
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x02 0xA2"
    params: []

  - id: remote_control_code_4
    label: Remote Control Code 4
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x03 0xA3"
    params: []

  - id: remote_control_code_5
    label: Remote Control Code 5
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x04 0xA4"
    params: []

  - id: remote_control_code_6
    label: Remote Control Code 6
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x05 0xA5"
    params: []

  - id: remote_control_code_7
    label: Remote Control Code 7
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x06 0xA6"
    params: []

  - id: remote_control_code_8
    label: Remote Control Code 8 (controls every projector)
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x0C 0x48 0x07 0xA7"
    params: []

  - id: remote_control_code_status_query
    label: Remote Control Code Status Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x0C 0x48 0xA1"
    params: []

  # --- Over Scan (rows 175-181) ---
  - id: over_scan_off
    label: Over Scan Off
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x00 0x90"
    params: []

  - id: over_scan_value_1
    label: Over Scan Value 1
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x01 0x91"
    params: []

  - id: over_scan_value_2
    label: Over Scan Value 2
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x02 0x92"
    params: []

  - id: over_scan_value_3
    label: Over Scan Value 3
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x03 0x93"
    params: []

  - id: over_scan_value_4
    label: Over Scan Value 4
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x04 0x94"
    params: []

  - id: over_scan_value_5
    label: Over Scan Value 5
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x11 0x33 0x05 0x95"
    params: []

  - id: over_scan_get_value_query
    label: Over Scan Get Value Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x11 0x33 0x91"
    params: []

  # --- Remote Key injection (rows 182-191) ---
  - id: remote_key_menu
    label: Remote Key Menu
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x0F 0x61"
    params: []

  - id: remote_key_exit
    label: Remote Key Exit
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x13 0x65"
    params: []

  - id: remote_key_top
    label: Remote Key Top
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x0B 0x5D"
    params: []

  - id: remote_key_bottom
    label: Remote Key Bottom
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x0C 0x5E"
    params: []

  - id: remote_key_left
    label: Remote Key Left
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x0D 0x5F"
    params: []

  - id: remote_key_right
    label: Remote Key Right
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x0E 0x60"
    params: []

  - id: remote_key_source
    label: Remote Key Source
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x04 0x56"
    params: []

  - id: remote_key_enter
    label: Remote Key Enter
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x15 0x67"
    params: []

  - id: remote_key_auto
    label: Remote Key Auto
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x08 0x5A"
    params: []

  - id: remote_key_my_button
    label: Remote Key My Button
    kind: action
    command: "0x02 0x14 0x00 0x04 0x00 0x34 0x02 0x04 0x11 0x63"
    params: []

  # --- AMX device discovery (row 192) ---
  - id: amx_discovery_response
    label: AMX Discovery Response
    kind: action
    command: "AMX"
    params: []
    notes: "Sending 'AMX' elicits AMX DDG response: AMXB<-SDKClass=VideoProjector><-Make=ViewSonic><-Model=PX800HD>"

  # --- Operating temperature (row 193) ---
  - id: operating_temperature_query
    label: Operating Temperature Query
    kind: query
    command: "0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 0x15 0x03 0x65"
    params: []
    notes: "Source note 1: 4-byte value at byte7-10, big-endian, divided by 10 = degrees C."

  # --- Lamp mode cycle (row 194) ---
  - id: lamp_mode_cycle
    label: Lamp Mode Cycle
    kind: action
    command: "0x06 0x14 0x00 0x04 0x00 0x34 0x13 0x36 0x00 0x95"
    params: []

  # =====================================================================
  # IR remote control (NEC format, 4-byte codes) - source IR table.
  # Separate physical transport (optical) from RS-232/TCP. Payloads are
  # verbatim from source IR control table. Byte 1 high nibble is the IR
  # remote address code (see ir_address_code_* below); source lists
  # default X3 (resolves to 83 for Code 1, F3 for Code 8, etc.).
  # =====================================================================

  # --- IR address codes (source: 8 codes for multi-projector isolation) ---
  # Source documents these as the byte-1/byte-2 prefix emitted by an IR
  # remote programmed to that code. Distinct from RS-232 rows 166-173,
  # which tell the PROJECTOR which code to listen for.
  - id: ir_address_code_1
    label: IR Remote Address Code 1 (83 F4)
    kind: action
    command: "83 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 1."

  - id: ir_address_code_2
    label: IR Remote Address Code 2 (93 F4)
    kind: action
    command: "93 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 2."

  - id: ir_address_code_3
    label: IR Remote Address Code 3 (A3 F4)
    kind: action
    command: "A3 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 3."

  - id: ir_address_code_4
    label: IR Remote Address Code 4 (B3 F4)
    kind: action
    command: "B3 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 4."

  - id: ir_address_code_5
    label: IR Remote Address Code 5 (C3 F4)
    kind: action
    command: "C3 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 5."

  - id: ir_address_code_6
    label: IR Remote Address Code 6 (D3 F4)
    kind: action
    command: "D3 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 6."

  - id: ir_address_code_7
    label: IR Remote Address Code 7 (E3 F4)
    kind: action
    command: "E3 F4"
    params: []
    notes: "IR NEC address code. Byte1+byte2 prefix for IR commands when projector set to Remote Control Code 7."

  - id: ir_address_code_8
    label: IR Remote Address Code 8 (F3 F4, controls every projector)
    kind: action
    command: "F3 F4"
    params: []
    notes: "IR NEC address code. Controls every projector regardless of selected Remote Control Code."

  # --- IR remote buttons (source IR control table, default code) ---
  - id: ir_button_pgdn
    label: IR Button PgDn
    kind: action
    command: "X3 F4 05 FA"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_pgup
    label: IR Button PgUp
    kind: action
    command: "X3 F4 06 F9"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_blank
    label: IR Button Blank
    kind: action
    command: "X3 F4 07 F8"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_auto_sync
    label: IR Button Auto Sync
    kind: action
    command: "X3 F4 08 F7"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_up
    label: IR Button Up
    kind: action
    command: "X3 F4 0B F4"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_down
    label: IR Button Down
    kind: action
    command: "X3 F4 0C F3"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_left
    label: IR Button Left
    kind: action
    command: "X3 F4 0E F1"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_right
    label: IR Button Right
    kind: action
    command: "X3 F4 0F F0"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_color_mode
    label: IR Button Color Mode
    kind: action
    command: "X3 F4 10 EF"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_mute
    label: IR Button Mute
    kind: action
    command: "X3 F4 14 EB"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_input
    label: IR Button Input
    kind: action
    command: "X3 F4 15 EA"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_powering_up
    label: IR Button Powering Up
    kind: action
    command: "X3 F4 4F A0"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_power_off
    label: IR Button Power Off
    kind: action
    command: "X3 F4 4E A1"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_exit
    label: IR Button Exit
    kind: action
    command: "X3 F4 28 D7"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_eco_mode
    label: IR Button Eco Mode
    kind: action
    command: "X3 F4 2B D4"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_menu
    label: IR Button Menu
    kind: action
    command: "X3 F4 30 CF"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_source
    label: IR Button Source
    kind: action
    command: "X3 F4 40 BF"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_pattern
    label: IR Button Pattern
    kind: action
    command: "X3 F4 55 AA"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_video
    label: IR Button Video
    kind: action
    command: "X3 F4 52 ad"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*). Byte4 case as in source."

  - id: ir_button_hdmi
    label: IR Button HDMI
    kind: action
    command: "X3 F4 58 A7"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_volume_up
    label: IR Button Volume+
    kind: action
    command: "X3 F4 82 7D"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_volume_down
    label: IR Button Volume-
    kind: action
    command: "X3 F4 83 7C"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_zoom_up
    label: IR Button Zoom+
    kind: action
    command: "X3 F4 67 98"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_zoom_down
    label: IR Button Zoom-
    kind: action
    command: "X3 F4 68 97"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_freeze
    label: IR Button Freeze
    kind: action
    command: "X3 F4 03 FC"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_aspect
    label: IR Button Aspect
    kind: action
    command: "X3 F4 13 EC"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_comp
    label: IR Button COMP
    kind: action
    command: "X3 F4 41 BC"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."

  - id: ir_button_information
    label: IR Button Information
    kind: action
    command: "X3 F4 97 68"
    params: []
    notes: "IR NEC, 4-byte. 'X3' = address-code-dependent byte1 (see ir_address_code_*)."
```

## Feedbacks
```yaml
feedbacks:
  # Generic ACK for Write commands: 0x03 0x14 0x00 0x00 0x00 0x14
  - id: write_ack
    type: bytes
    values: ["0x03 0x14 0x00 0x00 0x00 0x14"]

  - id: power_state
    type: enum
    values: [off, warm_up, cool_down, power_on, power_down]
    # Source note 5 enumerates the four-byte status responses:
    #   power_off:    0x05 0x14 0x00 0x03 0x00 0x00 0x00 0x00 0x17
    #   warm_up:      0x05 0x14 0x00 0x03 0x00 0x00 0x00 0x01 0x18
    #   power_on:     0x05 0x14 0x00 0x03 0x00 0x00 0x00 0x02 0x19
    #   cool_down:    0x05 0x14 0x00 0x03 0x00 0x00 0x00 0x03 0x1A

  - id: function_disabled_indicator
    type: bytes
    values: ["0x00 0x14 0x00 0x00 0x00 0x14"]
    # Source note 3: leading 0x00 indicates function greyed-out / unavailable.

  - id: amx_ddg_response
    type: text
    values: ["AMXB<-SDKClass=VideoProjector><-Make=ViewSonic><-Model=PX800HD>"]

  - id: error_status_block
    type: bytes
    # Source note 2: 32-byte service-debug response, 20 items.
    #   Items 0-17: 1 byte each
    #   Item 18:    4 bytes (first burn-in error minutes)
    #   Item 19:    1 byte  (lamp status)
    #   Item 20:    2 bytes (lamp error status)
    # Full example payload from source:
    values: ["0x05 0x14 0x00 0x16 0x00 0x00 0x00 0x01 0x02 0x03 0x04 0x05 0x06 0x07 0x08 0x09 0x0A 0x0B 0x0C 0x0D 0x0E 0x0F 0x10 0x11 0x01 0x02 0x03 0x04 0x01 0x01 0x02 0xFF"]

  - id: operating_temperature
    type: numeric
    unit: degrees_celsius_x10
    # Source note 1: HEX2DEC(ddccbbaa) / 10. Example bytes 0x29 0x01 0x00 0x00 = 0x129 = 297 → 29.7 °C.

  # UNRESOLVED: per-setting Read-value response byte encodings reference
  # "value mapping table 3.2.1 (1 byte)" and "3.2.2 (2 byte)" which are not
  # present in this refined excerpt.
```

## Variables
```yaml
# Discrete-value settables are encoded as enumerated actions above.
# Continuous settables that only have inc/dec remote operations:
variables:
  - id: contrast
    type: integer
    # UNRESOLVED: 2-byte value mapping table 3.2.2 not in this excerpt.
  - id: brightness
    type: integer
  - id: hue_tint
    type: integer
  - id: saturation
    type: integer
  - id: gain
    type: integer
  - id: sharpness
    type: integer
  - id: volume
    type: integer
    # Source also documents a direct "Volume Write Value" action (row 117)
    # but the value-byte position is not specified in this excerpt.
  - id: keystone_vertical
    type: integer
  - id: keystone_horizontal
    type: integer
  - id: horizontal_position
    type: integer
  - id: vertical_position
    type: integer
```

## Events
```yaml
events: []
# UNRESOLVED: source does not document unsolicited notifications over RS-232.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command_ids: [power_on, power_off]
    rule: "Source note 5: during Warm Up and Cool Down, do not perform other commands."
  - command_ids: [mute_on, mute_off]
    rule: "Source note 6: Mute is only active when an input source is applied."
  - command_ids: [auto_adjust_execute]
    rule: "Source note 6: Auto Adjust only active with non-digital input (VGA/D-sub)."
# UNRESOLVED: no formal hardware interlocks or power-sequencing requirements stated.
```

## Notes
- All hex byte sequences are copied verbatim from the source RS232 command table. Line breaks inside table cells (`<br>`) indicate continuation of a single payload; they are not field separators.
- The final byte of every Write/Query payload is a checksum computed by the projector. The exact checksum algorithm is not documented in this excerpt — implementers must either re-derive it from the documented examples or pass payloads verbatim.
- Read (query) commands use lead byte `0x07`; Write commands use `0x06`; Remote Key injection uses `0x02`.
- The command `0x00 0x14 0x00 0x00 0x00 0x14` is returned (leading `0x00`) when a function is greyed-out / unavailable in the current state (source note 3).
- The source explicitly enumerates the LS700HD (VS17454). Recovery notes for this family confirm the same RS232 command table is shared by LS700-4K (VS17455), LS700-4KP, and LS700HD; operators may extend `compatible_with.models` after consulting the corresponding user-guide page 72 of each variant.
- IR control: the source documents a separate NEC-format IR remote table (28 buttons) plus 8 IR address codes (Code 1–8). These are encoded as `ir_*` actions for source coverage. IR is a distinct physical transport (optical, modulated 38 kHz carrier typical for NEC) — NOT sent over the RS-232 serial port. The "X3" byte-1 placeholder is address-code-dependent (Code 1 → 83, Code 2 → 93, … Code 8 → F3); byte 2 is fixed F4. An IR transmitter must be programmed to the matching code that the projector is set to (via RS-232 rows 166–173 or the System: Remote Control Code menu).
- Auxiliary LAN control surfaces mentioned in source; only Crestron port/IPID are stated, command bytes NOT documented:
  - **Crestron RoomView / e-Control** — TCP port `41794`, IPID `02` (stated verbatim in source "About Crestron e-Control" / "Crestron RoomView" sections). Encoded in Transport.addressing above.
  - **PJLink** — protocol mentioned ("compatible with PJLink™"); command set not in this excerpt.
  - **SNMP v1** — mentioned; OIDs not in this excerpt.
  - **AMX DDG** — discovery string `AMX` elicits the textual response encoded above (works over both RS-232 row 192 and LAN).
  - **Xpanel V1.10** — mentioned; protocol not in this excerpt.
  - **Web browser admin** — root path of projector IP; default administrator password `0000` (stated). Affects web admin only; HTTP command set not documented.
- Baud rate is `115200 bps` by default; the System menu also exposes 2400 / 4800 / 9600 / 14400 / 19200 / 38400 / 57600. The selected baud rate on the projector must match the controller's serial config.
- Control terminals per source Specifications: RS232 (9-pin) ×1, USB (mini B) ×1, LAN ×1. USB port purpose (control vs service) not stated.

<!-- UNRESOLVED: exact checksum algorithm not documented in this excerpt. -->
<!-- UNRESOLVED: 1-byte and 2-byte value mapping tables (source sections 3.2.1 / 3.2.2) referenced by queries but not present in this refined excerpt. -->
<!-- UNRESOLVED: volume "Write Value" (row 117) value-byte position not separately specified. -->
<!-- UNRESOLVED: Crestron e-Control / PJLink / SNMP / AMX / Xpanel / web-admin byte-level protocols out of scope (only port 41794 + IPID 02 + web password stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: source row 4 references "Note 7" but source contains only Notes 1-6. -->
<!-- UNRESOLVED: other LS700 family models (LS700-4K, LS700-4KP) not explicitly stated in this excerpt; cross-model applicability inferred only from recovery notes. -->
<!-- UNRESOLVED: IR NEC carrier frequency, repeat-frame behavior, and timing not documented in this excerpt. -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
  - manuals.viewsonic.com
  - manuals.plus
  - projector-database.com
  - manualowl.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/Projector/LS700HD/LS700HD_UG_ENG.pdf
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://manuals.plus/m/0acef2dd3c8a812de94b9dd79be0012d5e433ee90d8a7b770dd8f1b4783fb15a.pdf
  - https://www.projector-database.com/pdf/viewsonicls7004k-qs.pdf
  - https://www.manualowl.com/m/ViewSonic/LS700-4K/Manual/604053
retrieved_at: 2026-07-21T23:12:14.291Z
last_checked_at: 2026-07-22T07:56:24.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:56:24.874Z
matched_actions: 230
action_count: 230
confidence: medium
summary: "All 230 spec actions verified against 194 RS-232 commands + 28 IR buttons + 8 IR address codes in source; exact wire-level match on all hex sequences and transport parameters. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN/Crestron/PJLink/SNMP/AMX/Xpanel byte-level protocols not documented in source — only port 41794 + IPID 02 are stated."
- "Other LS700 family variants (LS700-4K VS17455, LS700-4KP) share the RS232 table per recovery notes but not stated in this refined source."
- "Firmware version compatibility not stated."
- "Source row 4 references \"Note 7\" but source only contains Notes 1–6."
- "TCP command payload format for Crestron e-Control not byte-documented."
- "PJLink / SNMP v1 / AMX DDG / Xpanel protocols mentioned but not documented."
- "Web admin (HTTP root path) default password \"0000\" stated - affects"
- "per-setting Read-value response byte encodings reference"
- "2-byte value mapping table 3.2.2 not in this excerpt."
- "source does not document unsolicited notifications over RS-232."
- "source documents no multi-step command sequences."
- "no formal hardware interlocks or power-sequencing requirements stated."
- "exact checksum algorithm not documented in this excerpt."
- "1-byte and 2-byte value mapping tables (source sections 3.2.1 / 3.2.2) referenced by queries but not present in this refined excerpt."
- "volume \"Write Value\" (row 117) value-byte position not separately specified."
- "Crestron e-Control / PJLink / SNMP / AMX / Xpanel / web-admin byte-level protocols out of scope (only port 41794 + IPID 02 + web password stated)."
- "firmware version compatibility not stated."
- "source row 4 references \"Note 7\" but source contains only Notes 1-6."
- "other LS700 family models (LS700-4K, LS700-4KP) not explicitly stated in this excerpt; cross-model applicability inferred only from recovery notes."
- "IR NEC carrier frequency, repeat-frame behavior, and timing not documented in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
