---
spec_id: admin/hitachi-cp-wu8600-wu8700-wx8650-wx8750-x8800-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi CP-WU8600/WU8700/WX8650/WX8750/X8800 Series Control Spec"
manufacturer: Hitachi
model_family: CP-WU8600
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - CP-WU8600
    - CP-WU8700
    - CP-WX8650
    - CP-WX8750
    - CP-X8800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - manualslib.com
  - projectorcentral.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Hitachi-CP-X8800B-TechnicalGuide.pdf"
  - https://www.manualslib.com/manual/1167076/Hitachi-Cp-Wu8700.html
  - https://www.projectorcentral.com/pdf/projector_manual_9656.pdf
retrieved_at: 2026-05-14T16:51:55.434Z
last_checked_at: 2026-06-25T08:55:08.463Z
generated_at: 2026-06-25T08:55:08.463Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. SDI commands marked \"*\" apply only to CP-WU8600/CP-WX8650/CP-WU8700/CP-WX8750 per source; NATIVE aspect marked \"*\" likewise restricted."
  - "RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but flow control usage not stated; set to none"
  - "authentication password is user-set (default blank); not a fixed credential."
  - "firmware version compatibility not stated in source."
  - "serial flow control — RTS/CTS pins present but active flow control not described."
  - "authentication password is operator-set (default blank); no fixed credential in source."
  - "command acceptance latency / queue depth limits beyond 40 ms spacing not specified."
verification:
  verdict: verified
  checked_at: 2026-06-25T08:55:08.463Z
  matched_actions: 905
  action_count: 905
  confidence: medium
  summary: "deterministic presence proof: 905/905 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Hitachi CP-WU8600/WU8700/WX8650/WX8750/X8800 Series Control Spec

## Summary
Hitachi CP-WU8600/WU8700/WX8650/WX8750/X8800 series LCD projectors for installation use. Control via RS-232C serial (D-sub 9 pin, 19200bps 8N1) or TCP/IP network command control on TCP port 23 and TCP port 9715. Command set is binary, 13-byte framed, covering power, input source, lens (focus/zoom/shift/memory), picture, geometry, edge blending, audio, OSD, and maintenance operations.

<!-- UNRESOLVED: firmware version compatibility not stated. SDI commands marked "*" apply only to CP-WU8600/CP-WX8650/CP-WU8700/CP-WX8750 per source; NATIVE aspect marked "*" likewise restricted. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# RS-232C native serial control
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but flow control usage not stated; set to none
# TCP/IP network command control - two ports supported
addressing:
  port: 23  # Network Control Port1 (TCP #23); command format identical to RS-232C
  # Source also documents Network Control Port2 (TCP #9715) using a wrapped frame:
  #   [0x02 header][0x0D data length][13-byte RS-232C command][1-byte checksum][1-byte connection ID]
  # Checksum = value making lower 8 bits of header..checksum sum zero.
  # Connection ID = random 0..255, echoed on reply.
# Auth is optional and configurable per-port via web UI
auth:
  type: optional  # challenge-response MD5 (see Notes). Default: disabled on port 23, enabled on port 9715.
  # UNRESOLVED: authentication password is user-set (default blank); not a fixed credential.
```

## Traits
```yaml
# Inferred from command evidence in source
traits:
  - powerable    # inferred: Power Set Turn on/off commands
  - routable     # inferred: Input Source select (COMPUTER IN, HDMI 1/2, HDBaseT, VIDEO, SDI, DisplayPort, LAN)
  - queryable    # inferred: extensive GET commands returning internal setup values
  - levelable    # inferred: VOLUME/BRIGHTNESS/CONTRAST increment/decrement; DIMMING LEVEL; many gain/offset controls
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: byte_number_0_1_2_3_4_5_6_7_8_9
  label: "Byte Number 0 1 2 3 4 5 6 7 8 9"
  kind: action
  command: "10 11 12"
  params: []

- id: <increment>_increment_setup_value_b_lb_h_by1_a_l_a_h_04h_00h_b_l_b_h
  label: "<INCREMENT> Increment setup value [(bL)(bH)] by1. (aL) (aH) 04h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: <decrement>_decrement_setup_value_b_lb_h_by1_a_l_a_h_05h_00h_b_l_b_h
  label: "<DECREMENT> Decrement setup value [(bL)(bH)] by1. (aL) (aH) 05h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: <execute>_run_a_command_b_lb_h_a_l_a_h_06h_00h_b_l_b_h
  label: "<EXECUTE> Run a command [(bL)(bH)]. (aL) (aH) 06h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: power_set_turn_off
  label: "Power Set Turn off"
  kind: action
  command: "BE  EF 03 06  00 2A  D3 01  00 00  60 00  00"
  params: []

- id: power_set_turn_on
  label: "Power Set Turn on"
  kind: action
  command: "BE  EF 03 06  00 BA  D2 01  00 00  60 01  00"
  params: []

- id: input_source_set_computer_in
  label: "Input Source Set COMPUTER IN"
  kind: action
  command: "BE  EF 03 06  00 FE  D2 01  00 00  20 00  00"
  params: []

- id: input_source_set_lan
  label: "Input Source Set LAN"
  kind: action
  command: "BE  EF 03 06  00 CE  D5 01  00 00  20 0B  00"
  params: []

- id: input_source_set_hdmi_1
  label: "Input Source Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 0E  D2 01  00 00  20 03  00"
  params: []

- id: input_source_set_hdmi_2
  label: "Input Source Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 6E  D6 01  00 00  20 0D  00"
  params: []

- id: input_source_set_hdbase_t
  label: "Input Source Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 AE  DE 01  00 00  20 11  00"
  params: []

- id: input_source_set_video
  label: "Input Source Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 6E  D3 01  00 00  20 01  00"
  params: []

- id: input_source_set_sdi*
  label: "Input Source Set SDI*"
  kind: action
  command: "BE  EF 03 06  00 5E  DE 01  00 00  20 12  00"
  params: []

- id: input_source_set_display_port
  label: "Input Source Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 CE  DF 01  00 00  20 13  00"
  params: []

- id: focus_increment
  label: "FOCUS Increment"
  kind: action
  command: "BE  EF 03 06  00 6A  93 04  00 00  24 00  00"
  params: []

- id: focus_decrement
  label: "FOCUS Decrement"
  kind: action
  command: "BE  EF 03 06  00 BB  92 05  00 00  24 00  00"
  params: []

- id: zoom_increment
  label: "ZOOM Increment"
  kind: action
  command: "BE  EF 03 06  00 96  92 04  00 01  24 00  00"
  params: []

- id: zoom_decrement
  label: "ZOOM Decrement"
  kind: action
  command: "BE  EF 03 06  00 47  93 05  00 01  24 00  00"
  params: []

- id: lens_shift_v_increment
  label: "LENS SHIFT - V Increment"
  kind: action
  command: "BE  EF 03 06  00 D2  92 04  00 02  24 00  00"
  params: []

- id: lens_shift_v_decrement
  label: "LENS SHIFT - V Decrement"
  kind: action
  command: "BE  EF 03 06  00 03  93 05  00 02  24 00  00"
  params: []

- id: lens_shift_h_increment
  label: "LENS SHIFT - H Increment"
  kind: action
  command: "BE  EF 03 06  00 2E  93 04  00 03  24 00  00"
  params: []

- id: lens_shift_h_decrement
  label: "LENS SHIFT - H Decrement"
  kind: action
  command: "BE  EF 03 06  00 FF  92 05  00 03  24 00  00"
  params: []

- id: lens_shift_centering_execute
  label: "LENS SHIFT CENTERING Execute"
  kind: action
  command: "BE  EF 03 06  00 B8  93 06  00 04  24 00  00"
  params: []

- id: lens_memory_index_set_1
  label: "LENS MEMORY INDEX Set 1"
  kind: action
  command: "BE  EF 03 06  00 4B  92 01  00 07  24 00  00"
  params: []

- id: lens_memory_index_set_2
  label: "LENS MEMORY INDEX Set 2"
  kind: action
  command: "BE  EF 03 06  00 DB  93 01  00 07  24 01  00"
  params: []

- id: lens_memory_index_set_3
  label: "LENS MEMORY INDEX Set 3"
  kind: action
  command: "BE  EF 03 06  00 2B  93 01  00 07  24 02  00"
  params: []

- id: lens_memory_load_set_execute
  label: "LENS MEMORY LOAD Set Execute"
  kind: action
  command: "BE  EF 03 06  00 E8  90 06  00 08  24 00  00"
  params: []

- id: lens_memory_save_set_execute
  label: "LENS MEMORY SAVE Set Execute"
  kind: action
  command: "BE  EF 03 06  00 14  91 06  00 09  24 00  00"
  params: []

- id: lens_memory_clear_set_execute
  label: "LENS MEMORY CLEAR Set Execute"
  kind: action
  command: "BE  EF 03 06  00 50  91 06  00 0A  24 00  00"
  params: []

- id: magnify_increment
  label: "MAGNIFY Increment"
  kind: action
  command: "BE  EF 03 06  00 1A  D2 04  00 07  30 00  00"
  params: []

- id: magnify_decrement
  label: "MAGNIFY Decrement"
  kind: action
  command: "BE  EF 03 06  00 CB  D3 05  00 07  30 00  00"
  params: []

- id: magnify_position_h_increment
  label: "MAGNIFY Position H Increment"
  kind: action
  command: "BE  EF 03 06  00 AE  D7 04  00 10  30 00  00"
  params: []

- id: magnify_position_h_decrement
  label: "MAGNIFY Position H Decrement"
  kind: action
  command: "BE  EF 03 06  00 7F  D6 05  00 10  30 00  00"
  params: []

- id: magnify_position_v_increment
  label: "MAGNIFY Position V Increment"
  kind: action
  command: "BE  EF 03 06  00 52  D6 04  00 11  30 00  00"
  params: []

- id: magnify_position_v_decrement
  label: "MAGNIFY Position V Decrement"
  kind: action
  command: "BE  EF 03 06  00 83  D7 05  00 11  30 00  00"
  params: []

- id: freeze_set_normal
  label: "FREEZE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 83  D2 01  00 02  30 00  00"
  params: []

- id: freeze_set_freeze
  label: "FREEZE Set FREEZE"
  kind: action
  command: "BE  EF 03 06  00 13  D3 01  00 02  30 01  00"
  params: []

- id: shade_set_off
  label: "SHADE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 F3  93 01  00 05  24 00  00"
  params: []

- id: shade_set_on
  label: "SHADE Set ON"
  kind: action
  command: "BE  EF 03 06  00 63  92 01  00 05  24 01  00"
  params: []

- id: pby_p_pin_p_set_off
  label: "PbyP/PinP Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3E  26 01  00 10  23 00  00"
  params: []

- id: pby_p_pin_p_set_pby_p
  label: "PbyP/PinP Set PbyP"
  kind: action
  command: "BE  EF 03 06  00 AE  27 01  00 10  23 01  00"
  params: []

- id: pby_p_pin_p_set_pin_p
  label: "PbyP/PinP Set PinP"
  kind: action
  command: "BE  EF 03 06  00 5E  27 01  00 10  23 02  00"
  params: []

- id: pby_p_main_size_set_small
  label: "PbyP MAIN SIZE Set SMALL"
  kind: action
  command: "BE  EF 03 06  00 F2  07 01  00 11  23 7F  00"
  params: []

- id: pby_p_main_size_set_middle
  label: "PbyP MAIN SIZE Set MIDDLE"
  kind: action
  command: "BE  EF 03 06  00 02  46 01  00 11  23 80  00"
  params: []

- id: pby_p_main_size_set_large
  label: "PbyP MAIN SIZE Set LARGE"
  kind: action
  command: "BE  EF 03 06  00 92  47 01  00 11  23 81  00"
  params: []

- id: pby_p_right_source_set_computer_in
  label: "PbyP RIGHT SOURCE Set COMPUTER IN"
  kind: action
  command: "BE  EF 03 06  00 86  27 01  00 12  23 00  00"
  params: []

- id: pby_p_right_source_set_hdmi_1
  label: "PbyP RIGHT SOURCE Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 76  27 01  00 12  23 03  00"
  params: []

- id: pby_p_right_source_set_hdmi_2
  label: "PbyP RIGHT SOURCE Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 16  23 01  00 12  23 0D  00"
  params: []

- id: pby_p_right_source_set_hdbase_t
  label: "PbyP RIGHT SOURCE Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 D6  2B 01  00 12  23 11  00"
  params: []

- id: pby_p_right_source_set_video
  label: "PbyP RIGHT SOURCE Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 16  26 01  00 12  23 01  00"
  params: []

- id: pby_p_right_source_set_sdi*
  label: "PbyP RIGHT SOURCE Set SDI*"
  kind: action
  command: "BE  EF 03 06  00 26  2B 01  00 12  23 12  00"
  params: []

- id: pby_p_right_source_set_display_port
  label: "PbyP RIGHT SOURCE Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 B6  2A 01  00 12  23 13  00"
  params: []

- id: pby_p_main_area_set_left
  label: "PbyP MAIN AREA Set LEFT"
  kind: action
  command: "BE  EF 03 06  00 7A  26 01  00 13  23 00  00"
  params: []

- id: pby_p_main_area_set_right
  label: "PbyP MAIN AREA Set RIGHT"
  kind: action
  command: "BE  EF 03 06  00 EA  27 01  00 13  23 01  00"
  params: []

- id: pby_p_left_source_set_computer_in
  label: "PbyP LEFT SOURCE Set COMPUTER IN"
  kind: action
  command: "BE  EF 03 06  00 F2  26 01  00 15  23 00  00"
  params: []

- id: pby_p_left_source_set_hdmi_1
  label: "PbyP LEFT SOURCE Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 02  26 01  00 15  23 03  00"
  params: []

- id: pby_p_left_source_set_hdmi_2
  label: "PbyP LEFT SOURCE Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 62  22 01  00 15  23 0D  00"
  params: []

- id: pby_p_left_source_set_hdbase_t
  label: "PbyP LEFT SOURCE Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 A2  2A 01  00 15  23 11  00"
  params: []

- id: pby_p_left_source_set_video
  label: "PbyP LEFT SOURCE Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 62  27 01  00 15  23 01  00"
  params: []

- id: pby_p_left_source_set_sdi*
  label: "PbyP LEFT SOURCE Set SDI*"
  kind: action
  command: "BE  EF 03 06  00 52  2A 01  00 15  23 12  00"
  params: []

- id: pby_p_left_source_set_display_port
  label: "PbyP LEFT SOURCE Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 C2  2B 01  00 15  23 13  00"
  params: []

- id: pin_p_position_set_top_left
  label: "PinP POSITION Set TOP LEFT"
  kind: action
  command: "BE  EF 03 06  00 02  23 01  00 01  23 00  00"
  params: []

- id: pin_p_position_set_top_right
  label: "PinP POSITION Set TOP RIGHT"
  kind: action
  command: "BE  EF 03 06  00 92  22 01  00 01  23 01  00"
  params: []

- id: pin_p_position_set_bottom_left
  label: "PinP POSITION Set BOTTOM LEFT"
  kind: action
  command: "BE  EF 03 06  00 62  22 01  00 01  23 02  00"
  params: []

- id: pin_p_position_set_bottom_right
  label: "PinP POSITION Set BOTTOM RIGHT"
  kind: action
  command: "BE  EF 03 06  00 F2  23 01  00 01  23 03  00"
  params: []

- id: pin_p_main_area_set_primary
  label: "PinP MAIN AREA Set PRIMARY"
  kind: action
  command: "BE  EF 03 06  00 32  22 01  00 05  23 00  00"
  params: []

- id: pin_p_main_area_set_secondary
  label: "PinP MAIN AREA Set SECONDARY"
  kind: action
  command: "BE  EF 03 06  00 A2  23 01  00 05  23 01  00"
  params: []

- id: pin_p_primary_source_set_computer_in
  label: "PinP PRIMARY SOURCE Set COMPUTER IN"
  kind: action
  command: "BE  EF 03 06  00 CE  23 01  00 04  23 00  00"
  params: []

- id: pin_p_primary_source_set_hdmi_1
  label: "PinP PRIMARY SOURCE Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 3E  23 01  00 04  23 03  00"
  params: []

- id: pin_p_primary_source_set_hdmi_2
  label: "PinP PRIMARY SOURCE Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 5E  27 01  00 04  23 0D  00"
  params: []

- id: pin_p_primary_source_set_hdbase_t
  label: "PinP PRIMARY SOURCE Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 9E  2F 01  00 04  23 11  00"
  params: []

- id: pin_p_primary_source_set_video
  label: "PinP PRIMARY SOURCE Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 5E  22 01  00 04  23 01  00"
  params: []

- id: pin_p_primary_source_set_sdi*
  label: "PinP PRIMARY SOURCE Set SDI*"
  kind: action
  command: "BE  EF 03 06  00 6E  2F 01  00 04  23 12  00"
  params: []

- id: pin_p_primary_source_set_display_port
  label: "PinP PRIMARY SOURCE Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 FE  2E 01  00 04  23 13  00"
  params: []

- id: pin_p_secondary_source_set_computer_in
  label: "PinP SECONDARY SOURCE Set COMPUTER IN"
  kind: action
  command: "BE  EF 03 06  00 46  23 01  00 02  23 00  00"
  params: []

- id: pin_p_secondary_source_set_hdmi_1
  label: "PinP SECONDARY SOURCE Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 B6  23 01  00 02  23 03  00"
  params: []

- id: pin_p_secondary_source_set_hdmi_2
  label: "PinP SECONDARY SOURCE Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 D6  27 01  00 02  23 0D  00"
  params: []

- id: pin_p_secondary_source_set_hdbase_t
  label: "PinP SECONDARY SOURCE Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 16  2F 01  00 02  23 11  00"
  params: []

- id: pin_p_secondary_source_set_video
  label: "PinP SECONDARY SOURCE Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 D6  22 01  00 02  23 01  00"
  params: []

- id: pin_p_secondary_source_set_sdi*
  label: "PinP SECONDARY SOURCE Set SDI*"
  kind: action
  command: "BE  EF 03 06  00 E6  2F 01  00 02  23 12  00"
  params: []

- id: pin_p_secondary_source_set_display_port
  label: "PinP SECONDARY SOURCE Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 76  2E 01  00 02  23 13  00"
  params: []

- id: pby_p_pin_p_swap_set_execute
  label: "PbyP/PinP SWAP Set Execute"
  kind: action
  command: "BE  EF 03 06  00 01  27 06  00 16  23 00  00"
  params: []

- id: pby_p_pin_p_frame_lock_set_left_primary
  label: "PbyP / PinP FRAME LOCK Set LEFT / PRIMARY"
  kind: action
  command: "BE  EF 03 06  00 4A  27 01  00 17  23 00  00"
  params: []

- id: pby_p_pin_p_frame_lock_set_right_secondary
  label: "PbyP / PinP FRAME LOCK Set RIGHT / SECONDARY"
  kind: action
  command: "BE  EF 03 06  00 DA  26 01  00 17  23 01  00"
  params: []

- id: picture_mode_set_standard
  label: "PICTURE MODE Set STANDARD"
  kind: action
  command: "BE  EF 03 06  00 83  F5 01  00 BA  30 06  00"
  params: []

- id: picture_mode_set_natural
  label: "PICTURE MODE Set NATURAL"
  kind: action
  command: "BE  EF 03 06  00 23  F6 01  00 BA  30 00  00"
  params: []

- id: picture_mode_set_cinema
  label: "PICTURE MODE Set CINEMA"
  kind: action
  command: "BE  EF 03 06  00 B3  F7 01  00 BA  30 01  00"
  params: []

- id: picture_mode_set_dynamic
  label: "PICTURE MODE Set DYNAMIC"
  kind: action
  command: "BE  EF 03 06  00 E3  F4 01  00 BA  30 04  00"
  params: []

- id: picture_mode_set_boardblack
  label: "PICTURE MODE Set BOARD(BLACK)"
  kind: action
  command: "BE  EF 03 06  00 E3  EF 01  00 BA  30 20  00"
  params: []

- id: picture_mode_set_boardgreen
  label: "PICTURE MODE Set BOARD(GREEN)"
  kind: action
  command: "BE  EF 03 06  00 73  EE 01  00 BA  30 21  00"
  params: []

- id: picture_mode_set_whiteboard
  label: "PICTURE MODE Set WHITEBOARD"
  kind: action
  command: "BE  EF 03 06  00 83  EE 01  00 BA  30 22  00"
  params: []

- id: picture_mode_set_daytime
  label: "PICTURE MODE Set DAYTIME"
  kind: action
  command: "BE  EF 03 06  00 E3  C7 01  00 BA  30 40  00"
  params: []

- id: picture_mode_set_dicom_sim
  label: "PICTURE MODE Set DICOM SIM."
  kind: action
  command: "BE  EF 03 06  00 73  C6 01  00 BA  30 41  00"
  params: []

- id: picture_mode_set_user_1
  label: "PICTURE MODE Set USER-1"
  kind: action
  command: "BE  EF 03 06  00 E3  FB 01  00 BA  30 10  00"
  params: []

- id: picture_mode_set_user_2
  label: "PICTURE MODE Set USER-2"
  kind: action
  command: "BE  EF 03 06  00 73  FA 01  00 BA  30 11  00"
  params: []

- id: picture_mode_set_user_3
  label: "PICTURE MODE Set USER-3"
  kind: action
  command: "BE  EF 03 06  00 83  FA 01  00 BA  30 12  00"
  params: []

- id: brightness_increment
  label: "BRIGHTNESS Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  D2 04  00 03  20 00  00"
  params: []

- id: brightness_decrement
  label: "BRIGHTNESS Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  D3 05  00 03  20 00  00"
  params: []

- id: brightness_reset_execute
  label: "BRIGHTNESS Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 58  D3 06  00 00  70 00  00"
  params: []

- id: contrast_increment
  label: "CONTRAST Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  D3 04  00 04  20 00  00"
  params: []

- id: contrast_decrement
  label: "CONTRAST Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  D2 05  00 04  20 00  00"
  params: []

- id: contrast_reset_execute
  label: "CONTRAST Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A4  D2 06  00 01  70 00  00"
  params: []

- id: gamma_set_1_default
  label: "GAMMA Set 1 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 07  E9 01  00 A1  30 20  00"
  params: []

- id: gamma_set_1_custom
  label: "GAMMA Set 1 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 07  FD 01  00 A1  30 10  00"
  params: []

- id: gamma_set_2_default
  label: "GAMMA Set 2 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 97  E8 01  00 A1  30 21  00"
  params: []

- id: gamma_set_2_custom
  label: "GAMMA Set 2 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 97  FC 01  00 A1  30 11  00"
  params: []

- id: gamma_set_3_default
  label: "GAMMA Set 3 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 67  E8 01  00 A1  30 22  00"
  params: []

- id: gamma_set_3_custom
  label: "GAMMA Set 3 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 67  FC 01  00 A1  30 12  00"
  params: []

- id: gamma_set_4_default
  label: "GAMMA Set 4 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 F7  E9 01  00 A1  30 23  00"
  params: []

- id: gamma_set_4_custom
  label: "GAMMA Set 4 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 F7  FD 01  00 A1  30 13  00"
  params: []

- id: gamma_set_5_default
  label: "GAMMA Set 5 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 C7  EB 01  00 A1  30 24  00"
  params: []

- id: gamma_set_5_custom
  label: "GAMMA Set 5 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 C7  FF 01  00 A1  30 14  00"
  params: []

- id: gamma_set_6_default
  label: "GAMMA Set 6 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 57  EA 01  00 A1  30 25  00"
  params: []

- id: gamma_set_6_custom
  label: "GAMMA Set 6 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 57  FE 01  00 A1  30 15  00"
  params: []

- id: gamma_set_7_default
  label: "GAMMA Set 7 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 A7  EA 01  00 A1  30 26  00"
  params: []

- id: gamma_set_7_custom
  label: "GAMMA Set 7 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 A7  FE 01  00 A1  30 16  00"
  params: []

- id: gamma_set_8_default
  label: "GAMMA Set 8 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 37  EB 01  00 A1  30 27  00"
  params: []

- id: gamma_set_8_custom
  label: "GAMMA Set 8 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 37  FF 01  00 A1  30 17  00"
  params: []

- id: user_gamma_point_1_set_increment
  label: "User GAMMA Point 1 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6E  FE 04  00 90  30 00  00"
  params: []

- id: user_gamma_point_1_set_decrement
  label: "User GAMMA Point 1 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BF  FF 05  00 90  30 00  00"
  params: []

- id: user_gamma_point_1_reset_set_execute
  label: "User GAMMA Point 1 Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 58  C2 06  00 50  70 00  00"
  params: []

- id: user_gamma_point_2_set_increment
  label: "User GAMMA Point 2 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 92  FF 04  00 91  30 00  00"
  params: []

- id: user_gamma_point_2_set_decrement
  label: "User GAMMA Point 2 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 43  FE 05  00 91  30 00  00"
  params: []

- id: user_gamma_point_2_reset_set_execute
  label: "User GAMMA Point 2 Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 A4  C3 06  00 51  70 00  00"
  params: []

- id: user_gamma_point_3_set_increment
  label: "User GAMMA Point 3 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 D6  FF 04  00 92  30 00  00"
  params: []

- id: user_gamma_point_3_set_decrement
  label: "User GAMMA Point 3 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 07  FE 05  00 92  30 00  00"
  params: []

- id: user_gamma_point_3_reset_set_execute
  label: "User GAMMA Point 3 Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 E0  C3 06  00 52  70 00  00"
  params: []

- id: user_gamma_point_4_increment
  label: "User GAMMA Point 4 Increment"
  kind: action
  command: "BE  EF 03 06  00 2A  FE 04  00 93  30 00  00"
  params: []

- id: user_gamma_point_4_decrement
  label: "User GAMMA Point 4 Decrement"
  kind: action
  command: "BE  EF 03 06  00 FB  FF 05  00 93  30 00  00"
  params: []

- id: user_gamma_point_4_reset_execute
  label: "User GAMMA Point 4 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 1C  C2 06  00 53  70 00  00"
  params: []

- id: user_gamma_point_5_increment
  label: "User GAMMA Point 5 Increment"
  kind: action
  command: "BE  EF 03 06  00 5E  FF 04  00 94  30 00  00"
  params: []

- id: user_gamma_point_5_decrement
  label: "User GAMMA Point 5 Decrement"
  kind: action
  command: "BE  EF 03 06  00 8F  FE 05  00 94  30 00  00"
  params: []

- id: user_gamma_point_5_reset_execute
  label: "User GAMMA Point 5 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 68  C3 06  00 54  70 00  00"
  params: []

- id: user_gamma_point_6_increment
  label: "User GAMMA Point 6 Increment"
  kind: action
  command: "BE  EF 03 06  00 A2  FE 04  00 95  30 00  00"
  params: []

- id: user_gamma_point_6_decrement
  label: "User GAMMA Point 6 Decrement"
  kind: action
  command: "BE  EF 03 06  00 73  FF 05  00 95  30 00  00"
  params: []

- id: user_gamma_point_6_reset_execute
  label: "User GAMMA Point 6 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 94  C2 06  00 55  70 00  00"
  params: []

- id: user_gamma_point_7_increment
  label: "User GAMMA Point 7 Increment"
  kind: action
  command: "BE  EF 03 06  00 E6  FE 04  00 96  30 00  00"
  params: []

- id: user_gamma_point_7_decrement
  label: "User GAMMA Point 7 Decrement"
  kind: action
  command: "BE  EF 03 06  00 37  FF 05  00 96  30 00  00"
  params: []

- id: user_gamma_point_7_reset_execute
  label: "User GAMMA Point 7 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 D0  C2 06  00 56  70 00  00"
  params: []

- id: user_gamma_point_8_increment
  label: "User GAMMA Point 8 Increment"
  kind: action
  command: "BE  EF 03 06  00 1A  FF 04  00 97  30 00  00"
  params: []

- id: user_gamma_point_8_decrement
  label: "User GAMMA Point 8 Decrement"
  kind: action
  command: "BE  EF 03 06  00 CB  FE 05  00 97  30 00  00"
  params: []

- id: user_gamma_point_8_reset_execute
  label: "User GAMMA Point 8 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 2C  C3 06  00 57  70 00  00"
  params: []

- id: color_temp_set_1_high
  label: "COLOR TEMP Set 1 HIGH"
  kind: action
  command: "BE  EF 03 06  00 0B  F5 01  00 B0  30 03  00"
  params: []

- id: color_temp_set_1_customhigh
  label: "COLOR TEMP Set 1 CUSTOM(HIGH)"
  kind: action
  command: "BE  EF 03 06  00 CB  F8 01  00 B0  30 13  00"
  params: []

- id: color_temp_set_2_mid_1
  label: "COLOR TEMP Set 2 MID-1"
  kind: action
  command: "BE  EF 03 06  00 9B  F4 01  00 B0  30 02  00"
  params: []

- id: color_temp_set_2_custommid_1
  label: "COLOR TEMP Set 2 CUSTOM(MID-1)"
  kind: action
  command: "BE  EF 03 06  00 5B  F9 01  00 B0  30 12  00"
  params: []

- id: color_temp_set_3_mid_2
  label: "COLOR TEMP Set 3 MID-2"
  kind: action
  command: "BE  EF 03 06  00 3B  F7 01  00 B0  30 04  00"
  params: []

- id: color_temp_set_3_custom_mid_2
  label: "COLOR TEMP Set 3 CUSTOM (MID- 2)"
  kind: action
  command: "BE  EF 03 06  00 FB  FA 01  00 B0  30 14  00"
  params: []

- id: color_temp_set_3_low
  label: "COLOR TEMP Set 3 LOW"
  kind: action
  command: "BE  EF 03 06  00 6B  F4 01  00 B0  30 01  00"
  params: []

- id: color_temp_set_4_customlow
  label: "COLOR TEMP Set 4 CUSTOM(LOW)"
  kind: action
  command: "BE  EF 03 06  00 AB  F9 01  00 B0  30 11  00"
  params: []

- id: color_temp_set_4_hi_bright_1
  label: "COLOR TEMP Set 4 Hi-BRIGHT-1"
  kind: action
  command: "BE  EF 03 06  00 3B  F2 01  00 B0  30 08  00"
  params: []

- id: color_temp_set_5_custom
  label: "COLOR TEMP Set 5 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 FB  FF 01  00 B0  30 18  00"
  params: []

- id: color_temp_set_5_hi_bright_2
  label: "COLOR TEMP Set 5 Hi-BRIGHT-2"
  kind: action
  command: "BE  EF 03 06  00 AB  F3 01  00 B0  30 09  00"
  params: []

- id: color_temp_set_6_custom
  label: "COLOR TEMP Set 6 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 6B  FE 01  00 B0  30 19  00"
  params: []

- id: color_temp_set_6_hi_bright_3
  label: "COLOR TEMP Set 6 Hi-BRIGHT-3"
  kind: action
  command: "BE  EF 03 06  00 5B  F3 01  00 B0  30 0A  00"
  params: []

- id: color_temp_set_7_custom
  label: "COLOR TEMP Set 7 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 9B  FE 01  00 B0  30 1A  00"
  params: []

- id: color_temp_gain_r_increment
  label: "COLOR TEMP GAIN R Increment"
  kind: action
  command: "BE  EF 03 06  00 52  F4 04  00 B1  30 00  00"
  params: []

- id: color_temp_gain_r_decrement
  label: "COLOR TEMP GAIN R Decrement"
  kind: action
  command: "BE  EF 03 06  00 83  F5 05  00 B1  30 00  00"
  params: []

- id: color_temp_gain_r_reset_execute
  label: "COLOR TEMP GAIN R Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 10  C6 06  00 46  70 00  00"
  params: []

- id: color_temp_gain_g_increment
  label: "COLOR TEMP GAIN G Increment"
  kind: action
  command: "BE  EF 03 06  00 16  F4 04  00 B2  30 00  00"
  params: []

- id: color_temp_gain_g_decrement
  label: "COLOR TEMP GAIN G Decrement"
  kind: action
  command: "BE  EF 03 06  00 C7  F5 05  00 B2  30 00  00"
  params: []

- id: color_temp_gain_g_reset_execute
  label: "COLOR TEMP GAIN G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 EC  C7 06  00 47  70 00  00"
  params: []

- id: color_temp_gain_b_increment
  label: "COLOR TEMP GAIN B Increment"
  kind: action
  command: "BE  EF 03 06  00 EA  F5 04  00 B3  30 00  00"
  params: []

- id: color_temp_gain_b_decrement
  label: "COLOR TEMP GAIN B Decrement"
  kind: action
  command: "BE  EF 03 06  00 3B  F4 05  00 B3  30 00  00"
  params: []

- id: color_temp_gain_b_reset_execute
  label: "COLOR TEMP GAIN B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 F8  C4 06  00 48  70 00  00"
  params: []

- id: color_temp_offset_r_increment
  label: "COLOR TEMP OFFSET R Increment"
  kind: action
  command: "BE  EF 03 06  00 62  F5 04  00 B5  30 00  00"
  params: []

- id: color_temp_offset_r_decrement
  label: "COLOR TEMP OFFSET R Decrement"
  kind: action
  command: "BE  EF 03 06  00 B3  F4 05  00 B5  30 00  00"
  params: []

- id: color_temp_offset_r_reset_execute
  label: "COLOR TEMP OFFSET R Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 40  C5 06  00 4A  70 00  00"
  params: []

- id: color_temp_offset_g_increment
  label: "COLOR TEMP OFFSET G Increment"
  kind: action
  command: "BE  EF 03 06  00 26  F5 04  00 B6  30 00  00"
  params: []

- id: color_temp_offset_g_decrement
  label: "COLOR TEMP OFFSET G Decrement"
  kind: action
  command: "BE  EF 03 06  00 F7  F4 05  00 B6  30 00  00"
  params: []

- id: color_temp_offset_g_reset_execute
  label: "COLOR TEMP OFFSET G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 BC  C4 06  00 4B  70 00  00"
  params: []

- id: color_temp_offset_b_increment
  label: "COLOR TEMP OFFSET B Increment"
  kind: action
  command: "BE  EF 03 06  00 DA  F4 04  00 B7  30 00  00"
  params: []

- id: color_temp_offset_b_decrement
  label: "COLOR TEMP OFFSET B Decrement"
  kind: action
  command: "BE  EF 03 06  00 0B  F5 05  00 B7  30 00  00"
  params: []

- id: color_temp_offset_b_reset_execute
  label: "COLOR TEMP OFFSET B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 C8  C5 06  00 4C  70 00  00"
  params: []

- id: color_increment
  label: "COLOR Increment"
  kind: action
  command: "BE  EF 03 06  00 D3  72 04  00 02  22 00  00"
  params: []

- id: color_decrement
  label: "COLOR Decrement"
  kind: action
  command: "BE  EF 03 06  00 02  73 05  00 02  22 00  00"
  params: []

- id: color_reset_execute
  label: "COLOR Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 80  D0 06  00 0A  70 00  00"
  params: []

- id: h_position_increment
  label: "H POSITION Increment"
  kind: action
  command: "BE  EF 03 06  00 97  82 04  00 01  21 00  00"
  params: []

- id: h_position_decrement
  label: "H POSITION Decrement"
  kind: action
  command: "BE  EF 03 06  00 46  83 05  00 01  21 00  00"
  params: []

- id: h_position_reset_execute
  label: "H POSITION Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 1C  D3 06  00 03  70 00  00"
  params: []

- id: h_phase_increment
  label: "H PHASE Increment"
  kind: action
  command: "BE  EF 03 06  00 2F  83 04  00 03  21 00  00"
  params: []

- id: h_phase_decrement
  label: "H PHASE Decrement"
  kind: action
  command: "BE  EF 03 06  00 FE  82 05  00 03  21 00  00"
  params: []

- id: h_size_increment
  label: "H SIZE Increment"
  kind: action
  command: "BE  EF 03 06  00 D3  82 04  00 02  21 00  00"
  params: []

- id: h_size_decrement
  label: "H SIZE Decrement"
  kind: action
  command: "BE  EF 03 06  00 02  83 05  00 02  21 00  00"
  params: []

- id: h_size_reset_execute
  label: "H SIZE Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 68  D2 06  00 04  70 00  00"
  params: []

- id: auto_adjust_execute_execute
  label: "AUTO ADJUST EXECUTE Execute"
  kind: action
  command: "BE  EF 03 06  00 91  D0 06  00 0A  20 00  00"
  params: []

- id: progressive_set_off
  label: "PROGRESSIVE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 4A  72 01  00 07  22 00  00"
  params: []

- id: progressive_set_tv
  label: "PROGRESSIVE Set TV"
  kind: action
  command: "BE  EF 03 06  00 DA  73 01  00 07  22 01  00"
  params: []

- id: progressive_set_film
  label: "PROGRESSIVE Set FILM"
  kind: action
  command: "BE  EF 03 06  00 2A  73 01  00 07  22 02  00"
  params: []

- id: video_nr_set_low
  label: "VIDEO NR Set LOW"
  kind: action
  command: "BE  EF 03 06  00 26  72 01  00 06  22 01  00"
  params: []

- id: video_nr_set_mid
  label: "VIDEO NR Set MID"
  kind: action
  command: "BE  EF 03 06  00 D6  72 01  00 06  22 02  00"
  params: []

- id: video_nr_set_high
  label: "VIDEO NR Set HIGH"
  kind: action
  command: "BE  EF 03 06  00 46  73 01  00 06  22 03  00"
  params: []

- id: color_space_set_auto
  label: "COLOR SPACE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 0E  72 01  00 04  22 00  00"
  params: []

- id: color_space_set_rgb
  label: "COLOR SPACE Set RGB"
  kind: action
  command: "BE  EF 03 06  00 9E  73 01  00 04  22 01  00"
  params: []

- id: color_space_set_smpte240
  label: "COLOR SPACE Set SMPTE240"
  kind: action
  command: "BE  EF 03 06  00 6E  73 01  00 04  22 02  00"
  params: []

- id: color_space_set_rec709
  label: "COLOR SPACE Set REC709"
  kind: action
  command: "BE  EF 03 06  00 FE  72 01  00 04  22 03  00"
  params: []

- id: color_space_set_rec601
  label: "COLOR SPACE Set REC601"
  kind: action
  command: "BE  EF 03 06  00 CE  70 01  00 04  22 04  00"
  params: []

- id: c_video_format_set_auto
  label: "C-VIDEO FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 A2  70 01  00 11  22 0A  00"
  params: []

- id: c_video_format_set_ntsc
  label: "C-VIDEO FORMAT Set NTSC"
  kind: action
  command: "BE  EF 03 06  00 C2  74 01  00 11  22 04  00"
  params: []

- id: c_video_format_set_pal
  label: "C-VIDEO FORMAT Set PAL"
  kind: action
  command: "BE  EF 03 06  00 52  75 01  00 11  22 05  00"
  params: []

- id: c_video_format_set_secam
  label: "C-VIDEO FORMAT Set SECAM"
  kind: action
  command: "BE  EF 03 06  00 52  70 01  00 11  22 09  00"
  params: []

- id: c_video_format_set_ntsc4_43
  label: "C-VIDEO FORMAT Set NTSC4.43"
  kind: action
  command: "BE  EF 03 06  00 62  77 01  00 11  22 02  00"
  params: []

- id: c_video_format_set_m_pal
  label: "C-VIDEO FORMAT Set M-PAL"
  kind: action
  command: "BE  EF 03 06  00 C2  71 01  00 11  22 08  00"
  params: []

- id: c_video_format_set_n_pal
  label: "C-VIDEO FORMAT Set N-PAL"
  kind: action
  command: "BE  EF 03 06  00 32  74 01  00 11  22 07  00"
  params: []

- id: hdmi_1_format_set_auto
  label: "HDMI 1 FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 BA  77 01  00 13  22 00  00"
  params: []

- id: hdmi_1_format_set_video
  label: "HDMI 1 FORMAT Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 2A  76 01  00 13  22 01  00"
  params: []

- id: hdmi_1_format_set_computer
  label: "HDMI 1 FORMAT Set COMPUTER"
  kind: action
  command: "BE  EF 03 06  00 DA  76 01  00 13  22 02  00"
  params: []

- id: hdmi_2_format_set_auto
  label: "HDMI 2 FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 52  75 01  00 1D  22 00  00"
  params: []

- id: hdmi_2_format_set_video
  label: "HDMI 2 FORMAT Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 C2  74 01  00 1D  22 01  00"
  params: []

- id: hdmi_2_format_set_computer
  label: "HDMI 2 FORMAT Set COMPUTER"
  kind: action
  command: "BE  EF 03 06  00 32  74 01  00 1D  22 02  00"
  params: []

- id: hdbase_t_format_set_auto
  label: "HDBaseT FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 7A  EA 01  00 D3  20 00  00"
  params: []

- id: hdbase_t_format_set_video
  label: "HDBaseT FORMAT Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 EA  EB 01  00 D3  20 01  00"
  params: []

- id: hdbase_t_format_set_computer
  label: "HDBaseT FORMAT Set COMPUTER"
  kind: action
  command: "BE  EF 03 06  00 1A  EB 01  00 D3  20 02  00"
  params: []

- id: display_port_format_set_auto
  label: "DisplayPort FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 BA  E1 01  00 F3  20 00  00"
  params: []

- id: display_port_format_set_video
  label: "DisplayPort FORMAT Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 2A  E0 01  00 F3  20 01  00"
  params: []

- id: display_port_format_set_computer
  label: "DisplayPort FORMAT Set COMPUTER"
  kind: action
  command: "BE  EF 03 06  00 DA  E0 01  00 F3  20 02  00"
  params: []

- id: hdmi_1_range_set_auto
  label: "HDMI 1 RANGE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 86  D8 01  00 22  20 00  00"
  params: []

- id: hdmi_1_range_set_normal
  label: "HDMI 1 RANGE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 16  D9 01  00 22  20 01  00"
  params: []

- id: hdmi_1_range_set_enhanced
  label: "HDMI 1 RANGE Set ENHANCED"
  kind: action
  command: "BE  EF 03 06  00 E6  D9 01  00 22  20 02  00"
  params: []

- id: hdmi_2_range_set_auto
  label: "HDMI 2 RANGE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 7A  D9 01  00 23  20 00  00"
  params: []

- id: hdmi_2_range_set_normal
  label: "HDMI 2 RANGE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 EA  D8 01  00 23  20 01  00"
  params: []

- id: hdmi_2_range_set_enhanced
  label: "HDMI 2 RANGE Set ENHANCED"
  kind: action
  command: "BE  EF 03 06  00 1A  D8 01  00 23  20 02  00"
  params: []

- id: hdbase_t_range_set_auto
  label: "HDBaseT RANGE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 86  EB 01  00 D2  20 00  00"
  params: []

- id: hdbase_t_range_set_normal
  label: "HDBaseT RANGE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 16  EA 01  00 D2  20 01  00"
  params: []

- id: hdbase_t_range_set_enhanced
  label: "HDBaseT RANGE Set ENHANCED"
  kind: action
  command: "BE  EF 03 06  00 E6  EA 01  00 D2  20 02  00"
  params: []

- id: sdi_range*_set_normal
  label: "SDI RANGE* Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 16  E5 01  00 E2  20 01  00"
  params: []

- id: sdi_range*_set_enhanced
  label: "SDI RANGE* Set ENHANCED"
  kind: action
  command: "BE  EF 03 06  00 E6  E5 01  00 E2  20 02  00"
  params: []

- id: display_port_range_set_auto
  label: "DisplayPort RANGE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 46  E0 01  00 F2  20 00  00"
  params: []

- id: display_port_range_set_normal
  label: "DisplayPort RANGE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 D6  E1 01  00 F2  20 01  00"
  params: []

- id: display_port_range_set_enhanced
  label: "DisplayPort RANGE Set ENHANCED"
  kind: action
  command: "BE  EF 03 06  00 26  E1 01  00 F2  20 02  00"
  params: []

- id: computer_in_set_auto
  label: "COMPUTER IN Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 CE  D6 01  00 10  20 03  00"
  params: []

- id: computer_in_set_sync_on_g_off
  label: "COMPUTER IN Set SYNC ON G OFF"
  kind: action
  command: "BE  EF 03 06  00 5E  D7 01  00 10  20 02  00"
  params: []

- id: frame_lock_computer_in_set_off
  label: "FRAME LOCK - COMPUTER IN Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  C2 01  00 50  30 00  00"
  params: []

- id: frame_lock_computer_in_set_on
  label: "FRAME LOCK - COMPUTER IN Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  C3 01  00 50  30 01  00"
  params: []

- id: frame_lock_hdmi_1_set_off
  label: "FRAME LOCK - HDMI 1 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 7F  C2 01  00 53  30 00  00"
  params: []

- id: frame_lock_hdmi_1_set_on
  label: "FRAME LOCK - HDMI 1 Set ON"
  kind: action
  command: "BE  EF 03 06  00 EF  C3 01  00 53  30 01  00"
  params: []

- id: frame_lock_hdmi_2_set_off
  label: "FRAME LOCK - HDMI 2 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 97  C0 01  00 5D  30 00  00"
  params: []

- id: frame_lock_hdmi_2_set_on
  label: "FRAME LOCK - HDMI 2 Set ON"
  kind: action
  command: "BE  EF 03 06  00 07  C1 01  00 5D  30 01  00"
  params: []

- id: frame_lock_hdbase_t_set_off
  label: "FRAME LOCK - HDBaseT Set OFF"
  kind: action
  command: "BE  EF 03 06  00 C2  EB 01  00 D1  20 00  00"
  params: []

- id: frame_lock_hdbase_t_set_on
  label: "FRAME LOCK - HDBaseT Set ON"
  kind: action
  command: "BE  EF 03 06  00 52  EA 01  00 D1  20 01  00"
  params: []

- id: frame_lock_sdi*_set_off
  label: "FRAME LOCK - SDI* Set OFF"
  kind: action
  command: "BE  EF 03 06  00 C2  E4 01  00 E1  20 00  00"
  params: []

- id: frame_lock_sdi*_set_on
  label: "FRAME LOCK - SDI* Set ON"
  kind: action
  command: "BE  EF 03 06  00 52  E5 01  00 E1  20 01  00"
  params: []

- id: frame_lock_display_port_set_off
  label: "FRAME LOCK - DisplayPort Set OFF"
  kind: action
  command: "BE  EF 03 06  00 02  E0 01  00 F1  20 00  00"
  params: []

- id: frame_lock_display_port_set_on
  label: "FRAME LOCK - DisplayPort Set ON"
  kind: action
  command: "BE  EF 03 06  00 92  E1 01  00 F1  20 01  00"
  params: []

- id: picture_position_v_set_top
  label: "PICTURE POSITION V Set TOP"
  kind: action
  command: "BE  EF 03 06  00 02  D0 01  00 09  20 02  00"
  params: []

- id: picture_position_v_set_middle
  label: "PICTURE POSITION V Set MIDDLE"
  kind: action
  command: "BE  EF 03 06  00 62  D1 01  00 09  20 00  00"
  params: []

- id: picture_position_v_set_bottom
  label: "PICTURE POSITION V Set BOTTOM"
  kind: action
  command: "BE  EF 03 06  00 F2  D0 01  00 09  20 01  00"
  params: []

- id: picture_position_h_set_right
  label: "PICTURE POSITION H Set RIGHT"
  kind: action
  command: "BE  EF 03 06  00 46  D5 01  00 1E  20 01  00"
  params: []

- id: picture_position_h_set_middle
  label: "PICTURE POSITION H Set MIDDLE"
  kind: action
  command: "BE  EF 03 06  00 D6  D4 01  00 1E  20 00  00"
  params: []

- id: picture_position_h_set_left
  label: "PICTURE POSITION H Set LEFT"
  kind: action
  command: "BE  EF 03 06  00 B6  D5 01  00 1E  20 02  00"
  params: []

- id: geometric_mode_set_keystone
  label: "GEOMETRIC MODE Set KEYSTONE"
  kind: action
  command: "BE  EF 03 06  00 6B  8C 01  00 30  31 01  00"
  params: []

- id: geometric_mode_set_perfect_fit
  label: "GEOMETRIC MODE Set PERFECT FIT"
  kind: action
  command: "BE  EF 03 06  00 9B  8C 01  00 30  31 02  00"
  params: []

- id: geometric_mode_set_warping
  label: "GEOMETRIC MODE Set WARPING"
  kind: action
  command: "BE  EF 03 06  00 3B  8F 01  00 30  31 04  00"
  params: []

- id: keystone_v_set_increment
  label: "KEYSTONE V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 DF  D3 04  00 07  20 00  00"
  params: []

- id: keystone_v_set_decrement
  label: "KEYSTONE V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 0E  D2 05  00 07  20 00  00"
  params: []

- id: keystone_v_reset_set_execute
  label: "KEYSTONE V Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 08  D0 06  00 0C  70 00  00"
  params: []

- id: keystone_h_set_increment
  label: "KEYSTONE H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 8F  D0 04  00 0B  20 00  00"
  params: []

- id: keystone_h_set_decrement
  label: "KEYSTONE H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 5E  D1 05  00 0B  20 00  00"
  params: []

- id: keystone_h_reset_set_execute
  label: "KEYSTONE H Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  D8 06  00 20  70 00  00"
  params: []

- id: perfect_fit_left_top_h_set_increment
  label: "PERFECT FIT Left Top - H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 57  89 04  00 21  21 00  00"
  params: []

- id: perfect_fit_left_top_h_set_decrement
  label: "PERFECT FIT Left Top - H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  88 05  00 21  21 00  00"
  params: []

- id: perfect_fit_left_top_v_set_increment
  label: "PERFECT FIT Left Top - V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 13  89 04  00 22  21 00  00"
  params: []

- id: perfect_fit_left_top_v_set_decrement
  label: "PERFECT FIT Left Top - V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 C2  88 05  00 22  21 00  00"
  params: []

- id: perfect_fit_right_top_h_set_increment
  label: "PERFECT FIT Right Top - H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  88 04  00 23  21 00  00"
  params: []

- id: perfect_fit_right_top_h_set_decrement
  label: "PERFECT FIT Right Top - H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  89 05  00 23  21 00  00"
  params: []

- id: perfect_fit_right_top_v_set_increment
  label: "PERFECT FIT Right Top - V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  89 04  00 24  21 00  00"
  params: []

- id: perfect_fit_right_top_v_set_decrement
  label: "PERFECT FIT Right Top - V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  88 05  00 24  21 00  00"
  params: []

- id: perfect_fit_left_bottom_h_increment
  label: "PERFECT FIT Left Bottom - H Increment"
  kind: action
  command: "BE  EF 03 06  00 67  88 04  00 25  21 00  00"
  params: []

- id: perfect_fit_left_bottom_h_decrement
  label: "PERFECT FIT Left Bottom - H Decrement"
  kind: action
  command: "BE  EF 03 06  00 B6  89 05  00 25  21 00  00"
  params: []

- id: perfect_fit_left_bottom_v_increment
  label: "PERFECT FIT Left Bottom - V Increment"
  kind: action
  command: "BE  EF 03 06  00 23  88 04  00 26  21 00  00"
  params: []

- id: perfect_fit_left_bottom_v_decrement
  label: "PERFECT FIT Left Bottom - V Decrement"
  kind: action
  command: "BE  EF 03 06  00 F2  89 05  00 26  21 00  00"
  params: []

- id: perfect_fit_right_bottom_h_increment
  label: "PERFECT FIT Right Bottom - H Increment"
  kind: action
  command: "BE  EF 03 06  00 DF  89 04  00 27  21 00  00"
  params: []

- id: perfect_fit_right_bottom_h_decrement
  label: "PERFECT FIT Right Bottom - H Decrement"
  kind: action
  command: "BE  EF 03 06  00 0E  88 05  00 27  21 00  00"
  params: []

- id: perfect_fit_right_bottom_v_increment
  label: "PERFECT FIT Right Bottom - V Increment"
  kind: action
  command: "BE  EF 03 06  00 CB  8A 04  00 28  21 00  00"
  params: []

- id: perfect_fit_right_bottom_v_decrement
  label: "PERFECT FIT Right Bottom - V Decrement"
  kind: action
  command: "BE  EF 03 06  00 1A  8B 05  00 28  21 00  00"
  params: []

- id: perfect_fit_all_corners_reset_execute
  label: "PERFECT FIT All Corners Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 D5  8A 06  00 29  21 00  00"
  params: []

- id: perfect_fit_left_side_distortion_increment
  label: "PERFECT FIT Left Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 57  97 04  00 41  21 00  00"
  params: []

- id: perfect_fit_left_side_distortion_decrement
  label: "PERFECT FIT Left Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  96 05  00 41  21 00  00"
  params: []

- id: perfect_fit_right_side_distortion_increment
  label: "PERFECT FIT Right Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 13  97 04  00 42  21 00  00"
  params: []

- id: perfect_fit_right_side_distortion_decrement
  label: "PERFECT FIT Right Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 C2  96 05  00 42  21 00  00"
  params: []

- id: perfect_fit_top_side_distortion_increment
  label: "PERFECT FIT Top Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  97 04  00 44  21 00  00"
  params: []

- id: perfect_fit_top_side_distortion_decrement
  label: "PERFECT FIT Top Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  96 05  00 44  21 00  00"
  params: []

- id: perfect_fit_bottom_side_distortion_increment
  label: "PERFECT FIT Bottom Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 67  96 04  00 45  21 00  00"
  params: []

- id: perfect_fit_bottom_side_distortion_decrement
  label: "PERFECT FIT Bottom Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 B6  97 05  00 45  21 00  00"
  params: []

- id: perfect_fit_all_sides_reset_execute
  label: "PERFECT FIT All Sides Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 3D  96 06  00 47  21 00  00"
  params: []

- id: perfect_fit_memory_save_1_execute
  label: "PERFECT FIT MemorySave-1 Execute"
  kind: action
  command: "BE  EF 03 06  00 29  95 06  00 48  21 00  00"
  params: []

- id: perfect_fit_memory_save_2_execute
  label: "PERFECT FIT MemorySave-2 Execute"
  kind: action
  command: "BE  EF 03 06  00 D5  94 06  00 49  21 00  00"
  params: []

- id: perfect_fit_memory_save_3_execute
  label: "PERFECT FIT MemorySave-3 Execute"
  kind: action
  command: "BE  EF 03 06  00 91  94 06  00 4A  21 00  00"
  params: []

- id: perfect_fit_memory_load_1_execute
  label: "PERFECT FIT MemoryLoad-1 Execute"
  kind: action
  command: "BE  EF 03 06  00 6D  95 06  00 4B  21 00  00"
  params: []

- id: perfect_fit_memory_load_2_execute
  label: "PERFECT FIT MemoryLoad-2 Execute"
  kind: action
  command: "BE  EF 03 06  00 19  94 06  00 4C  21 00  00"
  params: []

- id: perfect_fit_memory_load_3_execute
  label: "PERFECT FIT MemoryLoad-3 Execute"
  kind: action
  command: "BE  EF 03 06  00 E5  95 06  00 4D  21 00  00"
  params: []

- id: edge_blending_mode_set_off
  label: "EDGE BLENDING MODE Set OFF"
  kind: action
  command: "BE EF 03 06 00 6B 94 01 00 4C 31 00 00"
  params: []

- id: edge_blending_mode_set_manual
  label: "EDGE BLENDING MODE Set MANUAL"
  kind: action
  command: "BE EF 03 06 00 FB 95 01 00 4C 31 01 00"
  params: []

- id: edge_blending_mode_set_camera
  label: "EDGE BLENDING MODE Set CAMERA"
  kind: action
  command: "BE EF 03 06 00 0B 95 01 00 4C 31 02 00"
  params: []

- id: edge_blending_region_reset_set_execute
  label: "EDGE BLENDING REGION Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 8C 96 06 00 40 31 00 00"
  params: []

- id: edge_blending_level_set_increment
  label: "EDGE BLENDING LEVEL Set Increment"
  kind: action
  command: "BE EF 03 06 00 92 96 04 00 41 31 00 00"
  params: []

- id: edge_blending_level_set_decrement
  label: "EDGE BLENDING LEVEL Set Decrement"
  kind: action
  command: "BE EF 03 06 00 43 97 05 00 41 31 00 00"
  params: []

- id: edge_blending_left_set_increment
  label: "EDGE BLENDING LEFT Set Increment"
  kind: action
  command: "BE EF 03 06 00 0E 95 04 00 48 31 00 00"
  params: []

- id: edge_blending_left_set_decrement
  label: "EDGE BLENDING LEFT Set Decrement"
  kind: action
  command: "BE EF 03 06 00 DF 94 05 00 48 31 00 00"
  params: []

- id: edge_blending_right_set_increment
  label: "EDGE BLENDING RIGHT Set Increment"
  kind: action
  command: "BE EF 03 06 00 F2 94 04 00 49 31 00 00"
  params: []

- id: edge_blending_right_set_decrement
  label: "EDGE BLENDING RIGHT Set Decrement"
  kind: action
  command: "BE EF 03 06 00 23 95 05 00 49 31 00 00"
  params: []

- id: edge_blending_top_set_increment
  label: "EDGE BLENDING TOP Set Increment"
  kind: action
  command: "BE EF 03 06 00 B6 94 04 00 4A 31 00 00"
  params: []

- id: edge_blending_top_set_decrement
  label: "EDGE BLENDING TOP Set Decrement"
  kind: action
  command: "BE EF 03 06 00 67 95 05 00 4A 31 00 00"
  params: []

- id: edge_blending_bottom_set_increment
  label: "EDGE BLENDING BOTTOM Set Increment"
  kind: action
  command: "BE EF 03 06 00 4A 95 04 00 4B 31 00 00"
  params: []

- id: edge_blending_bottom_set_decrement
  label: "EDGE BLENDING BOTTOM Set Decrement"
  kind: action
  command: "BE EF 03 06 00 9B 94 05 00 4B 31 00 00"
  params: []

- id: cropping_mode_set_off
  label: "CROPPING MODE Set OFF"
  kind: action
  command: "BE EF 03 06 00 FB 93 01 00 50 31 00 00"
  params: []

- id: cropping_mode_set_on
  label: "CROPPING MODE Set ON"
  kind: action
  command: "BE EF 03 06 00 6B 92 01 00 50 31 01 00"
  params: []

- id: cropping_setup_x_set_increment
  label: "CROPPING SETUP X Set Increment"
  kind: action
  command: "BE EF 03 06 00 CE 91 04 00 58 31 00 00"
  params: []

- id: cropping_setup_x_set_decrement
  label: "CROPPING SETUP X Set Decrement"
  kind: action
  command: "BE EF 03 06 00 1F 90 05 00 58 31 00 00"
  params: []

- id: cropping_setup_y_set_increment
  label: "CROPPING SETUP Y Set Increment"
  kind: action
  command: "BE EF 03 06 00 32 90 04 00 59 31 00 00"
  params: []

- id: cropping_setup_y_set_decrement
  label: "CROPPING SETUP Y Set Decrement"
  kind: action
  command: "BE EF 03 06 00 E3 91 05 00 59 31 00 00"
  params: []

- id: cropping_setup_w_set_increment
  label: "CROPPING SETUP W Set Increment"
  kind: action
  command: "BE EF 03 06 00 76 90 04 00 5A 31 00 00"
  params: []

- id: cropping_setup_w_set_decrement
  label: "CROPPING SETUP W Set Decrement"
  kind: action
  command: "BE EF 03 06 00 A7 91 05 00 5A 31 00 00"
  params: []

- id: cropping_setup_h_set_increment
  label: "CROPPING SETUP H Set Increment"
  kind: action
  command: "BE EF 03 06 00 8A 91 04 00 5B 31 00 00"
  params: []

- id: cropping_setup_h_set_decrement
  label: "CROPPING SETUP H Set Decrement"
  kind: action
  command: "BE EF 03 06 00 5B 90 05 00 5B 31 00 00"
  params: []

- id: cropping_apply_set_execute
  label: "CROPPING Apply Set Execute"
  kind: action
  command: "BE EF 03 06 00 B0 93 06 00 51 31 00 00"
  params: []

- id: cropping_reset_set_execute
  label: "CROPPING Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 F4 93 06 00 52 31 00 00"
  params: []

- id: warping_mode_set_off
  label: "WARPING MODE Set OFF"
  kind: action
  command: "BE EF 03 06 00 FB 9C 01 00 60 31 00 00"
  params: []

- id: warping_mode_set_mode_1
  label: "WARPING MODE Set MODE-1"
  kind: action
  command: "BE EF 03 06 00 6B 9D 01 00 60 31 01 00"
  params: []

- id: warping_mode_set_mode_2
  label: "WARPING MODE Set MODE-2"
  kind: action
  command: "BE EF 03 06 00 9B 9D 01 00 60 31 02 00"
  params: []

- id: warping_mode_set_mode_3
  label: "WARPING MODE Set MODE-3"
  kind: action
  command: "BE EF 03 06 00 0B 9C 01 00 60 31 03 00"
  params: []

- id: dimming_level_set_increment
  label: "DIMMING LEVEL Set Increment"
  kind: action
  command: "BE EF 03 06 00 1A 22 04 00 07 33 00 00"
  params: []

- id: dimming_level_set_decrement
  label: "DIMMING LEVEL Set Decrement"
  kind: action
  command: "BE EF 03 06 00 CB 23 05 00 07 33 00 00"
  params: []

- id: white_balance_offset_r_set_increment
  label: "WHITE BALANCE OFFSET R Set Increment"
  kind: action
  command: "BE EF 03 06 00 6A 72 04 00 50 27 00 00"
  params: []

- id: white_balance_offset_r_set_decrement
  label: "WHITE BALANCE OFFSET R Set Decrement"
  kind: action
  command: "BE EF 03 06 00 BB 73 05 00 50 27 00 00"
  params: []

- id: white_balance_offset_r_reset_set_execute
  label: "WHITE BALANCE OFFSET R Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 38 E2 06 00 F8 70 00 00"
  params: []

- id: white_balance_offset_g_set_increment
  label: "WHITE BALANCE OFFSET G Set Increment"
  kind: action
  command: "BE EF 03 06 00 96 73 04 00 51 27 00 00"
  params: []

- id: white_balance_offset_g_set_decrement
  label: "WHITE BALANCE OFFSET G Set Decrement"
  kind: action
  command: "BE EF 03 06 00 47 72 05 00 51 27 00 00"
  params: []

- id: white_balance_offset_g_reset_set_execute
  label: "WHITE BALANCE OFFSET G REset Set Execute"
  kind: action
  command: "BE EF 03 06 00 C4 E3 06 00 F9 70 00 00"
  params: []

- id: white_balance_offset_b_set_increment
  label: "WHITE BALANCE OFFSET B Set Increment"
  kind: action
  command: "BE EF 03 06 00 D2 73 04 00 52 27 00 00"
  params: []

- id: white_balance_offset_b_set_decrement
  label: "WHITE BALANCE OFFSET B Set Decrement"
  kind: action
  command: "BE EF 03 06 00 03 72 05 00 52 27 00 00"
  params: []

- id: white_balance_offset_b_reset_set_execute
  label: "WHITE BALANCE OFFSET B Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 80 E3 06 00 FA 70 00 00"
  params: []

- id: white_balance_gain_r_increment
  label: "WHITE BALANCE GAIN R Increment"
  kind: action
  command: "BE EF 03 06 00 5A 73 04 00 54 27 00 00"
  params: []

- id: white_balance_gain_r_decrement
  label: "WHITE BALANCE GAIN R Decrement"
  kind: action
  command: "BE EF 03 06 00 8B 72 05 00 54 27 00 00"
  params: []

- id: white_balance_gain_r_reset_execute
  label: "WHITE BALANCE GAIN R Reset Execute"
  kind: action
  command: "BE EF 03 06 00 08 E3 06 00 FC 70 00 00"
  params: []

- id: white_balance_gain_g_increment
  label: "WHITE BALANCE GAIN G Increment"
  kind: action
  command: "BE EF 03 06 00 A6 72 04 00 55 27 00 00"
  params: []

- id: white_balance_gain_g_decrement
  label: "WHITE BALANCE GAIN G Decrement"
  kind: action
  command: "BE EF 03 06 00 77 73 05 00 55 27 00 00"
  params: []

- id: white_balance_gain_g_reset_execute
  label: "WHITE BALANCE GAIN G Reset Execute"
  kind: action
  command: "BE EF 03 06 00 F4 E2 06 00 FD 70 00 00"
  params: []

- id: white_balance_gain_b_increment
  label: "WHITE BALANCE GAIN B Increment"
  kind: action
  command: "BE EF 03 06 00 E2 72 04 00 56 27 00 00"
  params: []

- id: white_balance_gain_b_decrement
  label: "WHITE BALANCE GAIN B Decrement"
  kind: action
  command: "BE EF 03 06 00 33 73 05 00 56 27 00 00"
  params: []

- id: white_balance_gain_b_reset_execute
  label: "WHITE BALANCE GAIN B Reset Execute"
  kind: action
  command: "BE EF 03 06 00 B0 E2 06 00 FE 70 00 00"
  params: []

- id: black_level_r_increment
  label: "BLACK LEVEL R Increment"
  kind: action
  command: "BE EF 03 06 00 AA 76 04 00 40 27 00 00"
  params: []

- id: black_level_r_decrement
  label: "BLACK LEVEL R Decrement"
  kind: action
  command: "BE EF 03 06 00 7B 77 05 00 40 27 00 00"
  params: []

- id: black_level_r_reset_execute
  label: "BLACK LEVEL R Reset Execute"
  kind: action
  command: "BE EF 03 06 00 68 E1 06 00 F4 70 00 00"
  params: []

- id: black_level_g_increment
  label: "BLACK LEVEL G Increment"
  kind: action
  command: "BE EF 03 06 00 56 77 04 00 41 27 00 00"
  params: []

- id: black_level_g_decrement
  label: "BLACK LEVEL G Decrement"
  kind: action
  command: "BE EF 03 06 00 87 76 05 00 41 27 00 00"
  params: []

- id: black_level_g_reset_execute
  label: "BLACK LEVEL G Reset Execute"
  kind: action
  command: "BE EF 03 06 00 94 E0 06 00 F5 70 00 00"
  params: []

- id: black_level_b_increment
  label: "BLACK LEVEL B Increment"
  kind: action
  command: "BE EF 03 06 00 12 77 04 00 42 27 00 00"
  params: []

- id: black_level_b_decrement
  label: "BLACK LEVEL B Decrement"
  kind: action
  command: "BE EF 03 06 00 C3 76 05 00 42 27 00 00"
  params: []

- id: black_level_b_reset_execute
  label: "BLACK LEVEL B Reset Execute"
  kind: action
  command: "BE EF 03 06 00 D0 E0 06 00 F6 70 00 00"
  params: []

- id: black_level_w_increment
  label: "BLACK LEVEL W Increment"
  kind: action
  command: "BE EF 03 06 00 EE 76 04 00 43 27 00 00"
  params: []

- id: black_level_w_decrement
  label: "BLACK LEVEL W Decrement"
  kind: action
  command: "BE EF 03 06 00 3F 77 05 00 43 27 00 00"
  params: []

- id: black_level_w_reset_execute
  label: "BLACK LEVEL W Reset Execute"
  kind: action
  command: "BE EF 03 06 00 2C E1 06 00 F7 70 00 00"
  params: []

- id: image_optimizer_set_off
  label: "IMAGE OPTIMIZER Set OFF"
  kind: action
  command: "BE  EF 03 06  00 D6  71 01  00 0E  22 00  00"
  params: []

- id: image_optimizer_set_on
  label: "IMAGE OPTIMIZER Set ON"
  kind: action
  command: "BE  EF 03 06  00 46  70 01  00 0E  22 01  00"
  params: []

- id: eco_mode_set_normal
  label: "ECO MODE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 3B  23 01  00 00  33 00  00"
  params: []

- id: eco_mode_set_eco
  label: "ECO MODE Set ECO"
  kind: action
  command: "BE  EF 03 06  00 AB  22 01  00 00  33 01  00"
  params: []

- id: installation_set_front_desktop
  label: "INSTALLATION Set FRONT / DESKTOP"
  kind: action
  command: "BE  EF 03 06  00 C7  D2 01  00 01  30 00  00"
  params: []

- id: installation_set_rear_desktop
  label: "INSTALLATION Set REAR / DESKTOP"
  kind: action
  command: "BE  EF 03 06  00 57  D3 01  00 01  30 01  00"
  params: []

- id: installation_set_rear_ceiling
  label: "INSTALLATION Set REAR / CEILING"
  kind: action
  command: "BE  EF 03 06  00 A7  D3 01  00 01  30 02  00"
  params: []

- id: installation_set_front_ceiling
  label: "INSTALLATION Set FRONT / CEILING"
  kind: action
  command: "BE  EF 03 06  00 37  D2 01  00 01  30 03  00"
  params: []

- id: standby_mode_set_normal
  label: "STANDBY MODE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 D6  D2 01  00 01  60 00  00"
  params: []

- id: standby_mode_set_saving
  label: "STANDBY MODE Set SAVING"
  kind: action
  command: "BE  EF 03 06  00 46  D3 01  00 01  60 01  00"
  params: []

- id: color_uniformity_level_set_1
  label: "COLOR UNIFORMITY LEVEL Set 1"
  kind: action
  command: "BE EF 03 06 00 AF 6D 01 00 30 27 01 00"
  params: []

- id: color_uniformity_level_set_2
  label: "COLOR UNIFORMITY LEVEL Set 2"
  kind: action
  command: "BE EF 03 06 00 5F 6D 01 00 30 27 02 00"
  params: []

- id: color_uniformity_level_set_3
  label: "COLOR UNIFORMITY LEVEL Set 3"
  kind: action
  command: "BE EF 03 06 00 CF 6C 01 00 30 27 03 00"
  params: []

- id: color_uniformity_level_set_4
  label: "COLOR UNIFORMITY LEVEL Set 4"
  kind: action
  command: "BE EF 03 06 00 FF 6E 01 00 30 27 04 00"
  params: []

- id: color_uniformity_area_set_top_left
  label: "COLOR UNIFORMITY AREA Set TopLeft"
  kind: action
  command: "BE EF 03 06 00 C3 6D 01 00 31 27 00 00"
  params: []

- id: color_uniformity_area_set_top
  label: "COLOR UNIFORMITY AREA Set Top"
  kind: action
  command: "BE EF 03 06 00 53 6C 01 00 31 27 01 00"
  params: []

- id: color_uniformity_area_set_top_right
  label: "COLOR UNIFORMITY AREA Set Top Right"
  kind: action
  command: "BE EF 03 06 00 A3 6C 01 00 31 27 02 00"
  params: []

- id: color_uniformity_area_set_left
  label: "COLOR UNIFORMITY AREA Set Left"
  kind: action
  command: "BE EF 03 06 00 03 AC 01 00 31 27 00 01"
  params: []

- id: color_uniformity_area_set_all
  label: "COLOR UNIFORMITY AREA Set All"
  kind: action
  command: "BE EF 03 06 00 93 AD 01 00 31 27 01 01"
  params: []

- id: color_uniformity_area_set_right
  label: "COLOR UNIFORMITY AREA Set Right"
  kind: action
  command: "BE EF 03 06 00 63 AD 01 00 31 27 02 01"
  params: []

- id: color_uniformity_area_set_bottom_left
  label: "COLOR UNIFORMITY AREA Set Bottom Left"
  kind: action
  command: "BE EF 03 06 00 02 EC 01 00 31 27 00 02"
  params: []

- id: color_uniformity_area_set_bottom
  label: "COLOR UNIFORMITY AREA Set Bottom"
  kind: action
  command: "BE EF 03 06 00 92 ED 01 00 31 27 01 02"
  params: []

- id: color_uniformity_area_set_bottom_right
  label: "COLOR UNIFORMITY AREA Set Bottom Right"
  kind: action
  command: "BE EF 03 06 00 62 ED 01 00 31 27 02 02"
  params: []

- id: color_uniformity_r_set_increment
  label: "COLOR UNIFORMITY R Set Increment"
  kind: action
  command: "BE EF 03 06 00 D2 6D 04 00 32 27 00 00"
  params: []

- id: color_uniformity_r_set_decrement
  label: "COLOR UNIFORMITY R Set Decrement"
  kind: action
  command: "BE EF 03 06 00 03 6C 05 00 32 27 00 00"
  params: []

- id: color_uniformity_r_reset_set_execute
  label: "COLOR UNIFORMITY R Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 58 E0 06 00 F0 70 00 00"
  params: []

- id: color_uniformity_g_set_increment
  label: "COLOR UNIFORMITY G Set Increment"
  kind: action
  command: "BE EF 03 06 00 2E 6C 04 00 33 27 00 00"
  params: []

- id: color_uniformity_g_set_decrement
  label: "COLOR UNIFORMITY G Set Decrement"
  kind: action
  command: "BE EF 03 06 00 FF 6D 05 00 33 27 00 00"
  params: []

- id: color_uniformity_g_reset_set_execute
  label: "COLOR UNIFORMITY G Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 A4 E1 06 00 F1 70 00 00"
  params: []

- id: color_uniformity_b_set_increment
  label: "COLOR UNIFORMITY B Set Increment"
  kind: action
  command: "BE EF 03 06 00 5A 6D 04 00 34 27 00 00"
  params: []

- id: color_uniformity_b_set_decrement
  label: "COLOR UNIFORMITY B Set Decrement"
  kind: action
  command: "BE EF 03 06 00 8B 6C 05 00 34 27 00 00"
  params: []

- id: color_uniformity_b_reset_set_execute
  label: "COLOR UNIFORMITY B Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 E0 E1 06 00 F2 70 00 00"
  params: []

- id: color_uniformity_all_reset_execute
  label: "COLOR UNIFORMITY ALL Reset Execute"
  kind: action
  command: "BE EF 03 06 00 1C E0 06 00 F3 70 00 00"
  params: []

- id: color_uniformity_pattern_set_off
  label: "COLOR UNIFORMITY PATTERN Set OFF"
  kind: action
  command: "BE EF 03 06 00 B7 6C 01 00 36 27 00 00"
  params: []

- id: color_uniformity_pattern_set_on
  label: "COLOR UNIFORMITY PATTERN Set ON"
  kind: action
  command: "BE EF 03 06 00 27 6D 01 00 36 27 01 00"
  params: []

- id: volume_computer_in_set_increment
  label: "VOLUME - COMPUTER IN Set Increment"
  kind: action
  command: "BE  EF 03 06  00 AB  CC 04  00 60  20 00  00"
  params: []

- id: volume_computer_in_set_decrement
  label: "VOLUME - COMPUTER IN Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 7A  CD 05  00 60  20 00  00"
  params: []

- id: volume_lan_set_increment
  label: "VOLUME - LAN Set Increment"
  kind: action
  command: "BE  EF 03 06  00 8F  CE 04  00 6B  20 00  00"
  params: []

- id: volume_lan_set_decrement
  label: "VOLUME - LAN Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 5E  CF 05  00 6B  20 00  00"
  params: []

- id: volume_hdmi_1_set_increment
  label: "VOLUME - HDMI 1 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  CC 04  00 63  20 00  00"
  params: []

- id: volume_hdmi_1_set_decrement
  label: "VOLUME - HDMI 1 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  CD 05  00 63  20 00  00"
  params: []

- id: volume_hdmi_2_set_increment
  label: "VOLUME - HDMI 2 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 07  CE 04  00 6D  20 00  00"
  params: []

- id: volume_hdmi_2_set_decrement
  label: "VOLUME - HDMI 2 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 D6  CF 05  00 6D  20 00  00"
  params: []

- id: volume_hdbase_t_set_increment
  label: "VOLUME - HDBaseT Set Increment"
  kind: action
  command: "BE  EF 03 06  00 A7  EA 04  00 D5  20 00  00"
  params: []

- id: volume_hdbase_t_set_decrement
  label: "VOLUME - HDBaseT Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 76  EB 05  00 D5  20 00  00"
  params: []

- id: volume_video_set_increment
  label: "VOLUME - VIDEO Set Increment"
  kind: action
  command: "BE  EF 03 06  00 57  CD 04  00 61  20 00  00"
  params: []

- id: volume_video_set_decrement
  label: "VOLUME - VIDEO Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  CC 05  00 61  20 00  00"
  params: []

- id: volume_sdi*_set_increment
  label: "VOLUME - SDI* Set Increment"
  kind: action
  command: "BE EF 03 06 00 A7 E5 04 00 E5 20 00 00"
  params: []

- id: volume_sdi*_set_decrement
  label: "VOLUME - SDI* Set Decrement"
  kind: action
  command: "BE EF 03 06 00 76 E4 05 00 E5 20 00 00"
  params: []

- id: volume_display_port_set_increment
  label: "VOLUME - DisplayPort Set Increment"
  kind: action
  command: "BE EF 03 06 00 67 E1 04 00 F5 20 00 00"
  params: []

- id: volume_display_port_set_decrement
  label: "VOLUME - DisplayPort Set Decrement"
  kind: action
  command: "BE EF 03 06 00 B6 E0 05 00 F5 20 00 00"
  params: []

- id: volume_standby_set_increment
  label: "VOLUME - STANDBY Set Increment"
  kind: action
  command: "BE  EF 03 06  00 BF  CF 04  00 6F  20 00  00"
  params: []

- id: volume_standby_set_decrement
  label: "VOLUME - STANDBY Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 6E  CE 05  00 6F  20 00  00"
  params: []

- id: volume_all_set_increment
  label: "VOLUME - ALL Set Increment"
  kind: action
  command: "BE  EF 03 06  00 AB  C3 04  00 50  20 00  00"
  params: []

- id: volume_all_set_decrement
  label: "VOLUME - ALL Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 7A  C2 05  00 50  20 00  00"
  params: []

- id: mute_set_off
  label: "MUTE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 46  D3 01  00 02  20 00  00"
  params: []

- id: mute_set_on
  label: "MUTE Set ON"
  kind: action
  command: "BE  EF 03 06  00 D6  D2 01  00 02  20 01  00"
  params: []

- id: av_mute_set_off
  label: "AV MUTE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FE  F0 01  00 A0  20 00  00"
  params: []

- id: av_mute_set_on
  label: "AV MUTE Set ON"
  kind: action
  command: "BE  EF 03 06  00 6E  F1 01  00 A0  20 01  00"
  params: []

- id: speaker_set_off
  label: "SPEAKER Set OFF"
  kind: action
  command: "BE  EF 03 06  00 6E  D5 01  00 1C  20 00  00"
  params: []

- id: speaker_set_on
  label: "SPEAKER Set ON"
  kind: action
  command: "BE  EF 03 06  00 FE  D4 01  00 1C  20 01  00"
  params: []

- id: audio_source_computer_in_set_audio_in1
  label: "AUDIO SOURCE - COMPUTER IN Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 6E  DC 01  00 30  20 01  00"
  params: []

- id: audio_source_computer_in_set_audio_in2
  label: "AUDIO SOURCE - COMPUTER IN Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 9E  DC 01  00 30  20 02  00"
  params: []

- id: audio_source_computer_in_set_off
  label: "AUDIO SOURCE - COMPUTER IN Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FE  DD 01  00 30  20 00  00"
  params: []

- id: audio_source_lan_set_audio_in1
  label: "AUDIO SOURCE - LAN Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 4A  DE 01  00 3B  20 01  00"
  params: []

- id: audio_source_lan_set_audio_in2
  label: "AUDIO SOURCE - LAN Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 BA  DE 01  00 3B  20 02  00"
  params: []

- id: audio_source_lan_set_audio_lan
  label: "AUDIO SOURCE - LAN Set AUDIO LAN"
  kind: action
  command: "BE  EF 03 06  00 8A  D3 01  00 3B  20 11  00"
  params: []

- id: audio_source_lan_set_off
  label: "AUDIO SOURCE - LAN Set OFF"
  kind: action
  command: "BE  EF 03 06  00 DA  DF 01  00 3B  20 00  00"
  params: []

- id: audio_source_hdmi_1_set_audio_in1
  label: "AUDIO SOURCE - HDMI 1 Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 2A  DC 01  00 33  20 01  00"
  params: []

- id: audio_source_hdmi_1_set_audio_in2
  label: "AUDIO SOURCE - HDMI 1 Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 DA  DC 01  00 33  20 02  00"
  params: []

- id: audio_source_hdmi_1_set_audio_hdmi_1
  label: "AUDIO SOURCE - HDMI 1 Set AUDIO HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 7A  C4 01  00 33  20 20  00"
  params: []

- id: audio_source_hdmi_1_set_off
  label: "AUDIO SOURCE - HDMI 1 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 BA  DD 01  00 33  20 00  00"
  params: []

- id: audio_source_hdmi_2_set_audio_in1
  label: "AUDIO SOURCE - HDMI 2 Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 C2  DE 01  00 3D  20 01  00"
  params: []

- id: audio_source_hdmi_2_set_audio_in2
  label: "AUDIO SOURCE - HDMI 2 Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 32  DE 01  00 3D  20 02  00"
  params: []

- id: audio_source_hdmi_2_set_audio_hdmi_2
  label: "AUDIO SOURCE - HDMI 2 Set AUDIO HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 02  C7 01  00 3D  20 21  00"
  params: []

- id: audio_source_hdmi_2_set_off
  label: "AUDIO SOURCE - HDMI 2 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 52  DF 01  00 3D  20 00  00"
  params: []

- id: audio_source_hdbase_t_set_audio_in1
  label: "AUDIO SOURCE - HDBaseT Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 9E  EA 01  00 D4  20 01  00"
  params: []

- id: audio_source_hdbase_t_set_audio_in2
  label: "AUDIO SOURCE - HDBaseT Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 6E  EA 01  00 D4  20 02  00"
  params: []

- id: audio_source_hdbase_t_set_audio_hdbase_t
  label: "AUDIO SOURCE - HDBaseT Set AUDIO HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 0E  F0 01  00 D4  20 24  00"
  params: []

- id: audio_source_hdbase_t_set_off
  label: "AUDIO SOURCE - HDBaseT Set OFF"
  kind: action
  command: "BE  EF 03 06  00 0E  EB 01  00 D4  20 00  00"
  params: []

- id: audio_source_sdi*_set_audio_in1
  label: "AUDIO SOURCE - SDI* Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 9E E5 01 00 E4 20 01 00"
  params: []

- id: audio_source_sdi*_set_audio_in2
  label: "AUDIO SOURCE - SDI* Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 6E E5 01 00 E4 20 02 00"
  params: []

- id: audio_source_sdi*_set_off
  label: "AUDIO SOURCE - SDI* Set OFF"
  kind: action
  command: "BE EF 03 06 00 0E E4 01 00 E4 20 00 00"
  params: []

- id: audio_source_display_port_set_audio_in1
  label: "AUDIO SOURCE - DisplayPort Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 5E E1 01 00 F4 20 01 00"
  params: []

- id: audio_source_display_port_set_audio_in2
  label: "AUDIO SOURCE - DisplayPort Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 AE E1 01 00 F4 20 02 00"
  params: []

- id: audio_source_display_port_set_audio_display_port
  label: "AUDIO SOURCE - DisplayPort Set AUDIO DisplayPort"
  kind: action
  command: "BE EF 03 06 00 AE FA 01 00 F4 20 26 00"
  params: []

- id: audio_source_display_port_set_off
  label: "AUDIO SOURCE - DisplayPort Set OFF"
  kind: action
  command: "BE EF 03 06 00 CE E0 01 00 F4 20 00 00"
  params: []

- id: audio_source_video_set_audio_in1
  label: "AUDIO SOURCE - VIDEO Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 92  DD 01  00 31  20 01  00"
  params: []

- id: audio_source_video_set_audio_in2
  label: "AUDIO SOURCE - VIDEO Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 62  DD 01  00 31  20 02  00"
  params: []

- id: audio_source_video_set_off
  label: "AUDIO SOURCE - VIDEO Set OFF"
  kind: action
  command: "BE  EF 03 06  00 02  DC 01  00 31  20 00  00"
  params: []

- id: audio_source_audio_out_standby_set_audio_in1
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 7A  DF 01  00 3F  20 01  00"
  params: []

- id: audio_source_audio_out_standby_set_audio_in2
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 8A  DF 01  00 3F  20 02  00"
  params: []

- id: audio_source_audio_out_standby_set_hdmi_1
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set HDMI 1"
  kind: action
  command: "BE  EF 03 06  00 2A  C7 01  00 3F  20 20  00"
  params: []

- id: audio_source_audio_out_standby_set_hdmi_2
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set HDMI 2"
  kind: action
  command: "BE  EF 03 06  00 BA  C6 01  00 3F  20 21  00"
  params: []

- id: audio_source_audio_out_standby_set_hdbase_t
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set HDBaseT"
  kind: action
  command: "BE  EF 03 06  00 EA  C5 01  00 3F  20 24  00"
  params: []

- id: audio_source_audio_out_standby_set_display_port
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set DisplayPort"
  kind: action
  command: "BE  EF 03 06  00 8A  C4 01  00 3F  20 26  00"
  params: []

- id: audio_source_audio_out_standby_set_off
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set OFF"
  kind: action
  command: "BE  EF 03 06  00 EA  DE 01  00 3F  20 00  00"
  params: []

- id: lan_sound_enable_set_disable
  label: "LAN SOUND ENABLE Set Disable"
  kind: action
  command: "BE  EF 03 06  00 BA  F0 01  00 A3  20 00  00"
  params: []

- id: lan_sound_enable_set_enable
  label: "LAN SOUND ENABLE Set Enable"
  kind: action
  command: "BE  EF 03 06  00 2A  F1 01  00 A3  20 01  00"
  params: []

- id: language_set_english
  label: "LANGUAGE Set ENGLISH"
  kind: action
  command: "BE  EF 03 06  00 F7  D3 01  00 05  30 00  00"
  params: []

- id: language_set_français
  label: "LANGUAGE Set FRANÇAIS"
  kind: action
  command: "BE  EF 03 06  00 67  D2 01  00 05  30 01  00"
  params: []

- id: language_set_deutsch
  label: "LANGUAGE Set DEUTSCH"
  kind: action
  command: "BE  EF 03 06  00 97  D2 01  00 05  30 02  00"
  params: []

- id: language_set_español
  label: "LANGUAGE Set ESPAÑOL"
  kind: action
  command: "BE  EF 03 06  00 07  D3 01  00 05  30 03  00"
  params: []

- id: language_set_italiano
  label: "LANGUAGE Set ITALIANO"
  kind: action
  command: "BE  EF 03 06  00 37  D1 01  00 05  30 04  00"
  params: []

- id: language_set_norsk
  label: "LANGUAGE Set NORSK"
  kind: action
  command: "BE  EF 03 06  00 A7  D0 01  00 05  30 05  00"
  params: []

- id: language_set_nederlands
  label: "LANGUAGE Set NEDERLANDS"
  kind: action
  command: "BE  EF 03 06  00 57  D0 01  00 05  30 06  00"
  params: []

- id: language_set_português
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 C7  D1 01  00 05  30 07  00"
  params: []

- id: language_set_português_2
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 37  D4 01  00 05  30 08  00"
  params: []

- id: language_set_português_3
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 A7  D5 01  00 05  30 09  00"
  params: []

- id: language_set_português_4
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 37  DE 01  00 05  30 10  00"
  params: []

- id: language_set_português_5
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 57  D5 01  00 05  30 0A  00"
  params: []

- id: language_set_svenska
  label: "LANGUAGE Set SVENSKA"
  kind: action
  command: "BE  EF 03 06  00 C7  D4 01  00 05  30 0B  00"
  params: []

- id: language_set_pуcckий
  label: "LANGUAGE Set PУCCKИЙ"
  kind: action
  command: "BE  EF 03 06  00 F7  D6 01  00 05  30 0C  00"
  params: []

- id: language_set_suomi
  label: "LANGUAGE Set SUOMI"
  kind: action
  command: "BE  EF 03 06  00 67  D7 01  00 05  30 0D  00"
  params: []

- id: language_set_polski
  label: "LANGUAGE Set POLSKI"
  kind: action
  command: "BE  EF 03 06  00 97  D7 01  00 05  30 0E  00"
  params: []

- id: language_set_türkçe
  label: "LANGUAGE Set TÜRKÇE"
  kind: action
  command: "BE  EF 03 06  00 07  D6 01  00 05  30 0F  00"
  params: []

- id: language_set_dansk
  label: "LANGUAGE Set DANSK"
  kind: action
  command: "BE  EF 03 06  00 A7  DF 01  00 05  30 11  00"
  params: []

- id: language_set_česky
  label: "LANGUAGE Set ČESKY"
  kind: action
  command: "BE  EF 03 06  00 57  DF 01  00 05  30 12  00"
  params: []

- id: language_set_magyar
  label: "LANGUAGE Set MAGYAR"
  kind: action
  command: "BE  EF 03 06  00 C7  DE 01  00 05  30 13  00"
  params: []

- id: language_set_română
  label: "LANGUAGE Set ROMÂNĂ"
  kind: action
  command: "BE  EF 03 06  00 F7  DC 01  00 05  30 14  00"
  params: []

- id: language_set_slovenski
  label: "LANGUAGE Set SLOVENSKI"
  kind: action
  command: "BE  EF 03 06  00 67  DD 01  00 05  30 15  00"
  params: []

- id: language_set_hrvatski
  label: "LANGUAGE Set HRVATSKI"
  kind: action
  command: "BE  EF 03 06  00 97  DD 01  00 05  30 16  00"
  params: []

- id: language_set_ελληνικα
  label: "LANGUAGE Set ΕΛΛΗΝΙΚΑ"
  kind: action
  command: "BE  EF 03 06  00 07  DC 01  00 05  30 17  00"
  params: []

- id: language_set_lietuvių
  label: "LANGUAGE Set LIETUVIŲ"
  kind: action
  command: "BE  EF 03 06  00 F7  D9 01  00 05  30 18  00"
  params: []

- id: language_set_eesti
  label: "LANGUAGE Set EESTI"
  kind: action
  command: "BE  EF 03 06  00 67  D8 01  00 05  30 19  00"
  params: []

- id: language_set_latviešu
  label: "LANGUAGE Set LATVIEŠU"
  kind: action
  command: "BE  EF 03 06  00 97  D8 01  00 05  30 1A  00"
  params: []

- id: language_set_ไทย
  label: "LANGUAGE Set ไทย"
  kind: action
  command: "BE  EF 03 06  00 07  D9 01  00 05  30 1B  00"
  params: []

- id: language_set_ةیبرعلا_ةغللا
  label: "LANGUAGE Set ةیبرعلا ةغللا"
  kind: action
  command: "BE  EF 03 06  00 37  DB 01  00 05  30 1C  00"
  params: []

- id: language_set_ىسراف
  label: "LANGUAGE Set ىسراف"
  kind: action
  command: "BE  EF 03 06  00 A7  DA 01  00 05  30 1D  00"
  params: []

- id: language_set_português_bra
  label: "LANGUAGE Set PORTUGUÊS BRA"
  kind: action
  command: "BE  EF 03 06  00 57  DA 01  00 05  30 1E  00"
  params: []

- id: language_set_bahasa_ind
  label: "LANGUAGE Set BAHASA IND"
  kind: action
  command: "BE EF 03 06 00 C7 DB 01 00 05 30 1F 00"
  params: []

- id: language_set_tieng_viet
  label: "LANGUAGE Set TIENG VIET"
  kind: action
  command: "BE EF 03 06 00 37 CA 01 00 05 30 20 00"
  params: []

- id: menu_position_v_increment
  label: "MENU POSITION V Increment"
  kind: action
  command: "BE  EF 03 06  00 26  D7 04  00 16  30 00  00"
  params: []

- id: menu_position_v_decrement
  label: "MENU POSITION V Decrement"
  kind: action
  command: "BE  EF 03 06  00 F7  D6 05  00 16  30 00  00"
  params: []

- id: menu_position_v_reset_execute
  label: "MENU POSITION V Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A8  C7 06  00 44  70 00  00"
  params: []

- id: menu_position_h_increment
  label: "MENU POSITION H Increment"
  kind: action
  command: "BE  EF 03 06  00 62  D7 04  00 15  30 00  00"
  params: []

- id: menu_position_h_decrement
  label: "MENU POSITION H Decrement"
  kind: action
  command: "BE  EF 03 06  00 B3  D6 05  00 15  30 00  00"
  params: []

- id: menu_position_h_reset_execute
  label: "MENU POSITION H Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 DC  C6 06  00 43  70 00  00"
  params: []

- id: blank_set_my_screen
  label: "BLANK Set MyScreen"
  kind: action
  command: "BE  EF 03 06  00 FB  CA 01  00 00  30 20  00"
  params: []

- id: blank_set_original
  label: "BLANK Set ORIGINAL"
  kind: action
  command: "BE  EF 03 06  00 FB  E2 01  00 00  30 40  00"
  params: []

- id: blank_set_blue
  label: "BLANK Set BLUE"
  kind: action
  command: "BE  EF 03 06  00 CB  D3 01  00 00  30 03  00"
  params: []

- id: blank_set_white
  label: "BLANK Set WHITE"
  kind: action
  command: "BE  EF 03 06  00 6B  D0 01  00 00  30 05  00"
  params: []

- id: blank_set_black
  label: "BLANK Set BLACK"
  kind: action
  command: "BE  EF 03 06  00 9B  D0 01  00 00  30 06  00"
  params: []

- id: blank_on_off_set_off
  label: "BLANK On/Off Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FB  D8 01  00 20  30 00  00"
  params: []

- id: blank_on_off_set_on
  label: "BLANK On/Off Set ON"
  kind: action
  command: "BE  EF 03 06  00 6B  D9 01  00 20  30 01  00"
  params: []

- id: auto_blank_set_blue
  label: "AUTO BLANK Set BLUE"
  kind: action
  command: "BE  EF 03 06  00 67  D1 01  00 0D  30 03  00"
  params: []

- id: auto_blank_set_white
  label: "AUTO BLANK Set WHITE"
  kind: action
  command: "BE  EF 03 06  00 C7  D2 01  00 0D  30 05  00"
  params: []

- id: auto_blank_set_black
  label: "AUTO BLANK Set BLACK"
  kind: action
  command: "BE  EF 03 06  00 37  D2 01  00 0D  30 06  00"
  params: []

- id: start_up_set_my_screen
  label: "START UP Set MyScreen"
  kind: action
  command: "BE  EF 03 06  00 CB  CB 01  00 04  30 20  00"
  params: []

- id: start_up_set_original
  label: "START UP Set ORIGINAL"
  kind: action
  command: "BE  EF 03 06  00 0B  D2 01  00 04  30 00  00"
  params: []

- id: start_up_set_off
  label: "START UP Set OFF"
  kind: action
  command: "BE  EF 03 06  00 9B  D3 01  00 04  30 01  00"
  params: []

- id: my_screen_lock_set_off
  label: "MyScreen Lock Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  EF 01  00 C0  30 00  00"
  params: []

- id: my_screen_lock_set_on
  label: "MyScreen Lock Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  EE 01  00 C0  30 01  00"
  params: []

- id: osd_message_set_silent
  label: "OSD MESSAGE Set SILENT"
  kind: action
  command: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
  params: []

- id: osd_message_set_normal
  label: "OSD MESSAGE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
  params: []

- id: osd_message_set_inhibit
  label: "OSD MESSAGE Set INHIBIT"
  kind: action
  command: "BE EF 03 06 00 EF D7 01 00 17 30 02 00"
  params: []

- id: template_set_test_pattern
  label: "TEMPLATE Set TEST PATTERN"
  kind: action
  command: "BE  EF 03 06  00 43  D9 01  00 22  30 00  00"
  params: []

- id: template_set_dot_line_1
  label: "TEMPLATE Set DOT-LINE 1"
  kind: action
  command: "BE  EF 03 06  00 D3  D8 01  00 22  30 01  00"
  params: []

- id: template_set_dot_line_2
  label: "TEMPLATE Set DOT-LINE 2"
  kind: action
  command: "BE  EF 03 06  00 23  D8 01  00 22  30 02  00"
  params: []

- id: template_set_dot_line_3
  label: "TEMPLATE Set DOT-LINE 3"
  kind: action
  command: "BE  EF 03 06  00 B3  D9 01  00 22  30 03  00"
  params: []

- id: template_set_dot_line_4
  label: "TEMPLATE Set DOT-LINE 4"
  kind: action
  command: "BE  EF 03 06  00 83  DB 01  00 22  30 04  00"
  params: []

- id: template_set_circle_1
  label: "TEMPLATE Set CIRCLE 1"
  kind: action
  command: "BE  EF 03 06  00 13  DA 01  00 22  30 05  00"
  params: []

- id: template_set_circle_2
  label: "TEMPLATE Set CIRCLE 2"
  kind: action
  command: "BE  EF 03 06  00 E3  DA 01  00 22  30 06  00"
  params: []

- id: template_set_map_1
  label: "TEMPLATE Set MAP 1"
  kind: action
  command: "BE  EF 03 06  00 83  D4 01  00 22  30 10  00"
  params: []

- id: template_set_map_2
  label: "TEMPLATE Set MAP 2"
  kind: action
  command: "BE  EF 03 06  00 13  D5 01  00 22  30 11  00"
  params: []

- id: template_set_stack
  label: "TEMPLATE Set STACK"
  kind: action
  command: "BE  EF 03 06  00 83  C0 01  00 22  30 20  00"
  params: []

- id: template_on_off_set_off
  label: "TEMPLATE On/Off Set OFF"
  kind: action
  command: "BE  EF 03 06  00 BF  D8 01  00 23  30 00  00"
  params: []

- id: template_on_off_set_on
  label: "TEMPLATE On/Off Set ON"
  kind: action
  command: "BE  EF 03 06  00 2F  D9 01  00 23  30 01  00"
  params: []

- id: c_c_display_set_off
  label: "C. C. - DISPLAY Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FA  62 01  00 00  37 00  00"
  params: []

- id: c_c_display_set_on
  label: "C. C. - DISPLAY Set ON"
  kind: action
  command: "BE  EF 03 06  00 6A  63 01  00 00  37 01  00"
  params: []

- id: c_c_display_set_auto
  label: "C. C. - DISPLAY Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 9A  63 01  00 00  37 02  00"
  params: []

- id: c_c_mode_set_captions
  label: "C. C. - MODE Set CAPTIONS"
  kind: action
  command: "BE  EF 03 06  00 06  63 01  00 01  37 00  00"
  params: []

- id: c_c_mode_set_text
  label: "C. C. - MODE Set TEXT"
  kind: action
  command: "BE  EF 03 06  00 96  62 01  00 01  37 01  00"
  params: []

- id: c_c_channel_set_1
  label: "C. C. - CHANNEL Set 1"
  kind: action
  command: "BE  EF 03 06  00 D2  62 01  00 02  37 01  00"
  params: []

- id: c_c_channel_set_2
  label: "C. C. - CHANNEL Set 2"
  kind: action
  command: "BE  EF 03 06  00 22  62 01  00 02  37 02  00"
  params: []

- id: c_c_channel_set_3
  label: "C. C. - CHANNEL Set 3"
  kind: action
  command: "BE  EF 03 06  00 B2  63 01  00 02  37 03  00"
  params: []

- id: c_c_channel_set_4
  label: "C. C. - CHANNEL Set 4"
  kind: action
  command: "BE  EF 03 06  00 82  61 01  00 02  37 04  00"
  params: []

- id: source_skip_computer_in_set_normal
  label: "SOURCE SKIP - COMPUTER IN Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 FE  78 01  00 20  22 00  00"
  params: []

- id: source_skip_computer_in_set_skip
  label: "SOURCE SKIP - COMPUTER IN Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 6E  79 01  00 20  22 01  00"
  params: []

- id: source_skip_lan_set_normal
  label: "SOURCE SKIP - LAN Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 DA  7A 01  00 2B  22 00  00"
  params: []

- id: source_skip_lan_set_skip
  label: "SOURCE SKIP - LAN Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 4A  7B 01  00 2B  22 01  00"
  params: []

- id: source_skip_hdmi_1_set_normal
  label: "SOURCE SKIP - HDMI 1 Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 BA  78 01  00 23  22 00  00"
  params: []

- id: source_skip_hdmi_1_set_skip
  label: "SOURCE SKIP - HDMI 1 Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 2A  79 01  00 23  22 01  00"
  params: []

- id: source_skip_hdmi_2_set_normal
  label: "SOURCE SKIP - HDMI 2 Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 52  7A 01  00 2D  22 00  00"
  params: []

- id: source_skip_hdmi_2_set_skip
  label: "SOURCE SKIP - HDMI 2 Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 C2  7B 01  00 2D  22 01  00"
  params: []

- id: source_skip_hdbase_t_set_normal
  label: "SOURCE SKIP - HDBaseT Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 B6  EA 01  00 D6  20 00  00"
  params: []

- id: source_skip_hdbase_t_set_skip
  label: "SOURCE SKIP - HDBaseT Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 26  EB 01  00 D6  20 01  00"
  params: []

- id: source_skip_video_set_normal
  label: "SOURCE SKIP - VIDEO Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 02  79 01  00 21  22 00  00"
  params: []

- id: source_skip_video_set_skip
  label: "SOURCE SKIP - VIDEO Set SKIP"
  kind: action
  command: "BE  EF 03 06  00 92  78 01  00 21  22 01  00"
  params: []

- id: source_skip_sdi*_set_normal
  label: "SOURCE SKIP SDI* Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 B6 E5 01 00 E6 20 00 00"
  params: []

- id: source_skip_sdi*_set_skip
  label: "SOURCE SKIP SDI* Set SKIP"
  kind: action
  command: "BE EF 03 06 00 26 E4 01 00 E6 20 01 00"
  params: []

- id: source_skip_display_port_set_normal
  label: "SOURCE SKIP DisplayPort Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 76 E1 01 00 F6 20 00 00"
  params: []

- id: source_skip_display_port_set_skip
  label: "SOURCE SKIP DisplayPort Set SKIP"
  kind: action
  command: "BE EF 03 06 00 E6 E0 01 00 F6 20 01 00"
  params: []

- id: auto_search_set_off
  label: "AUTO SEARCH Set OFF"
  kind: action
  command: "BE  EF 03 06  00 B6  D6 01  00 16  20 00  00"
  params: []

- id: auto_search_set_on
  label: "AUTO SEARCH Set ON"
  kind: action
  command: "BE  EF 03 06  00 26  D7 01  00 16  20 01  00"
  params: []

- id: direct_power_on_set_off
  label: "DIRECT POWER ON Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  89 01  00 20  31 00  00"
  params: []

- id: direct_power_on_set_on
  label: "DIRECT POWER ON Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  88 01  00 20  31 01  00"
  params: []

- id: auto_power_off_set_increment
  label: "AUTO POWER OFF Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6E  86 04  00 10  31 00  00"
  params: []

- id: auto_power_off_set_decrement
  label: "AUTO POWER OFF Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BF  87 05  00 10  31 00  00"
  params: []

- id: shade_timer_set_1h
  label: "SHADE TIMER Set 1h"
  kind: action
  command: "BE  EF 03 06  00 27  92 01  00 06  24 01  00"
  params: []

- id: shade_timer_set_3h
  label: "SHADE TIMER Set 3h"
  kind: action
  command: "BE  EF 03 06  00 47  93 01  00 06  24 03  00"
  params: []

- id: shade_timer_set_6h
  label: "SHADE TIMER Set 6h"
  kind: action
  command: "BE  EF 03 06  00 17  90 01  00 06  24 06  00"
  params: []

- id: lamp_time_reset_set_execute
  label: "LAMP TIME Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 58  DC 06  00 30  70 00  00"
  params: []

- id: filter_time_reset_set_execute
  label: "FILTER TIME Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  C6 06  00 40  70 00  00"
  params: []

- id: my_button_1_my_image
  label: "MY BUTTON-1 MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 5A  3D 01  00 00  36 16  00"
  params: []

- id: my_button_1_messenger
  label: "MY BUTTON-1 MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 AA  29 01  00 00  36 25  00"
  params: []

- id: my_button_1_shade
  label: "MY BUTTON-1 SHADE"
  kind: action
  command: "BE  EF 03 06  00 5A  26 01  00 00  36 32  00"
  params: []

- id: my_button_1_information
  label: "MY BUTTON-1 INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 FA  3E 01  00 00  36 10  00"
  params: []

- id: my_button_1_my_memory
  label: "MY BUTTON-1 MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 9A  3F 01  00 00  36 12  00"
  params: []

- id: my_button_1_active_iris
  label: "MY BUTTON-1 ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 AA  3D 01  00 00  36 15  00"
  params: []

- id: my_button_1_picture_mode
  label: "MY BUTTON-1 PICTURE MODE"
  kind: action
  command: "BE  EF 03 06  00 0A  3E 01  00 00  36 13  00"
  params: []

- id: my_button_1_filter_reset
  label: "MY BUTTON-1 FILTER RESET"
  kind: action
  command: "BE  EF 03 06  00 3A  3C 01  00 00  36 14  00"
  params: []

- id: my_button_1_template
  label: "MY BUTTON-1 TEMPLATE"
  kind: action
  command: "BE  EF 03 06  00 CA  39 01  00 00  36 1B  00"
  params: []

- id: my_button_1_mute
  label: "MY BUTTON-1 MUTE"
  kind: action
  command: "BE  EF 03 06  00 FA  20 01  00 00  36 38  00"
  params: []

- id: my_button_1_pby_p_pin_p_swap
  label: "MY BUTTON-1 PbyP/PinP SWAP"
  kind: action
  command: "BE  EF 03 06  00 5A  38 01  00 00  36 1A  00"
  params: []

- id: my_button_1_pin_p_position
  label: "MY BUTTON-1 PinP POSITION"
  kind: action
  command: "BE  EF 03 06  00 3A  22 01  00 00  36 3C  00"
  params: []

- id: my_button_1_blank
  label: "MY BUTTON-1 BLANK"
  kind: action
  command: "BE  EF 03 06  00 FA  02 01  00 00  36 40  00"
  params: []

- id: my_button_1_resolution
  label: "MY BUTTON-1 RESOLUTION"
  kind: action
  command: "BE  EF 03 06  00 9A  3A 01  00 00  36 1E  00"
  params: []

- id: my_button_1_eco_mode
  label: "MY BUTTON-1 ECO MODE"
  kind: action
  command: "BE  EF 03 06  00 0A  25 01  00 00  36 37  00"
  params: []

- id: my_button_1_accentualizer
  label: "MY BUTTON-1 ACCENTUALIZER"
  kind: action
  command: "BE  EF 03 06  00 9A  21 01  00 00  36 3A  00"
  params: []

- id: my_button_1_hdcr
  label: "MY BUTTON-1 HDCR"
  kind: action
  command: "BE  EF 03 06  00 5A  23 01  00 00  36 3E  00"
  params: []

- id: my_button_2_my_image
  label: "MY BUTTON-2 MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 A6  3C 01  00 01  36 16  00"
  params: []

- id: my_button_2_messenger
  label: "MY BUTTON-2 MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 56  28 01  00 01  36 25  00"
  params: []

- id: my_button_2_shade
  label: "MY BUTTON-2 SHADE"
  kind: action
  command: "BE  EF 03 06  00 A6  27 01  00 01  36 32  00"
  params: []

- id: my_button_2_information
  label: "MY BUTTON-2 INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 06  3F 01  00 01  36 10  00"
  params: []

- id: my_button_2_my_memory
  label: "MY BUTTON-2 MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 66  3E 01  00 01  36 12  00"
  params: []

- id: my_button_2_active_iris
  label: "MY BUTTON-2 ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 56  3C 01  00 01  36 15  00"
  params: []

- id: my_button_2_picture_mode
  label: "MY BUTTON-2 PICTURE MODE"
  kind: action
  command: "BE  EF 03 06  00 F6  3F 01  00 01  36 13  00"
  params: []

- id: my_button_2_filter_reset
  label: "MY BUTTON-2 FILTER RESET"
  kind: action
  command: "BE  EF 03 06  00 C6  3D 01  00 01  36 14  00"
  params: []

- id: my_button_2_template
  label: "MY BUTTON-2 TEMPLATE"
  kind: action
  command: "BE  EF 03 06  00 36  38 01  00 01  36 1B  00"
  params: []

- id: my_button_2_mute
  label: "MY BUTTON-2 MUTE"
  kind: action
  command: "BE  EF 03 06  00 06  21 01  00 01  36 38  00"
  params: []

- id: my_button_2_pby_p_pin_p_swap
  label: "MY BUTTON-2 PbyP/PinP SWAP"
  kind: action
  command: "BE  EF 03 06  00 A6  39 01  00 01  36 1A  00"
  params: []

- id: my_button_2_pin_p_position
  label: "MY BUTTON-2 PinP POSITION"
  kind: action
  command: "BE  EF 03 06  00 C6  23 01  00 01  36 3C  00"
  params: []

- id: my_button_2_blank
  label: "MY BUTTON-2 BLANK"
  kind: action
  command: "BE  EF 03 06  00 06  03 01  00 01  36 40  00"
  params: []

- id: my_button_2_resolution
  label: "MY BUTTON-2 RESOLUTION"
  kind: action
  command: "BE  EF 03 06  00 66  3B 01  00 01  36 1E  00"
  params: []

- id: my_button_2_eco_mode
  label: "MY BUTTON-2 ECO MODE"
  kind: action
  command: "BE  EF 03 06  00 F6  24 01  00 01  36 37  00"
  params: []

- id: my_button_2_accentualizer
  label: "MY BUTTON-2 ACCENTUALIZER"
  kind: action
  command: "BE  EF 03 06  00 66  20 01  00 01  36 3A  00"
  params: []

- id: my_button_2_hdcr
  label: "MY BUTTON-2 HDCR"
  kind: action
  command: "BE  EF 03 06  00 A6  22 01  00 01  36 3E  00"
  params: []

- id: my_button_3_my_image
  label: "MY BUTTON-3 MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 E2  3C 01  00 02  36 16  00"
  params: []

- id: my_button_3_messenger
  label: "MY BUTTON-3 MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 12  28 01  00 02  36 25  00"
  params: []

- id: my_button_3_shade
  label: "MY BUTTON-3 SHADE"
  kind: action
  command: "BE  EF 03 06  00 E2  27 01  00 02  36 32  00"
  params: []

- id: my_button_3_information
  label: "MY BUTTON-3 INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 42  3F 01  00 02  36 10  00"
  params: []

- id: my_button_3_my_memory
  label: "MY BUTTON-3 MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 22  3E 01  00 02  36 12  00"
  params: []

- id: my_button_3_active_iris
  label: "MY BUTTON-3 ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 12  3C 01  00 02  36 15  00"
  params: []

- id: my_button_3_picture_mode
  label: "MY BUTTON-3 PICTURE MODE"
  kind: action
  command: "BE  EF 03 06  00 B2  3F 01  00 02  36 13  00"
  params: []

- id: my_button_3_filter_reset
  label: "MY BUTTON-3 FILTER RESET"
  kind: action
  command: "BE  EF 03 06  00 82  3D 01  00 02  36 14  00"
  params: []

- id: my_button_3_template
  label: "MY BUTTON-3 TEMPLATE"
  kind: action
  command: "BE  EF 03 06  00 72  38 01  00 02  36 1B  00"
  params: []

- id: my_button_3_mute
  label: "MY BUTTON-3 MUTE"
  kind: action
  command: "BE  EF 03 06  00 42  21 01  00 02  36 38  00"
  params: []

- id: my_button_3_pby_p_pin_p_swap
  label: "MY BUTTON-3 PbyP/PinP SWAP"
  kind: action
  command: "BE  EF 03 06  00 E2  39 01  00 02  36 1A  00"
  params: []

- id: my_button_3_pin_p_position
  label: "MY BUTTON-3 PinP POSITION"
  kind: action
  command: "BE EF 03 06 00 82 23 01 00 02 36 3C 00"
  params: []

- id: my_button_3_blank
  label: "MY BUTTON-3 BLANK"
  kind: action
  command: "BE EF 03 06 00 42 03 01 00 02 36 40 00"
  params: []

- id: my_button_3_resolution
  label: "MY BUTTON-3 RESOLUTION"
  kind: action
  command: "BE  EF 03 06  00 22  3B 01  00 02  36 1E  00"
  params: []

- id: my_button_3_eco_mode
  label: "MY BUTTON-3 ECO MODE"
  kind: action
  command: "BE  EF 03 06  00 B2  24 01  00 02  36 37  00"
  params: []

- id: my_button_3_accentualizer
  label: "MY BUTTON-3 ACCENTUALIZER"
  kind: action
  command: "BE  EF 03 06  00 22  20 01  00 02  36 3A  00"
  params: []

- id: my_button_3_hdcr
  label: "MY BUTTON-3 HDCR"
  kind: action
  command: "BE  EF 03 06  00 E2  22 01  00 02  36 3E  00"
  params: []

- id: my_button_4_my_image
  label: "MY BUTTON-4 MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 1E  3D 01  00 03  36 16  00"
  params: []

- id: my_button_4_messenger
  label: "MY BUTTON-4 MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 EE  29 01  00 03  36 25  00"
  params: []

- id: my_button_4_shade
  label: "MY BUTTON-4 SHADE"
  kind: action
  command: "BE  EF 03 06  00 1E  26 01  00 03  36 32  00"
  params: []

- id: my_button_4_information
  label: "MY BUTTON-4 INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 BE  3E 01  00 03  36 10  00"
  params: []

- id: my_button_4_my_memory
  label: "MY BUTTON-4 MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 DE  3F 01  00 03  36 12  00"
  params: []

- id: my_button_4_active_iris
  label: "MY BUTTON-4 ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 EE  3D 01  00 03  36 15  00"
  params: []

- id: my_button_4_picture_mode
  label: "MY BUTTON-4 PICTURE MODE"
  kind: action
  command: "BE  EF 03 06  00 4E  3E 01  00 03  36 13  00"
  params: []

- id: my_button_4_filter_reset
  label: "MY BUTTON-4 FILTER RESET"
  kind: action
  command: "BE  EF 03 06  00 7E  3C 01  00 03  36 14  00"
  params: []

- id: my_button_4_template
  label: "MY BUTTON-4 TEMPLATE"
  kind: action
  command: "BE  EF 03 06  00 8E  39 01  00 03  36 1B  00"
  params: []

- id: my_button_4_mute
  label: "MY BUTTON-4 MUTE"
  kind: action
  command: "BE  EF 03 06  00 BE  20 01  00 03  36 38  00"
  params: []

- id: my_button_4_pby_p_pin_p_swap
  label: "MY BUTTON-4 PbyP/PinP SWAP"
  kind: action
  command: "BE  EF 03 06  00 1E  38 01  00 03  36 1A  00"
  params: []

- id: my_button_4_pin_p_position
  label: "MY BUTTON-4 PinP POSITION"
  kind: action
  command: "BE EF 03 06 00 7E 22 01 00 03 36 3C 00"
  params: []

- id: my_button_4_blank
  label: "MY BUTTON-4 BLANK"
  kind: action
  command: "BE EF 03 06 00 BE 02 01 00 03 36 40 00"
  params: []

- id: my_button_4_resolution
  label: "MY BUTTON-4 RESOLUTION"
  kind: action
  command: "BE  EF 03 06  00 DE  3A 01  00 03  36 1E  00"
  params: []

- id: my_button_4_eco_mode
  label: "MY BUTTON-4 ECO MODE"
  kind: action
  command: "BE  EF 03 06  00 4E  25 01  00 03  36 37  00"
  params: []

- id: my_button_4_accentualizer
  label: "MY BUTTON-4 ACCENTUALIZER"
  kind: action
  command: "BE  EF 03 06  00 DE  21 01  00 03  36 3A  00"
  params: []

- id: my_button_4_hdcr
  label: "MY BUTTON-4 HDCR"
  kind: action
  command: "BE  EF 03 06  00 1E  23 01  00 03  36 3E  00"
  params: []

- id: remote_receiv_front_set_off
  label: "REMOTE RECEIV. FRONT Set Off"
  kind: action
  command: "BE  EF 03 06  00 FF  32 01  00 00  26 00  00"
  params: []

- id: remote_receiv_front_set_on
  label: "REMOTE RECEIV. FRONT Set On"
  kind: action
  command: "BE  EF 03 06  00 6F  33 01  00 00  26 01  00"
  params: []

- id: remote_receiv_rear_set_off
  label: "REMOTE RECEIV. REAR Set Off"
  kind: action
  command: "BE  EF 03 06  00 03  33 01  00 01  26 00  00"
  params: []

- id: remote_receiv_rear_set_on
  label: "REMOTE RECEIV. REAR Set On"
  kind: action
  command: "BE  EF 03 06  00 93  32 01  00 01  26 01  00"
  params: []

- id: remote_receiv_hdbase_t_set_off
  label: "REMOTE RECEIV.HDBaseT Set Off"
  kind: action
  command: "BE  EF 03 06  00 BB  32 01  00 03  26 00  00"
  params: []

- id: remote_receiv_hdbase_t_set_on
  label: "REMOTE RECEIV.HDBaseT Set On"
  kind: action
  command: "BE  EF 03 06  00 2B  33 01  00 03  26 01  00"
  params: []

- id: remote_freq_normal_set_off
  label: "REMOTE FREQ. NORMAL Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FF  3D 01  00 30  26 00  00"
  params: []

- id: remote_freq_normal_set_on
  label: "REMOTE FREQ. NORMAL Set ON"
  kind: action
  command: "BE  EF 03 06  00 6F  3C 01  00 30  26 01  00"
  params: []

- id: remote_freq_high_set_off
  label: "REMOTE FREQ. HIGH Set OFF"
  kind: action
  command: "BE  EF 03 06  00 03  3C 01  00 31  26 00  00"
  params: []

- id: remote_freq_high_set_on
  label: "REMOTE FREQ. HIGH Set ON"
  kind: action
  command: "BE  EF 03 06  00 93  3D 01  00 31  26 01  00"
  params: []

- id: remote_id_set_all
  label: "REMOTE ID Set ALL"
  kind: action
  command: "BE  EF 03 06  00 9F  30 01  00 08  26 00  00"
  params: []

- id: remote_id_set_1
  label: "REMOTE ID Set 1"
  kind: action
  command: "BE  EF 03 06  00 0F  31 01  00 08  26 01  00"
  params: []

- id: remote_id_set_2
  label: "REMOTE ID Set 2"
  kind: action
  command: "BE  EF 03 06  00 FF  31 01  00 08  26 02  00"
  params: []

- id: remote_id_set_3
  label: "REMOTE ID Set 3"
  kind: action
  command: "BE  EF 03 06  00 6F  30 01  00 08  26 03  00"
  params: []

- id: remote_id_set_4
  label: "REMOTE ID Set 4"
  kind: action
  command: "BE  EF 03 06  00 5F  32 01  00 08  26 04  00"
  params: []

- id: my_image_set_off
  label: "MY IMAGE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3A  C3 01  00 00  35 00  00"
  params: []

- id: my_image_set_image_1
  label: "MY IMAGE Set IMAGE-1"
  kind: action
  command: "BE  EF 03 06  00 AA  C2 01  00 00  35 01  00"
  params: []

- id: my_image_set_image_2
  label: "MY IMAGE Set IMAGE-2"
  kind: action
  command: "BE  EF 03 06  00 5A  C2 01  00 00  35 02  00"
  params: []

- id: my_image_set_image_3
  label: "MY IMAGE Set IMAGE-3"
  kind: action
  command: "BE  EF 03 06  00 CA  C3 01  00 00  35 03  00"
  params: []

- id: my_image_set_image_4
  label: "MY IMAGE Set IMAGE-4"
  kind: action
  command: "BE  EF 03 06  00 FA  C1 01  00 00  35 04  00"
  params: []

- id: my_image_image_1_delete_set_execute
  label: "MY IMAGE IMAGE-1 Delete Set Execute"
  kind: action
  command: "BE  EF 03 06  00 71  C3 06  00 01  35 00  00"
  params: []

- id: my_image_image_2_delete_set_execute
  label: "MY IMAGE IMAGE-2 Delete Set Execute"
  kind: action
  command: "BE  EF 03 06  00 35  C3 06  00 02  35 00  00"
  params: []

- id: my_image_image_3_delete_set_execute
  label: "MY IMAGE IMAGE-3 Delete Set Execute"
  kind: action
  command: "BE  EF 03 06  00 C9  C2 06  00 03  35 00  00"
  params: []

- id: my_image_image_4_delete_set_execute
  label: "MY IMAGE IMAGE-4 Delete Set Execute"
  kind: action
  command: "BE  EF 03 06  00 BD  C3 06  00 04  35 00  00"
  params: []

- id: color_management_hue_r_set_increment
  label: "COLOR MANAGEMENT HUE R Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6A  63 04  00 00  27 00  00"
  params: []

- id: color_management_hue_r_set_decrement
  label: "COLOR MANAGEMENT HUE R Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BB  62 05  00 00  27 00  00"
  params: []

- id: color_management_hue_r_reset_set_execute
  label: "COLOR MANAGEMENT HUE R Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  EB 06  00 D0  70 00  00"
  params: []

- id: color_management_hue_y_set_increment
  label: "COLOR MANAGEMENT HUE Y Set Increment"
  kind: action
  command: "BE  EF 03 06  00 96  62 04  00 01  27 00  00"
  params: []

- id: color_management_hue_y_set_decrement
  label: "COLOR MANAGEMENT HUE Y Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 47  63 05  00 01  27 00  00"
  params: []

- id: color_management_hue_y_reset_set_execute
  label: "COLOR MANAGEMENT HUE Y Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 64  EA 06  00 D1  70 00  00"
  params: []

- id: color_management_hue_g_increment
  label: "COLOR MANAGEMENT HUE G Increment"
  kind: action
  command: "BE  EF 03 06  00 D2  62 04  00 02  27 00  00"
  params: []

- id: color_management_hue_g_decrement
  label: "COLOR MANAGEMENT HUE G Decrement"
  kind: action
  command: "BE  EF 03 06  00 03  63 05  00 02  27 00  00"
  params: []

- id: color_management_hue_g_reset_execute
  label: "COLOR MANAGEMENT HUE G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 20  EA 06  00 D2  70 00  00"
  params: []

- id: color_management_hue_c_increment
  label: "COLOR MANAGEMENT HUE C Increment"
  kind: action
  command: "BE  EF 03 06  00 2E  63 04  00 03  27 00  00"
  params: []

- id: color_management_hue_c_decrement
  label: "COLOR MANAGEMENT HUE C Decrement"
  kind: action
  command: "BE  EF 03 06  00 FF  62 05  00 03  27 00  00"
  params: []

- id: color_management_hue_c_reset_execute
  label: "COLOR MANAGEMENT HUE C Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 DC  EB 06  00 D3  70 00  00"
  params: []

- id: color_management_hue_b_increment
  label: "COLOR MANAGEMENT HUE B Increment"
  kind: action
  command: "BE  EF 03 06  00 5A  62 04  00 04  27 00  00"
  params: []

- id: color_management_hue_b_decrement
  label: "COLOR MANAGEMENT HUE B Decrement"
  kind: action
  command: "BE  EF 03 06  00 8B  63 05  00 04  27 00  00"
  params: []

- id: color_management_hue_b_reset_execute
  label: "COLOR MANAGEMENT HUE B Reset Execute"
  kind: action
  command: "BE EF 03 06  00 A8  EA 06  00 D4  70 00  00"
  params: []

- id: color_management_hue_m_increment
  label: "COLOR MANAGEMENT HUE M Increment"
  kind: action
  command: "BE EF 03 06  00 A6  63 04  00 05  27 00  00"
  params: []

- id: color_management_hue_m_decrement
  label: "COLOR MANAGEMENT HUE M Decrement"
  kind: action
  command: "BE EF 03 06  00 77  62 05  00 05  27 00  00"
  params: []

- id: color_management_hue_m_reset_execute
  label: "COLOR MANAGEMENT HUE M Reset Execute"
  kind: action
  command: "BE EF 03 06  00 54  EB 06  00 D5  70 00  00"
  params: []

- id: color_management_saturation_r_increment
  label: "COLOR MANAGEMENT SATURATION R Increment"
  kind: action
  command: "BE EF 03 06  00 AA  67 04  00 10  27 00  00"
  params: []

- id: color_management_saturation_r_decrement
  label: "COLOR MANAGEMENT SATURATION R Decrement"
  kind: action
  command: "BE EF 03 06  00 7B  66 05  00 10  27 00  00"
  params: []

- id: color_management_saturation_r_reset_execute
  label: "COLOR MANAGEMENT SATURATION R Reset Execute"
  kind: action
  command: "BE EF 03 06  00 F8  E9 06  00 D8  70 00  00"
  params: []

- id: color_management_saturation_y_increment
  label: "COLOR MANAGEMENT SATURATION Y Increment"
  kind: action
  command: "BE EF 03 06  00 56  66 04  00 11  27 00  00"
  params: []

- id: color_management_saturation_y_decrement
  label: "COLOR MANAGEMENT SATURATION Y Decrement"
  kind: action
  command: "BE EF 03 06  00 87  67 05  00 11  27 00  00"
  params: []

- id: color_management_saturation_y_reset_execute
  label: "COLOR MANAGEMENT SATURATION Y Reset Execute"
  kind: action
  command: "BE EF 03 06  00 04  E8 06  00 D9  70 00  00"
  params: []

- id: color_management_saturation_g_increment
  label: "COLOR MANAGEMENT SATURATION G Increment"
  kind: action
  command: "BE EF 03 06  00 12  66 04  00 12  27 00  00"
  params: []

- id: color_management_saturation_g_decrement
  label: "COLOR MANAGEMENT SATURATION G Decrement"
  kind: action
  command: "BE EF 03 06  00 C3  67 05  00 12  27 00  00"
  params: []

- id: color_management_saturation_g_reset_execute
  label: "COLOR MANAGEMENT SATURATION G Reset Execute"
  kind: action
  command: "BE EF 03 06  00 40  E8 06  00 DA  70 00  00"
  params: []

- id: color_management_saturation_c_increment
  label: "COLOR MANAGEMENT SATURATION C Increment"
  kind: action
  command: "BE EF 03 06  00 EE  67 04  00 13  27 00  00"
  params: []

- id: color_management_saturation_c_decrement
  label: "COLOR MANAGEMENT SATURATION C Decrement"
  kind: action
  command: "BE EF 03 06  00 3F  66 05  00 13  27 00  00"
  params: []

- id: color_management_saturation_c_reset_execute
  label: "COLOR MANAGEMENT SATURATION C Reset Execute"
  kind: action
  command: "BE EF 03 06  00 BC  E9 06  00 DB  70 00  00"
  params: []

- id: color_management_saturation_b_increment
  label: "COLOR MANAGEMENT SATURATION B Increment"
  kind: action
  command: "BE  EF 03 06  00 9A  66 04  00 14  27 00  00"
  params: []

- id: color_management_saturation_b_decrement
  label: "COLOR MANAGEMENT SATURATION B Decrement"
  kind: action
  command: "BE  EF 03 06  00 4B  67 05  00 14  27 00  00"
  params: []

- id: color_management_saturation_b_reset_execute
  label: "COLOR MANAGEMENT SATURATION B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 C8  E8 06  00 DC  70 00  00"
  params: []

- id: color_management_saturation_m_increment
  label: "COLOR MANAGEMENT SATURATION M Increment"
  kind: action
  command: "BE  EF 03 06  00 66  67 04  00 15  27 00  00"
  params: []

- id: color_management_saturation_m_decrement
  label: "COLOR MANAGEMENT SATURATION M Decrement"
  kind: action
  command: "BE  EF 03 06  00 B7  66 05  00 15  27 00  00"
  params: []

- id: color_management_saturation_m_reset_execute
  label: "COLOR MANAGEMENT SATURATION M Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 34  E9 06  00 DD  70 00  00"
  params: []

- id: color_management_luminance_r_increment
  label: "COLOR MANAGEMENT LUMINANCE R Increment"
  kind: action
  command: "BE  EF 03 06  00 AA  68 04  00 20  27 00  00"
  params: []

- id: color_management_luminance_r_decrement
  label: "COLOR MANAGEMENT LUMINANCE R Decrement"
  kind: action
  command: "BE  EF 03 06  00 7B  69 05  00 20  27 00  00"
  params: []

- id: color_management_luminance_r_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE R Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 98  E4 06  00 E0  70 00  00"
  params: []

- id: color_management_luminance_y_increment
  label: "COLOR MANAGEMENT LUMINANCE Y Increment"
  kind: action
  command: "BE  EF 03 06  00 56  69 04  00 21  27 00  00"
  params: []

- id: color_management_luminance_y_decrement
  label: "COLOR MANAGEMENT LUMINANCE Y Decrement"
  kind: action
  command: "BE  EF 03 06  00 87  68 05  00 21  27 00  00"
  params: []

- id: color_management_luminance_y_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE Y Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 64  E5 06  00 E1  70 00  00"
  params: []

- id: color_management_luminance_g_increment
  label: "COLOR MANAGEMENT LUMINANCE G Increment"
  kind: action
  command: "BE  EF 03 06  00 12  69 04  00 22  27 00  00"
  params: []

- id: color_management_luminance_g_decrement
  label: "COLOR MANAGEMENT LUMINANCE G Decrement"
  kind: action
  command: "BE  EF 03 06  00 C3  68 05  00 22  27 00  00"
  params: []

- id: color_management_luminance_g_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 20  E5 06  00 E2  70 00  00"
  params: []

- id: color_management_luminance_c_increment
  label: "COLOR MANAGEMENT LUMINANCE C Increment"
  kind: action
  command: "BE  EF 03 06  00 EE  68 04  00 23  27 00  00"
  params: []

- id: color_management_luminance_c_decrement
  label: "COLOR MANAGEMENT LUMINANCE C Decrement"
  kind: action
  command: "BE  EF 03 06  00 3F  69 05  00 23  27 00  00"
  params: []

- id: color_management_luminance_c_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE C Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 DC  E4 06  00 E3  70 00  00"
  params: []

- id: color_management_luminance_b_increment
  label: "COLOR MANAGEMENT LUMINANCE B Increment"
  kind: action
  command: "BE  EF 03 06  00 9A  69 04  00 24  27 00  00"
  params: []

- id: color_management_luminance_b_decrement
  label: "COLOR MANAGEMENT LUMINANCE B Decrement"
  kind: action
  command: "BE  EF 03 06  00 4B  68 05  00 24  27 00  00"
  params: []

- id: color_management_luminance_b_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A8  E5 06  00 E4  70 00  00"
  params: []

- id: color_management_luminance_m_increment
  label: "COLOR MANAGEMENT LUMINANCE M Increment"
  kind: action
  command: "BE  EF 03 06  00 66  68 04  00 25  27 00  00"
  params: []

- id: color_management_luminance_m_decrement
  label: "COLOR MANAGEMENT LUMINANCE M Decrement"
  kind: action
  command: "BE  EF 03 06  00 B7  69 05  00 25  27 00  00"
  params: []

- id: color_management_luminance_m_reset_execute
  label: "COLOR MANAGEMENT LUMINANCE M Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 54  E4 06  00 E5  70 00  00"
  params: []
```

## Feedbacks
```yaml
- id: <get>read_projector_internal_setup_value_b_l_b_h_a_l_a_h_02h_00h_b_l_b_h
  label: "<GET>Read projector internal setup value [(bL) (bH)] . (aL) (aH) 02h 00h (bL) (bH)"
  kind: query
  query_command: "00h 00h"

- id: power_set_get
  label: "Power Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 19  D3 02  00 00  60 00  00"

- id: input_source_set_get
  label: "Input Source Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  D2 02  00 00  20 00  00"

- id: error_status_set_get
  label: "Error Status Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  D8 02  00 20  60 00  00"

- id: lens_memory_index_set_get
  label: "LENS MEMORY INDEX Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 78  92 02  00 07  24 00  00"

- id: lens_memory_lens_shift_v_get
  label: "LENS MEMORY LENS SHIFT - V Get"
  kind: query
  query_command: "BE  EF 03 06  00 A0  91 02  00 0D  24 00  00"

- id: lens_memory_lens_shift_h_get
  label: "LENS MEMORY LENS SHIFT - H Get"
  kind: query
  query_command: "BE  EF 03 06  00 E4  91 02  00 0E  24 00  00"

- id: lens_memory_lens_type_get
  label: "LENS MEMORY LENS TYPE Get"
  kind: query
  query_command: "BE  EF 03 06  00 18  90 02  00 0F  24 00  00"

- id: magnify_get
  label: "MAGNIFY Get"
  kind: query
  query_command: "BE  EF 03 06  00 7C  D2 02  00 07  30 00  00"

- id: magnify_position_h_get
  label: "MAGNIFY Position H Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  D7 02  00 10  30 00  00"

- id: magnify_position_v_get
  label: "MAGNIFY Position V Get"
  kind: query
  query_command: "BE  EF 03 06  00 34  D6 02  00 11  30 00  00"

- id: freeze_set_get
  label: "FREEZE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B0  D2 02  00 02  30 00  00"

- id: shade_set_get
  label: "SHADE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C0  93 02  00 05  24 00  00"

- id: pby_p_pin_p_set_get
  label: "PbyP/PinP Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0D  26 02  00 10  23 00  00"

- id: pby_p_main_size_set_get
  label: "PbyP MAIN SIZE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  27 02  00 11  23 00  00"

- id: pby_p_right_source_set_get
  label: "PbyP RIGHT SOURCE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  27 02  00 12  23 00  00"

- id: pby_p_main_area_set_get
  label: "PbyP MAIN AREA Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  26 02  00 13  23 00  00"

- id: pby_p_left_source_set_get
  label: "PbyP LEFT SOURCE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C1  26 02  00 15  23 00  00"

- id: pin_p_position_set_get
  label: "PinP POSITION Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  23 02  00 01  23 00  00"

- id: pin_p_main_area_set_get
  label: "PinP MAIN AREA Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 01  22 02  00 05  23 00  00"

- id: pin_p_primary_source_set_get
  label: "PinP PRIMARY SOURCE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  23 02  00 04  23 00  00"

- id: pin_p_secondary_source_set_get
  label: "PinP SECONDARY SOURCE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  23 02  00 02  23 00  00"

- id: pby_p_pin_p_frame_lock_set_get
  label: "PbyP / PinP FRAME LOCK Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 79  27 02  00 17  23 00  00"

- id: picture_mode_set_get
  label: "PICTURE MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 10  F6 02   00 BA  30 00  00"

- id: brightness_get
  label: "BRIGHTNESS Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  D2 02  00 03  20 00  00"

- id: contrast_get
  label: "CONTRAST Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  D3 02  00 04  20 00  00"

- id: gamma_set_get
  label: "GAMMA Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  F0 02  00 A1  30 00  00"

- id: user_gamma_point_1_set_get
  label: "User GAMMA Point 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  FE 02  00 90  30 00  00"

- id: user_gamma_point_2_set_get
  label: "User GAMMA Point 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  FF 02  00 91  30 00  00"

- id: user_gamma_point_3_set_get
  label: "User GAMMA Point 3 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B0  FF 02  00 92  30 00  00"

- id: user_gamma_point_4_get
  label: "User GAMMA Point 4 Get"
  kind: query
  query_command: "BE  EF 03 06  00 4C  FE 02  00 93  30 00  00"

- id: user_gamma_point_5_get
  label: "User GAMMA Point 5 Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  FF 02  00 94  30 00  00"

- id: user_gamma_point_6_get
  label: "User GAMMA Point 6 Get"
  kind: query
  query_command: "BE  EF 03 06  00 C4  FE 02  00 95  30 00  00"

- id: user_gamma_point_7_get
  label: "User GAMMA Point 7 Get"
  kind: query
  query_command: "BE  EF 03 06  00 80  FE 02  00 96  30 00  00"

- id: user_gamma_point_8_get
  label: "User GAMMA Point 8 Get"
  kind: query
  query_command: "BE  EF 03 06  00 7C  FF 02  00 97  30 00  00"

- id: color_temp_set_get
  label: "COLOR TEMP Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  F5 02  00 B0  30 00  00"

- id: color_temp_gain_r_get
  label: "COLOR TEMP GAIN R Get"
  kind: query
  query_command: "BE  EF 03 06  00 34  F4 02  00 B1  30 00  00"

- id: color_temp_gain_g_get
  label: "COLOR TEMP GAIN G Get"
  kind: query
  query_command: "BE  EF 03 06  00 70  F4 02  00 B2  30 00  00"

- id: color_temp_gain_b_get
  label: "COLOR TEMP GAIN B Get"
  kind: query
  query_command: "BE  EF 03 06  00 8C  F5 02  00 B3  30 00  00"

- id: color_temp_offset_r_get
  label: "COLOR TEMP OFFSET R Get"
  kind: query
  query_command: "BE  EF 03 06  00 04  F5 02  00 B5  30 00  00"

- id: color_temp_offset_g_get
  label: "COLOR TEMP OFFSET G Get"
  kind: query
  query_command: "BE  EF 03 06  00 40  F5 02  00 B6  30 00  00"

- id: color_temp_offset_b_get
  label: "COLOR TEMP OFFSET B Get"
  kind: query
  query_command: "BE  EF 03 06  00 BC  F4 02  00 B7  30 00  00"

- id: color_get
  label: "COLOR Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  72 02  00 02  22 00  00"

- id: h_position_get
  label: "H POSITION Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  82 02  00 01  21 00  00"

- id: h_phase_get
  label: "H PHASE Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  83 02  00 03  21 00  00"

- id: h_size_get
  label: "H SIZE Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  82 02  00 02  21 00  00"

- id: progressive_set_get
  label: "PROGRESSIVE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 79  72 02  00 07  22 00  00"

- id: video_nr_set_get
  label: "VIDEO NR Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 85  73 02  00 06  22 00  00"

- id: color_space_set_get
  label: "COLOR SPACE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 3D  72 02  00 04  22 00  00"

- id: c_video_format_set_get
  label: "C-VIDEO FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  76 02  00 11  22 00  00"

- id: hdmi_1_format_set_get
  label: "HDMI 1 FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  77 02  00 13  22 00  00"

- id: hdmi_2_format_set_get
  label: "HDMI 2 FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 61  75 02  00 1D  22 00  00"

- id: hdbase_t_format_set_get
  label: "HDBaseT FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  EA 02  00 D3  20 00  00"

- id: display_port_format_set_get
  label: "DisplayPort FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  E1 02  00 F3  20 00  00"

- id: hdmi_1_range_set_get
  label: "HDMI 1 RANGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  D8 02  00 22  20 00  00"

- id: hdmi_2_range_set_get
  label: "HDMI 2 RANGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  D9 02  00 23  20 00  00"

- id: hdbase_t_range_set_get
  label: "HDBaseT RANGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  EB 02  00 D2  20 00  00"

- id: sdi_range*_set_get
  label: "SDI RANGE* Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  E4 02  00 E2  20 00  00"

- id: display_port_range_set_get
  label: "DisplayPort RANGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  E0 02  00 F2  20 00  00"

- id: computer_in_set_get
  label: "COMPUTER IN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0D  D6 02  00 10  20 00  00"

- id: frame_lock_computer_in_set_get
  label: "FRAME LOCK - COMPUTER IN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  C2 02  00 50  30 00  00"

- id: frame_lock_hdmi_1_set_get
  label: "FRAME LOCK - HDMI 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 4C  C2 02  00 53  30 00  00"

- id: frame_lock_hdmi_2_set_get
  label: "FRAME LOCK - HDMI 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 A4  C0 02  00 5D  30 00  00"

- id: frame_lock_hdbase_t_set_get
  label: "FRAME LOCK - HDBaseT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  EB 02  00 D1  20 00  00"

- id: frame_lock_sdi*_set_get
  label: "FRAME LOCK - SDI* Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  E4 02  00 E1  20 00  00"

- id: frame_lock_display_port_set_get
  label: "FRAME LOCK - DisplayPort Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  E0 02  00 F1  20 00  00"

- id: picture_position_v_set_get
  label: "PICTURE POSITION V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 51  D1 02  00 09  20 00  00"

- id: picture_position_h_set_get
  label: "PICTURE POSITION H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E5  D4 02  00 1E  20 00  00"

- id: geometric_mode_set_get
  label: "GEOMETRIC MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  8D 02  00 30  31 00  00"

- id: keystone_v_set_get
  label: "KEYSTONE V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B9  D3 02  00 07  20 00  00"

- id: keystone_h_set_get
  label: "KEYSTONE H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E9  D0 02  00 0B  20 00  00"

- id: perfect_fit_left_top_h_set_get
  label: "PERFECT FIT Left Top - H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  89 02  00 21  21 00  00"

- id: perfect_fit_left_top_v_set_get
  label: "PERFECT FIT Left Top - V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  89 02  00 22  21 00  00"

- id: perfect_fit_right_top_h_set_get
  label: "PERFECT FIT Right Top - H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  88 02  00 23  21 00  00"

- id: perfect_fit_right_top_v_set_get
  label: "PERFECT FIT Right Top - V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  89 02  00 24  21 00  00"

- id: perfect_fit_left_bottom_h_get
  label: "PERFECT FIT Left Bottom - H Get"
  kind: query
  query_command: "BE  EF 03 06  00 01  88 02  00 25  21 00  00"

- id: perfect_fit_left_bottom_v_get
  label: "PERFECT FIT Left Bottom - V Get"
  kind: query
  query_command: "BE  EF 03 06  00 45  88 02  00 26  21 00  00"

- id: perfect_fit_right_bottom_h_get
  label: "PERFECT FIT Right Bottom - H Get"
  kind: query
  query_command: "BE  EF 03 06  00 B9  89 02  00 27  21 00  00"

- id: perfect_fit_right_bottom_v_get
  label: "PERFECT FIT Right Bottom - V Get"
  kind: query
  query_command: "BE  EF 03 06  00 AD  8A 02  00 28  21 00  00"

- id: perfect_fit_left_side_distortion_get
  label: "PERFECT FIT Left Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  97 02  00 41  21 00  00"

- id: perfect_fit_right_side_distortion_get
  label: "PERFECT FIT Right Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  97 02  00 42  21 00  00"

- id: perfect_fit_top_side_distortion_get
  label: "PERFECT FIT Top Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  97 02  00 44  21 00  00"

- id: perfect_fit_bottom_side_distortion_get
  label: "PERFECT FIT Bottom Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 01  96 02  00 45  21 00  00"

- id: edge_blending_mode_set_get
  label: "EDGE BLENDING MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 58 94 02 00 4C 31 00 00"

- id: edge_blending_level_set_get
  label: "EDGE BLENDING LEVEL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F4 96 02 00 41 31 00 00"

- id: edge_blending_left_set_get
  label: "EDGE BLENDING LEFT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 68 95 02 00 48 31 00 00"

- id: edge_blending_right_set_get
  label: "EDGE BLENDING RIGHT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 94 94 02 00 49 31 00 00"

- id: edge_blending_top_set_get
  label: "EDGE BLENDING TOP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D0 94 02 00 4A 31 00 00"

- id: edge_blending_bottom_set_get
  label: "EDGE BLENDING BOTTOM Set Get"
  kind: query
  query_command: "BE EF 03 06 00 2C 95 02 00 4B 31 00 00"

- id: cropping_mode_set_get
  label: "CROPPING MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 93 02 00 50 31 00 00"

- id: cropping_setup_x_set_get
  label: "CROPPING SETUP X Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A8 91 02 00 58 31 00 00"

- id: cropping_setup_y_set_get
  label: "CROPPING SETUP Y Set Get"
  kind: query
  query_command: "BE EF 03 06 00 54 90 02 00 59 31 00 00"

- id: cropping_setup_w_set_get
  label: "CROPPING SETUP W Set Get"
  kind: query
  query_command: "BE EF 03 06 00 10 90 02 00 5A 31 00 00"

- id: cropping_setup_h_set_get
  label: "CROPPING SETUP H Set Get"
  kind: query
  query_command: "BE EF 03 06 00 EC 91 02 00 5B 31 00 00"

- id: warping_mode_set_get
  label: "WARPING MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 9C 02 00 60 31 00 00"

- id: dimming_level_set_get
  label: "DIMMING LEVEL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 7C 22 02 00 07 33 00 00"

- id: white_balance_offset_r_set_get
  label: "WHITE BALANCE OFFSET R Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0C 72 02 00 50 27 00 00"

- id: white_balance_offset_g_set_get
  label: "WHITE BALANCE OFFSET G Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F0 73 02 00 51 27 00 00"

- id: white_balance_offset_b_set_get
  label: "WHITE BALANCE OFFSET B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B4 73 02 00 52 27 00 00"

- id: white_balance_gain_r_get
  label: "WHITE BALANCE GAIN R Get"
  kind: query
  query_command: "BE EF 03 06 00 3C 73 02 00 54 27 00 00"

- id: white_balance_gain_g_get
  label: "WHITE BALANCE GAIN G Get"
  kind: query
  query_command: "BE EF 03 06 00 C0 72 02 00 55 27 00 00"

- id: white_balance_gain_b_get
  label: "WHITE BALANCE GAIN B Get"
  kind: query
  query_command: "BE EF 03 06 00 84 72 02 00 56 27 00 00"

- id: black_level_r_get
  label: "BLACK LEVEL R Get"
  kind: query
  query_command: "BE EF 03 06 00 CC 76 02 00 40 27 00 00"

- id: black_level_g_get
  label: "BLACK LEVEL G Get"
  kind: query
  query_command: "BE EF 03 06 00 30 77 02 00 41 27 00 00"

- id: black_level_b_get
  label: "BLACK LEVEL B Get"
  kind: query
  query_command: "BE EF 03 06 00 74 77 02 00 42 27 00 00"

- id: black_level_w_get
  label: "BLACK LEVEL W Get"
  kind: query
  query_command: "BE EF 03 06 00 88 76 02 00 43 27 00 00"

- id: image_optimizer_set_get
  label: "IMAGE OPTIMIZER Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E5  71 02  00 0E  22 00  00"

- id: eco_mode_set_get
  label: "ECO MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  23 02  00 00  33 00  00"

- id: installation_set_get
  label: "INSTALLATION Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  D2 02  00 01  30 00  00"

- id: standby_mode_set_get
  label: "STANDBY MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E5  D2 02  00 01  60 00  00"

- id: color_uniformity_level_set_get
  label: "COLOR UNIFORMITY LEVEL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0C 6C 02 00 30 27 00 00"

- id: color_uniformity_area_set_get
  label: "COLOR UNIFORMITY AREA Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F0 6D 02 00 31 27 00 00"

- id: color_uniformity_r_set_get
  label: "COLOR UNIFORMITY R Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B4 6D 02 00 32 27 00 00"

- id: color_uniformity_g_set_get
  label: "COLOR UNIFORMITY G Set Get"
  kind: query
  query_command: "BE EF 03 06 00 48 6C 02 00 33 27 00 00"

- id: color_uniformity_b_set_get
  label: "COLOR UNIFORMITY B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 3C 6D 02 00 34 27 00 00"

- id: color_uniformity_pattern_set_get
  label: "COLOR UNIFORMITY PATTERN Set Get"
  kind: query
  query_command: "BE EF 03 06 00 84 6C 02 00 36 27 00 00"

- id: volume_computer_in_set_get
  label: "VOLUME - COMPUTER IN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  CC 02  00 60  20 00  00"

- id: volume_lan_set_get
  label: "VOLUME - LAN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E9  CE 02  00 6B  20 00  00"

- id: volume_hdmi_1_set_get
  label: "VOLUME - HDMI 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  CC 02  00 63  20 00  00"

- id: volume_hdmi_2_set_get
  label: "VOLUME - HDMI 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 61  CE 02  00 6D  20 00  00"

- id: volume_hdbase_t_set_get
  label: "VOLUME - HDBaseT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C1  EA 02  00 D5  20 00  00"

- id: volume_video_set_get
  label: "VOLUME - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  CD 02  00 61  20 00  00"

- id: volume_sdi*_set_get
  label: "VOLUME - SDI* Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C1 E5 02 00 E5 20 00 00"

- id: volume_display_port_set_get
  label: "VOLUME - DisplayPort Set Get"
  kind: query
  query_command: "BE EF 03 06 00 01 E1 02 00 F5 20 00 00"

- id: volume_standby_set_get
  label: "VOLUME - STANDBY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  CF 02  00 6F  20 00  00"

- id: volume_all_set_get
  label: "VOLUME - ALL Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  C3 02  00 50  20 00  00"

- id: mute_set_get
  label: "MUTE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  D3 02  00 02  20 00  00"

- id: av_mute_set_get
  label: "AV MUTE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  F0 02  00 A0  20 00  00"

- id: speaker_set_get
  label: "SPEAKER Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 5D  D5 02  00 1C  20 00  00"

- id: audio_source_computer_in_set_get
  label: "AUDIO SOURCE - COMPUTER IN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  DD 02  00 30  20 00  00"

- id: audio_source_lan_set_get
  label: "AUDIO SOURCE - LAN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E9  DF 02  00 3B  20 00  00"

- id: audio_source_hdmi_1_set_get
  label: "AUDIO SOURCE - HDMI 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  DD 02  00 33  20 00  00"

- id: audio_source_hdmi_2_set_get
  label: "AUDIO SOURCE - HDMI 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 61  DF 02  00 3D  20 00  00"

- id: audio_source_hdbase_t_set_get
  label: "AUDIO SOURCE - HDBaseT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 3D  EB 02  00 D4  20 00  00"

- id: audio_source_sdi*_set_get
  label: "AUDIO SOURCE - SDI* Set Get"
  kind: query
  query_command: "BE EF 03 06 00 3D E4 02 00 E4 20 00 00"

- id: audio_source_display_port_set_get
  label: "AUDIO SOURCE - DisplayPort Set Get"
  kind: query
  query_command: "BE EF 03 06 00 FD E0 02 00 F4 20 00 00"

- id: audio_source_video_set_get
  label: "AUDIO SOURCE - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  DC 02  00 31  20 00  00"

- id: audio_source_audio_out_standby_set_get
  label: "AUDIO SOURCE - AUDIO OUT STANDBY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  DE 02  00 3F  20 00  00"

- id: lan_sound_enable_set_get
  label: "LAN SOUND ENABLE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  F0 02  00 A3  20 00  00"

- id: language_set_get
  label: "LANGUAGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C4  D3 02  00 05  30 00  00"

- id: menu_position_v_get
  label: "MENU POSITION V Get"
  kind: query
  query_command: "BE  EF 03 06  00 40  D7 02  00 16  30 00  00"

- id: menu_position_h_get
  label: "MENU POSITION H Get"
  kind: query
  query_command: "BE  EF 03 06  00 04  D7 02  00 15  30 00  00"

- id: blank_set_get
  label: "BLANK Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  D3 02  00 00  30 00  00"

- id: blank_on_off_set_get
  label: "BLANK On/Off Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  D8 02  00 20  30 00  00"

- id: auto_blank_set_get
  label: "AUTO BLANK Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 A4  D1 02  00 0D  30 00  00"

- id: start_up_set_get
  label: "START UP Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  D2 02  00 04  30 00  00"

- id: my_screen_lock_set_get
  label: "MyScreen Lock Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  EF 02  00 C0  30 00  00"

- id: osd_message_set_get
  label: "OSD MESSAGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"

- id: template_set_get
  label: "TEMPLATE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 70  D9 02  00 22  30 00  00"

- id: template_on_off_set_get
  label: "TEMPLATE On/Off Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 8C  D8 02  00 23  30 00  00"

- id: c_c_display_set_get
  label: "C. C. - DISPLAY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C9  62 02  00 00  37 00  00"

- id: c_c_mode_set_get
  label: "C. C. - MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 35  63 02  00 01  37 00  00"

- id: c_c_channel_set_get
  label: "C. C. - CHANNEL Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 71  63 02  00 02  37 00  00"

- id: source_skip_computer_in_set_get
  label: "SOURCE SKIP - COMPUTER IN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  78 02  00 20  22 00  00"

- id: source_skip_lan_set_get
  label: "SOURCE SKIP - LAN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E9  7A 02  00 2B  22 00  00"

- id: source_skip_hdmi_1_set_get
  label: "SOURCE SKIP - HDMI 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  78 02  00 23  22 00  00"

- id: source_skip_hdmi_2_set_get
  label: "SOURCE SKIP - HDMI 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 61  7A 02  00 2D  22 00  00"

- id: source_skip_hdbase_t_set_get
  label: "SOURCE SKIP - HDBaseT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 85  EA 02  00 D6  20 00  00"

- id: source_skip_video_set_get
  label: "SOURCE SKIP - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  79 02  00 21  22 00  00"

- id: source_skip_sdi*_set_get
  label: "SOURCE SKIP SDI* Set Get"
  kind: query
  query_command: "BE EF 03 06 00 85 E5 02 00 E6 20 00 00"

- id: source_skip_display_port_set_get
  label: "SOURCE SKIP DisplayPort Set Get"
  kind: query
  query_command: "BE EF 03 06 00 45 E1 02 00 F6 20 00 00"

- id: auto_search_set_get
  label: "AUTO SEARCH Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 85  D6 02  00 16  20 00  00"

- id: direct_power_on_set_get
  label: "DIRECT POWER ON Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  89 02  00 20  31 00  00"

- id: auto_power_off_set_get
  label: "AUTO POWER OFF Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  86 02  00 10  31 00  00"

- id: shade_timer_set_get
  label: "SHADE TIMER Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 84  93 02  00 06  24 00  00"

- id: lamp_time_lower_bytes_set_get
  label: "LAMP TIME Lower Bytes Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C2  FF 02  00 90  10 00  00"

- id: lamp_time_higher_bytes_set_get
  label: "LAMP TIME Higher Bytes Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 2A  FD 02  00 9E  10 00  00"

- id: filter_time_lower_bytes_set_get
  label: "FILTER TIME Lower Bytes Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C2  F0 02  00 A0  10 00  00"

- id: filter_time_higher_bytes_set_get
  label: "FILTER TIME Higher Bytes Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D6  FC 02  00 9F  10 00  00"

- id: my_button_1_status_monitor
  label: "MY BUTTON-1 STATUS MONITOR"
  kind: query
  query_command: "BE  EF 03 06  00 0A  20 01  00 00  36 3B  00"

- id: my_button_1_get
  label: "MY BUTTON-1 Get"
  kind: query
  query_command: "BE  EF 03 06  00 09  33 02  00 00  36 00  00"

- id: my_button_2_status_monitor
  label: "MY BUTTON-2 STATUS MONITOR"
  kind: query
  query_command: "BE  EF 03 06  00 F6  21 01  00 01  36 3B  00"

- id: my_button_2_get
  label: "MY BUTTON-2 Get"
  kind: query
  query_command: "BE  EF 03 06  00 F5  32 02  00 01  36 00  00"

- id: my_button_3_status_monitor
  label: "MY BUTTON-3 STATUS MONITOR"
  kind: query
  query_command: "BE  EF 03 06  00 B2  21 01  00 02  36 3B  00"

- id: my_button_3_get
  label: "MY BUTTON-3 Get"
  kind: query
  query_command: "BE  EF 03 06  00 B1  32 02  00 02  36 00  00"

- id: my_button_4_status_monitor
  label: "MY BUTTON-4 STATUS MONITOR"
  kind: query
  query_command: "BE  EF 03 06  00 4E  20 01  00 03  36 3B  00"

- id: my_button_4_get
  label: "MY BUTTON-4 Get"
  kind: query
  query_command: "BE  EF 03 06  00 4D  33 02  00 03  36 00  00"

- id: remote_receiv_front_set_get
  label: "REMOTE RECEIV. FRONT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CC  32 02  00 00  26 00  00"

- id: remote_receiv_rear_set_get
  label: "REMOTE RECEIV. REAR Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 30  33 02  00 01  26 00  00"

- id: remote_receiv_hdbase_t_set_get
  label: "REMOTE RECEIV.HDBaseT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 88  32 02  00 03  26 00  00"

- id: remote_freq_normal_set_get
  label: "REMOTE FREQ. NORMAL Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CC  3D 02  00 30  26 00  00"

- id: remote_freq_high_set_get
  label: "REMOTE FREQ. HIGH Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 30  3C 02  00 31  26 00  00"

- id: remote_id_set_get
  label: "REMOTE ID Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 AC  30 02  00 08  26 00  00"

- id: my_image_set_get
  label: "MY IMAGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 09  C3 02  00 00  35 00  00"

- id: color_management_hue_r_set_get
  label: "COLOR MANAGEMENT HUE R Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0C  63 02  00 00  27 00  00"

- id: color_management_hue_y_set_get
  label: "COLOR MANAGEMENT HUE Y Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F0  62 02  00 01  27 00  00"

- id: color_management_hue_g_get
  label: "COLOR MANAGEMENT HUE G Get"
  kind: query
  query_command: "BE  EF 03 06  00 B4  62 02  00 02  27 00  00"

- id: color_management_hue_c_get
  label: "COLOR MANAGEMENT HUE C Get"
  kind: query
  query_command: "BE  EF 03 06  00 48  63 02  00 03  27 00  00"

- id: color_management_hue_b_get
  label: "COLOR MANAGEMENT HUE B Get"
  kind: query
  query_command: "BE  EF 03 06  00 3C  62 02  00 04  27 00  00"

- id: color_management_hue_m_get
  label: "COLOR MANAGEMENT HUE M Get"
  kind: query
  query_command: "BE EF 03 06  00 C0  63 02  00 05  27 00  00"

- id: color_management_saturation_r_get
  label: "COLOR MANAGEMENT SATURATION R Get"
  kind: query
  query_command: "BE EF 03 06  00 CC  67 02  00 10  27 00  00"

- id: color_management_saturation_y_get
  label: "COLOR MANAGEMENT SATURATION Y Get"
  kind: query
  query_command: "BE EF 03 06  00 30  66 02  00 11  27 00  00"

- id: color_management_saturation_g_get
  label: "COLOR MANAGEMENT SATURATION G Get"
  kind: query
  query_command: "BE EF 03 06  00 74  66 02  00 12  27 00  00"

- id: color_management_saturation_c_get
  label: "COLOR MANAGEMENT SATURATION C Get"
  kind: query
  query_command: "BE EF 03 06  00 88  67 02  00 13  27 00  00"

- id: color_management_saturation_b_get
  label: "COLOR MANAGEMENT SATURATION B Get"
  kind: query
  query_command: "BE  EF 03 06  00 FC  66 02  00 14  27 00  00"

- id: color_management_saturation_m_get
  label: "COLOR MANAGEMENT SATURATION M Get"
  kind: query
  query_command: "BE  EF 03 06  00 00  67 02  00 15  27 00  00"

- id: color_management_luminance_r_get
  label: "COLOR MANAGEMENT LUMINANCE R Get"
  kind: query
  query_command: "BE  EF 03 06  00 CC  68 02  00 20  27 00  00"

- id: color_management_luminance_y_get
  label: "COLOR MANAGEMENT LUMINANCE Y Get"
  kind: query
  query_command: "BE  EF 03 06  00 30  69 02  00 21  27 00  00"

- id: color_management_luminance_g_get
  label: "COLOR MANAGEMENT LUMINANCE G Get"
  kind: query
  query_command: "BE  EF 03 06  00 74  69 02  00 22  27 00  00"

- id: color_management_luminance_c_get
  label: "COLOR MANAGEMENT LUMINANCE C Get"
  kind: query
  query_command: "BE  EF 03 06  00 88  68 02  00 23  27 00  00"

- id: color_management_luminance_b_get
  label: "COLOR MANAGEMENT LUMINANCE B Get"
  kind: query
  query_command: "BE  EF 03 06  00 FC  69 02  00 24  27 00  00"

- id: color_management_luminance_m_get
  label: "COLOR MANAGEMENT LUMINANCE M Get"
  kind: query
  query_command: "BE  EF 03 06  00 00  68 02  00 25  27 00  00"
```

## Variables
```yaml
# Settable scalar parameters are represented as SET/INCREMENT/DECREMENT actions
# in the merged command catalogue. No additional free-standing variables.
variables: []
```

## Events
```yaml
# Source documents no unsolicited notifications. Projector emits test data on
# power-on and lamp-strike which must be ignored (see Notes), but these are not
# state events.
events: []
```

## Macros
```yaml
# Source documents no named multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes commands are NOT accepted during warm-up; provide >=40ms gap
# between response code and any subsequent command. No explicit interlock
# procedure or power-on sequencing requirement documented beyond warm-up lockout.
```

## Notes
- **Command frame (13 bytes):** Header `BE EF 03 06 00` (bytes 0–4), CRC flag (bytes 5–6), Action (bytes 7–8), Type (bytes 9–10), Setting code (bytes 11–12). Action codes: `<SET>=01 00`, `<GET>=02 00`, `<INCREMENT>=04 00`, `<DECREMENT>=05 00`, `<EXECUTE>=06 00`.
- **Response codes:** `ACK=06h`, `NAK=15h`, `Error=1Ch + 0000h`, `Data reply=1Dh + xxxxh`. TCP#23 adds `Auth error=1Fh + 0400h`; TCP#9715 adds `Projector busy=1Fh + xxxxh + xxh` and appends connection ID to all replies.
- **Timing:** ≥40 ms interval required between a response code and the next command. Commands rejected during lamp warm-up.
- **Test data:** Projector emits test data on power-supply ON and lamp strike — ignore it.
- **TCP#9715 framing:** Wraps RS-232C command with `[0x02][0x0D][13-byte cmd][checksum][connection ID]`. Checksum chosen so the lower-8-bit sum from header through checksum is zero. Connection ID is random 0–255, echoed in replies.
- **TCP idle disconnect:** Connection auto-breaks after 30 s of no communication.
- **Authentication (optional):** Challenge-response MD5. On connect (when enabled) projector returns 8 random bytes; client binds `<8 bytes><password>`, MD5-digests, and prepends the 16-byte hex digest to the command. Auth data may be omitted for subsequent commands on the same connection. Defaults: Port 23 auth disabled, Port 9715 auth enabled.
- **Network Bridge mode:** Separate COMMUNICATION TYPE setting (`NETWORK BRIDGE` in OPTION–SERVICE menu) lets an RS-232C-attached device be tunnelled over LAN. Bridge passthrough serial config is configurable (4800/9600/19200/38400 bps, NONE/ODD/EVEN parity, HALF/FULL duplex) — distinct from native RS-232C control (fixed 19200bps 8N1).
- **Model restrictions:** Commands suffixed `*` (SDI input/source/range/frame-lock/volume, NATIVE aspect) apply only to CP-WU8600/CP-WX8650/CP-WU8700/CP-WX8750.
- **Cabling:** RS-232C cable must be cross (null-modem); pinout TD↔TD, RD↔RD, GND↔GND, RTS↔CTS. LAN/HDBaseT uses CAT-5e or greater, shielded, straight, single cable.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow control — RTS/CTS pins present but active flow control not described. -->
<!-- UNRESOLVED: authentication password is operator-set (default blank); no fixed credential in source. -->
<!-- UNRESOLVED: command acceptance latency / queue depth limits beyond 40 ms spacing not specified. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - manualslib.com
  - projectorcentral.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Hitachi-CP-X8800B-TechnicalGuide.pdf"
  - https://www.manualslib.com/manual/1167076/Hitachi-Cp-Wu8700.html
  - https://www.projectorcentral.com/pdf/projector_manual_9656.pdf
retrieved_at: 2026-05-14T16:51:55.434Z
last_checked_at: 2026-06-25T08:55:08.463Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T08:55:08.463Z
matched_actions: 905
action_count: 905
confidence: medium
summary: "deterministic presence proof: 905/905 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. SDI commands marked \"*\" apply only to CP-WU8600/CP-WX8650/CP-WU8700/CP-WX8750 per source; NATIVE aspect marked \"*\" likewise restricted."
- "RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but flow control usage not stated; set to none"
- "authentication password is user-set (default blank); not a fixed credential."
- "firmware version compatibility not stated in source."
- "serial flow control — RTS/CTS pins present but active flow control not described."
- "authentication password is operator-set (default blank); no fixed credential in source."
- "command acceptance latency / queue depth limits beyond 40 ms spacing not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
