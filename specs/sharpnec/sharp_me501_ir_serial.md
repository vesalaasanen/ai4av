---
spec_id: admin/sharp-nec-me501-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME501 Control Spec"
manufacturer: Sharp/NEC
model_family: ME501
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - ME501
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:08:03.479Z
last_checked_at: 2026-06-18T08:29:53.067Z
generated_at: 2026-06-18T08:29:53.067Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model string \"Me501 Ir\" unverified; firmware version range not stated; model code (ID2) value not stated; appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, base model types) not included in refined source"
  - "source does not describe asynchronous push events; all responses are command-reply only."
  - "source documents no multi-step named macros."
  - "no explicit voltage/current/power specs or power-on sequencing procedures in refined source."
  - "firmware version range not stated; model code (ID2) value for ME501 not stated; appendix code tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source; wireless LAN port/protocol details deferred to wireless unit manual"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:29:53.067Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME501 Control Spec

## Summary
Sharp/NEC ME501 projector control spec derived from the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). Covers binary-frame control over RS-232C serial and wired/wireless LAN (TCP port 7142). Commands are hexadecimal framed messages with a trailing checksum byte.

<!-- UNRESOLVED: exact model string "Me501 Ir" unverified; firmware version range not stated; model code (ID2) value not stated; appendix "Supplementary Information by Command" values (input terminal codes, aspect values, eco mode values, base model types) not included in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states full-duplex mode; RTS/CTS pins wired but no explicit flow-control setting documented
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # POWER ON / POWER OFF commands present
  - routable     # INPUT SW CHANGE / AUDIO SELECT SET present
  - queryable    # many status request commands present
  - levelable    # PICTURE ADJUST / VOLUME ADJUST / LAMP ADJUST present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off incl. cooling time, no other command accepted.

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see appendix "Supplementary Information by Command"; example 06h = video port)
    - name: CKS
      type: integer
      description: Checksum = low byte of sum of all preceding bytes

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "96h for LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: DATA02
      type: integer
      description: FFh (paired with DATA01=96h per source)
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: 06h=Periphery Focus (other targets per appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (adjustment axis to query)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop (then mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PiP-by-PiP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values per appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error information (DATA01-12). Bit=0 normal, bit=1 error.
  bits:
    DATA01_bit0: Cover error
    DATA01_bit1: Temperature error (bi-metallic strip)
    DATA01_bit3: Fan error
    DATA01_bit4: Fan error
    DATA01_bit5: Power error
    DATA01_bit6: Lamp/backlight off
    DATA01_bit7: Lamp in replacement moratorium
    DATA02_bit0: Lamp usage time exceeded limit
    DATA02_bit1: Formatter error
    DATA02_bit2: Lamp 2 off
    DATA03_bit1: FPGA error
    DATA03_bit2: Temperature error (sensor)
    DATA03_bit3: Lamp not present
    DATA03_bit4: Lamp data error
    DATA03_bit5: Mirror cover error
    DATA03_bit6: Lamp 2 replacement moratorium
    DATA03_bit7: Lamp 2 usage time exceeded
    DATA04_bit0: Lamp 2 not present
    DATA04_bit1: Lamp 2 data error
    DATA04_bit2: Temperature error due to dust
    DATA04_bit3: Foreign matter sensor error
    DATA04_bit5: Ballast communication error
    DATA04_bit6: Iris calibration error
    DATA04_bit7: Lens not installed properly
    DATA09_bit0: Portrait cover side up
    DATA09_bit1: Interlock switch open
    DATA09_bit2: System error (Slave CPU)
    DATA09_bit3: System error (Formatter)

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: mute_status
  type: composite
  fields:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]

- id: cover_status
  type: enum
  values: [normal_opened, closed]

- id: lens_operation_status
  type: bitmask
  description: Lens motion status per axis (stop / during operation)
  axes: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]

- id: command_response
  type: enum
  description: Generic acknowledgement. Ack frame prefixes: 20h (009/078/084/305 replies), 21h (079 reply), 22h (02h cmd replies), 23h (03h cmd replies), A0h/A1h/A2h/A3h (error replies with ERR1/ERR2).
  values: [success_no_data, success_with_data, error]
```

## Variables
```yaml
- id: lamp_usage_time
  unit: seconds
  description: Lamp usage time (DATA83-86 of INFORMATION REQUEST, updated at 1-min intervals)

- id: filter_usage_time
  unit: seconds
  description: Filter usage time (DATA01-04 of FILTER USAGE INFORMATION REQUEST)

- id: filter_alarm_start_time
  unit: seconds
  description: Filter alarm start time (DATA05-08). -1 if undefined.

- id: lamp_remaining_life
  unit: percent
  description: Lamp remaining life (%). Negative if replacement deadline exceeded.

- id: carbon_savings_total
  unit: kilogram
  description: Total Carbon Savings (max 99999 kg + mg component)

- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode setting (values per appendix)

- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes)

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
```

## Events
```yaml
# No unsolicited notification frames documented.
# UNRESOLVED: source does not describe asynchronous push events; all responses are command-reply only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step named macros.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling period blocks other commands; irreversible until cooldown completes
  - shutter_close  # blanks projection output
interlocks:
  - "POWER ON / POWER OFF: while turning power on or off (including cooling time), no other command can be accepted."
  - "Lens drive: after sending 7Fh (drive plus) or 81h (drive minus) in LENS CONTROL DATA02, send 00h to stop."
  - "Interlock switch open is reported as error DATA09 bit1."
  - "Forced onscreen mute (ERR1=02h ERR2=04h) blocks onscreen commands."
# UNRESOLVED: no explicit voltage/current/power specs or power-on sequencing procedures in refined source.
```

## Notes
- Command frames are hexadecimal. Frame layout: `{cmd_byte} {op} 00h 00h {len} {data...} {CKS}`. Checksum = low-order byte of the sum of all preceding bytes (see source §2.2 worked example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`).
- Response ack prefix mirrors command group: 02h→22h (ok)/A2h (err); 03h→23h/A3h; 01h→21h/A1h; 00h→20h/A0h.
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- ID1 = projector control ID (set on device); ID2 = model code (varies by model, not stated in source).
- Full list of input terminal codes, aspect values, eco mode values, base model types, and sub-input values live in the source appendix "Supplementary Information by Command", which was not present in the refined excerpt.
- Serial cable: cross cable, D-SUB 9P. RTS/CTS and TxD/RxD crossed; pins 1,4,6,9 unused.
- LAN: wired 10/100 auto-negotiation (IEEE 802.3 / 802.3u); wireless via separate wireless LAN unit (see its manual).

<!-- UNRESOLVED: firmware version range not stated; model code (ID2) value for ME501 not stated; appendix code tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source; wireless LAN port/protocol details deferred to wireless unit manual -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:08:03.479Z
last_checked_at: 2026-06-18T08:29:53.067Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:29:53.067Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model string \"Me501 Ir\" unverified; firmware version range not stated; model code (ID2) value not stated; appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, base model types) not included in refined source"
- "source does not describe asynchronous push events; all responses are command-reply only."
- "source documents no multi-step named macros."
- "no explicit voltage/current/power specs or power-on sequencing procedures in refined source."
- "firmware version range not stated; model code (ID2) value for ME501 not stated; appendix code tables (input terminal, aspect, eco mode, base model type, sub-input) absent from refined source; wireless LAN port/protocol details deferred to wireless unit manual"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
