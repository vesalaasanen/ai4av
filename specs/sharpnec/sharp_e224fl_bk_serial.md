---
spec_id: admin/sharp-nec-e224fl-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E224Fl Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "E224Fl Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "E224Fl Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:02:38.021Z
last_checked_at: 2026-06-17T19:42:03.927Z
generated_at: 2026-06-17T19:42:03.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source manual is a generic multi-model projector reference; it does not itself name the \"E224Fl Bk\" model. Confirm this manual applies to the E224Fl Bk against the device or vendor."
  - "input-terminal value table (DATA01 of 018), aspect value table, base-model-type table, eco-mode value table, and sub-input value table are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
  - "ID2 (model code) value for this model is not stated in the source."
  - "RTS/CTS pins wired (D-SUB 9P) but flow-control mode not explicitly stated in source"
  - "not present in refined source).\""
  - "numeric enum values not present in refined source (Appendix missing)."
  - "source is a generic projector command reference (BDT140013 Rev 7.1) and does not name the \"E224Fl Bk\" — model applicability unconfirmed."
  - "Appendix \"Supplementary Information by Command\" (input terminal, aspect, base-model-type, eco-mode, sub-input value tables) not present in refined source."
  - "ID2 model code, exact flow-control mode, and firmware compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:42:03.927Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally to source with correct opcode sequences and parameters; transport settings (baud rates, port 7142) confirmed verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E224Fl Bk Control Spec

## Summary
Control spec derived from the Sharp/NEC *Projector Control Command Reference Manual* (BDT140013 Revision 7.1). The device exposes a binary hex-framed command protocol over RS-232C serial (D-SUB 9P, PC CONTROL) and over wired/wireless LAN (TCP port 7142). Commands cover power, input switching, picture/volume/aspect/gain adjustment, mute, shutter, lens control and lens memory, status queries, LAN/eco/PIP/edge-blending settings, and base-model/serial-number information requests.

<!-- UNRESOLVED: the source manual is a generic multi-model projector reference; it does not itself name the "E224Fl Bk" model. Confirm this manual applies to the E224Fl Bk against the device or vendor. -->
<!-- UNRESOLVED: input-terminal value table (DATA01 of 018), aspect value table, base-model-type table, eco-mode value table, and sub-input value table are referenced to an "Appendix: Supplementary Information by Command" that is not present in the refined source. -->
<!-- UNRESOLVED: ID2 (model code) value for this model is not stated in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200/38400/19200/9600/4800  # source lists all five; device auto/configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired (D-SUB 9P) but flow-control mode not explicitly stated in source
addressing:
  port: 7142  # TCP, stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST present
```

## Actions
```yaml
# Frame (hex): <STX-based> ... <CKS>. CKS = low byte of sum of all preceding bytes.
# ID1 = projector control ID; ID2 = model code (UNRESOLVED for this model).
# Verbatim command payloads below include the checksum byte exactly as written in the source.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Input terminal code. Source example: 06h = video port. Full value table is in the Appendix (UNRESOLVED: not present in refined source)."
    - name: checksum
      type: computed
      description: "Low byte of sum of all preceding bytes. Example for data01=06h: 0Eh."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: hex
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: hex
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: hex
      description: "Adjustment value (high-order 8 bits)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes. Source examples: brightness=10 → 21h; brightness=-10 → 0Ch."

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: hex
      description: "Adjustment value (low-order 8 bits)."
    - name: data03
      type: hex
      description: "Adjustment value (high-order 8 bits)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes. Source example volume=10 → 27h."

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {checksum}"
  params:
    - name: data01
      type: hex
      description: "Aspect value. Full value table is in the Appendix (UNRESOLVED: not present in refined source)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Adjustment target DATA01. Source: 96h = LAMP ADJUST / LIGHT ADJUST (paired with DATA02=FFh)."
    - name: data02
      type: hex
      description: "Adjustment target DATA02 (FFh with 96h)."
    - name: data03
      type: hex
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: hex
      description: "Adjustment value (low-order 8 bits)."
    - name: data05
      type: hex
      description: "Adjustment value (high-order 8 bits)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: hex
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes. Source example (lamp1, usage) → 9Ch."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Key code low byte (WORD type). Source key-code list includes: POWER ON 02h, POWER OFF 03h, AUTO 05h, MENU 06h, UP 07h, DOWN 08h, RIGHT 09h, LEFT 0Ah, ENTER 0Bh, EXIT 0Ch, HELP 0Dh, MAGNIFY UP 0Fh, MAGNIFY DOWN 10h, MUTE 13h, PICTURE 29h, COMPUTER1 4Bh, COMPUTER2 4Ch, VIDEO1 4Fh, S-VIDEO1 51h, VOLUME UP 84h, VOLUME DOWN 85h, FREEZE 8Ah, ASPECT A3h, SOURCE D7h, LAMP MODE/ECO EEh (DATA02 always 00h in source list)."
    - name: data02
      type: hex
      description: "Key code high byte (00h for all listed keys)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes. Source example (AUTO) → 18h."

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Lens target. Source: 06h=Periphery Focus (only value listed)."
    - name: data02
      type: hex
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {checksum}"
  params:
    - name: data01
      type: hex
      description: "Lens target (matching 053 DATA01)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Lens target (FFh=Stop)."
    - name: data02
      type: hex
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: hex
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: hex
      description: "Adjustment value (high-order 8 bits)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile set by 053-10."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: hex
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes. Source example (brightness) → 0Bh."

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "01h=Freeze On, 02h=Freeze Off."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {checksum}"
  params:
    - name: data01
      type: hex
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Eco-mode value. Full value table is in the Appendix (UNRESOLVED: not present in refined source)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} ... {data16} 00h {checksum}"
  params:
    - name: data01_16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated via trailing 00h)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: hex
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values per Appendix, UNRESOLVED)."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {checksum}"
  params:
    - name: data01
      type: hex
      description: "Input terminal. Full value table in Appendix (UNRESOLVED: not present in refined source)."
    - name: data02
      type: hex
      description: "Setting value: 00h=the terminal in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: checksum
      type: computed
      description: "Low byte of sum of preceding bytes."
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "DATA01-12 error bits from 009. 0=normal, 1=error (cover, fan, temperature, lamp, mirror cover, interlock switch, etc.)."

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "DATA03/06 of 078-2 RUNNING STATUS REQUEST."

- id: mute_status
  type: object
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each on/off)."

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "078-6 mirror/lens cover status."

- id: lamp_info
  type: object
  description: "037-4: lamp usage time (s) and remaining life (%). Negative remaining life if past replacement deadline."

- id: filter_usage
  type: object
  description: "037-3: filter usage time (s) and alarm start time (s); -1 if undefined."

- id: carbon_savings
  type: object
  description: "037-6: total / during-operation carbon savings (kg + mg)."

- id: lamp_filter_info
  type: object
  description: "037: projector name, lamp usage time (s), filter usage time (s). Updated 1-minute intervals."

- id: lens_position
  type: object
  description: "053-1: upper/lower/current adjustment range for requested lens target."

- id: lens_motion
  type: bitmask
  description: "053-7: lens memory / zoom / focus / lens-shift-H / lens-shift-V in-motion bits."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 selected reference lens memory profile."

- id: gain_parameter
  type: object
  description: "060-1: upper/lower/default/current/wide/narrow range + adjustability status for requested gain."

- id: projector_setting
  type: object
  description: "078-1: base model type, sound function, profile (clock/sleep timer)."

- id: input_status
  type: object
  description: "078-3: signal switch process, signal list number, selection signal types, test pattern, content displayed."

- id: model_name
  type: string
  description: "078-5 model name string."

- id: info_string
  type: string
  description: "084 horizontal/vertical sync frequency strings."

- id: eco_mode
  type: enum
  description: "097-8 eco / light / lamp mode value."

- id: lan_projector_name
  type: string
  description: "097-45 projector name."

- id: lan_mac_address
  type: string
  description: "097-155 MAC address (6 bytes)."

- id: pip_pbp_state
  type: object
  description: "097-198 MODE / START POSITION / SUB INPUT values."

- id: edge_blending_state
  type: enum
  values: [off, on]
  description: "097-243-1."

- id: base_model_type
  type: object
  description: "305-1 base model type + model name."

- id: serial_number
  type: string
  description: "305-2 serial number string."

- id: basic_information
  type: object
  description: "305-3: operation status, content displayed, selection signal type, video mute, sound mute, onscreen mute, freeze status."
```

## Variables
```yaml
- id: eco_mode_value
  description: "Set via 098-8 / read via 097-8."
  # UNRESOLVED: numeric enum values not present in refined source (Appendix missing).

- id: lan_projector_name
  description: "Set via 098-45 / read via 097-45 (up to 16 bytes)."

- id: pip_pbp_settings
  description: "Set via 098-198 / read via 097-198 (mode, start position, sub inputs)."

- id: edge_blending
  description: "Set via 098-243-1 / read via 097-243-1 (off/on)."

- id: audio_select
  description: "Set via 319-10 per input terminal."
```

## Events
```yaml
# No unsolicited notifications are documented in the source.
```

## Macros
```yaml
# No multi-step sequences are documented explicitly in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015): while turning power on, no other command can be accepted."
  - "Power Off (016): while turning power off (including cooling time), no other command can be accepted."
# No additional safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in the refined source beyond the power on/off block above.
```

## Notes
- **Frame format:** commands/responses are hex-framed. Checksum (CKS) = low-order byte of the sum of all preceding bytes (see worked example in source §2.2). Every command payload above carries its checksum verbatim where the source provides a fixed one; parameterized commands carry a `{checksum}` computed field.
- **IDs:** ID1 = projector control ID (configurable); ID2 = model code. ID2 for this model is not stated in the source (UNRESOLVED).
- **Response convention:** success responses are echoed with the command opcode in the A0h/A1h/A2h/A3h acknowledgement family and carry ERR1/ERR2 on failure (see source §2.4 error-code table).
- **Baud rate:** five rates supported (115200 / 38400 / 19200 / 9600 / 4800); the device is configurable, so a single canonical baud_rate is not fixed by the source.
- **Refresh granularity:** lamp/filter usage times are obtainable in 1-second units but updated at 1-minute intervals.
<!-- UNRESOLVED: source is a generic projector command reference (BDT140013 Rev 7.1) and does not name the "E224Fl Bk" — model applicability unconfirmed. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal, aspect, base-model-type, eco-mode, sub-input value tables) not present in refined source. -->
<!-- UNRESOLVED: ID2 model code, exact flow-control mode, and firmware compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:02:38.021Z
last_checked_at: 2026-06-17T19:42:03.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:42:03.927Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally to source with correct opcode sequences and parameters; transport settings (baud rates, port 7142) confirmed verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source manual is a generic multi-model projector reference; it does not itself name the \"E224Fl Bk\" model. Confirm this manual applies to the E224Fl Bk against the device or vendor."
- "input-terminal value table (DATA01 of 018), aspect value table, base-model-type table, eco-mode value table, and sub-input value table are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
- "ID2 (model code) value for this model is not stated in the source."
- "RTS/CTS pins wired (D-SUB 9P) but flow-control mode not explicitly stated in source"
- "not present in refined source).\""
- "numeric enum values not present in refined source (Appendix missing)."
- "source is a generic projector command reference (BDT140013 Rev 7.1) and does not name the \"E224Fl Bk\" — model applicability unconfirmed."
- "Appendix \"Supplementary Information by Command\" (input terminal, aspect, base-model-type, eco-mode, sub-input value tables) not present in refined source."
- "ID2 model code, exact flow-control mode, and firmware compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
