---
spec_id: admin/lumens-dc172
schema_version: ai4av-public-spec-v1
revision: 2
title: "Lumens DC172 Control Spec"
manufacturer: Lumens
model_family: DC172
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - DC172
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS146%20-%20DC172%20RS-232%20command%20set_1_0.pdf"
  - https://www.mylumens.com/en/Downloads/4/technical-resources
retrieved_at: 2026-08-15T06:15:45.839Z
last_checked_at: 2026-09-14T22:16:24.882Z
generated_at: 2026-09-14T22:16:24.882Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not specify whether USB/network control is also supported; only RS-232 is documented."
  - "parameter ranges documented in source are represented inside the"
  - "no unsolicited notifications documented in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "no checksum byte is documented despite 6-byte fixed frame; STX/ETX framing only."
  - "source does not specify whether RS-232 hardware flow control (RTS/CTS) is used; \"none\" inferred from absence."
  - "firmware field left empty — revision table header reads \"Apply Firmware\" with value \"DGE104\" but no firmware version range or compatibility statement is given."
verification:
  verdict: verified
  checked_at: 2026-09-14T22:16:24.882Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions map1:1 to the source's 49 command rows with matching bytes and parameter enums; transport params match protocol overview. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-14
---

# Lumens DC172 Control Spec

## Summary
The Lumens DC172 is a document camera controllable over RS-232C serial. This spec covers the binary command set: 6-byte command/return packets (STX A0h, command, P1, P2, P3/status, ETX AFh) at 9600 bps 8N1, supporting power, image, zoom, focus, audio, preset, and OSD navigation commands.

<!-- UNRESOLVED: source does not specify whether USB/network control is also supported; only RS-232 is documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from Power standby/power up command (row 1) and Call Power query (row 36)
- routable   # inferred from Source camera/passthrough switching (row 7)
- queryable  # inferred from Call * query commands returning state (rows 36-49)
- levelable  # inferred from Microphone Levels, Audio Out Volume, Brightness, Zoom, Focus controls
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: 5_playback
  label: "5 Playback"
  kind: action
  command: "A0h B3h 00h 00h 00h AFh"
  params: []

- id: 6_pip
  label: "6 PIP"
  kind: action
  command: "A0h B3h 01h 00h 00h AFh"
  params: []

- id: 9_record
  label: "9 Record"
  kind: action
  command: "A0h B2h 01h 00h 00h AFh"
  params: []

- id: 10_capture_delete
  label: "10 Capture / Delete"
  kind: action
  command: "A0h B2h 00h 00h 00h AFh"
  params: []

- id: 11_auto_tune
  label: "11 Auto Tune"
  kind: action
  command: "A0h 22h 00h 00h 00h AFh"
  params: []

- id: 12_awb_one_push
  label: "12 AWB one push"
  kind: action
  command: "A0h 22h 01h 00h 00h AFh"
  params: []

- id: 13_af_one_push
  label: "13 AF one push"
  kind: action
  command: "A0h A3h 01h 00h 00h AFh"
  params: []

# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: 1_power
  label: "1 Power"
  kind: action
  command: "A0h B1h {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : standby, 01 : power up"


- id: 2_lamp
  label: "2 Lamp"
  kind: action
  command: "A0h C1h {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : head led OFF, 03 : head led ON"


- id: 3_rotate
  label: "3 Rotate"
  kind: action
  command: "A0h B4h {rotation} 00h 00h AFh"
  params:
    - name: rotation
      type: integer
      description: "00 : 0 degree, 01 : 180 degree, 02 : Flip, 03 : Mirror, 04 : 90 degree, 05 : 270 degree"


- id: 4_freeze
  label: "4 Freeze"
  kind: action
  command: "A0h 2Ch {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : OFF, 01 : ON"


- id: 7_source
  label: "7 Source"
  kind: action
  command: "A0h 3Ah {source} 00h 00h AFh"
  params:
    - name: source
      type: integer
      description: "00 : camera, 01 : passthrough"


- id: 8_pan
  label: "8 Pan"
  kind: action
  command: "A0h 26h {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : OFF, 01 : ON"


- id: 14_mask_spotlight
  label: "14 Mask / Spotlight"
  kind: action
  command: "A0h 27h {mode} 00h 00h AFh"
  params:
    - name: mode
      type: integer
      description: "0 : disable, 1 : mask, 2 : spolight (sic)"


- id: 15_digital_zoom_on
  label: "15 Digital Zoom On"
  kind: action
  command: "A0h 40h {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : OFF, 01 : ON"


- id: 16_zoom_direct_step
  label: "16 Zoom Direct Step"
  kind: action
  command: "A0h 13h {position} 00h 00h AFh"
  params:
    - name: position
      type: integer
      description: "0 - 127"


- id: 17_zoom_step
  label: "17 Zoom Step"
  kind: action
  command: "A0h 12h {direction} 00h 00h AFh"
  params:
    - name: direction
      type: integer
      description: "00 : -A, follow IR behavior, 01 : +A, follow IR behavior"


- id: 18_brightness_direct
  label: "18 Brightness Direct"
  kind: action
  command: "A0h 30h {ae} {level} 00h AFh"
  params:
    - name: ae
      type: integer
      description: "00 : ae OFF, 01 : ae ON"
    - name: level
      type: integer
      description: "ae OFF : 0 - 220, ae ON : 0 - 18"


- id: 19_brightness_step
  label: "19 Brightness Step"
  kind: action
  command: "A0h 39h {direction} 00h 00h AFh"
  params:
    - name: direction
      type: integer
      description: "00 : -A, follow IR behavior, 01 : +A, follow IR behavior"


- id: 20_focus_direct
  label: "20 Focus Direct"
  kind: action
  command: "A0h 1Bh {low} {high} 00h AFh"
  params:
    - name: low
      type: integer
      description: "low byte (full range 0 - 560)"
    - name: high
      type: integer
      description: "high byte (full range 0 - 560)"


- id: 21_focus_step
  label: "21 Focus Step"
  kind: action
  command: "A0h 1Ch {direction} 00h 00h AFh"
  params:
    - name: direction
      type: integer
      description: "00 : -A, follow IR behavior, 01 : +A, follow IR behavior"


- id: 22_image_mode
  label: "22 Image Mode"
  kind: action
  command: "A0h A9h {mode} 00h 00h AFh"
  params:
    - name: mode
      type: integer
      description: "00 : normal, 01 : film, 02 : slide, 03 : microscope"


- id: 23_photo_text
  label: "23 Photo / Text"
  kind: action
  command: "A0h A7h {mode} 00h 00h AFh"
  params:
    - name: mode
      type: integer
      description: "00 : photo, 01 : text, 02 : gray"


- id: 24_slide_show
  label: "24 Slide Show"
  kind: action
  command: "A0h 04h {state} 00h 00h AFh"
  params:
    - name: state
      type: integer
      description: "00 : OFF, 01 : ON"


- id: 25_menu
  label: "25 Menu"
  kind: action
  command: "A0h A0h 06h 00h 00h AFh"
  params: []


- id: 26_up
  label: "26 Up"
  kind: action
  command: "A0h A0h 02h 00h 00h AFh"
  params: []


- id: 27_down
  label: "27 Down"
  kind: action
  command: "A0h A0h 03h 00h 00h AFh"
  params: []


- id: 28_left
  label: "28 Left"
  kind: action
  command: "A0h A0h 04h 00h 00h AFh"
  params: []


- id: 29_right
  label: "29 Right"
  kind: action
  command: "A0h A0h 05h 00h 00h AFh"
  params: []


- id: 30_enter
  label: "30 Enter"
  kind: action
  command: "A0h A0h 01h 00h 00h AFh"
  params: []


- id: 31_preset_load
  label: "31 Preset Load"
  kind: action
  command: "A0h 03h 00h 00h 00h AFh"
  params: []


- id: 32_preset_save
  label: "32 Preset Save"
  kind: action
  command: "A0h 03h 00h 01h 00h AFh"
  params: []


- id: 33_factory_reset
  label: "33 Factory Reset"
  kind: action
  command: "A0h 03h 01h 00h 00h AFh"
  params: []


- id: 34_microphone_levels
  label: "34 Microphone Levels"
  kind: action
  command: "A0h D4h {level} 00h 00h AFh"
  params:
    - name: level
      type: integer
      description: "0 - 10"


- id: 35_audio_out_volume
  label: "35 Audio Out Volume"
  kind: action
  command: "A0h D6h {level} 00h 00h AFh"
  params:
    - name: level
      type: integer
      description: "0 - 31"


- id: 36_call_power
  label: "36 Call Power"
  kind: query
  command: "A0h B7h 00h 00h 00h AFh"
  params: []


- id: 37_call_lamp
  label: "37 Call Lamp"
  kind: query
  command: "A0h 50h 00h 00h 00h AFh"
  params: []


- id: 38_call_rotate
  label: "38 Call Rotate"
  kind: query
  command: "A0h 77h 00h 00h 00h AFh"
  params: []


- id: 39_call_freeze
  label: "39 Call Freeze"
  kind: query
  command: "A0h 78h 00h 00h 00h AFh"
  params: []


- id: 40_call_source
  label: "40 Call Source"
  kind: query
  command: "A0h 79h 00h 00h 00h AFh"
  params: []


- id: 41_call_image_mode
  label: "41 Call Image Mode"
  kind: query
  command: "A0h 7Ah 00h 00h 00h AFh"
  params: []


- id: 42_call_photo_text
  label: "42 Call Photo / Text"
  kind: query
  command: "A0h 51h 00h 00h 00h AFh"
  params: []


- id: 43_call_digital_zoom_on
  label: "43 Call Digital Zoom On"
  kind: query
  command: "A0h 61h 00h 00h 00h AFh"
  params: []


- id: 44_call_zoom
  label: "44 Call Zoom"
  kind: query
  command: "A0h 8Ah 00h 00h 00h AFh"
  params: []


- id: 45_call_auto_exposure
  label: "45 Call Auto Exposure"
  kind: query
  command: "A0h 46h 00h 00h 00h AFh"
  params: []


- id: 46_call_brightness
  label: "46 Call Brightness"
  kind: query
  command: "A0h 89h 00h 00h 00h AFh"
  params: []


- id: 47_call_focus
  label: "47 Call Focus"
  kind: query
  command: "A0h 64h 00h 00h 00h AFh"
  params: []


- id: 48_call_microphone_levels
  label: "48 Call Microphone Levels"
  kind: query
  command: "A0h D5h 00h 00h 00h AFh"
  params: []


- id: 49_call_audio_out_volume
  label: "49 Call Audio Out Volume"
  kind: query
  command: "A0h D7h 00h 00h 00h AFh"
  params: []
```

## Feedbacks
```yaml

```

## Variables
```yaml
# UNRESOLVED: parameter ranges documented in source are represented inside the
# emitted Actions (P1/P2 byte fields); no standalone settable variables
# beyond action parameters.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
Communication: asynchronous half-duplex serial, 9600 bps, 8 data bits, no parity, 1 stop bit.

Frame format (6 bytes): STX A0h | Command | P1 | P2 | P3 (or Status on return) | ETX AFh.

Source distinguishes "command" (PC→DC172) opcodes from "Call" (query) opcodes that use different command bytes and return the queried value in the return packet's parameter positions.

Return packet for Call Power is exceptional: P1 is fixed at 01h and the queried value is carried in the P2 position (Return Packet row 36). All other Call returns carry the value in the P1 position.

Source contains typographic errors: "spolight" appears for "spotlight" in Mask/Spotlight and Menu rows; the verbatim command bytes are unaffected.

The P1/P2 description columns for source rows 25-33 (Menu through Factory Reset) appear column-shifted in the extracted table (values such as "IR -> Menu", "OSD -> Preset Load", and the Mask/Spotlight value list appear on neighboring rows); the command byte sequences are unaffected.

Return packets carry a Status byte in the P3 position; ACK/NACK/IGNORE semantics are described in the protocol overview diagram but specific Status byte values are not enumerated beyond the "Reserved" note.

<!-- UNRESOLVED: no checksum byte is documented despite 6-byte fixed frame; STX/ETX framing only. -->
<!-- UNRESOLVED: source does not specify whether RS-232 hardware flow control (RTS/CTS) is used; "none" inferred from absence. -->
<!-- UNRESOLVED: firmware field left empty — revision table header reads "Apply Firmware" with value "DGE104" but no firmware version range or compatibility statement is given. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS146%20-%20DC172%20RS-232%20command%20set_1_0.pdf"
  - https://www.mylumens.com/en/Downloads/4/technical-resources
retrieved_at: 2026-08-15T06:15:45.839Z
last_checked_at: 2026-09-14T22:16:24.882Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:16:24.882Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions map1:1 to the source's 49 command rows with matching bytes and parameter enums; transport params match protocol overview. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not specify whether USB/network control is also supported; only RS-232 is documented."
- "parameter ranges documented in source are represented inside the"
- "no unsolicited notifications documented in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "no checksum byte is documented despite 6-byte fixed frame; STX/ETX framing only."
- "source does not specify whether RS-232 hardware flow control (RTS/CTS) is used; \"none\" inferred from absence."
- "firmware field left empty — revision table header reads \"Apply Firmware\" with value \"DGE104\" but no firmware version range or compatibility statement is given."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
