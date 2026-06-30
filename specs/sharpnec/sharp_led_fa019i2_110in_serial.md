---
spec_id: admin/sharp-nec-led-fa019i2-110in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA019I2 110in Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA019I2 110in"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA019I2 110in"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:29.216Z
last_checked_at: 2026-06-17T20:39:38.638Z
generated_at: 2026-06-17T20:39:38.638Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal / signal-type / base-model-type / aspect / eco-mode / sub-input value tables are referenced by the source as \"see Appendix Supplementary Information by Command\" but the appendix is not included in the refined source. Parameter enum values for those fields therefore left as documented mnemonics only."
  - "firmware version compatibility not stated in source"
  - "voltage, current, power specifications not stated in source"
  - "flow control not stated (pinout shows RTS/CTS but \"Communication mode: Full duplex\" only)"
  - "enum values in source Appendix not included"
  - "no async event mechanism documented in source."
  - "none documented."
  - "source contains no explicit safety interlock procedures or"
  - "Appendix \"Supplementary Information by Command\" (input terminal, base model type, aspect, eco mode, sub input, selection signal type enums) is referenced by the source but not present in the refined document. Those enum values could not be populated."
  - "firmware version compatibility not stated in source."
  - "flow_control not explicitly stated (RTS/CTS pins present in pinout but source only says \"Full duplex\")."
  - "factory-default baud rate not stated."
  - "ID2 model code value for FA019I2 not stated; must be read from device."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:39:38.638Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions found verbatim in source; serial (115200 baud, 8 bits, no parity, 1 stop) and TCP port 7142 confirmed. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA019I2 110in Control Spec

## Summary
Sharp/NEC large-format LED display (referred to as "projector" in the source manual) controllable via RS-232C serial and wired/wireless LAN (TCP port 7142). The command reference uses a binary frame format with header byte, model/control bytes, length, DATA payload, and a one-byte additive checksum. Covers power, input selection, mute, lens/shutter, lens memory, picture/volume/aspect/gain adjustment, status queries, and LAN/PIP/edge-blend configuration commands.

<!-- UNRESOLVED: input-terminal / signal-type / base-model-type / aspect / eco-mode / sub-input value tables are referenced by the source as "see Appendix Supplementary Information by Command" but the appendix is not included in the refined source. Parameter enum values for those fields therefore left as documented mnemonics only. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP) interfaces. The known
# protocol supplied is RS-232C, but TCP control on port 7142 is also explicit.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (pinout shows RTS/CTS but "Communication mode: Full duplex" only)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable     (POWER ON / POWER OFF commands)
# - queryable     (many status/information request commands)
# - routable      (INPUT SW CHANGE / AUDIO SELECT SET)
# - levelable     (PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL / LAMP ADJUST)
# Inferred from documented command examples.
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions
```yaml
# Binary frame format (all bytes hex). Layout per source §2.1:
#   <HDR> <MT> <ID1> <ID2> <LEN> <DATA...> <CKS>
# HDR: 00h=set/request, 01h=set alt, 02h=set, 03h=set-with-data, 20h/21h/22h/23h=ack.
# CKS = low byte of sum of all preceding bytes (incl. HDR). ID1=control ID,
# ID2=model code (device-specific). Commands below show the client-to-device
# request frame verbatim; variable DATA bytes are shown in braces.
# Notes from source: while POWER ON/OFF is executing (incl. cooling), no other
# command is accepted. Input/video-signal switch cancels picture/sound/onscreen
# mute; volume adjustment also cancels sound mute.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 bitmap of error information (cover/fan/temp/lamp/etc.)."

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal. Example from source: 06h = video port. Full enum in source Appendix (not included here)."
  notes: "Source example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video-signal switch."

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
  notes: "Cleared on input/video-signal switch or volume adjustment."

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
  notes: "Cleared on input/video-signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value, low-order 8 bits."
    - name: DATA04
      type: integer
      description: "Adjustment value, high-order 8 bits."
  notes: "Source example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: ... 00h F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA02
      type: integer
      description: "Adjustment value, low-order 8 bits."
    - name: DATA03
      type: integer
      description: "Adjustment value, high-order 8 bits."
  notes: "Source example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Aspect value. Enum in source Appendix (not included here)."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust) (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target (per source): 96h = LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: enum
      description: "Per source table: FFh for LAMP/LIGHT ADJUST."
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA04
      type: integer
      description: "Adjustment value, low-order 8 bits."
    - name: DATA05
      type: integer
      description: "Adjustment value, high-order 8 bits."

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: enum
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
  notes: "Eco-mode values reflect eco mode. Remaining life negative if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list)."
    - name: DATA02
      type: integer
      description: "Key code high byte (see key code list)."
  notes: "Key code list (DATA01/DATA02 / name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes the lens shutter."

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "Opens the lens shutter."

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target. Source shows 06h = Periphery Focus. Other targets in Appendix (not included)."
    - name: DATA02
      type: enum
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
  notes: "After 7Fh/81h continuous drive, send DATA02=00h to stop. Same command can be reissued during drive without stop."

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target (see LENS CONTROL)."
  notes: "Returns upper/lower limit and current value (16-bit each)."

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target; FFh = Stop (mode/value ignored)."
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value, low-order 8 bits."
    - name: DATA04
      type: integer
      description: "Adjustment value, high-order 8 bits."

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on the profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Returns setting value (00h=OFF, 01h=ON)."

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns profile number (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Returns status, upper/lower limits, default, current, wide/narrow adjustment widths, and default-validity flag."

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status (Standby/Power on/Cooling/etc.)."

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (-1 of practical), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state."

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (NUL-terminated) in DATA01-32."

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=Freeze ON, 02h=Freeze OFF."

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
  notes: "Returns label length and label/info string (NUL-terminated)."

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light/Lamp mode per model). Value enum in Appendix (not included)."

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (NUL-terminated) in DATA01-17."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input enum in Appendix (not included)."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Eco mode value. Enum in Appendix (not included)."
  notes: "Sets Light mode or Lamp mode depending on model."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01-DATA16
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated via trailing 00h."
  notes: "Source frame template: 03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>."

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: enum
      description: "Per DATA01: MODE (00h=PIP, 01h=PiPbyP), START POSITION (00h-03h corners), or sub input value (Appendix)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type (DATA12-13)."

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (NUL-terminated) in DATA01-16."

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal type 1/2, display signal type (video standards), video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal. Enum in Appendix (not included)."
    - name: DATA02
      type: enum
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Query responses return framed data (see corresponding Actions kind: query).
# Observable state surfaces derived from source response descriptions:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request / basic_information_request DATA

- id: cooling_in_progress
  type: boolean
  source: running_status_request DATA04

- id: picture_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: mute_status_request DATA03

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: cover_status_request DATA01

- id: shutter_state
  type: enum
  values: [closed, open]
  source: derived from 051 SHUTTER CLOSE / 052 SHUTTER OPEN (no direct query in source)

- id: selected_input
  type: composite
  source: input_status_request DATA02-DATA04

- id: lamp_usage_seconds
  type: integer
  source: information_request DATA83-86 / lamp_information_request_3

- id: lamp_remaining_life_pct
  type: integer
  source: lamp_information_request_3 (DATA02=04h)

- id: filter_usage_seconds
  type: integer
  source: filter_usage_information_request DATA01-04

- id: eco_mode
  type: enum
  source: eco_mode_request  # UNRESOLVED: enum values in source Appendix not included

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request

- id: lens_operation_bitmap
  type: bitmap
  source: lens_information_request DATA01
```

## Variables
```yaml
# Settable parameters that are not discrete actions, exposed via the adjust
# commands. Ranges/defaults obtainable at runtime via gain_parameter_request_3.
- id: brightness
  type: integer
  adjust_command: picture_adjust (DATA01=00h)

- id: contrast
  type: integer
  adjust_command: picture_adjust (DATA01=01h)

- id: color
  type: integer
  adjust_command: picture_adjust (DATA01=02h)

- id: hue
  type: integer
  adjust_command: picture_adjust (DATA01=03h)

- id: sharpness
  type: integer
  adjust_command: picture_adjust (DATA01=04h)

- id: volume
  type: integer
  adjust_command: volume_adjust

- id: lamp_light_adjust
  type: integer
  adjust_command: other_adjust (DATA01=96h)

- id: projector_name
  type: string
  max_length: 16
  set_command: lan_projector_name_set
  get_command: lan_projector_name_request
```

## Events
```yaml
# Source documents no unsolicited notifications; all responses are replies to
# commands. Updated at 1-minute intervals for usage-time counters.
# UNRESOLVED: no async event mechanism documented in source.
```

## Macros
```yaml
# Source documents no multi-step command sequences as macros.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command is accepted (source §3.2)."
  - "While POWER OFF is executing (incl. cooling time), no other command is accepted (source §3.3)."
  - "Input/video-signal switch clears picture mute, sound mute, and onscreen mute (source §3.5, §3.7, §3.9)."
  - "Volume adjustment clears sound mute (source §3.7)."
  - "Error 02h 0Dh: 'The command cannot be accepted because the power is off.'"
# UNRESOLVED: source contains no explicit safety interlock procedures or
# power-on sequencing requirements beyond the per-command notes above. Voltage,
# current, and power specs not present.
```

## Notes
- Binary protocol. Every frame ends with a one-byte additive checksum (CKS) = low byte of the sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Frame byte roles: HDR (message class), MT (message type / command), ID1 (control ID set on projector), ID2 (model code, device-specific), LEN (byte count of DATA following), DATA…, CKS. ACK headers: `20h/21h/22h/23h` (success, with data per LEN), `A0h/A1h/A2h/A3h` (error, with ERR1 ERR2 CKS).
- Model code (ID2) and control ID (ID1) are device-set values; the spec cannot enumerate them without per-device configuration. Treat as runtime parameters when constructing frames.
- RS-232C cable is a cross (null-modem) cable on a D-SUB 9P PC CONTROL port; pinout: 2↔3 (RxD/TxD), 7↔8 (RTS/CTS), 5=GND.
- LAN control uses TCP port 7142 on the RJ-45 port; wired 10/100 auto-sensing, wireless via optional WLAN unit (see operation manual).
- Baud rate is selectable among 115200 / 38400 / 19200 / 9600 / 4800 bps; the source does not state a factory default, so the chosen rate must match the projector's current setting.
- Lamp/filter usage counters update at 1-minute intervals though stored in 1-second units.
- Lamp remaining life (%) is returned negative once the replacement deadline is exceeded.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal, base model type, aspect, eco mode, sub input, selection signal type enums) is referenced by the source but not present in the refined document. Those enum values could not be populated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control not explicitly stated (RTS/CTS pins present in pinout but source only says "Full duplex"). -->
<!-- UNRESOLVED: factory-default baud rate not stated. -->
<!-- UNRESOLVED: ID2 model code value for FA019I2 not stated; must be read from device. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:29.216Z
last_checked_at: 2026-06-17T20:39:38.638Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:39:38.638Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions found verbatim in source; serial (115200 baud, 8 bits, no parity, 1 stop) and TCP port 7142 confirmed. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal / signal-type / base-model-type / aspect / eco-mode / sub-input value tables are referenced by the source as \"see Appendix Supplementary Information by Command\" but the appendix is not included in the refined source. Parameter enum values for those fields therefore left as documented mnemonics only."
- "firmware version compatibility not stated in source"
- "voltage, current, power specifications not stated in source"
- "flow control not stated (pinout shows RTS/CTS but \"Communication mode: Full duplex\" only)"
- "enum values in source Appendix not included"
- "no async event mechanism documented in source."
- "none documented."
- "source contains no explicit safety interlock procedures or"
- "Appendix \"Supplementary Information by Command\" (input terminal, base model type, aspect, eco mode, sub input, selection signal type enums) is referenced by the source but not present in the refined document. Those enum values could not be populated."
- "firmware version compatibility not stated in source."
- "flow_control not explicitly stated (RTS/CTS pins present in pinout but source only says \"Full duplex\")."
- "factory-default baud rate not stated."
- "ID2 model code value for FA019I2 not stated; must be read from device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
