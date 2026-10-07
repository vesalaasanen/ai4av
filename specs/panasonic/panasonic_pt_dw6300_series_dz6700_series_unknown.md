---
spec_id: admin/panasonic-pt-dw6300-series-dz6700-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic PT-DW6300 Series / PT-DZ6700 Series Control Spec"
manufacturer: Panasonic
model_family: PT-DZ6710
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - PT-DZ6710
    - PT-DZ6700
    - PT-DW6300
    - PT-D6000
    - PT-D5000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - purelandsupply.com
  - pdf.projectorpoint.co.uk
  - manua.ls
  - manualsdir.com
  - manualmachine.com
source_urls:
  - "https://www.purelandsupply.com/Images/OwnersManuals/Panasonic/PANASONIC%20PT-DZ6700.pdf"
  - https://pdf.projectorpoint.co.uk/pub/media/pp_products/projectors/panasonic/pt-dw6300elk/panasonic_pt-dw6300elk-manual.pdf
  - https://www.manua.ls/panasonic/pt-dw6300/manual
  - https://www.manualsdir.com/manuals/186885/panasonic-dlp-pt-dw6300-dlp-pt-d6000-dlp-pt-dz6710-dlp-pt-dz6700.html
  - https://manualmachine.com/panasonic/ptdw6300us/1315222-user-manual/
retrieved_at: 2026-07-24T19:10:07.400Z
last_checked_at: 2026-10-01T06:45:22.264Z
generated_at: 2026-10-01T06:45:22.264Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PJLink port number not stated in source"
  - "source does not describe unsolicited event notifications from projector"
  - "COMMAND PORT default number not stated in source"
  - "unsolicited event / status change notifications not described"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:45:22.264Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 action units match source commands (7 RS-232C + 14 PJLink) with correct shapes; transport values supported and source fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic PT-DW6300 Series / PT-DZ6700 Series Control Spec

## Summary

Professional projector series supporting RS-232C serial and PJLink over TCP/IP for control. Models PT-DZ6710, PT-DZ6700, PT-DW6300, PT-D6000, PT-D5000 share protocol. Serial uses 9600-8N1; PJLink is supported over the network (TCP port not stated in source). Also supports contact-closure via REMOTE 2 IN terminal.

<!-- UNRESOLVED: PJLink port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp

serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none

addressing:
  port: UNRESOLVED  # source does not state a TCP port; COMMAND PORT is user-entered in NETWORK CONTROL menu, PJLink port not given

auth:
  type: UNRESOLVED  # source documents PJLink/COMMAND CONTROL with optional password security authorization (admin/user web-control password; MD5 hash of "admin1:"+password+":"+random), also usable without password; RS-232C auth not stated
```

## Traits
```yaml
- powerable
- routable
- queryable
```

## Actions
```yaml
- id: PON
  label: Power ON
  kind: action
  params: []
  note: Ignored during lamp-on control; other commands ignored in standby

- id: POF
  label: Power OFF
  kind: action
  params: []

- id: IIS
  label: Switch Input Mode
  kind: action
  params:
    - name: input
      type: enum
      values:
        - VID   # VIDEO
        - RG1   # RGB1
        - DVI   # DVI
        - SVD   # S-VIDEO
        - RG2   # RGB2
        - SDI   # SDI (PT-DZ6710 only)

- id: QSL
  label: Query Active Lamp Mode
  kind: action
  params: []
  note: Returns 0=DUAL, 1=SINGLE, 2=LAMP1 only, 3=LAMP2 only

- id: LPM
  label: Set Active Lamp Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0  # DUAL
        - 1  # SINGLE
        - 2  # LAMP 1 only
        - 3  # LAMP 2 only

- id: OLP
  label: Set Lamp Power
  kind: action
  params:
    - name: power
      type: enum
      values:
        - 0  # HIGH
        - 1  # LOW
  note: Not available on PT-D5000

- id: POWR
  label: PJLink Power Control
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0  # Standby
        - 1  # Power ON

- id: INPT
  label: PJLink Input Selection
  kind: action
  params:
    - name: input
      type: enum
      values:
        - 11  # RGB1
        - 12  # RGB2
        - 21  # VIDEO
        - 22  # S-VIDEO
        - 31  # DVI-D
        - 32  # SDI (PT-DZ6710 only)

- id: AVMT
  label: PJLink Shutter Control
  kind: action
  params:
    - name: shutter
      type: enum
      values:
        - 30  # Shutter off (picture mute cancelled)
        - 31  # Shutter on (picture mute)
```

## Feedbacks
```yaml
- id: QPW
  label: Power Query
  kind: feedback
  query_command: "QPW"
  returns:
    type: enum
    values:
      - "000"  # Standby
      - "001"  # Power ON

- id: POWR_QUERY
  label: PJLink Power Status
  kind: feedback
  query_command: "POWR ?"
  returns:
    type: enum
    values:
      - 0  # Standby
      - 1  # Power ON
      - 2  # Cool-down in progress
      - 3  # Warm-up in progress

- id: INPT_QUERY
  label: PJLink Input Query
  kind: feedback
  query_command: "INPT ?"
  returns:
    type: integer

- id: AVMT_QUERY
  label: PJLink Shutter Query
  kind: feedback
  query_command: "AVMT ?"
  returns:
    type: enum
    values:
      - 30  # Shutter off
      - 31  # Shutter on

- id: ERST_QUERY
  label: PJLink Error Status Query
  kind: feedback
  query_command: "ERST ?"
  returns:
    type: string
    description: 6-byte string. Bytes 1-6 = fan, lamp, temperature, cover, filter, other errors. Values: 0=no error, 1=warning, 2=error

- id: LAMP_QUERY
  label: PJLink Lamp Status Query
  kind: feedback
  query_command: "LAMP ?"
  returns:
    type: string
    description: 1st digits = Lamp1 cumulative hours, 2nd digit = Lamp1 on/off, 3rd digits = Lamp2 cumulative hours, 4th digit = Lamp2 on/off

- id: INST_QUERY
  label: PJLink Input Selection List Query
  kind: feedback
  query_command: "INST ?"
  returns:
    type: string
    description: "PT-DZ6700/DW6300/D6000/D5000: '11 12 21 22 31'; PT-DZ6710: '11 12 21 22 31 32'"

- id: NAME_QUERY
  label: PJLink Projector Name Query
  kind: feedback
  query_command: "NAME ?"
  returns:
    type: string

- id: INF1_QUERY
  label: PJLink Manufacturer Name Query
  kind: feedback
  query_command: "INF1 ?"
  returns:
    type: string
    constant: "Panasonic"

- id: INF2_QUERY
  label: PJLink Model Name Query
  kind: feedback
  query_command: "INF2 ?"
  returns:
    type: string
    constant: "DZ6710, DZ6700, DW6300, D6000 or D5000"

- id: INF0_QUERY
  label: PJLink Other Information Query
  kind: feedback
  query_command: "INF0 ?"
  returns:
    type: string

- id: CLSS_QUERY
  label: PJLink Class Information Query
  kind: feedback
  query_command: "CLSS ?"
  returns:
    type: string
    constant: "1"
```

## Variables
```yaml
# No standalone settable parameters found in source - all settings are action-based
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from projector
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Pins 1 and 9 on REMOTE 2 IN shorted together disables POWER and SHUTTER buttons on projector and remote; also disables corresponding RS-232C and network commands
  - description: If pins 1+9 and any of pins 3-7 are shorted together, functions for POWER, RGB1, RGB2, DVI-D, VIDEO, S-VIDEO, SDI, SHUTTER are all disabled
  - description: No command can be sent or received for 10 to 60 seconds after the lamp starts lighting. Send commands only after that period has elapsed.
```

## Remote 2 IN
```yaml
# Hardware contact-closure terminal (9-pin D-Sub)
# Short pins to GND to activate; open to deactivate
pin_assignments:
  - pin: 1
    signal: GND
  - pin: 2
    signal: POWER
    open_label: OFF
    short_label: ON
  - pin: 3
    signal: RGB1
    open_label: Other
    short_label: RGB1
  - pin: 4
    signal: RGB2
    open_label: Other
    short_label: RGB2
  - pin: 5
    signal: VIDEO
    open_label: Other
    short_label: VIDEO
  - pin: 6
    signal: S-VIDEO
    open_label: Other
    short_label: S-VIDEO
  - pin: 7
    signal: DVI-D
    open_label: Other
    short_label: DVI-D
  - pin: 8
    signal: SHUTTER
    open_label: OFF
    short_label: ON
  - pin: 9
    signal: RST/SET
    open_label: Controlled by remote control
    short_label: Controlled by external contact
```

## Notes

**RS-232C format:** `STX ID ; CMD : Params ETX` — STX=02h, ETX=03h, ID=ZZ (broadcast) or 01-64 / 0A-0Z. Wait ≥0.5s between commands. When sending commands without parameters, a colon (`:`) is not necessary.

**RS-232C errors:** Wrong commands return `ER401` or `ER402` from projector.

**PJLink auth (no password):** Omit STX; use `00` prefix + 0Dh line-feed instead of ETX.

**PJLink auth (with password):** MD5("admin1:" + password + ":" + random) as 32-byte hash, then same `00` prefix + 0Dh suffix. Random numbers are 8-byte values sent from projector on connect.

**Command control port:** configurable via network menu (COMMAND PORT setting); default not confirmed in source.

**PT-DZ6710 only:** SDI input support, extended INST list with value 32.

<!-- UNRESOLVED: COMMAND PORT default number not stated in source -->
<!-- UNRESOLVED: unsolicited event / status change notifications not described -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - purelandsupply.com
  - pdf.projectorpoint.co.uk
  - manua.ls
  - manualsdir.com
  - manualmachine.com
source_urls:
  - "https://www.purelandsupply.com/Images/OwnersManuals/Panasonic/PANASONIC%20PT-DZ6700.pdf"
  - https://pdf.projectorpoint.co.uk/pub/media/pp_products/projectors/panasonic/pt-dw6300elk/panasonic_pt-dw6300elk-manual.pdf
  - https://www.manua.ls/panasonic/pt-dw6300/manual
  - https://www.manualsdir.com/manuals/186885/panasonic-dlp-pt-dw6300-dlp-pt-d6000-dlp-pt-dz6710-dlp-pt-dz6700.html
  - https://manualmachine.com/panasonic/ptdw6300us/1315222-user-manual/
retrieved_at: 2026-07-24T19:10:07.400Z
last_checked_at: 2026-10-01T06:45:22.264Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:45:22.264Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 action units match source commands (7 RS-232C + 14 PJLink) with correct shapes; transport values supported and source fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PJLink port number not stated in source"
- "source does not describe unsolicited event notifications from projector"
- "COMMAND PORT default number not stated in source"
- "unsolicited event / status change notifications not described"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
