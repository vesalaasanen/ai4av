---
spec_id: admin/nec-np502hl-np502wl
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-P502HL/NP-P502WL Control Spec"
manufacturer: NEC
model_family: NP-P502HL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-P502HL
    - NP-P502WL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-26T14:23:17.847Z
last_checked_at: 2026-09-26T14:23:17.847Z
generated_at: 2026-09-26T14:23:17.847Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source mentions portrait cover interlock switch in error status DATA09 bit1 (\"The interlock switch is open\") but does not document procedure or behavior in detail"
  - "Audio Select Set is explicitly supported, but the principal manual defines DATA01=input terminal / DATA02=setting while appendix p.45 labels its input-name table DATA02. That appendix lists 00h HDMI1, 01h HDMI2, 02h DisplayPort, 03h ETHERNET/LAN, 04h USB-A, 05h USB-B, 09h HDBaseT for other models, including this pair, without resolving the field-label conflict or absent-port combinations. No guessed terminal-byte mapping is supplied. Firmware range and serial flow-control requirements are not established by this source."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:17.847Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All33 target-supported command families and their request shapes match the primary manual; unknown flow control and the audio-select appendix field-label conflict remain explicitly unresolved. Authentication is explicitly unresolved. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# NEC NP-P502HL/NP-P502WL Control Spec

## Summary
NEC NP-P502HL and NP-P502WL projector control via RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN (TCP port 7142). Commands use binary framed protocol with checksum.

Scope: NP-P502HL and NP-P502WL, filtered using BDT140014 Appendix revision 29.0, supported-command table p.20. The stable catalog identifiers retain their historical spelling. This is not a command set for all NEC projectors.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 38400  # selected supported rate; configure host and projector alike; not a claimed factory default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none # UNRESOLVED: flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated
auth:
  type: UNRESOLVED  # source does not establish authentication requirements
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (015, 016)
- routable   # inferred from input switch command (018) and target input codes
- queryable  # inferred from extensive status query commands
- levelable  # inferred from picture/volume adjust commands
```

## Actions
```yaml
# Request frame: header(2) 00h 00h LEN DATA... CKS; response ID1/ID2 are not request substitutions
# Response prefix echoes header with 2xh (success) or Axh (error)

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"  # literal from source
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"  # literal from source
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"  # literal from source
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"  # DATA01 = input terminal code
  params:
    - name: DATA01
      type: integer
      description: "One byte: 01h=COMPUTER, 06h=VIDEO, A1h=HDMI1, A2h=HDMI2, BFh=HDBaseT, 23h=APPS (appendix pp.25–28)"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"  # literal from source
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"  # literal from source
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"  # literal from source
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"  # literal from source
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"  # literal from source
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"  # literal from source
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "One byte: 00h=AUTO, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX (appendix pp.29–30)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"  # literal from source
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Light-source index 00h; 01h is reserved for two-lamp models and is not advertised for these models
    - name: DATA02
      type: integer
      description: Content (01h=usage time seconds, 04h=remaining life percent)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Type (00h=Total, 01h=During operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low-order byte; see the complete Remote key codes list in Notes
    - name: DATA02
      type: integer
      description: Key code high-order byte; 00h for every key in the documented table

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"  # literal from source
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"  # literal from source
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"  # literal from source
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"  # literal from source
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"  # literal from source
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Mode (01h=On, 02h=Off)

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=H-sync frequency, 04h=V-sync frequency)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"  # literal from source
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"  # literal from source
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"  # literal from source
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "One byte: 00h=OFF, 01h=ECO1, 02h=ECO2 (NP-P502HL/NP-P502WL row, appendix p.31)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Encode name as the 16 bytes DATA01-DATA16, padding unused bytes with 00h; the command adds a final 00h terminator

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"  # literal from source
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"  # literal from source
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"  # literal from source
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "UNRESOLVED mapping: principal manual calls DATA01 the input terminal, but appendix p.45 labels its terminal-code table DATA02. Supply only a separately confirmed terminal byte; do not substitute input_switch_change codes."
    - name: DATA02
      type: integer
      description: "Principal request table: 00h=DATA01 terminal, 01h=BNC, 02h=COMPUTER. Target-specific accepted combinations remain unresolved; this does not assert that the target has BNC."
  notes: "Documented request shape retained for coverage; automatic audio-select mapping is unavailable until the principal/appendix field-label conflict is resolved."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby, not_supported]
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: error_status
  type: object
  description: 12-byte error information field from009 Error Status Request
- id: lamp_usage_time_seconds
  type: integer
- id: lamp_remaining_life_percent
  type: integer
- id: carbon_savings
  type: object
  description: Carbon savings in kg + mg
- id: input_signal_type
  type: object
  description: Signal type, content displayed, selection signal type
- id: freeze_state
  type: enum
  values: [off, on]
- id: mac_address
  type: string
- id: projector_name
  type: string
- id: model_name
  type: string
- id: serial_number
  type: string
```

## Variables
```yaml
# Input, aspect and eco values are enumerated in action parameters.
# Audio-select parameter mapping remains unresolved; see audio_select_set.
```

## Events
```yaml
<!-- UNRESOLVED: source does not document unsolicited notifications -->
```

## Macros
```yaml
<!-- UNRESOLVED: source does not document multi-step sequences -->
```

## Safety
```yaml
confirmation_required_for:
  - power_off # inferred from source: "While this command is turning off the power (including the cooling time), no other command can be accepted"
interlocks: []
<!-- UNRESOLVED: source mentions portrait cover interlock switch in error status DATA09 bit1 ("The interlock switch is open") but does not document procedure or behavior in detail -->
```

## Notes
The target models support serial rates 4800, 9600, 19200 and 38400 bps; 115200 is unsupported (appendix p.17). Set the host and projector to the same rate. The configured 38400 value is a supported choice, not a documented factory default. The generic manual specifies 8 data bits, no parity and one stop bit; flow control is not explicitly specified.

LAN power-on requires NETWORK STANDBY; serial accepts NORMAL or NETWORK STANDBY (appendix p.18). LAN transport is TCP 7142. The manual lists wired and wireless LAN, subject to the model's installed network interface.

Transmit the binary bytes shown, including the fixed 00h 00h request bytes. ID1/ID2 occur in response formats and must not replace these fixed bytes. CKS is computed as the low-order eight bits of the sum of every preceding request byte. DATA placeholders are bytes; low/high adjustment bytes form the documented WORD value. Do not send another command while power-on or power-off is in progress, including the power-off cooling time (principal manual pp.15–16).

The 33 action/query families comprise the 30 supported entries in appendix p.20 plus power on, power off and input switching. Unsupported target functions are excluded: other lamp/light adjustment, filter-usage query, shutter, motorized lens/memory/profile functions, gain-parameter query, cover query, PIP/PBP and edge blending. No unsolicited event protocol is documented.

Remote key codes (decimal; DATA01 is the low byte, DATA02=00h): 2 POWER ON; 3 POWER OFF; 5 AUTO; 6 MENU; 7 UP; 8 DOWN; 9 RIGHT; 10 LEFT; 11 ENTER; 12 EXIT; 13 HELP; 15 MAGNIFY UP; 16 MAGNIFY DOWN; 19 MUTE; 41 PICTURE; 75 COMPUTER1; 76 COMPUTER2; 79 VIDEO1; 81 S-VIDEO1; 132 VOLUME UP; 133 VOLUME DOWN; 138 FREEZE; 163 ASPECT; 215 SOURCE; 238 LAMP MODE/ECO. These are the generic remote-key table values, not evidence of extra physical inputs; use the model-specific input_switch_change values for source routing.

Base-model response bytes from appendix p.34: NP-P502HL = FFh 22h 00h 13h; NP-P502WL = FFh 22h 01h 13h. Use the corresponding principal response layout when decoding model information.

UNRESOLVED: Audio Select Set is explicitly supported, but the principal manual defines DATA01=input terminal / DATA02=setting while appendix p.45 labels its input-name table DATA02. That appendix lists 00h HDMI1, 01h HDMI2, 02h DisplayPort, 03h ETHERNET/LAN, 04h USB-A, 05h USB-B, 09h HDBaseT for other models, including this pair, without resolving the field-label conflict or absent-port combinations. No guessed terminal-byte mapping is supplied. Firmware range and serial flow-control requirements are not established by this source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-26T14:23:17.847Z
last_checked_at: 2026-09-26T14:23:17.847Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:17.847Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All33 target-supported command families and their request shapes match the primary manual; unknown flow control and the audio-select appendix field-label conflict remain explicitly unresolved. Authentication is explicitly unresolved. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source mentions portrait cover interlock switch in error status DATA09 bit1 (\"The interlock switch is open\") but does not document procedure or behavior in detail"
- "Audio Select Set is explicitly supported, but the principal manual defines DATA01=input terminal / DATA02=setting while appendix p.45 labels its input-name table DATA02. That appendix lists 00h HDMI1, 01h HDMI2, 02h DisplayPort, 03h ETHERNET/LAN, 04h USB-A, 05h USB-B, 09h HDBaseT for other models, including this pair, without resolving the field-label conflict or absent-port combinations. No guessed terminal-byte mapping is supplied. Firmware range and serial flow-control requirements are not established by this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
