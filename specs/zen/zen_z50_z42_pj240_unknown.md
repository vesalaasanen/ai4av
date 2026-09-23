---
spec_id: admin/zen-z50-z42-pj240
schema_version: ai4av-public-spec-v1
revision: 1
title: "ZEN Z50PJ240 / Z42PJ240 Control Spec"
manufacturer: ZEN
model_family: Z50PJ240
aliases: []
compatible_with:
  manufacturers:
    - ZEN
  models:
    - Z50PJ240
    - Z42PJ240
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - research.encompass.com
  - files.omron.eu
  - docs.zenprotocol.com
  - manualsnet.com
source_urls:
  - https://research.encompass.com/ZEN/om/Z50PJ240.pdf
  - "https://files.omron.eu/downloads/latest/manual/en/z212_zen_v2_communications_manual_en.pdf?v=1"
  - https://docs.zenprotocol.com/apps/headless/api
  - https://docs.zenprotocol.com/
  - https://manualsnet.com/omron/zen
retrieved_at: 2026-08-18T12:59:55.871Z
last_checked_at: 2026-09-22T11:51:33.347Z
generated_at: 2026-09-22T11:51:33.347Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state IR hex codes mapping to serial Key command data values beyond the IR code table (discrete codes listed); no TCP/IP control documented; no firmware compatibility ranges stated"
  - "flow control not explicitly stated; DTR/DSR/RTS/CTS pins present on D-Sub 9 and 7-wire config documented"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "flow control setting not stated; firmware versions not stated; command list references pages p.91/p.92/p.93 for Input Select / ISM Method / Auto Configuration data ranges not included in the refined excerpt; IR hex codes 40/41/07/06 in IR table have blank function names in source"
verification:
  verdict: verified
  checked_at: 2026-09-22T11:51:33.347Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions (ka..mc) match source Command Reference List 01-23 with verified opcode + data range; transport parameters verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# ZEN Z50PJ240 / Z42PJ240 Control Spec

## Summary
RS-232C external control spec for ZEN Z50PJ240 / Z42PJ240 display panels, covering the 23-command ASCII protocol documented in the owner's manual (power, input select, picture/audio adjust, channel tuning, key emulation). Communication is 9600 bps 8N1 ASCII over a D-Sub 9-pin male connector using a crossed (null-modem) cable.

<!-- UNRESOLVED: source does not state IR hex codes mapping to serial Key command data values beyond the IR code table (discrete codes listed); no TCP/IP control documented; no firmware compatibility ranges stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated; DTR/DSR/RTS/CTS pins present on D-Sub 9 and 7-wire config documented
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport (verbatim from source):
- Connector: D-Sub 9-Pin Male. Pinout: 1 N/C, 2 RXD, 3 TXD, 4 DTR, 5 GND, 6 DSR, 7 RTS, 8 CTS, 9 N/C.
- Use a crossed (reverse / null-modem) cable. Both 7-wire and 3-wire configurations documented.
- Communication code: ASCII.
- Command frame: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` — `[ ]` is ASCII space 0x20, `[Cr]` is 0x0D.
- Set ID range 1–99 (hex 0x0–0x63 on the wire); Set ID `0` addresses every connected TV. Set ID and data sent as lowercase hex character pairs.

## Traits
```yaml
# powerable: ka power command present
# routable: xb input select command present
# queryable: FF data read-status mechanism present
# levelable: kf volume, kg contrast, kh brightness, ki color, kj tint, kk sharpness, kr treble, ks bass, kt balance, xu color temperature
traits:
  - powerable  # inferred from power command examples
  - routable   # inferred from input select command examples
  - queryable  # inferred: transmit FF data to read status of any command
  - levelable  # inferred from volume/gain control command examples
```

## Actions
```yaml
# Frame format for all actions: [Command1][Command2][ ][Set ID][ ][Data][Cr]
# {set_id}: hex pair, 00-63 (00 = broadcast to all TVs); {data}: lowercase hex pair unless noted.
# Transmit data FF on any command to read its current status (query).
- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Power Off, 01 = Power On; FF = read status"
  notes: "TV sends ACK only after power-on processing completes; there may be a time delay between command and acknowledge. TV will not send status during standby mode."

- id: input_select
  label: Input Select
  kind: action
  command: "xb {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "10", "11", "20", "21", "40", "41", "60", "90", "91", "92"]
      description: "00 = DTV (Antenna), 01 = DTV (Cable), 10 = Analog (Antenna), 11 = Analog (Cable), 20 = AV1, 21 = AV2, 40 = Component 1, 41 = Component 2, 60 = RGB-PC, 90 = HDMI1, 91 = HDMI2, 92 = HDMI3; FF = read status"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["01", "02", "04", "06", "09", "10", "1f"]
      description: "01 = 4:3, 02 = 16:9, 04 = Zoom, 06 = Set by program, 09 = Just scan, 10 = Cinema Zoom (1), 1f = Cinema Zoom (16); FF = read status"

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "10"]
      description: "00 = Screen mute off (picture on), Video-Out Mute Off; 01 = Screen mute on (picture off); 10 = Video-Out Mute On; FF = read status"
  notes: "Video-Out mute on displays OSD; Screen Mute On does not display OSD."

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Volume mute on (volume off), 01 = Volume mute off (volume on); FF = read status"

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Red 00 ~ Green 64, hexadecimal; FF = read status"

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = OSD off, 01 = OSD on; FF = read status"

- id: remote_control_lock_mode
  label: Remote Control Lock Mode
  kind: action
  command: "km {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Lock off, 01 = Lock on (locks remote control and front panel controls); FF = read status"
  notes: "Lock is released when main power is toggled on/off."

- id: treble
  label: Treble
  kind: action
  command: "kr {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: bass
  label: Bass
  kind: action
  command: "ks {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {set_id} {data}"
  params:
    - name: data
      type: integer
      description: "Min 00 ~ Max 64, hexadecimal; FF = read status"

- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["02", "04", "08", "20"]
      description: "02 = Orbiter, 04 = White Wash, 08 = Normal, 20 = Color Wash; FF = read status"

- id: power_saving
  label: Power Saving
  kind: action
  command: "jq {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "05", "10"]
      description: "00 = off, 01 = Minimum, 02 = Medium, 03 = Maximum, 05 = Screen Off, 10 = Intelligent Sensor; FF = read status"

- id: auto_configuration
  label: Auto Configuration
  kind: action
  command: "ju {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["01"]
      description: "1 = To set (adjusts picture position and minimizes image shaking)"
  notes: "Auto configuration only works in RGB-PC mode."

- id: channel_tuning
  label: Channel Tuning
  kind: action
  command: "ma {set_id} {data00} {data01} {data02} {data03} {data04} {data05}"
  params:
    - name: data00
      type: integer
      description: "Physical channel number. NTSC air 02-45, NTSC cable 01/0E-7D, ATSC air 01-45, ATSC cable 01-87. Send 00 if unknown (ATSC maps automatically)."
    - name: data01
      type: integer
      description: "Major channel number, high byte"
    - name: data02
      type: integer
      description: "Major channel number, low byte"
    - name: data03
      type: integer
      description: "Minor channel number, high byte (not needed for NTSC)"
    - name: data04
      type: integer
      description: "Minor channel number, low byte (not needed for NTSC)"
    - name: data05
      type: string
      description: "Attribute byte, binary converted to hex. Bit7: 0=Main/1=Sub picture; bit6: two/one part channel; bit5: use physical channel; bit4: 0; bits3-0 signal type: 0000 NTSC Air, 0001 NTSC Cable, 0010 ATSC Air, 0011 ATSC Cable_std, 0100 ATSC Cable_hrc, 0101 ATSC Cable_irc, 0110 ATSC cable_auto, 0111/1111 Reserved"
  notes: "Source examples: tune NTSC cable ch 35 -> 'ma 00 23 00 00 00 00 01'; tune ATSC 30-3 -> 'ma 00 00 00 1E 00 03 22'."

- id: channel_add_del
  label: Channel Add/Del
  kind: action
  command: "mb {set_id} {data}"
  params:
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00 = Channel Delete, 01 = Channel Add; FF = read status"

- id: key
  label: Key (IR Remote Key Code Send)
  kind: action
  command: "mc {set_id} {data}"
  params:
    - name: data
      type: enum
      description: "IR key code (hex) from remote control IR code table: 08 POWER, 45 Q.MENU, 43 MENU, 0B INPUT, 10-19 Number Keys 0-9, 4C Dash(List), 1A FLASHBK, 09 MUTE, 02 VOL+, 03 VOL-, 00 CH+, 01 CH-, 1E FAV, 40, 41, 07, 06, 44 ENTER, 28 RETURN, 79 RATIO, 65 POWER SAVING, 95 ENERGY, AA INFO, 72 Red, 71 Green, 63 Yellow, 61 Blue, 0F TV, 5B EXIT, D6 TV (discrete), C4 POWER ON (discrete), C5 POWER OFF (discrete), 5A AV1 (discrete), D0 AV2 (discrete), BF COMPONENT1 (discrete), D4 COMPONENT2 (discrete), D5 RGB-PC (discrete), CE HDMI1 (discrete), CC HDMI2 (discrete), E9 HDMI3 (discrete), 76 Ratio 4:3 (discrete), 77 Ratio 16:9 (discrete), AF Ratio Zoom (discrete)"
```

## Feedbacks
```yaml
- id: ok_acknowledgement
  type: string
  format: "[Command2][ ][Set ID][ ][OK][Data][x]"
  description: "TV transmits ACK when receiving normal data. If data read mode (FF sent), Data field indicates present status; if data write mode, returns the data of the PC."

- id: error_acknowledgement
  type: string
  format: "[Command2][ ][Set ID][ ][NG][Data][x]"
  description: "TV transmits NAK on abnormal data from non-viable functions or communication errors. Data codes: Data1 = Illegal Code, Data2 = Not supported function, Data3 = Wait more time."

- id: power_state
  type: enum
  values: ["00", "01"]
  description: "Read by transmitting ka with data FF; ACK data 00 = Power Off, 01 = Power On. TV will not send status during standby mode."

- id: channel_tuning_ack
  type: string
  format: "[a][ ][Set ID][ ][OK][Data00][Data01][Data02][Data03][Data04][x]"
  description: "OK acknowledgement for channel tuning returns tuned channel data bytes; NG form is [a][ ][Set ID][ ][NG][Data00][x]."
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions above (volume, contrast,
# brightness, color, tint, sharpness, treble, bass, balance, color temperature).
# No additional settable non-action variables documented in source.
```

## Events
```yaml
# No unsolicited notifications documented in source. Section not applicable.
```

## Macros
```yaml
# No multi-step sequences documented in source. Section not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements for external control. Power command note (ACK sent
# only after power-on processing completes) is operational, not a safety interlock.
```

## Notes
- Device is a display panel ("TV" throughout the source) despite projector family naming in the pipeline; RS-232C IN port labeled "CONTROL & SERVICE", intended for third-party control hardware/software.
- Command 1 is the first character (j, k, m or x); Command 2 is the actual command. Set ID and data are lowercase hex character pairs on the wire (Set ID 10 sends '0','a'; data 0xAB sends 'a','b'); OK/NG sent as uppercase.
- Set ID `0` broadcasts to every connected TV; menu range 1-99 decimal = 0x01-0x63 on the wire.
- "TV will not send the status during the standby mode" (stated three times in source).
- IR remote control codes (37.917 KHz modulated NEC-style frames, discrete power/input codes C4/C5/5A/D0/BF/D4/D5/CE/CC/E9, etc.) are documented in the source and usable via the `mc` Key command; IR feature "not available for all models."
- Real data mapping for Set ID: 0=Step 0, A=Step 10, F=Step 15, 10=Step 16, 63=Step 99, 64=Step 100.
<!-- UNRESOLVED: flow control setting not stated; firmware versions not stated; command list references pages p.91/p.92/p.93 for Input Select / ISM Method / Auto Configuration data ranges not included in the refined excerpt; IR hex codes 40/41/07/06 in IR table have blank function names in source -->

## Provenance

```yaml
source_domains:
  - research.encompass.com
  - files.omron.eu
  - docs.zenprotocol.com
  - manualsnet.com
source_urls:
  - https://research.encompass.com/ZEN/om/Z50PJ240.pdf
  - "https://files.omron.eu/downloads/latest/manual/en/z212_zen_v2_communications_manual_en.pdf?v=1"
  - https://docs.zenprotocol.com/apps/headless/api
  - https://docs.zenprotocol.com/
  - https://manualsnet.com/omron/zen
retrieved_at: 2026-08-18T12:59:55.871Z
last_checked_at: 2026-09-22T11:51:33.347Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:51:33.347Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions (ka..mc) match source Command Reference List 01-23 with verified opcode + data range; transport parameters verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state IR hex codes mapping to serial Key command data values beyond the IR code table (discrete codes listed); no TCP/IP control documented; no firmware compatibility ranges stated"
- "flow control not explicitly stated; DTR/DSR/RTS/CTS pins present on D-Sub 9 and 7-wire config documented"
- "source contains no explicit safety warnings, interlock procedures, or"
- "flow control setting not stated; firmware versions not stated; command list references pages p.91/p.92/p.93 for Input Select / ISM Method / Auto Configuration data ranges not included in the refined excerpt; IR hex codes 40/41/07/06 in IR table have blank function names in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
