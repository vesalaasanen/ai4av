---
spec_id: admin/turtle-av-xlr22
schema_version: ai4av-public-spec-v1
revision: 1
title: "Turtle AV Mineola 2x2 Control Spec"
manufacturer: "Turtle AV"
model_family: XLR22
aliases: []
compatible_with:
  manufacturers:
    - "Turtle AV"
  models:
    - XLR22
    - "Mineola 2x2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - turtleav.com
source_urls:
  - https://turtleav.com/wp-content/uploads/2026/04/Mineola-2x2-User-Guide.pdf
retrieved_at: 2026-05-04T14:41:07.720Z
last_checked_at: 2026-07-22T01:34:50.393Z
generated_at: 2026-07-22T01:34:50.393Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source identifies model as XLR22 and product as Mineola 2x2; exact commercial naming relationship is not clarified."
  - "No unsolicited event mechanism is documented."
  - "no unsolicited event notifications described in source."
  - "no explicit multi-step macro sequences described in source."
  - "no safety warnings or interlock procedures described in source."
  - "firmware compatibility range not stated."
  - "unsolicited event/callback behavior not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:34:50.393Z
  matched_actions: 93
  action_count: 93
  confidence: medium
  summary: "All 93 spec actions match distinct source command-code rows one-to-one with correct params/ranges; transport port 8000 and telnet 23 confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-17
---

# Turtle AV Mineola 2x2 Control Spec

## Summary

Mineola 2x2 Dante audio bridge controlled through an ASCII API over TCP/IP. Source documents TCP/IP port 8000, configurable Telnet port 23, audio input/output control, EQ, presets, network settings, password settings, and status queries.

<!-- UNRESOLVED: Source identifies model as XLR22 and product as Mineola 2x2; exact commercial naming relationship is not clarified. -->
<!-- UNRESOLVED: No unsolicited event mechanism is documented. -->

## Transport
```yaml
protocols:
  - tcp
  - telnet
addressing:
  port: 8000
  telnet_port: 23
auth:
  type: none  # inferred: no authentication handshake procedure documented
```

## Traits
```yaml
- powerable  # inferred from power commands
- routable  # inferred from input/output control commands
- queryable  # inferred from get commands returning values
- levelable  # inferred from gain and volume controls
```

## Actions
```yaml
- id: list_commands_question
  label: List Commands
  kind: query
  command: "?"
  params: []

- id: list_commands_help
  label: List Commands
  kind: query
  command: "help"
  params: []

- id: get_type
  label: Get Device Model
  kind: query
  command: "get type"
  params: []

- id: get_status
  label: Get Device Status
  kind: query
  command: "get status"
  params: []

- id: get_fw_version
  label: Get Firmware Version
  kind: query
  command: "get fw version"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "set power on"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "set power off"
  params: []

- id: get_power
  label: Get Power State
  kind: query
  command: "get power"
  params: []

- id: set_standby
  label: Set Standby Mode
  kind: action
  command: "set standby {mode}"
  params:
    - name: mode
      type: integer
      description: "1: Standby, 2: Sleep"

- id: get_standby
  label: Get Standby Mode
  kind: query
  command: "get standby"
  params: []

- id: reboot
  label: Reboot Device
  kind: action
  command: "set reboot"
  params: []

- id: reset_settings
  label: Reset System Settings to Default
  kind: action
  command: "set reset"
  params: []
  confirmation_required: true

- id: reset_all
  label: Reset System and Network Settings to Default
  kind: action
  command: "set reset all"
  params: []
  confirmation_required: true

- id: set_auto_stby
  label: Set Auto Standby Time
  kind: action
  command: "set auto stb {minutes}"
  params:
    - name: minutes
      type: integer
      description: "0: off, 1-100: minutes"

- id: get_auto_stby
  label: Get Auto Standby Time
  kind: query
  command: "get auto stb"
  params: []

- id: set_input_gain
  label: Set Input Gain
  kind: action
  command: "set input {input} gain {gain}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: gain
      type: number
      description: "-12 to 12 dB, step 0.1dB"

- id: get_input_gain
  label: Get Input Gain
  kind: query
  command: "get input {input} gain"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_sensitivity
  label: Set Input Sensitivity
  kind: action
  command: "set input {input} sensitivity {sensitivity}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: sensitivity
      type: integer
      description: "1: +24dBu, 2: +14dBu, 3: +4dBu, 4: 0dBV, 5: -18dBV, 6: -35dBV"

- id: get_input_sensitivity
  label: Get Input Sensitivity
  kind: query
  command: "get input {input} sensitivity"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_phantom_power
  label: Set Input Phantom Power
  kind: action
  command: "set input {input} phantom power {state}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: state
      type: string
      description: "on or off"

- id: get_input_phantom_power
  label: Get Input Phantom Power
  kind: query
  command: "get input {input} phantom power"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_gain_increment
  label: Increase Input Gain
  kind: action
  command: "set input {input} gain+{steps}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: steps
      type: number
      description: "0.1-24 dB; empty value means 1dB step"

- id: set_input_gain_decrement
  label: Decrease Input Gain
  kind: action
  command: "set input {input} gain-{steps}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: steps
      type: number
      description: "0.1-24 dB; empty value means 1dB step"

- id: set_input_mute
  label: Set Input Mute
  kind: action
  command: "set input {input} mute {state}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: state
      type: string
      description: "on or off"

- id: get_input_mute
  label: Get Input Mute
  kind: query
  command: "get input {input} mute"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_master_member
  label: Set Master Output Member
  kind: action
  command: "set master member {ab}"
  params:
    - name: ab
      type: string
      description: "Two bits: a=XLR OUT1, b=XLR OUT2; 0 excludes and 1 includes"

- id: get_master_member
  label: Get Master Output Member
  kind: query
  command: "get master member"
  params: []

- id: set_master_vol
  label: Set Master Volume
  kind: action
  command: "set master vol {volume}"
  params:
    - name: volume
      type: integer
      description: "0-100; alias: set vol {volume}"

- id: get_master_vol
  label: Get Master Volume
  kind: query
  command: "get master vol"
  params: []

- id: set_master_vol_increment
  label: Increase Master Volume
  kind: action
  command: "set master vol+{steps}"
  params:
    - name: steps
      type: integer
      description: "1-100; empty value means 1dB step; aliases: set vol+, set master vol+{steps}, set vol+{steps}"

- id: set_master_vol_decrement
  label: Decrease Master Volume
  kind: action
  command: "set master vol-{steps}"
  params:
    - name: steps
      type: integer
      description: "1-100; empty value means 1dB step; aliases: set vol-, set master vol-{steps}, set vol-{steps}"

- id: set_master_mute
  label: Set Master Mute
  kind: action
  command: "set master mute {state}"
  params:
    - name: state
      type: string
      description: "on or off; alias: set mute {state}"

- id: get_master_mute
  label: Get Master Mute
  kind: query
  command: "get master mute"
  params: []

- id: set_output_gain
  label: Set Output Gain
  kind: action
  command: "set output {output} gain {gain}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: gain
      type: integer
      description: "1: +20dBu, 2: +14dBu, 3: +4dBu, 4: 0dBV, 5: -18dBV, 6: -35dBV"

- id: get_output_gain
  label: Get Output Gain
  kind: query
  command: "get output {output} gain"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_vol
  label: Set Output Volume
  kind: action
  command: "set output {output} vol {volume}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: volume
      type: integer
      description: "0-100"

- id: get_output_vol
  label: Get Output Volume
  kind: query
  command: "get output {output} vol"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_vol_increment
  label: Increase Output Volume
  kind: action
  command: "set output {output} vol+{steps}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: steps
      type: integer
      description: "1-100; empty value means 1 step"

- id: set_output_vol_decrement
  label: Decrease Output Volume
  kind: action
  command: "set output {output} vol-{steps}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: steps
      type: integer
      description: "1-100; empty value means 1 step"

- id: set_output_mute
  label: Set Output Mute
  kind: action
  command: "set output {output} mute {state}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: state
      type: string
      description: "on or off"

- id: get_output_mute
  label: Get Output Mute
  kind: query
  command: "get output {output} mute"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_delay
  label: Set Output Delay
  kind: action
  command: "set output {output} delay {delay}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: delay
      type: integer
      description: "0-50 ms"

- id: get_output_delay
  label: Get Output Delay
  kind: query
  command: "get output {output} delay"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_input_eq_preset
  label: Set Input EQ Preset
  kind: action
  command: "set input {input} eq preset {preset}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: preset
      type: integer
      description: "1: Flat, 2: Custom1, 3: Custom2"

- id: get_input_eq_preset
  label: Get Input EQ Preset
  kind: query
  command: "get input {input} eq preset"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_eq
  label: Set Input EQ Band On/Off
  kind: action
  command: "set input {input} eq {index} {state}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: index
      type: integer
      description: "0: All, 1-8: EQ band index"
    - name: state
      type: string
      description: "on or off"

- id: get_input_eq
  label: Get Input EQ Status
  kind: query
  command: "get input {input} eq"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_eq_stereo
  label: Set Input EQ Stereo Mode
  kind: action
  command: "set input {input} eq stereo {state}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1/2"
    - name: state
      type: string
      description: "on or off"

- id: get_input_eq_stereo
  label: Get Input EQ Stereo Mode
  kind: query
  command: "get input {input} eq stereo"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1/2"

- id: set_input_eq_param
  label: Set Input EQ Band Parameters
  kind: action
  command: "set input {input} eq {index} typ {type} frq {freq} val {gain} q {q}"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"
    - name: index
      type: integer
      description: "0: All, 1-8: EQ band index"
    - name: type
      type: integer
      description: "1: Parametric, 2: Lowpass, 3: Highpass, 4: Low Shelf, 5: High Shelf"
    - name: freq
      type: number
      description: "20-20000 Hz, step 0.1Hz"
    - name: gain
      type: number
      description: "-15 to 15 dB, step 0.1dB"
    - name: q
      type: number
      description: "0.02-16, step 0.01"

- id: get_input_eq_setting
  label: Get Input EQ Band Parameters
  kind: query
  command: "get input {input} eq setting"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_input_eq_clear
  label: Clear Input EQ Settings
  kind: action
  command: "set input {input} eq clear"
  params:
    - name: input
      type: integer
      description: "0: All Inputs, 1: XLR IN1, 2: XLR IN2"

- id: set_output_eq_preset
  label: Set Output EQ Preset
  kind: action
  command: "set output {output} eq preset {preset}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: preset
      type: integer
      description: "1: Flat, 2: Custom1, 3: Custom2"

- id: get_output_eq_preset
  label: Get Output EQ Preset
  kind: query
  command: "get output {output} eq preset"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_eq
  label: Set Output EQ Band On/Off
  kind: action
  command: "set output {output} eq {index} {state}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: index
      type: integer
      description: "0: All, 1-8: EQ band index"
    - name: state
      type: string
      description: "on or off"

- id: get_output_eq
  label: Get Output EQ Status
  kind: query
  command: "get output {output} eq"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_eq_stereo
  label: Set Output EQ Stereo Mode
  kind: action
  command: "set output {output} eq stereo {state}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1/2"
    - name: state
      type: string
      description: "on or off"

- id: get_output_eq_stereo
  label: Get Output EQ Stereo Mode
  kind: query
  command: "get output {output} eq stereo"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1/2"

- id: set_output_eq_param
  label: Set Output EQ Band Parameters
  kind: action
  command: "set output {output} eq {index} typ {type} frq {freq} val {gain} q {q}"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"
    - name: index
      type: integer
      description: "0: All, 1-8: EQ band index"
    - name: type
      type: integer
      description: "1: Parametric, 2: Lowpass, 3: Highpass, 4: Low Shelf, 5: High Shelf"
    - name: freq
      type: number
      description: "20-20000 Hz, step 0.1Hz"
    - name: gain
      type: number
      description: "-15 to 15 dB, step 0.1dB"
    - name: q
      type: number
      description: "0.02-16, step 0.01"

- id: get_output_eq_setting
  label: Get Output EQ Band Parameters
  kind: query
  command: "get output {output} eq setting"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_output_eq_clear
  label: Clear Output EQ Settings
  kind: action
  command: "set output {output} eq clear"
  params:
    - name: output
      type: integer
      description: "0: All Outputs, 1: XLR OUT1, 2: XLR OUT2"

- id: set_eq_copy
  label: Copy EQ Settings
  kind: action
  command: "set {src_type} {src_ch} eq copy to {dst_type} {dst_ch}"
  params:
    - name: src_type
      type: string
      description: "input or output"
    - name: src_ch
      type: integer
      description: "1-8: XLR IN/OUT channel"
    - name: dst_type
      type: string
      description: "input or output"
    - name: dst_ch
      type: integer
      description: "0: All Inputs/Outputs, 1: XLR IN/OUT1, 2: XLR IN/OUT2"

- id: preset_save
  label: Save Preset
  kind: action
  command: "set preset save {preset}"
  params:
    - name: preset
      type: integer
      description: "1-5; excludes network settings"

- id: preset_recall
  label: Recall Preset
  kind: action
  command: "set preset recall {preset}"
  params:
    - name: preset
      type: integer
      description: "1-5; excludes network settings"

- id: preset_clear
  label: Clear Preset
  kind: action
  command: "set preset clear {preset}"
  params:
    - name: preset
      type: integer
      description: "1-5"

- id: get_ipconfig
  label: Get IP Configuration
  kind: query
  command: "get ipconfig"
  params: []

- id: get_pri_mac_addr
  label: Get Primary MAC Address
  kind: query
  command: "get pri mac addr"
  params: []

- id: set_pri_ip_mode
  label: Set Primary Network IP Mode
  kind: action
  command: "set pri ip mode {mode}"
  params:
    - name: mode
      type: integer
      description: "0: Static, 1: DHCP"

- id: get_pri_ip_mode
  label: Get Primary Network IP Mode
  kind: query
  command: "get pri ip mode"
  params: []

- id: set_pri_ip_addr
  label: Set Primary Network IP Address
  kind: action
  command: "set pri ip addr {ip}"
  params:
    - name: ip
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_pri_ip_addr
  label: Get Primary Network IP Address
  kind: query
  command: "get pri ip addr"
  params: []

- id: set_pri_subnet
  label: Set Primary Network Subnet Mask
  kind: action
  command: "set pri subnet {mask}"
  params:
    - name: mask
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_pri_subnet
  label: Get Primary Network Subnet Mask
  kind: query
  command: "get pri subnet"
  params: []

- id: set_pri_gateway
  label: Set Primary Network Gateway
  kind: action
  command: "set pri gateway {gateway}"
  params:
    - name: gateway
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_pri_gateway
  label: Get Primary Network Gateway
  kind: query
  command: "get pri gateway"
  params: []

- id: get_sec_mac_addr
  label: Get Secondary MAC Address
  kind: query
  command: "get sec mac addr"
  params: []

- id: set_sec_ip_mode
  label: Set Secondary Network IP Mode
  kind: action
  command: "set sec ip mode {mode}"
  params:
    - name: mode
      type: integer
      description: "0: Static, 1: DHCP"

- id: get_sec_ip_mode
  label: Get Secondary Network IP Mode
  kind: query
  command: "get sec ip mode"
  params: []

- id: set_sec_ip_addr
  label: Set Secondary Network IP Address
  kind: action
  command: "set sec ip addr {ip}"
  params:
    - name: ip
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_sec_ip_addr
  label: Get Secondary Network IP Address
  kind: query
  command: "get sec ip addr"
  params: []

- id: set_sec_subnet
  label: Set Secondary Network Subnet Mask
  kind: action
  command: "set sec subnet {mask}"
  params:
    - name: mask
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_sec_subnet
  label: Get Secondary Network Subnet Mask
  kind: query
  command: "get sec subnet"
  params: []

- id: set_sec_gateway
  label: Set Secondary Network Gateway
  kind: action
  command: "set sec gateway {gateway}"
  params:
    - name: gateway
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: get_sec_gateway
  label: Get Secondary Network Gateway
  kind: query
  command: "get sec gateway"
  params: []

- id: set_tcp_port
  label: Set TCP/IP Port
  kind: action
  command: "set tcp/ip port {port}"
  params:
    - name: port
      type: integer
      description: "1-65535"

- id: get_tcp_port
  label: Get TCP/IP Port
  kind: query
  command: "get tcp/ip port"
  params: []

- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  command: "set telnet port {port}"
  params:
    - name: port
      type: integer
      description: "1-65535"

- id: get_telnet_port
  label: Get Telnet Port
  kind: query
  command: "get telnet port"
  params: []

- id: net_reboot
  label: Reboot Network Modules
  kind: action
  command: "set net reboot"
  params: []

- id: set_admin_password
  label: Set Admin Password
  kind: action
  command: "set admin password {password}"
  params:
    - name: password
      type: string
      description: "Maximum 16 characters"

- id: get_admin_password
  label: Get Admin Password
  kind: query
  command: "get admin password"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "set user password {password}"
  params:
    - name: password
      type: string
      description: "Maximum 16 characters"

- id: get_user_password
  label: Get User Password
  kind: query
  command: "get user password"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]

- id: standby_mode
  label: Standby Mode
  type: enum
  values: [standby, sleep]

- id: input_gain
  label: Input Gain
  type: number
  unit: dB
  range: [-12, 12]

- id: input_sensitivity
  label: Input Sensitivity
  type: enum
  values: ["+24dBu", "+14dBu", "+4dBu", "0dBV", "-18dBV", "-35dBV"]

- id: input_phantom_power
  label: Input Phantom Power
  type: enum
  values: [on, off]

- id: input_mute
  label: Input Mute
  type: enum
  values: [on, off]

- id: master_member
  label: Master Output Member
  type: string
  description: "Source feedback example is six-bit string '111111'; set command documents two output membership bits."

- id: master_volume
  label: Master Volume
  type: integer
  range: [0, 100]

- id: master_mute
  label: Master Mute
  type: enum
  values: [on, off]

- id: output_gain
  label: Output Gain
  type: enum
  values: ["+20dBu", "+14dBu", "+4dBu", "0dBV", "-18dBV", "-35dBV"]

- id: output_volume
  label: Output Volume
  type: integer
  range: [0, 100]

- id: output_mute
  label: Output Mute
  type: enum
  values: [on, off]

- id: output_delay
  label: Output Delay
  type: integer
  unit: ms
  range: [0, 50]

- id: input_eq_preset
  label: Input EQ Preset
  type: enum
  values: [Flat, Custom1, Custom2]

- id: input_eq_state
  label: Input EQ On/Off
  type: enum
  values: [on, off]

- id: input_eq_stereo
  label: Input EQ Stereo Mode
  type: enum
  values: [on, off]

- id: output_eq_preset
  label: Output EQ Preset
  type: enum
  values: [Flat, Custom1, Custom2]

- id: output_eq_state
  label: Output EQ On/Off
  type: enum
  values: [on, off]

- id: output_eq_stereo
  label: Output EQ Stereo Mode
  type: enum
  values: [on, off]

- id: device_type
  label: Device Model
  type: string

- id: device_status
  label: Full Device Status
  type: object
  description: "Returns status table including power, standby, auto standby, baud, inputs, outputs, TCP/IP, Telnet, MAC addresses, and network configuration."

- id: fw_version
  label: Firmware Versions
  type: object
  description: "Returns Web, MCU, and DEP firmware versions."

- id: auto_stby_time
  label: Auto Standby Time
  type: integer
  unit: minutes

- id: ip_config
  label: IP Configuration
  type: object
  description: "Returns TCP/IP port, Telnet port, primary and secondary IP configuration, and MAC addresses."

- id: primary_mac
  label: Primary MAC Address
  type: string

- id: secondary_mac
  label: Secondary MAC Address
  type: string

- id: primary_ip_mode
  label: Primary IP Mode
  type: enum
  values: [static, dhcp]

- id: secondary_ip_mode
  label: Secondary IP Mode
  type: enum
  values: [static, dhcp]

- id: primary_ip_address
  label: Primary IP Address
  type: string

- id: secondary_ip_address
  label: Secondary IP Address
  type: string

- id: primary_subnet
  label: Primary Subnet Mask
  type: string

- id: secondary_subnet
  label: Secondary Subnet Mask
  type: string

- id: primary_gateway
  label: Primary Gateway
  type: string

- id: secondary_gateway
  label: Secondary Gateway
  type: string

- id: tcp_port
  label: TCP/IP Port
  type: integer

- id: telnet_port
  label: Telnet Port
  type: integer

- id: admin_password
  label: Admin Password
  type: string

- id: user_password
  label: User Password
  type: string
```

## Variables
```yaml
# No separate settable variables documented; parameters exposed through actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - reset_settings
  - reset_all
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures described in source.
```

## Notes

- ASCII command control requires TCP/IP port 8000 according to source.
- Source status table reports Telnet port `0023` and configurable Telnet default `23`.
- Network address, subnet, gateway, and IP-mode changes require `set net reboot` or repowering device to apply.
- Static network settings require DHCP to be disabled first.
- Preset save, recall, and clear exclude network settings.
- Reset commands require typing `"Yes"` after confirmation prompt; `"No"` discards reset.
- Source status table reports baud `115200`, but source does not document a serial command API or serial transport configuration.

<!-- UNRESOLVED: firmware compatibility range not stated. -->
<!-- UNRESOLVED: unsolicited event/callback behavior not stated. -->

## Provenance

```yaml
source_domains:
  - turtleav.com
source_urls:
  - https://turtleav.com/wp-content/uploads/2026/04/Mineola-2x2-User-Guide.pdf
retrieved_at: 2026-05-04T14:41:07.720Z
last_checked_at: 2026-07-22T01:34:50.393Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:34:50.393Z
matched_actions: 93
action_count: 93
confidence: medium
summary: "All 93 spec actions match distinct source command-code rows one-to-one with correct params/ranges; transport port 8000 and telnet 23 confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source identifies model as XLR22 and product as Mineola 2x2; exact commercial naming relationship is not clarified."
- "No unsolicited event mechanism is documented."
- "no unsolicited event notifications described in source."
- "no explicit multi-step macro sequences described in source."
- "no safety warnings or interlock procedures described in source."
- "firmware compatibility range not stated."
- "unsolicited event/callback behavior not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
