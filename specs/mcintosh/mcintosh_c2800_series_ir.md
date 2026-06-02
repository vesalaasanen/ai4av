---
spec_id: admin/mcintosh-c2800-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "McIntosh C2800 Control Spec"
manufacturer: McIntosh
model_family: C2800
aliases: []
compatible_with:
  manufacturers:
    - McIntosh
  models:
    - C2800
    - C55
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T22:09:36.055Z
last_checked_at: 2026-06-02T22:09:36.055Z
generated_at: 2026-06-02T22:09:36.055Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated"
  - "maximum command rate / minimum inter-command delay not stated"
  - "no multi-step sequences explicitly described in source"
  - "no explicit power-on sequencing requirements stated in source"
  - "maximum command throughput / minimum inter-command delay not stated"
  - "TCP connection persistence behavior (keep-alive, timeout) not stated"
  - "firmware version compatibility not stated"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:36.055Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# McIntosh C2800 Control Spec

## Summary
The McIntosh C2800 is a vacuum tube preamplifier with RS-232 serial and TCP/IP control interfaces. Commands are ASCII-formatted with parenthetical delimiters `(XXX param)`. The unit echoes commands as acknowledgement, transmits unsolicited status updates on state changes, and reports model/serial/firmware on AC power-up. This spec also covers the closely related C55 solid-state preamplifier which shares the same command set (with minor model-specific exclusions noted inline).

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: maximum command rate / minimum inter-command delay not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 84
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # baud_rate note: adjustable in Setup Menu to 9600, 19200, 38400, 57600, or 115200 (default)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PWR command
  - queryable    # QRY command, STA status enable
  - levelable    # VOL, TBA, TIN, OTB, TTB, TTT volume/trim/balance
  - routable     # INP input selection
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "(PWR 1)"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "(PWR 0)"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "(VOL U)"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "(VOL D)"
    params: []

  - id: volume_set
    label: Set Volume
    kind: action
    command: "(VOL {level})"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume percentage

  - id: mute_on
    label: Mute On
    kind: action
    command: "(MUT 1)"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "(MUT 0)"
    params: []

  - id: output1_on
    label: Output 1 On
    kind: action
    command: "(OP1 1)"
    params: []

  - id: output1_off
    label: Output 1 Off
    kind: action
    command: "(OP1 0)"
    params: []

  - id: output2_on
    label: Output 2 On
    kind: action
    command: "(OP2 1)"
    params: []

  - id: output2_off
    label: Output 2 Off
    kind: action
    command: "(OP2 0)"
    params: []

  - id: input_select
    label: Select Input
    kind: action
    command: "(INP {input})"
    params:
      - name: input
        type: enum
        values:
          - U
          - D
          - 1
          - 2
          - 3
          - 4
          - 5
          - 6
          - 7
          - 8
          - 9
          - 10
          - 11
          - 12
          - 13
          - 14
          - 15
          - 16
        description: "U=Next, D=Previous, 1=BAL1, 2=BAL2, 3=BAL3, 4=UNBAL1, 5=UNBAL2, 6=UNBAL3, 7=UNBAL4, 8=PHONO1, 9=PHONO2, 10=COAX1, 11=COAX2, 12=OPT1, 13=OPT2, 14=USB, 15=MCT, 16=HDMI(ARC)"

  - id: balance_left
    label: Balance Left
    kind: action
    command: "(TBA L)"
    params: []

  - id: balance_right
    label: Balance Right
    kind: action
    command: "(TBA R)"
    params: []

  - id: balance_set
    label: Set Balance
    kind: action
    command: "(TBA {balance})"
    params:
      - name: balance
        type: integer
        min: -50
        max: 50
        description: "Negative=Left, Positive=Right"

  - id: input_trim_up
    label: Input Trim Up
    kind: action
    command: "(TIN U)"
    params: []

  - id: input_trim_down
    label: Input Trim Down
    kind: action
    command: "(TIN D)"
    params: []

  - id: input_trim_set
    label: Set Input Trim
    kind: action
    command: "(TIN {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: "Half-dB indexed (-12=-6.0dB, -11=-5.5dB, etc.)"

  - id: mono_on
    label: Mono On
    kind: action
    command: "(TMO 1)"
    params: []

  - id: mono_off
    label: Mono Off
    kind: action
    command: "(TMO 0)"
    params: []

  - id: processor_loop_on
    label: Processor Loop On
    kind: action
    command: "(TPL 1)"
    params: []

  - id: processor_loop_off
    label: Processor Loop Off
    kind: action
    command: "(TPL 0)"
    params: []

  - id: meter_lights_on
    label: Meter Lights On
    kind: action
    command: "(TML 1)"
    params: []

  - id: meter_lights_off
    label: Meter Lights Off
    kind: action
    command: "(TML 0)"
    params: []

  - id: display_brightness_set
    label: Set Display Brightness
    kind: action
    command: "(TDB {level})"
    params:
      - name: level
        type: enum
        values:
          - 1
          - 2
          - 3
          - 4
        description: "1=25%, 2=50%, 3=75%, 4=100%"

  - id: phono_capacitance_set
    label: Set Phono Capacitance
    kind: action
    command: "(TPC {index})"
    params:
      - name: index
        type: enum
        values:
          - U
          - D
          - 1
          - 2
          - 3
          - 4
          - 5
          - 6
          - 7
          - 8
        description: "U/D=next/prev; 1=50pF, 2=100pF, 3=150pF, 4=200pF, 5=250pF, 6=300pF, 7=350pF, 8=400pF"

  - id: phono_resistance_set
    label: Set Phono Resistance
    kind: action
    command: "(TPR {index})"
    params:
      - name: index
        type: enum
        values:
          - U
          - D
          - 1
          - 2
          - 3
          - 4
          - 5
          - 6
          - 7
        description: "U/D=next/prev; 1=25Ω, 2=50Ω, 3=100Ω, 4=200Ω, 5=400Ω, 6=1kΩ, 7=47kΩ"

  - id: phono_gain_set
    label: Set Phono Gain
    kind: action
    command: "(TPG {index})"
    params:
      - name: index
        type: enum
        values:
          - U
          - D
          - 1
          - 2
          - 3
          - 4
          - 5
        description: "U/D=next/prev; 1=40dB, 2=46dB, 3=52dB, 4=58dB, 5=64dB"

  - id: hxd_on
    label: HXD On
    kind: action
    command: "(THH 1)"
    params: []

  - id: hxd_off
    label: HXD Off
    kind: action
    command: "(THH 0)"
    params: []

  - id: output_switch_mode
    label: Set Output Switch Mode
    kind: action
    command: "(OSM {mode})"
    params:
      - name: mode
        type: enum
        values:
          - 0
          - 1
          - 2
          - 3
        description: "0=Switched, 1=Unswitched, 2=Bi-Amped (Fixed), 3=Bi-Amped (Split). Output 1 only."

  - id: output1_trim_set
    label: Set Output 1 Trim
    kind: action
    command: "(OTR {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 6
        description: "Half-dB indexed (e.g. -12=-6.0dB)"

  - id: crossover_set
    label: Set Crossover Frequency
    kind: action
    command: "(OCF {index})"
    params:
      - name: index
        type: enum
        values:
          - 1
          - 2
          - 3
        description: "1=150Hz, 2=350Hz, 3=900Hz. Bi-Amped (Fixed) only."

  - id: high_pass_set
    label: Set High Pass Filter
    kind: action
    command: "(OHP {index})"
    params:
      - name: index
        type: enum
        values:
          - 0
          - 1
          - 2
          - 3
        description: "0=Bypass, 1=50Hz, 2=100Hz, 3=250Hz. Bi-Amped (Split) only."

  - id: low_pass_set
    label: Set Low Pass Filter
    kind: action
    command: "(OLP {index})"
    params:
      - name: index
        type: enum
        values:
          - 1
          - 2
          - 3
        description: "1=600Hz, 2=1200Hz, 3=3000Hz. Bi-Amped (Split) only."

  - id: dual_mono_on
    label: Dual Mono On
    kind: action
    command: "(ODM 1)"
    params: []

  - id: dual_mono_off
    label: Dual Mono Off
    kind: action
    command: "(ODM 0)"
    params: []

  - id: status_enable_on
    label: Status Enable On
    kind: action
    command: "(STA 1)"
    params: []

  - id: status_enable_off
    label: Status Enable Off
    kind: action
    command: "(STA 0)"
    params: []

  # C2800-exclusive commands
  - id: tone_control_on
    label: Tone Control On (C2800)
    kind: action
    command: "(TTN 1)"
    params: []

  - id: tone_control_off
    label: Tone Control Off (C2800)
    kind: action
    command: "(TTN 0)"
    params: []

  - id: tone_bass_up
    label: Tone Bass Up (C2800)
    kind: action
    command: "(TTB U)"
    params: []

  - id: tone_bass_down
    label: Tone Bass Down (C2800)
    kind: action
    command: "(TTB D)"
    params: []

  - id: tone_bass_set
    label: Set Tone Bass (C2800)
    kind: action
    command: "(TTB {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: Bass level in dB

  - id: tone_treble_up
    label: Tone Treble Up (C2800)
    kind: action
    command: "(TTT U)"
    params: []

  - id: tone_treble_down
    label: Tone Treble Down (C2800)
    kind: action
    command: "(TTT D)"
    params: []

  - id: tone_treble_set
    label: Set Tone Treble (C2800)
    kind: action
    command: "(TTT {level})"
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: Treble level in dB

  - id: tube_lights_on
    label: Tube Lights On (C2800)
    kind: action
    command: "(TTL 1)"
    params: []

  - id: tube_lights_off
    label: Tube Lights Off (C2800)
    kind: action
    command: "(TTL 0)"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "(PWR)"
    type: enum
    values:
      - "1"
      - "0"

  - id: volume_level
    label: Volume Level
    query: "(VOL)"
    type: integer
    min: 0
    max: 100

  - id: mute_state
    label: Mute State
    query: "(MUT)"
    type: enum
    values:
      - "1"
      - "0"

  - id: output1_state
    label: Output 1 State
    query: "(OP1)"
    type: enum
    values:
      - "1"
      - "0"

  - id: output2_state
    label: Output 2 State
    query: "(OP2)"
    type: enum
    values:
      - "1"
      - "0"

  - id: headphone_status
    label: Headphone Status
    query: "(HPS)"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
    description: "0=Unplugged, 1=Plugged, 2=No Headphone Jack (China)"

  - id: input_selected
    label: Selected Input
    query: "(INP)"
    type: integer

  - id: balance
    label: Balance
    query: "(TBA)"
    type: integer
    min: -50
    max: 50

  - id: input_trim
    label: Input Trim Level
    query: "(TIN)"
    type: integer
    min: -12
    max: 12

  - id: mono_state
    label: Mono/Stereo State
    query: "(TMO)"
    type: enum
    values:
      - "1"
      - "0"

  - id: processor_loop_state
    label: Processor Loop State
    query: "(TPL)"
    type: enum
    values:
      - "1"
      - "0"

  - id: meter_lights_state
    label: Meter Lights State
    query: "(TML)"
    type: enum
    values:
      - "1"
      - "0"

  - id: display_brightness
    label: Display Brightness
    query: "(TDB)"
    type: enum
    values:
      - "1"
      - "2"
      - "3"
      - "4"

  - id: phono_capacitance
    label: Phono Capacitance
    query: "(TPC)"
    type: integer

  - id: phono_resistance
    label: Phono Resistance
    query: "(TPR)"
    type: integer

  - id: phono_gain
    label: Phono Gain
    query: "(TPG)"
    type: integer

  - id: hxd_state
    label: HXD State
    query: "(THH)"
    type: enum
    values:
      - "1"
      - "0"

  - id: output_switch_mode
    label: Output Switch Mode
    query: "(OSM)"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"

  - id: output1_trim
    label: Output 1 Trim Level
    query: "(OTR)"
    type: integer

  - id: crossover_frequency
    label: Crossover Frequency
    query: "(OCF)"
    type: enum
    values:
      - "1"
      - "2"
      - "3"

  - id: high_pass
    label: High Pass Filter
    query: "(OHP)"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"

  - id: low_pass
    label: Low Pass Filter
    query: "(OLP)"
    type: enum
    values:
      - "1"
      - "2"
      - "3"

  - id: dual_mono_state
    label: Dual Mono State
    query: "(ODM)"
    type: enum
    values:
      - "1"
      - "0"

  - id: full_query
    label: Full Status Query
    query: "(QRY)"
    type: string
    description: Returns full unit status

  - id: status_enable_state
    label: Status Enable State
    query: "(STA)"
    type: enum
    values:
      - "1"
      - "0"

  - id: digital_audio_metadata
    label: Digital Audio Metadata
    query: "(DAM)"
    type: string
    description: Returns sample rate and/or audio format for digital inputs

  # C2800-exclusive
  - id: tone_control_state
    label: Tone Control State (C2800)
    query: "(TTN)"
    type: enum
    values:
      - "1"
      - "0"

  - id: tone_bass
    label: Tone Bass Level (C2800)
    query: "(TTB)"
    type: integer
    min: -12
    max: 12

  - id: tone_treble
    label: Tone Treble Level (C2800)
    query: "(TTT)"
    type: integer
    min: -12
    max: 12

  - id: tube_lights_state
    label: Tube Lights State (C2800)
    query: "(TTL)"
    type: enum
    values:
      - "1"
      - "0"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: 0
    max: 100
    unit: "%"

  - id: balance
    label: Balance
    type: integer
    min: -50
    max: 50
    unit: "dB"

  - id: input_trim
    label: Input Trim
    type: integer
    min: -12
    max: 12
    description: "Half-dB indexed steps"

  - id: display_brightness
    label: Display Brightness
    type: enum
    values:
      - "25%"
      - "50%"
      - "75%"
      - "100%"

  - id: output1_trim
    label: Output 1 Trim
    type: integer
    min: -12
    max: 6
    description: "Half-dB indexed steps"
```

## Events
```yaml
events:
  - id: startup_info
    label: Startup Information
    description: "On AC power-up, unit sends model name, serial number, system FW version, and DA FW version."
    format: "(C2800)\\n(Serial Number: XXX####)\\n(FW Version: #.#.#)\\n(DA Version: v#.#.#)"

  - id: command_echo
    label: Command Acknowledgement
    description: "Unit echoes the processed command back as acknowledgement."

  - id: status_update
    label: Unsolicited Status Update
    description: "When STA is enabled, the unit automatically transmits state changes to the host."
    trigger: "State change with STA enabled"

  - id: error_message
    label: Error Message
    description: "Sent when a command is invalid, has invalid parameters, or is not applicable."
    format: "(ERROR – <type>)"
    values:
      - "(ERROR – Unknown Error)"
      - "(ERROR – Invalid Command)"
      - "(ERROR – Invalid Parameter)"
      - "(ERROR – Invalid Input)"
      - "(ERROR – In Passthru)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "If Power is Off, all non-PWR RS232 commands return Invalid Command Error."
  - "Phono Capacitance/Resistance/Gain commands return Invalid Input Error if current input is not Phono."
  - "HXD command returns Invalid Command Error if headphones are not plugged in."
  - "Crossover Frequency returns Invalid Command Error if Output 1 is not Bi-Amped (Fixed)."
  - "High/Low Pass returns Invalid Command Error if Output 1 is not Bi-Amped (Split)."
  - "Input Select returns Invalid Parameter Error if specified input is disabled in Setup Menu."
# UNRESOLVED: no explicit power-on sequencing requirements stated in source
```

## Notes
- Command format is `(XXX params)` — open parenthesis prefix, 3-character command name, space-separated parameters, close parenthesis suffix. Optional trailing `\x0D\x0A`.
- The RS-232 physical connector is a 3.5mm TRS jack: Tip=TXD (from unit), Ring=RXD (to unit), Sleeve=Ground.
- Baud rate is adjustable via the Setup Menu; default is 115200. Other supported rates: 9600, 19200, 38400, 57600.
- TCP/IP port 84 is used for both wired and wireless interfaces.
- The source document covers both C55 and C2800. C55-exclusive command: TEQ (Equalizer). C2800-exclusive commands: TTN, TTB, TTT, TTL.
- IR control codes use NEC format with custom code 0xCA55. IR codes are documented but not included as programmatic actions in this spec.
- When Status Enable (STA) is on, the unit transmits unsolicited state-change updates, allowing the control system to maintain synchronised state without polling.

<!-- UNRESOLVED: maximum command throughput / minimum inter-command delay not stated -->
<!-- UNRESOLVED: TCP connection persistence behavior (keep-alive, timeout) not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T22:09:36.055Z
last_checked_at: 2026-06-02T22:09:36.055Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:36.055Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated"
- "maximum command rate / minimum inter-command delay not stated"
- "no multi-step sequences explicitly described in source"
- "no explicit power-on sequencing requirements stated in source"
- "maximum command throughput / minimum inter-command delay not stated"
- "TCP connection persistence behavior (keep-alive, timeout) not stated"
- "firmware version compatibility not stated"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
