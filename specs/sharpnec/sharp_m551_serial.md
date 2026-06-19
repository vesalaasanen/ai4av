---
spec_id: admin/sharp-nec-m551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M551 Control Spec"
manufacturer: Sharp/NEC
model_family: M551
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - M551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:45:16.114Z
last_checked_at: 2026-06-18T08:11:19.723Z
generated_at: 2026-06-18T08:11:19.723Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "model code (ID2) value for M551 not stated in source; varies by model."
  - "control ID (ID1) default value not stated in source."
  - "input terminal DATA01 value map and aspect/eco-mode/sub-input value maps referenced to an \"Appendix: Supplementary Information by Command\" not present in the refined source."
  - "flow_control not stated in source (full-duplex communication mode stated; RTS/CTS pins wired but no flow-control setting documented)."
  - "not in refined source).\""
  - "unsolicited event/notification behavior not described in source. All feedbacks are poll-based via request commands."
  - "source documents no unsolicited notifications; device is strictly request/response."
  - "source documents no multi-step command sequences."
  - "no explicit confirmation-required list stated in source; power_off inferred as high-impact. No power-on sequencing procedure documented."
  - "firmware version compatibility not stated."
  - "ID1 control ID default and ID2 model code for M551 not stated."
  - "serial flow_control not stated."
  - "appendix value maps for input terminal / aspect / eco mode / sub input / base model type not present in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:11:19.723Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M551 Control Spec

## Summary
The Sharp/NEC M551 is a projector controllable via an RS-232C serial link (PC CONTROL D-SUB 9P) or a wired/wireless LAN using TCP port 7142. This spec covers the binary command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/gain adjust, lens control and memory, freeze, shutter, eco mode, edge blending, PIP/PbP, and a large set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model code (ID2) value for M551 not stated in source; varies by model. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source. -->
<!-- UNRESOLVED: input terminal DATA01 value map and aspect/eco-mode/sub-input value maps referenced to an "Appendix: Supplementary Information by Command" not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: "115200/38400/19200/9600/4800"
  data_bits: 8
  parity: none
  stop_bits: 1
  communication_mode: full_duplex
  flow_control: null
auth:
  type: none
```

<!-- UNRESOLVED: flow_control not stated in source (full-duplex communication mode stated; RTS/CTS pins wired but no flow-control setting documented). -->
<!-- INFERRED: auth.type none — source describes no login/password/auth procedure. -->
<!-- NOTE: serial cable is a cross cable to PC CONTROL port (D-SUB 9P); pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS. -->
<!-- NOTE: LAN data rate auto-switchable 10/100 Mbps (IEEE 802.3 / 802.3u Auto-Negotiation). Wireless LAN via optional wireless LAN unit (see model operation manual). -->

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

<!-- INFERRED: powerable (POWER ON/OFF commands present), queryable (numerous status requests), levelable (picture/volume/gain adjust), routable (INPUT SW CHANGE / audio select). -->

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response returns DATA01-DATA12 error bit fields. 0=normal, 1=error."

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power is turning on."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (including cooling time)."

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h = video port). Full value map in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in refined source)."
      - name: cks
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."
    notes: "Example (switch to video, DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no signal switch)."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video signal switch or volume adjustment."

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
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
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: string
        description: "Adjustment value high-order 8 bits."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10 example: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: data03
        type: string
        description: "Adjustment value high-order 8 bits."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value. Map in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in refined source)."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: other_adjust
    label: Other Adjust (Gain)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte (DATA01)."
      - name: data02
        type: string
        description: "Adjustment target low byte (DATA02). Documented: DATA01=96h DATA02=FFh => LAMP ADJUST / LIGHT ADJUST."
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: data05
        type: string
        description: "Adjustment value high-order 8 bits."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). '-1' if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Lamp usage request example: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life returned if replacement deadline exceeded. Updated at 1-minute intervals."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Content: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type). See key code list."
      - name: data02
        type: string
        description: "Key code high byte (always 00h in documented list)."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Key code list (key / DATA01 / DATA02 / name): 2/02h/00h/POWER ON, 3/03h/00h/POWER OFF, 5/05h/00h/AUTO, 6/06h/00h/MENU, 7/07h/00h/UP, 8/08h/00h/DOWN, 9/09h/00h/RIGHT, 10/0Ah/00h/LEFT, 11/0Bh/00h/ENTER, 12/0Ch/00h/EXIT, 13/0Dh/00h/HELP, 15/0Fh/00h/MAGNIFY UP, 16/10h/00h/MAGNIFY DOWN, 19/13h/00h/MUTE, 41/29h/00h/PICTURE, 75/4Bh/00h/COMPUTER1, 76/4Ch/00h/COMPUTER2, 79/4Fh/00h/VIDEO1, 81/51h/00h/S-VIDEO1, 132/84h/00h/VOLUME UP, 133/85h/00h/VOLUME DOWN, 138/8Ah/00h/FREEZE, 163/A3h/00h/ASPECT, 215/D7h/00h/SOURCE, 238/EEh/00h/LAMP MODE/ECO. AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    notes: "Closes the lens shutter."

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    notes: "Opens the lens shutter."

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis. Documented: 06h=Periphery Focus."
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Send 00h to stop after 7Fh/81h continuous drive. Same command can be reissued without stop while driving."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis (same axis codes as LENS CONTROL)."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Returns DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit each)."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis. FFh=Stop (mode/value ignored)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: string
        description: "Adjustment value high-order 8 bits."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Operates on profile number selected via LENS PROFILE SET (053-10)."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Returns DATA02 setting value: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
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
        description: "Checksum byte."

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bit field: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation); Bits5-7 reserved."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns DATA01-03 base model type, DATA04 sound function (00h=Not available, 01h=Available), DATA05 profile (00h=none, 01h=Clock, 02h=Sleep timer, 03h=Clock+Sleep)."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns DATA03 power status (00h=Standby, 01h=Power on, FFh=Not supported), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby)."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (returned value = practical - 1), selection signal type 1 & 2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h=Off/Not displayed, 01h=On/Displayed)."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns DATA01-32 model name (NUL-terminated)."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed (mirror/lens cover)."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=Freeze on, 02h=Freeze off."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Returns variable-length label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco mode value. Value map in Appendix (UNRESOLVED). May report Light mode or Lamp mode depending on model."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address."

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Returns DATA02 setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input value map in Appendix (UNRESOLVED)."

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco mode value. Value map in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in refined source)."
      - name: cks
        type: string
        description: "Checksum byte."
    notes: "Sets Light mode or Lamp mode depending on model."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
    params:
      - name: data01-16
        type: string
        description: "Projector name, up to 16 bytes."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: string
        description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input value map UNRESOLVED)."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: string
        description: "Checksum byte."

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type. Value map in Appendix (UNRESOLVED)."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns DATA01-16 serial number (NUL-terminated)."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal types, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal. Value map in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in refined source)."
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: cks
        type: string
        description: "Checksum byte."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, power_saving, network_standby]
    source: running_status_request DATA03/DATA06
  - id: error_status
    type: bitmask
    source: error_status_request DATA01-DATA12
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: lamp_information_request_3
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: lamp_information_request_3
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: filter_usage_information_request
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
  - id: input_signal_type
    type: enum
    source: input_status_request DATA03-DATA04
  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: cover_status_request DATA01
  - id: command_ack
    type: enum
    values: [success, error]
    source: generic response ERR1/ERR2
```

<!-- UNRESOLVED: unsolicited event/notification behavior not described in source. All feedbacks are poll-based via request commands. -->

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    source: picture_adjust (DATA01=00h); gain_parameter_request_3 returns limits
  - id: contrast
    type: integer
    source: picture_adjust (DATA01=01h)
  - id: color
    type: integer
    source: picture_adjust (DATA01=02h)
  - id: hue
    type: integer
    source: picture_adjust (DATA01=03h)
  - id: sharpness
    type: integer
    source: picture_adjust (DATA01=04h)
  - id: volume
    type: integer
    source: volume_adjust
  - id: eco_mode
    type: enum
    source: eco_mode_set / eco_mode_request (value map UNRESOLVED)
  - id: projector_name
    type: string
    max_length: 16
    source: lan_projector_name_set / lan_projector_name_request
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: edge_blending_mode_set / edge_blending_mode_request
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: lens_profile_set / lens_profile_request
```

## Events
```yaml
events: []
```

<!-- UNRESOLVED: source documents no unsolicited notifications; device is strictly request/response. -->

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: source documents no multi-step command sequences. -->

## Safety
```yaml
confirmation_required_for:
  - power_off
interlocks:
  - power_on_blocks_other_commands_during_warmup
  - power_off_blocks_other_commands_during_cooldown
```

<!-- SAFETY NOTES (from source): -->
<!-- - POWER ON: "While this command is turning on the power, no other command can be accepted." -->
<!-- - POWER OFF: "While this command is turning off the power (including the cooling time), no other command can be accepted." -->
<!-- - Error status bit DATA09 Bit1: "The interlock switch is open." (hardware interlock indicator). -->
<!-- UNRESOLVED: no explicit confirmation-required list stated in source; power_off inferred as high-impact. No power-on sequencing procedure documented. -->

## Notes
- Command/response frame format: bytes in hex, parameters in `<brackets>`. First byte is message-type prefix (00h/01h/02h/03h = command classes; 20h/21h/22h/23h = success response echoes; A0h/A1h/A2h/A3h = error responses).
- Checksum (CKS): sum all preceding bytes, take low-order 8 bits. Worked example: `20h+81h+01h+60h+01h+00h = 103h` => CKS = `03h`.
- ID1 = control ID set on projector; ID2 = model code (varies by model, UNRESOLVED for M551).
- Error responses carry ERR1/ERR2 codes (see source §2.4): 00h/00h=unrecognized command, 00h/01h=not supported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 02h/0Dh=command rejected because power is off, 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=invalid gain number, etc.
- Usage-time queries (lamp/filter/information) update at 1-minute intervals despite 1-second resolution.
- Several value maps (input terminal, aspect, eco mode, sub-input, base model type) are referenced to an "Appendix: Supplementary Information by Command" that is not present in the refined source — marked UNRESOLVED throughout.
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code for M551 not stated. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: appendix value maps for input terminal / aspect / eco mode / sub input / base model type not present in refined source. -->
````

Spec done. 53 actions — every source command row, verbatim payloads. All `#` comments stripped from YAML fences (safety + all others); inference notes moved to HTML comments outside fences.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:45:16.114Z
last_checked_at: 2026-06-18T08:11:19.723Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:11:19.723Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "model code (ID2) value for M551 not stated in source; varies by model."
- "control ID (ID1) default value not stated in source."
- "input terminal DATA01 value map and aspect/eco-mode/sub-input value maps referenced to an \"Appendix: Supplementary Information by Command\" not present in the refined source."
- "flow_control not stated in source (full-duplex communication mode stated; RTS/CTS pins wired but no flow-control setting documented)."
- "not in refined source).\""
- "unsolicited event/notification behavior not described in source. All feedbacks are poll-based via request commands."
- "source documents no unsolicited notifications; device is strictly request/response."
- "source documents no multi-step command sequences."
- "no explicit confirmation-required list stated in source; power_off inferred as high-impact. No power-on sequencing procedure documented."
- "firmware version compatibility not stated."
- "ID1 control ID default and ID2 model code for M551 not stated."
- "serial flow_control not stated."
- "appendix value maps for input terminal / aspect / eco mode / sub input / base model type not present in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
