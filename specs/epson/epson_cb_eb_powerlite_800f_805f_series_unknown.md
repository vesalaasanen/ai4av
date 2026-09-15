---
spec_id: admin/epson-cb-eb-powerlite-800f-805f-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CB EB PowerLite 800F 805F Series Control Spec"
manufacturer: Epson
model_family: "CB PowerLite 800F"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "CB PowerLite 800F"
    - "CB PowerLite 805F"
    - EB-800F
    - EB-805F
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T23:10:36.776Z
last_checked_at: 2026-09-07T22:17:26.166Z
generated_at: 2026-09-07T22:17:26.166Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SOURCE 33"
  - "SOURCE 34"
  - "SOURCE 35"
  - "source document applies to legacy TW/TWxxxx/PL-HomeCinema/PL-ProCinema/EH-TWxxxx models — the CB/EB PowerLite 800F/805F laser models are not explicitly listed. Treat commands as candidate support pending confirmation from a PowerLite-specific supplement or device test."
  - "TCP port number not stated in source (refers to ESC/VP.net protocol manual)"
  - "precise return values for PWR? not stated in source"
  - "precise return format not stated in source"
  - "source documents only the generic INC/DEC/INIT step convention; specific variable"
  - "no event/notification surface documented in source"
  - "whether the CB/EB PowerLite 800F/805F require the SPWRLVL 01 power-on"
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements"
  - "- TCP port number for ESC/VP.net (see ESC/VP.net manual, not in this source)"
verification:
  verdict: verified
  checked_at: 2026-09-07T22:17:26.166Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions match source command table verbatim; transport parameters (9600/8/N/1, no flow) verified; extras are 3 unused SOURCE 33/34/35 variants. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson CB EB PowerLite 800F 805F Series Control Spec

## Summary
Epson CB/EB PowerLite 800F and 805F are laser projectors controllable via Epson's ESC/VP21 ASCII command protocol over RS-232 serial, USB, or TCP/IP network sessions. This spec captures the ESC/VP21 command surface documented in Epson's projector protocol guide. Compatibility of CB/EB-800F/805F with the ESC/VP21 protocol is assumed from the family but not explicitly confirmed in the source; specific source applicability for the 800F/805F is not listed in the source document.

<!-- UNRESOLVED: source document applies to legacy TW/TWxxxx/PL-HomeCinema/PL-ProCinema/EH-TWxxxx models — the CB/EB PowerLite 800F/805F laser models are not explicitly listed. Treat commands as candidate support pending confirmation from a PowerLite-specific supplement or device test. -->

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
  port: null  # UNRESOLVED: TCP port number not stated in source (refers to ESC/VP.net protocol manual)
auth:
  type: none  # inferred: no auth procedure in source
```

Notes:
- Serial connector is D-Sub 9-pin, projector input labeled `Control (RS-232C)`.
- RS-232C must be selected at the projector's Advanced Setting menu.
- Network transport requires a TCP session; the port and additional framing are described in a separate ESC/VP.net protocol manual (not included here).

## Traits
```yaml
- powerable  # inferred from PWR ON/PWR OFF commands
- routable # inferred from SOURCE command examples
- queryable  # inferred from get command format with `?` suffix
- muteable # inferred from MUTE ON/MUTE OFF commands
```

## Actions
```yaml
# ESC/VP21 set commands take the form `<CMD> <PARAM>` and return ":" on success.
# Get commands take the form `<CMD>?` and return the parameter value.
# Null command is bare CR (Hex 0D) - projector returns ":" to indicate it is alive.
# Invalid commands yield "ERR\r:" reply.

- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
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

- id: msel_black
  label: MSEL Black
  kind: action
  command: "MSEL 00"
  params: []

- id: msel_blue
  label: MSEL Blue
  kind: action
  command: "MSEL 01"
  params: []

- id: msel_user_logo
  label: MSEL User Logo
  kind: action
  command: "MSEL 02"
  params: []

- id: source_10
  label: Source - INPUT 1/A Cyclic
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_11
  label: Source - INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_12
  label: Source - INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_13
  label: Source - INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_14
  label: Source - INPUT 1/A YCbCr
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_15
  label: Source - INPUT 1/A YPbPr
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_1f
  label: Source - INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_20
  label: Source - INPUT 2/B Cyclic
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_21
  label: Source - INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_22
  label: Source - INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_23
  label: Source - INPUT 2/B YCbCr
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_24
  label: Source - INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_25
  label: Source - INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_2f
  label: Source - INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_30
  label: Source - INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_31
  label: Source - INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_c0
  label: Source - INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_c3
  label: Source - INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_c4
  label: Source - INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_c5
  label: Source - INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_cf
  label: Source - INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_40
  label: Source - VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_41
  label: Source - VIDEO RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_42
  label: Source - VIDEO S
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_43
  label: Source - VIDEO YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_44
  label: Source - VIDEO YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_52
  label: Source - USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_a0
  label: Source - HDMI HDMI2
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_a1
  label: Source - HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_a3
  label: Source - HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_a4
  label: Source - HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_a5
  label: Source - HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_d0
  label: Source - WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_d1
  label: Source - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_d3
  label: Source - WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_d4
  label: Source - WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_d5
  label: Source - WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: null_command
  label: Null command (keepalive)
  kind: action
  command: "\r"  # Hex 0D
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: [ack, error]
  description: |
    Successful set commands return a colon ":" terminator.
    Invalid commands return "ERR" followed by CR (Hex 0D) and a colon ":".

- id: power_state
  type: enum
  values: [on, off]
  description: |
    Response to a power status query (PWR?) - exact response shape not documented in source.
 # UNRESOLVED: precise return values for PWR? not stated in source

- id: source_state
  type: enum
  values: [unknown]
  description: |
    Response to a source query (SOURCE?) enumerates current input.
    # UNRESOLVED: precise return format not stated in source
```

## Variables
```yaml
# Set commands accept fixed parameters (ON, OFF, 21, …) or step parameters (INC, DEC, INIT).
# No named variables beyond these parameter modifiers are documented in the source.
#
# UNRESOLVED: source documents only the generic INC/DEC/INIT step convention; specific variable
# ranges per command (brightness, contrast, volume, etc.) are not enumerated in this excerpt.
```

## Events
```yaml
# ESC/VP21 is a polled request/response protocol; the source does not describe unsolicited
# notifications from the projector.
#
# UNRESOLVED: no event/notification surface documented in source
```

## Macros
```yaml
# Per note (*1) for TW200/TW200H in the source, sending PWR ON requires:
#   1. Power the projector on once.
#   2. Wait until the projector can accept ESC/VP21.
#   3. Send "SPWRLVL 01" to the projector.
#   4. Power the projector off; once in standby, PWR ON works.
# Per TW500 note in source: set "Network Monitoring" of "Operation" in "Setting" menu to ON,
#   power the projector off once; after standby, PWR ON works.
#
# UNRESOLVED: whether the CB/EB PowerLite 800F/805F require the SPWRLVL 01 power-on
# preparation step is not stated in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_on  # power-on sequencing has prerequisites documented in source notes
  - power_off
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements
# for the CB/EB PowerLite 800F/805F specifically are stated in source. Generic ESC/VP21
# power-on prep is documented for legacy TW200/TW500 models only.
```

## Notes
- ESC/VP21 commands are ASCII text; CR (Hex 0D) terminates commands.
- Successful set commands return a colon `:` terminator.
- Invalid commands return `ERR` followed by CR and `:`.
- Null command (bare CR) returns `:` and is used as a liveness probe.
- Step-parameter convention: `INC` increments the parameter by one, `DEC` decrements, `INIT` initializes.
- Source document explicitly enumerates applicability only for legacy TW/EMP/EH/PL projector families (TW100 through TW9000W, EH-TWxxxx, PL-HomeCinema/ProCinema). The CB/EB PowerLite 800F and 805F laser projector models are not listed in the applicability section; treat this spec as a candidate ESC/VP21 surface pending confirmation from a PowerLite-specific Epson document or device test.
- Serial transport: D-Sub 9-pin connector,9600 baud, 8N1, no flow control. RS-232C must be selected under Advanced Setting in the projector menu before serial control works.
- Network transport: TCP session required after which ESC/VP21 commands are sent; see the separate ESC/VP.net protocol manual for TCP framing and port.

<!-- UNRESOLVED:
- TCP port number for ESC/VP.net (see ESC/VP.net manual, not in this source)
- USB transport framing details (see Appendix, not in this excerpt)
- CB/EB PowerLite 800F/805F specific command superset / deltas vs. legacy models
- SPWRLVL 01 applicability to PowerLite 800F/805F
- PWR? / SOURCE? response value formats
- Firmware version where each command applies
-->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T23:10:36.776Z
last_checked_at: 2026-09-07T22:17:26.166Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-07T22:17:26.166Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions match source command table verbatim; transport parameters (9600/8/N/1, no flow) verified; extras are 3 unused SOURCE 33/34/35 variants. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SOURCE 33"
- "SOURCE 34"
- "SOURCE 35"
- "source document applies to legacy TW/TWxxxx/PL-HomeCinema/PL-ProCinema/EH-TWxxxx models — the CB/EB PowerLite 800F/805F laser models are not explicitly listed. Treat commands as candidate support pending confirmation from a PowerLite-specific supplement or device test."
- "TCP port number not stated in source (refers to ESC/VP.net protocol manual)"
- "precise return values for PWR? not stated in source"
- "precise return format not stated in source"
- "source documents only the generic INC/DEC/INIT step convention; specific variable"
- "no event/notification surface documented in source"
- "whether the CB/EB PowerLite 800F/805F require the SPWRLVL 01 power-on"
- "no explicit safety warnings, interlocks, or power-on sequencing requirements"
- "- TCP port number for ESC/VP.net (see ESC/VP.net manual, not in this source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
