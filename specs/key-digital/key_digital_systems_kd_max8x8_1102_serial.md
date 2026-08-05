---
spec_id: admin/key-digital-systems-kd-max8x8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MAX8x8 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MAX8x8
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MAX8x8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5870/KD-MAX8x8_Manual.pdf
retrieved_at: 2026-07-14T06:07:01.920Z
last_checked_at: 2026-07-21T23:14:36.098Z
generated_at: 2026-07-21T23:14:36.098Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source identifies model as KD-MAX8x8 but does not explicitly identify the 1102 variant."
  - "firmware compatibility range not stated in source."
  - "source does not document unsolicited event notifications beyond a prompt after each received command"
  - "source does not document control-protocol macros"
  - "exact prompt syntax and general command acknowledgement/error response formats are not stated in source."
  - "timing requirements, fault behavior, and error-recovery sequences are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:14:36.098Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match verbatim in source with correct parameter ranges; transport parameters verified exactly. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Key Digital Systems KD-MAX8x8 Control Spec

## Summary

KD-MAX8x8 is an eight-input, eight-output audio matrix switcher controllable through bidirectional RS-232 or TCP/IP. This spec covers routing, input and output configuration, DSP adjustment, network setup, system configuration, and status commands.

<!-- UNRESOLVED: source identifies model as KD-MAX8x8 but does not explicitly identify the 1102 variant. -->
<!-- UNRESOLVED: firmware compatibility range not stated in source. -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Commands require a carriage return terminator, are not case-sensitive, and must be sent without the spaces shown for readability. Device sends a prompt after receiving a command. Default static IP address is `192.168.1.239`.

## Traits

```yaml
- powerable  # inferred from power commands
- routable  # inferred from input/output routing commands
- queryable  # inferred from help, name-read, and status commands
- levelable  # inferred from volume and DSP commands
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PN"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PF"
  params: []

- id: use_system_address_prefix
  label: Use System Address Prefix
  kind: action
  command: "Azz"
  params:
    - name: address
      type: integer
      description: System address zz from 01 through 99

- id: help
  label: Show Help
  kind: query
  command: "H"
  params: []

- id: global_system_status
  label: Show Global System Status
  kind: query
  command: "STA"
  params: []

- id: set_analog_input_type
  label: Set Analog Input Type
  kind: action
  command: "SPIxx AS y"
  params:
    - name: input
      type: string
      description: Input xx from 01 through 08, or A for all inputs
    - name: type
      type: integer
      description: "1=L+/R+, 2=L-/R-, 3=Balanced"

- id: set_input_audio_association
  label: Set Input Audio Association
  kind: action
  command: "SPIxx AA y"
  params:
    - name: input
      type: string
      description: Input xx from 01 through 08, or A for all inputs
    - name: association
      type: integer
      description: "1=Analog, 2=PCM, 3=Both (Analog to Analog and PCM to PCM)"

- id: save_input_name
  label: Save Input Name
  kind: action
  command: "SPIxx WN cccccccccccccccc"
  params:
    - name: input
      type: string
      description: Input xx from 01 through 08, or A for all inputs
    - name: name
      type: string
      description: Input name represented by cccccccccccccccc

- id: read_input_name
  label: Read Input Name
  kind: query
  command: "SPIxx RN"
  params:
    - name: input
      type: string
      description: Input xx from 01 through 08, or A for all inputs

- id: route_associated_input
  label: Route Associated Input to Output
  kind: action
  command: "SPOxx SI yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: input
      type: integer
      description: Input yy from 01 through 08

- id: route_analog_input
  label: Route Analog Input to Output
  kind: action
  command: "SPOxx SA yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: input
      type: integer
      description: Analog input yy from 01 through 08

- id: route_pcm_input
  label: Route PCM Input to Output
  kind: action
  command: "SPOxx SP yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: input
      type: integer
      description: PCM input yy from 01 through 08

- id: route_pcm_output
  label: Route PCM Input to PCM Output
  kind: action
  command: "SPOxx SB yy"
  params:
    - name: output
      type: string
      description: PCM output xx from 01 through 08, or A for all outputs
    - name: input
      type: integer
      description: PCM input yy from 01 through 08

- id: set_output_disconnection
  label: Set Output Disconnection
  kind: action
  command: "SPOxx D E/D"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: state
      type: enum
      values:
        - E
        - D
      description: Enable or disable output disconnection

- id: save_output_name
  label: Save Output Name
  kind: action
  command: "SPOxx WN cccccccccccccccc"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: name
      type: string
      description: Output name represented by cccccccccccccccc

- id: read_output_name
  label: Read Output Name
  kind: query
  command: "SPOxx RN"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs

- id: set_output_volume
  label: Set Output Audio Volume
  kind: action
  command: "SPOxx AV yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: level
      type: string
      description: Value yy from 00 through 99, U for up, or D for down

- id: set_output_balance
  label: Set Output Audio Balance
  kind: action
  command: "SPOxx AB yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: level
      type: string
      description: Value yy from 00 through 40, U for up, or D for down

- id: set_output_bass_gain
  label: Set Output Audio Bass Gain
  kind: action
  command: "SPOxx AL yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: level
      type: string
      description: Value yy from 00 through 24, U for up, or D for down

- id: set_output_middle_gain
  label: Set Output Audio Middle Gain
  kind: action
  command: "SPOxx AM yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: level
      type: string
      description: Value yy from 00 through 24, U for up, or D for down

- id: set_output_treble_gain
  label: Set Output Audio Treble Gain
  kind: action
  command: "SPOxx AH yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: level
      type: string
      description: Value yy from 00 through 24, U for up, or D for down

- id: set_output_audio_delay
  label: Set Output Audio Delay
  kind: action
  command: "SPOxx AD yy"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: delay
      type: string
      description: Value yy from 00 through 99, U for up, or D for down

- id: set_output_audio_mute
  label: Set Output Audio Mute
  kind: action
  command: "SPOxx A E/D/T"
  params:
    - name: output
      type: string
      description: Output xx from 01 through 08, or A for all outputs
    - name: state
      type: enum
      values:
        - E
        - D
        - T
      description: Enable, disable, or toggle mute

- id: set_host_ip_address
  label: Set Host IP Address
  kind: action
  command: "SPCETIPA xxx.xxx.xxx.xxx"
  params:
    - name: address
      type: string
      description: IPv4 address with each xxx octet from 000 through 255

- id: set_network_mask
  label: Set Network Mask
  kind: action
  command: "SPCETIPM xxx.xxx.xxx.xxx"
  params:
    - name: mask
      type: string
      description: IPv4 network mask with each xxx octet from 000 through 255

- id: set_router_ip_address
  label: Set Router IP Address
  kind: action
  command: "SPCETIPR xxx.xxx.xxx.xxx"
  params:
    - name: address
      type: string
      description: IPv4 router address with each xxx octet from 000 through 255

- id: set_tcp_ip_port
  label: Set TCP/IP Port
  kind: action
  command: "SPCETIPP zzzz"
  params:
    - name: port
      type: integer
      description: TCP/IP port zzzz from 0001 through 9999

- id: apply_network_configuration
  label: Apply New Network Configuration
  kind: action
  command: "SPCETIPB"
  params: []

- id: set_front_panel_buttons
  label: Set Front Panel Buttons
  kind: action
  command: "SPCFB E/D"
  params:
    - name: state
      type: enum
      values:
        - E
        - D
      description: Enable or disable front-panel buttons

- id: set_rs232_baud_rate
  label: Set RS-232 Baud Rate
  kind: action
  command: "SPC RSB z"
  params:
    - name: rate_code
      type: integer
      description: "0=57600, 1=38400, 2=19200, 3=9600, 4=4800"

- id: reset_factory_defaults
  label: Reset All to Factory Defaults
  kind: action
  command: "SPCDF"
  params: []

- id: set_system_address
  label: Set System Address
  kind: action
  command: "SPCAxx"
  params:
    - name: address
      type: integer
      description: System address xx from 00 through 99; 00 selects single-unit mode
```

## Feedbacks

```yaml
- id: command_prompt
  type: string
  description: Prompt sent after a new command is received

- id: help_response
  type: string
  description: Readable response containing the entire API

- id: global_system_status
  type: object
  description: Readable STA response containing unit and system status
  fields:
    - system_address
    - firmware_version
    - rs232_baud_rate
    - rs232_data_bits
    - rs232_parity
    - rs232_stop_bits
    - front_panel_button_state
    - mac_address
    - host_ip_address
    - network_mask
    - router_ip_address
    - tcp_port
    - analog_input_types
    - output_routes
    - output_volume
    - output_balance
    - output_bass
    - output_middle
    - output_treble
    - output_delay
    - output_mute
    - output_enabled

- id: input_name
  type: string
  description: Input name returned by the SPIxx RN query

- id: output_name
  type: string
  description: Output name returned by the SPOxx RN query
```

## Variables

```yaml
- id: system_address
  type: integer
  range:
    minimum: 0
    maximum: 99

- id: host_ip_address
  type: string

- id: network_mask
  type: string

- id: router_ip_address
  type: string

- id: tcp_port
  type: integer
  range:
    minimum: 1
    maximum: 9999

- id: output_volume
  type: integer
  range:
    minimum: 0
    maximum: 99

- id: output_balance
  type: integer
  range:
    minimum: 0
    maximum: 40

- id: output_bass_gain
  type: integer
  range:
    minimum: 0
    maximum: 24

- id: output_middle_gain
  type: integer
  range:
    minimum: 0
    maximum: 24

- id: output_treble_gain
  type: integer
  range:
    minimum: 0
    maximum: 24

- id: output_audio_delay
  type: integer
  range:
    minimum: 0
    maximum: 99
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited event notifications beyond a prompt after each received command
```

## Macros

```yaml
# UNRESOLVED: source does not document control-protocol macros
```

## Safety

```yaml
confirmation_required_for:
  - reset_factory_defaults
  - apply_network_configuration
interlocks:
  - operation: firmware_mode_switch
    requirement: Change switch position only while unit is not powered
```

## Notes

Factory-default network configuration is host IP `192.168.1.239`, router IP `192.168.1.1`, and TCP port `23`. Factory-default RS-232 configuration is 57600 baud, 8 data bits, no parity, one stop bit, and no flow control.

The firmware mode switch should remain in the Operation setting unless Key Digital technical support instructs otherwise. Setting it to F/W Load places the unit in bootloader mode awaiting firmware.

<!-- UNRESOLVED: exact prompt syntax and general command acknowledgement/error response formats are not stated in source. -->
<!-- UNRESOLVED: timing requirements, fault behavior, and error-recovery sequences are not stated in source. -->

## Provenance

```yaml
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5870/KD-MAX8x8_Manual.pdf
retrieved_at: 2026-07-14T06:07:01.920Z
last_checked_at: 2026-07-21T23:14:36.098Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:14:36.098Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match verbatim in source with correct parameter ranges; transport parameters verified exactly. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source identifies model as KD-MAX8x8 but does not explicitly identify the 1102 variant."
- "firmware compatibility range not stated in source."
- "source does not document unsolicited event notifications beyond a prompt after each received command"
- "source does not document control-protocol macros"
- "exact prompt syntax and general command acknowledgement/error response formats are not stated in source."
- "timing requirements, fault behavior, and error-recovery sequences are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
