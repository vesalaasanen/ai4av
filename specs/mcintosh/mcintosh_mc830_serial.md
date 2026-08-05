---
spec_id: admin/mcintosh-c55-c2800
schema_version: ai4av-public-spec-v1
revision: 1
title: "McIntosh C55/C2800 Control Spec"
manufacturer: McIntosh
model_family: C55
aliases: []
compatible_with:
  manufacturers:
    - McIntosh
  models:
    - C55
    - C2800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mcintoshlabs.com
  - scribd.com
source_urls:
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control.pdf
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/MC830om01.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-07-13T06:18:42.339Z
last_checked_at: 2026-07-21T23:29:40.528Z
generated_at: 2026-07-21T23:29:40.528Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source artifact was labeled \"mcintosh_mc830\" but documents the C55/C2800 only — MC830 is never mentioned. Confirm the correct source file before publishing."
  - "Baud rate not stated in source."
  - "IR protocol (NEC, custom code 0xCA55) documented but IR is not in the requested `Known protocol: RS-232C` scope; long IR codes omitted from Actions as out-of-scope for serial control."
  - "baud rate not stated in source"
  - "per-state event message payloads not individually documented in source."
  - "no power-on sequencing or safety-critical interlock procedures stated beyond command-level guards."
  - "Source artifact filename (\"mcintosh_mc830\") does not match documented models (C55/C2800). MC830 never mentioned. Likely mislabeled source file — verify before ingest."
  - "baud rate not stated in source."
  - "per-state event message payloads for status updates not individually documented."
  - "exact acknowledgement format for queries (return-value syntax) not fully specified beyond \"echo\"."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:29:40.528Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched literally in source; RS-232C commands one-to-one coverage; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# McIntosh C55/C2800 Control Spec

## Summary
The McIntosh C55 and C2800 are stereo preamplifiers offering external control via RS-232C serial and TCP/IP. Commands are ASCII strings wrapped in parentheses, e.g. `(VOL 65)`, with a 3-character mnemonic name and space-separated parameters. The unit echoes commands as acknowledgement and pushes automatic status updates when status reporting is enabled.

<!-- UNRESOLVED: Source artifact was labeled "mcintosh_mc830" but documents the C55/C2800 only — MC830 is never mentioned. Confirm the correct source file before publishing. -->
<!-- UNRESOLVED: Baud rate not stated in source. -->
<!-- UNRESOLVED: IR protocol (NEC, custom code 0xCA55) documented but IR is not in the requested `Known protocol: RS-232C` scope; long IR codes omitted from Actions as out-of-scope for serial control. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 84
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (PWR on/off commands present)
# - queryable       (QRY and per-command None->status queries present)
# - levelable       (VOL, TBA, TIN, TTB, TTT, OTR level control present)
# - routable        (INP input selection present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Command envelope: (MNEMONIC par.) - open paren prefix, close paren suffix,
# space between mnemonic and parameter. Carriage return \x0D\x0A optional.
# Per granularity rule, each mnemonic = ONE action; on/off/up/down/level/query
# variants are parameter values, not separate rows.
- id: power
  label: Power
  kind: action
  command: "(PWR {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Return Status"
  notes: If Power is Off, all non-Power RS232 commands return Invalid Command error.

- id: volume
  label: Volume
  kind: action
  command: "(VOL {par})"
  params:
    - name: par
      type: string
      description: "U=Up 1%, D=Down 1%, 0-100=Set % Level, omitted=Return Status"

- id: mute
  label: Mute
  kind: action
  command: "(MUT {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: output_1
  label: Output 1
  kind: action
  command: "(OP1 {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: output_2
  label: Output 2
  kind: action
  command: "(OP2 {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: headphones_status
  label: Headphones Status Query
  kind: query
  command: "(HPS)"
  params: []
  notes: "Returns 0=Unplugged, 1=Plugged, 2=No Headphone Jack (China)"

- id: input_select
  label: Input Select
  kind: action
  command: "(INP {par})"
  params:
    - name: par
      type: string
      description: "U=Next, D=Previous, 1=BAL1, 2=BAL2, 3=BAL3, 4=UNBAL1, 5=UNBAL2, 6=UNBAL3, 7=UNBAL4, 8=PHONO1, 9=PHONO2, 10=COAX1, 11=COAX2, 12=OPT1, 13=OPT2, 14=USB, 15=MCT, 16=HDMI(ARC), omitted=Return Status"
  notes: If specified Input is disabled (Off in Setup Menu), Invalid Parameter error returned.

- id: balance
  label: Balance
  kind: action
  command: "(TBA {par})"
  params:
    - name: par
      type: string
      description: "L=Left 1dB, R=Right 1dB, -50 to 50=Set Balance (sign: -=Left, +=Right), omitted=Returns Status"

- id: input_trim_level
  label: Input Trim Level
  kind: action
  command: "(TIN {par})"
  params:
    - name: par
      type: string
      description: "U=Up 0.5dB, D=Down 0.5dB, -12 to +12=Set Level (half-dB steps: -12=-6.0dB), omitted=Returns Status"

- id: mono_stereo
  label: Mono/Stereo
  kind: action
  command: "(TMO {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: processor_loop
  label: Processor Loop
  kind: action
  command: "(TPL {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: meter_lights
  label: Meter Lights
  kind: action
  command: "(TML {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"

- id: display_brightness
  label: Display Brightness
  kind: action
  command: "(TDB {par})"
  params:
    - name: par
      type: string
      description: "1=25%, 2=50%, 3=75%, 4=100%, omitted=Returns Status"

- id: phono_capacitance
  label: Phono Capacitance
  kind: action
  command: "(TPC {par})"
  params:
    - name: par
      type: string
      description: "U=Next, D=Previous, 1-8=Index (50pF,100pF,150pF,200pF,250pF,300pF,350pF,400pF), omitted=Return Status"
  notes: Returns Invalid Input error if current input is not Phono.

- id: phono_resistance
  label: Phono Resistance
  kind: action
  command: "(TPR {par})"
  params:
    - name: par
      type: string
      description: "U=Next, D=Previous, 1-7=Index (25,50,100,200,400,1k,47k), omitted=Return Status"
  notes: Returns Invalid Input error if current input is not Phono.

- id: phono_gain
  label: Phono Gain
  kind: action
  command: "(TPG {par})"
  params:
    - name: par
      type: string
      description: "U=Next, D=Previous, 1-5=Index (40dB,46dB,52dB,58dB,64dB), omitted=Return Status"
  notes: Returns Invalid Input error if current input is not Phono.

- id: hxd
  label: HXD (Headphone Crossfeed)
  kind: action
  command: "(THH {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: Returns Invalid Command error if headphones are not plugged in.

- id: switch_mode
  label: Output Switch Mode
  kind: action
  command: "(OSM {par})"
  params:
    - name: par
      type: string
      description: "0=Switched, 1=Unswitched, 2=Bi-Amped (Fixed), 3=Bi-Amped (Split), omitted=Returns Status"
  notes: Output 1 only.

- id: output_1_trim_level
  label: Output 1 Trim Level
  kind: action
  command: "(OTR {par})"
  params:
    - name: par
      type: string
      description: "U=Up 0.5dB, D=Down 0.5dB, -12 to +6=Set Level (half-dB steps: -12=-6.0dB), omitted=Returns Status"

- id: crossover_frequency
  label: Crossover Frequency
  kind: action
  command: "(OCF {par})"
  params:
    - name: par
      type: string
      description: "1=150Hz, 2=350Hz, 3=900Hz, omitted=Returns Status"
  notes: Returns Invalid Command error if Output 1 is not Bi-Amped (Fixed).

- id: high_pass
  label: High Pass
  kind: action
  command: "(OHP {par})"
  params:
    - name: par
      type: string
      description: "0=Bypass, 1=50Hz, 2=100Hz, 3=250Hz, omitted=Returns Status"
  notes: Returns Invalid Command error if Output 1 is not Bi-Amped (Split).

- id: low_pass
  label: Low Pass
  kind: action
  command: "(OLP {par})"
  params:
    - name: par
      type: string
      description: "1=600Hz, 2=1200Hz, 3=3000Hz, omitted=Returns Status"
  notes: Returns Invalid Command error if Output 1 is not Bi-Amped (Split).

- id: dual_mono
  label: Dual Mono
  kind: action
  command: "(ODM {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: Output 2 only.

- id: query
  label: Query
  kind: query
  command: "(QRY)"
  params: []

- id: status_enable
  label: Status Enable
  kind: action
  command: "(STA {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: Enabling allows automatic status messages on state updates.

- id: digital_audio_metadata
  label: Digital Audio Metadata Query
  kind: query
  command: "(DAM)"
  params: []
  notes: Returns sample rate and/or audio format info for selected digital input.

- id: equalizer
  label: Equalizer
  kind: action
  command: "(TEQ {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: C55 only.

- id: tone_control
  label: Tone Control
  kind: action
  command: "(TTN {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: C2800 only.

- id: tone_bass
  label: Tone Bass
  kind: action
  command: "(TTB {par})"
  params:
    - name: par
      type: string
      description: "U=Up 1dB, D=Down 1dB, -12 to +12=Set Level, omitted=Return Status"
  notes: C2800 only.

- id: tone_treble
  label: Tone Treble
  kind: action
  command: "(TTT {par})"
  params:
    - name: par
      type: string
      description: "U=Up 1dB, D=Down 1dB, -12 to +12=Set Level, omitted=Return Status"
  notes: C2800 only.

- id: tube_lights
  label: Tube Lights
  kind: action
  command: "(TTL {par})"
  params:
    - name: par
      type: string
      description: "1=On, 0=Off, omitted=Returns Status"
  notes: C2800 only.
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: Unit typically echoes the same command as acknowledgement after processing.

- id: connect_banner
  type: string
  description: >
    On AC connection, unit replies with model, serial, FW version, DA version:
    "(C55)" or "(C2800)", "(Serial Number: XXX####)", "(FW Version: #.#.#)", "(DA Version: v#.#.#)"

- id: power_state
  type: enum
  values: [on, off]

- id: volume_level
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [on, off]

- id: output_1_state
  type: enum
  values: [on, off]

- id: output_2_state
  type: enum
  values: [on, off]

- id: headphones_state
  type: enum
  values: [unplugged, plugged, no_jack_china]

- id: input_selected
  type: enum
  values: [BAL1, BAL2, BAL3, UNBAL1, UNBAL2, UNBAL3, UNBAL4, PHONO1, PHONO2, COAX1, COAX2, OPT1, OPT2, USB, MCT, HDMI_ARC]

- id: balance
  type: integer
  range: [-50, 50]

- id: digital_audio_metadata
  type: string
  description: Sample rate / audio format for selected digital input.

- id: error_unknown
  type: string
  description: "(ERROR - Unknown Error)"

- id: error_invalid_command
  type: string
  description: "(ERROR - Invalid Command)"

- id: error_invalid_parameter
  type: string
  description: "(ERROR - Invalid Parameter)"

- id: error_invalid_input
  type: string
  description: "(ERROR - Invalid Input)"

- id: error_in_passthru
  type: string
  description: "(ERROR - In Passthru)"
```

## Variables
```yaml
# Settable levels mirror Actions (VOL, TBA, TIN, TDB, TPC, TPR, TPG, OTR, etc.).
# Treated as actions with level params above; no separate settable parameters
# beyond those action parameters.
```

## Events
```yaml
- id: status_update
  description: >
    When STA (Status Enable) is On, status-change messages are transmitted
    automatically to the host whenever unit state updates. Exact message
    format not enumerated per-state in source.
  # UNRESOLVED: per-state event message payloads not individually documented in source.

- id: connect_banner_event
  description: Unsolicited banner (model, serial, FW, DA versions) sent on first AC connection.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "If Power is Off, all non-Power RS232 commands return Invalid Command error."
  - "HXD (THH) returns Invalid Command error if headphones are not plugged in."
  - "Phono commands (TPC/TPR/TPG) return Invalid Input error if current input is not Phono."
  - "OCF returns Invalid Command error if Output 1 is not Bi-Amped (Fixed)."
  - "OHP/OLP return Invalid Command error if Output 1 is not Bi-Amped (Split)."
# UNRESOLVED: no power-on sequencing or safety-critical interlock procedures stated beyond command-level guards.
```

## Notes
- RS232 hardware uses a 3.5mm TRS cable: Tip=TXD (from C55/C2800), Ring=RXD (to C55/C2800), Sleeve=Ground. A DB9-F to 3.5mm adapter cable may be used.
- Carriage return `\x0D\x0A` after the closing paren is optional (terminal readability only).
- Command structure: `(` prefix + 3-char mnemonic + space + parameters + `)` suffix.
- IR control (HR085 remote, NEC format custom code `0xCA55`) is documented in the source but out of scope for this RS-232C spec. Direct-input HEX codes (0x05–0x4D) and Pronto-style long codes are present in the source if an IR-spec companion is needed.
- C55-exclusive: TEQ (Equalizer). C2800-exclusive: TTN, TTB, TTT, TTL (Tone + Tube Lights).

<!-- UNRESOLVED: Source artifact filename ("mcintosh_mc830") does not match documented models (C55/C2800). MC830 never mentioned. Likely mislabeled source file — verify before ingest. -->
<!-- UNRESOLVED: baud rate not stated in source. -->
<!-- UNRESOLVED: per-state event message payloads for status updates not individually documented. -->
<!-- UNRESOLVED: exact acknowledgement format for queries (return-value syntax) not fully specified beyond "echo". -->

## Provenance

```yaml
source_domains:
  - mcintoshlabs.com
  - scribd.com
source_urls:
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/C55-C2800-External-Control.pdf
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/MC830om01.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-07-13T06:18:42.339Z
last_checked_at: 2026-07-21T23:29:40.528Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:29:40.528Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched literally in source; RS-232C commands one-to-one coverage; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source artifact was labeled \"mcintosh_mc830\" but documents the C55/C2800 only — MC830 is never mentioned. Confirm the correct source file before publishing."
- "Baud rate not stated in source."
- "IR protocol (NEC, custom code 0xCA55) documented but IR is not in the requested `Known protocol: RS-232C` scope; long IR codes omitted from Actions as out-of-scope for serial control."
- "baud rate not stated in source"
- "per-state event message payloads not individually documented in source."
- "no power-on sequencing or safety-critical interlock procedures stated beyond command-level guards."
- "Source artifact filename (\"mcintosh_mc830\") does not match documented models (C55/C2800). MC830 never mentioned. Likely mislabeled source file — verify before ingest."
- "baud rate not stated in source."
- "per-state event message payloads for status updates not individually documented."
- "exact acknowledgement format for queries (return-value syntax) not fully specified beyond \"echo\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
