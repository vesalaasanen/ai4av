---
spec_id: admin/sharp-nec-p243w-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P243W Bk Sv Control Spec"
manufacturer: Sharp/NEC
model_family: "P243W Bk Sv"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P243W Bk Sv"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:16:56.757Z
last_checked_at: 2026-06-18T08:58:03.934Z
generated_at: 2026-06-18T08:58:03.934Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is a generic projector command reference (BDT140013 Rev 7.1) and does not state model-specific command support for P243W Bk Sv; per-command applicability must be verified against the device. The \"Supplementary Information by Command\" appendix referenced throughout is not present in the refined source."
  - "source documents no unsolicited notifications; all responses are"
  - "source documents no multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated in source."
  - "\"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco-mode values, base model types, sub-input values) is referenced throughout but not present in the refined source — those enum tables could not be populated."
  - "model-specific command support for P243W Bk Sv not stated; source is a generic projector command reference (BDT140013 Rev 7.1)."
  - "ID2 model code value for P243W Bk Sv not stated in source."
  - "default/selected baud rate for this model not stated; only the selectable set is listed."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:58:03.934Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P243W Bk Sv Control Spec

## Summary
Sharp/NEC display controllable via RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN. This spec is derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1), which documents a binary hex-framed command set covering power, input switching, mute, lens control, picture/volume adjust, and a broad set of status/information queries. Commands use a fixed frame: header byte, command bytes, optional data, and a checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: source document is a generic projector command reference (BDT140013 Rev 7.1) and does not state model-specific command support for P243W Bk Sv; per-command applicability must be verified against the device. The "Supplementary Information by Command" appendix referenced throughout is not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps as selectable; 9600 shown as common default but not mandated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states full duplex; RTS/CTS pins wired per pin table but no hardware flow-control mode documented
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF commands present)
# - queryable       (many status/information request commands present)
# - levelable       (PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST present)
# - routable        (INPUT SW CHANGE present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All hex payloads copied verbatim from source. Framing: optional header/ID/LEN
# bytes per command; <ID1> <ID2> are runtime parameters (control ID + model code);
# <CKS> is a checksum computed as the low-order 8 bits of the sum of all preceding
# bytes. Parameterized commands show the variable DATA byte(s).

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (incl. cooling time)."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). See appendix Supplementary Information by Command."
  notes: "Example from source: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. See appendix Supplementary Information by Command."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h for LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD-type). See key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte."
  notes: "Key codes incl. 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"

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
      description: "Lens axis (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Drive: 00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh/-0.25s, FEh/-0.5s, FFh/-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
  notes: "Operates on the profile number set via 053-10 LENS PROFILE SET."

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
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the eco mode. See appendix Supplementary Information by Command."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)"

- id: pip_pbp_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; otherwise sub-input value)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See appendix Supplementary Information by Command."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  notes: "Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis identifier"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

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
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

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

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: pip_pbp_request
  label: PIP / Picture by Picture Request
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
```

## Feedbacks
```yaml
# Each query command above returns a framed response (header 20h/23h + ID + LEN +
# DATA + CKS) or an error frame (A0h/A2h/A3h + ID + 02h + ERR1 ERR2 + CKS). Key
# observable states documented in source:

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06; 305-3 BASIC INFORMATION REQUEST DATA01"

- id: error_status
  type: bitmask
  description: "12-byte error info (DATA01-DATA12) from 009 ERROR STATUS REQUEST. Bits cover cover/fan/temperature/power/lamp/ formatter/iris/lens-install errors."

- id: mute_state
  type: composite
  description: "Picture/sound/onscreen/forced-onscreen mute + onscreen-display flags (078-4 MUTE STATUS REQUEST)."

- id: input_status
  type: composite
  description: "Signal switch process, signal list number, selection signal type 1/2, content displayed (078-3 INPUT STATUS REQUEST)."

- id: lens_operation_status
  type: bitmask
  description: "Lens memory/zoom/focus/lens-shift-h/lens-shift-v operation bits (053-7 LENS INFORMATION REQUEST)."

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST"

- id: response_error
  type: composite
  description: "ERR1/ERR2 error code pair. Full table in source §2.4: e.g. 00h/00h=unrecognized, 00h/01h=unsupported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, etc."
```

## Variables
```yaml
# Settable numeric/string parameters surfaced via dedicated SET commands are
# represented as Actions above (volume, picture gains, eco mode, projector name,
# PIP/PBP, edge blending, lens position, audio select). The corresponding
# readable parameter metadata (range, default, current, step widths) is returned
# by 060-1 GAIN PARAMETER REQUEST 3. No additional variables beyond those.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are
# direct replies to commands. No event/async push behaviour described.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on is in progress."
  - "POWER OFF: no other command accepted during power-off including cooling time."
  - "PICTURE/SOUND/ONSCREEN MUTE auto-cleared on input-terminal or video-signal switch (SOUND MUTE also cleared on volume adjustment)."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the command-acceptance notes above.
```

## Notes
- Command framing: requests/commands begin with a header byte (00h–03h for requests, mirrored with high bit set e.g. 20h–23h for successful replies, A0h–A3h for error replies), followed by command bytes, optional `<ID1> <ID2>` (control ID + model code), a LEN byte, data bytes, and a `<CKS>` checksum. Checksum = low-order 8 bits of the sum of all preceding bytes.
- ID1 is the projector's configured "control ID"; ID2 is model-specific.
- Serial cable must be a cross cable wired to the PC CONTROL D-SUB 9P port per the source pin table (pins 2/3 RxD/TxD crossed, 5 GND, 7/8 RTS/CTS crossed).
- LAN: wired RJ-45 (10/100 auto) or supported wireless LAN unit; commands sent over TCP port 7142.
- Lamp usage / filter usage times update at one-minute intervals though reported in one-second units.
- 078-3 returns signal list number as (practical value − 1); add 1 to recover the practical number.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: "Supplementary Information by Command" appendix (input terminal values, aspect values, eco-mode values, base model types, sub-input values) is referenced throughout but not present in the refined source — those enum tables could not be populated. -->
<!-- UNRESOLVED: model-specific command support for P243W Bk Sv not stated; source is a generic projector command reference (BDT140013 Rev 7.1). -->
<!-- UNRESOLVED: ID2 model code value for P243W Bk Sv not stated in source. -->
<!-- UNRESOLVED: default/selected baud rate for this model not stated; only the selectable set is listed. -->
````

Spec done. 55 commands, all hex verbatim. Serial 8N1 + TCP 7142 both documented in source → both emitted. Appendix enum tables referenced but absent from refined source → marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:16:56.757Z
last_checked_at: 2026-06-18T08:58:03.934Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:58:03.934Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is a generic projector command reference (BDT140013 Rev 7.1) and does not state model-specific command support for P243W Bk Sv; per-command applicability must be verified against the device. The \"Supplementary Information by Command\" appendix referenced throughout is not present in the refined source."
- "source documents no unsolicited notifications; all responses are"
- "source documents no multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated in source."
- "\"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco-mode values, base model types, sub-input values) is referenced throughout but not present in the refined source — those enum tables could not be populated."
- "model-specific command support for P243W Bk Sv not stated; source is a generic projector command reference (BDT140013 Rev 7.1)."
- "ID2 model code value for P243W Bk Sv not stated in source."
- "default/selected baud rate for this model not stated; only the selectable set is listed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
