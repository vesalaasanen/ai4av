---
spec_id: admin/epson-cb-eb-powerlite-l530u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CB EB PowerLite L530U Control Spec"
manufacturer: Epson
model_family: "PowerLite L530U"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "PowerLite L530U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-09-02T17:52:14.245Z
last_checked_at: 2026-09-07T22:17:47.475Z
generated_at: 2026-09-07T22:17:47.475Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not list the PowerLite L530U in the \"Applicable models\" section. Applicability of ESC/VP21 commands to the L530U is not confirmed by this source. Serial config, port, and command coverage below reflect the ESC/VP21 specification described in the source, not any L530U-specific behavior."
  - "TCP port number for ESC/VP.net not stated in source"
  - "additional per-model response states not enumerated in source"
  - "source does not document settable parameters beyond ON/OFF/INC/DEC/INIT for the listed commands"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "no safety warnings, interlock procedures, or power-on sequencing documented in source"
  - "L530U is a laser business/education projector (Laser Pro series). It likely supports ESC/VP21 over RS-232 and RJ-45, but this source document does not confirm it. A separate \"ESC/VP.net protocol manual\" is referenced for TCP/IP details but not included in the source."
verification:
  verdict: verified
  checked_at: 2026-09-07T22:17:47.475Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions have literal command matches in the source command tables; transport values verbatim in source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Epson CB EB PowerLite L530U Control Spec

## Summary
Epson PowerLite L530U laser projector. Source document is the ESC/VP21 Command User's Guide for Home Projectors, which covers the Epson home projector line (TW, EH, PowerLite HomeCinema, ProCinema series) over serial, USB, and TCP/IP network using the ESC/VP21 ASCII command protocol.

<!-- UNRESOLVED: source document does not list the PowerLite L530U in the "Applicable models" section. Applicability of ESC/VP21 commands to the L530U is not confirmed by this source. Serial config, port, and command coverage below reflect the ESC/VP21 specification described in the source, not any L530U-specific behavior. -->

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
  # UNRESOLVED: TCP port number for ESC/VP.net not stated in source
  port: null
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF commands
- routable   # inferred from SOURCE / MSEL commands
- queryable  # inferred from get command format "command?"
```

## Actions
```yaml
- id: pwr_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: pwr_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []

- id: pwr_query
  label: Power Status Query
  kind: query
  command: "PWR?"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MUTE?"
  params: []

- id: msel_00_black
  label: Test Pattern - Black
  kind: action
  command: "MSEL 00"
  params: []

- id: msel_01_blue
  label: Test Pattern - Blue
  kind: action
  command: "MSEL 01"
  params: []

- id: msel_02_user_logo
  label: Test Pattern - User Logo
  kind: action
  command: "MSEL 02"
  params: []

- id: source_10
  label: INPUT 1 Cyclic
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11
  label: INPUT 1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12
  label: INPUT 1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13
  label: INPUT 1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14
  label: INPUT 1 YCbCr
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15
  label: INPUT 1 YPbPr
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f
  label: INPUT 1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_20
  label: INPUT 2 Cyclic
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21
  label: INPUT 2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22
  label: INPUT 2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23
  label: INPUT 2 YCbCr
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24
  label: INPUT 2 YPbPr
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25
  label: INPUT 2 YPbPr (alt)
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f
  label: INPUT 2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_30
  label: INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31
  label: INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_33
  label: INPUT 3 RGB Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_34
  label: INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_35
  label: INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_40
  label: VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41
  label: VIDEO RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42
  label: VIDEO S-Video
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43
  label: VIDEO YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44
  label: VIDEO YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_52
  label: USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_a0
  label: HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1
  label: HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3
  label: HDMI RGB Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4
  label: HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5
  label: HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_c0
  label: INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3
  label: INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4
  label: INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5
  label: INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf
  label: INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_d0
  label: WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1
  label: WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3
  label: WirelessHD RGB Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4
  label: WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5
  label: WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  # PWR? returns state per ESC/VP21 set/get format

- id: mute_state
  type: enum
  values: [on, off]
  # MUTE? returns state per ESC/VP21 set/get format

# UNRESOLVED: additional per-model response states not enumerated in source
```

## Variables
```yaml
# UNRESOLVED: source does not document settable parameters beyond ON/OFF/INC/DEC/INIT for the listed commands
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
Source document is "ESC/VP21 Command User's Guide for Home Projectors" — covers Epson TW/EH/PowerLite HomeCinema/ProCinema series. PowerLite L530U is NOT listed in the Applicable models section of the source. TCPI/IP control is described as a transport (referencing ESC/VP.net protocol manual) but TCP port is not stated.

Command families documented:
- PWR ON / PWR OFF / PWR?
- MUTE ON / MUTE OFF / MUTE?
- MSEL 00/01/02 — test pattern select (Black / Blue / User Logo)
- SOURCE xx — input source select per signal type per terminal

Serial configuration: 9600 bps, 8 data bits, no parity, 1 stop bit, no flow control, D-Sub 9-pin RS-232C input labeled "Control".

ESC/VP21 command framing:
- Set: `COMMAND PARAM` terminated by CR (Hex 0D); projector returns ":" on success.
- Get: `COMMAND?` terminated by CR; projector returns response then ":" on success.
- Null: CR (Hex 0D) alone — used to confirm projector is operational.
- Illegal command: projector returns `ERR<CR>:`.

INC/DEC/INIT step parameters supported on set commands per source.

<!-- UNRESOLVED: L530U is a laser business/education projector (Laser Pro series). It likely supports ESC/VP21 over RS-232 and RJ-45, but this source document does not confirm it. A separate "ESC/VP.net protocol manual" is referenced for TCP/IP details but not included in the source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-09-02T17:52:14.245Z
last_checked_at: 2026-09-07T22:17:47.475Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-07T22:17:47.475Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions have literal command matches in the source command tables; transport values verbatim in source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not list the PowerLite L530U in the \"Applicable models\" section. Applicability of ESC/VP21 commands to the L530U is not confirmed by this source. Serial config, port, and command coverage below reflect the ESC/VP21 specification described in the source, not any L530U-specific behavior."
- "TCP port number for ESC/VP.net not stated in source"
- "additional per-model response states not enumerated in source"
- "source does not document settable parameters beyond ON/OFF/INC/DEC/INIT for the listed commands"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "no safety warnings, interlock procedures, or power-on sequencing documented in source"
- "L530U is a laser business/education projector (Laser Pro series). It likely supports ESC/VP21 over RS-232 and RJ-45, but this source document does not confirm it. A separate \"ESC/VP.net protocol manual\" is referenced for TCP/IP details but not included in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
