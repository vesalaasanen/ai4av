---
spec_id: admin/sharp-nec-np-p502wl-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-P502WL-2 Control Spec"
manufacturer: Sharp/NEC
model_family: NP-P502WL-2
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-P502WL-2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:54:09.465Z
last_checked_at: 2026-06-18T08:48:59.276Z
generated_at: 2026-06-18T08:48:59.276Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific appendix values (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes) are referenced as \"see Appendix\" in the source but the appendix content is not included in this document."
  - "appendix not in source.\""
  - "aspect enum values referenced to Appendix not present in source"
  - "eco-mode enum values referenced to Appendix not present in source"
  - "no event/notification model present in source."
  - "none documented."
  - "no explicit power-on sequencing, voltage/current ratings, or formal interlock"
  - "firmware version compatibility not stated in source."
  - "appendix enum tables (input terminal, aspect, eco-mode, sub-input, base-model-type) not included in source document."
  - "model code (ID2) value for NP-P502WL-2 not stated in this command reference."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:48:59.276Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-P502WL-2 Control Spec

## Summary
Binary control protocol for Sharp/NEC NP-P502WL-2 projector over RS-232C (D-SUB 9P cross cable) and wired/wireless LAN. Commands are fixed-length hex frames with a trailing checksum byte (low-order 8 bits of the sum of preceding bytes). TCP port 7142 is used for LAN transport. Covers power, input switching, mutes, picture/volume/aspect/gain adjustment, lens control and memory, information/status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: model-specific appendix values (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes) are referenced as "see Appendix" in the source but the appendix content is not included in this document. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; RTS/CTS pins wired per pin table but no explicit flow-control mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
  - queryable    # inferred: numerous *REQUEST commands returning values
  - routable     # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Response returns DATA01-DATA12 error bitmask (bit=1 indicates error).

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command accepted.

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: Includes cooling time; no other command accepted during cooldown.

- id: input_sw_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal code (hex). Example: 06h = video port. Full code list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    - name: cks
      type: string
      description: Checksum byte (low-order 8 bits of sum of preceding bytes).

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Auto-off on input/video switch.

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Auto-off on input/video switch or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Auto-off on input/video switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: Adjustment value (low-order 8 bits).
    - name: data03
      type: string
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value (hex). Full list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    - name: cks
      type: string
      description: Checksum byte.

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target DATA01 (per source table, e.g. 96h for LAMP/LIGHT ADJUST)."
    - name: data02
      type: string
      description: "Adjustment target DATA02 (per source table, e.g. FFh for LAMP/LIGHT ADJUST)."
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: Adjustment value (low-order 8 bits).
    - name: data05
      type: string
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). -1 returned if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Reflects eco mode if enabled. Negative remaining life if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Scope: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999).

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type). See key code list in source §3.19."
    - name: data02
      type: string
      description: "Key code high byte (typically 00h)."
    - name: cks
      type: string
      description: Checksum byte.
  notes: "Key code examples (DATA01/DATA02): POWER ON 02h/00h, POWER OFF 03h/00h, AUTO 05h/00h, MENU 06h/00h, UP 07h/00h, DOWN 08h/00h, RIGHT 09h/00h, LEFT 0Ah/00h, ENTER 0Bh/00h, EXIT 0Ch/00h, HELP 0Dh/00h, MAGNIFY UP 0Fh/00h, MAGNIFY DOWN 10h/00h, MUTE 13h/00h, PICTURE 29h/00h, COMPUTER1 4Bh/00h, COMPUTER2 4Ch/00h, VIDEO1 4Fh/00h, S-VIDEO1 51h/00h, VOLUME UP 84h/00h, VOLUME DOWN 85h/00h, FREEZE 8Ah/00h, ASPECT A3h/00h, SOURCE D7h/00h, LAMP MODE/ECO EEh/00h."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis (e.g. 06h = Periphery Focus; other axes referenced in source but not tabulated here)."
    - name: data02
      type: string
      description: "Motion: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Send 00h to stop after a 7Fh/81h continuous drive.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens axis selector.
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns upper/lower limit and current value (16-bit) for the selected axis.

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Axis, or FFh = Stop (mode/value ignored when Stop)."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: Checksum byte.

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Operates on profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns setting value 00h=OFF, 01h=ON.

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitmask of lens-operation status (Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: string
      description: Checksum byte.

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns profile number 00h=Profile 1, 01h=Profile 2.

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: string
      description: Checksum byte.
  notes: Returns status, upper/lower/default/current limits and wide/narrow adjustment widths.

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05).

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, test pattern display, displayed content.

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display flags.

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns NUL-terminated model name string.

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns 00h=Normal (cover opened), 01h=Cover closed.

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off."
    - name: cks
      type: string
      description: Checksum byte.

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: cks
      type: string
      description: Checksum byte.

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco-mode value. Returns "Light mode" or "Lamp mode" depending on projector. Value list in Appendix - UNRESOLVED.

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns NUL-terminated projector name (DATA01-17).

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns 6-byte MAC address (DATA01-06).

- id: pip_pbp_request
  label: PIP/Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: string
      description: Checksum byte.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns setting value 00h=OFF, 01h=ON.

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco-mode value. Value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    - name: cks
      type: string
      description: Checksum byte.

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Projector name byte 1.
    - name: data02
      type: string
      description: Projector name byte 2.
    - name: data03
      type: string
      description: Projector name byte 3.
    - name: data04
      type: string
      description: Projector name byte 4.
    - name: data05
      type: string
      description: Projector name byte 5.
    - name: data06
      type: string
      description: Projector name byte 6.
    - name: data07
      type: string
      description: Projector name byte 7.
    - name: data08
      type: string
      description: Projector name byte 8.
    - name: data09
      type: string
      description: Projector name byte 9.
    - name: data10
      type: string
      description: Projector name byte 10.
    - name: data11
      type: string
      description: Projector name byte 11.
    - name: data12
      type: string
      description: Projector name byte 12.
    - name: data13
      type: string
      description: Projector name byte 13.
    - name: data14
      type: string
      description: Projector name byte 14.
    - name: data15
      type: string
      description: Projector name byte 15.
    - name: data16
      type: string
      description: Projector name byte 16 (max 16 bytes).
    - name: cks
      type: string
      description: Checksum byte.

- id: pip_pbp_set
  label: PIP/Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input codes in Appendix - UNRESOLVED)."
    - name: cks
      type: string
      description: Checksum byte.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: Checksum byte.

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Type codes in Appendix - UNRESOLVED.

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns NUL-terminated serial number (DATA01-16).

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, displayed content, signal types, display signal type, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal code (hex). Full list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: string
      description: Checksum byte.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06; 305-3 BASIC INFORMATION REQUEST DATA01

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA05

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4 MUTE STATUS REQUEST DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA04

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: 078-6 COVER STATUS REQUEST DATA01

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-11 LENS PROFILE REQUEST

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST

- id: lamp_usage_time_seconds
  type: integer
  source: 037 INFORMATION REQUEST DATA83-86; 037-4 LAMP INFORMATION REQUEST 3 (content 01h) DATA03-06

- id: lamp_remaining_life_percent
  type: integer
  source: 037-4 LAMP INFORMATION REQUEST 3 (content 04h) DATA03-06. Negative if replacement deadline exceeded.

- id: filter_usage_time_seconds
  type: integer
  source: 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04

- id: projector_name
  type: string
  source: 037 DATA01-49; 097-45 LAN PROJECTOR NAME REQUEST DATA01-17

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST DATA01-32

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST DATA01-16

- id: mac_address
  type: string
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST 2 DATA01-06

- id: error_status
  type: bitmask
  bits: 96
  source: 009 ERROR STATUS REQUEST DATA01-DATA12

- id: command_error
  type: enum
  values: [unrecognized, not_supported, invalid_value, invalid_input_terminal, invalid_language, memory_alloc_error, memory_in_use, value_not_settable, forced_onscreen_mute, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, invalid_gain_number, invalid_gain, adjustment_failed]
  source: ERR1/ERR2 error code list (§2.4)
```

## Variables
```yaml
- id: brightness
  type: integer
  source: 030-1 PICTURE ADJUST (DATA01=00h); 060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)

- id: contrast
  type: integer
  source: 030-1 (DATA01=01h); 060-1 (DATA01=01h)

- id: color
  type: integer
  source: 030-1 (DATA01=02h); 060-1 (DATA01=02h)

- id: hue
  type: integer
  source: 030-1 (DATA01=03h); 060-1 (DATA01=03h)

- id: sharpness
  type: integer
  source: 030-1 (DATA01=04h); 060-1 (DATA01=04h)

- id: volume
  type: integer
  source: 030-2 VOLUME ADJUST; 060-1 (DATA01=05h)

- id: lamp_light_adjust
  type: integer
  source: 030-15 OTHER ADJUST (DATA01=96h, DATA02=FFh); 060-1 (DATA01=96h)

- id: aspect
  type: enum
  source: 030-12 ASPECT ADJUST
  # UNRESOLVED: aspect enum values referenced to Appendix not present in source

- id: eco_mode
  type: enum
  source: 098-8 ECO MODE SET / 097-8 ECO MODE REQUEST
  # UNRESOLVED: eco-mode enum values referenced to Appendix not present in source
```

## Events
```yaml
# Source describes only request/response semantics; no unsolicited notifications documented.
# UNRESOLVED: no event/notification model present in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015): no other command accepted while power-on is in progress."
  - "Power Off (016): no other command accepted during power-off including cooling time."
  - "Lens Control (053): continuous-drive (7Fh/81h) must be stopped explicitly with 00h."
  - "Picture/Sound/Onscreen Mute auto-cleared on input/video switch (and volume adjust for sound mute)."
# UNRESOLVED: no explicit power-on sequencing, voltage/current ratings, or formal interlock
# procedures stated in this command reference. Source is a command reference only; consult the
# projector operation manual for full electrical and mechanical safety data.
```

## Notes
- All commands/responses are binary hex frames. Every frame ends in a checksum byte (CKS) computed as the low-order 8 bits of the sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` sums to `103h`, so CKS = `03h`.
- Frame structure: `<MsgType> <Command> <ID1> <ID2> <LEN> <DATA...> <CKS>`. `ID1` is the configured control ID; `ID2` is the model code (model-dependent). Response prefixes: `2xh` = success echo of command group, `Axh` = error response with ERR1/ERR2.
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps — the projector and controller must be configured to match; this spec records the highest listed rate.
- Pin assignment for the PC CONTROL port (D-SUB 9P) uses a cross/null-modem wiring: pin 2↔3 (RxD/TxD), pin 7↔8 (RTS/CTS), pin 5=GND.
- Several commands reference an "Appendix: Supplementary Information by Command" for input-terminal codes, aspect values, eco-mode values, sub-input values, and base-model-type codes. That appendix is **not** present in the provided source document, so the corresponding enum ranges are marked UNRESOLVED.
- Lamp/filter usage times are reported in one-second units but updated at one-minute intervals.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: appendix enum tables (input terminal, aspect, eco-mode, sub-input, base-model-type) not included in source document. -->
<!-- UNRESOLVED: model code (ID2) value for NP-P502WL-2 not stated in this command reference. -->
```

Spec ready. 53 actions, full payloads verbatim incl checksums. Both serial+TCP protocols covered (port 7142 stated). Appendix enum tables marked UNRESOLVED — not in source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:54:09.465Z
last_checked_at: 2026-06-18T08:48:59.276Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:48:59.276Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific appendix values (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes) are referenced as \"see Appendix\" in the source but the appendix content is not included in this document."
- "appendix not in source.\""
- "aspect enum values referenced to Appendix not present in source"
- "eco-mode enum values referenced to Appendix not present in source"
- "no event/notification model present in source."
- "none documented."
- "no explicit power-on sequencing, voltage/current ratings, or formal interlock"
- "firmware version compatibility not stated in source."
- "appendix enum tables (input terminal, aspect, eco-mode, sub-input, base-model-type) not included in source document."
- "model code (ID2) value for NP-P502WL-2 not stated in this command reference."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
