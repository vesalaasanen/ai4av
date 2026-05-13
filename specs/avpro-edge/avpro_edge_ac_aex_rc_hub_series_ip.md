---
spec_id: admin/avpro-edge-ac-aex-rc-hub-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVPro Edge AC-AEX-RC-HUB Series Control Spec"
manufacturer: "AVPro Edge"
model_family: "AC-AEX-RC-HUB Series"
aliases: []
compatible_with:
  manufacturers:
    - "AVPro Edge"
  models:
    - "AC-AEX-RC-HUB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
retrieved_at: 2026-05-04T18:01:29.430Z
last_checked_at: 2026-04-22T19:45:04.556Z
generated_at: 2026-04-22T19:45:04.556Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-22T19:45:04.556Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions match literal command tokens in the source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# AVPro Edge AC-AEX-RC-HUB Series Control Spec

## Summary
AVPro Edge AC-AEX-RC-HUB is an audio control hub supporting both RS-232 and TCP/IP (Telnet) control interfaces. This spec covers 12-channel audio input/output routing, volume control, EQ modes, and network configuration via command strings.

<!-- UNRESOLVED: power-on sequencing, interlock procedures, error recovery sequences not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP Telnet port stated in source
serial:
  baud_rate: 57600  # stated in source
  data_bits: 8      # stated in source
  parity: none      # stated in source
  stop_bits: 1      # stated in source
  flow_control: none  # stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: system reset/reboot commands present
- queryable    # inferred: GET commands returning status, config, baudrate
- routable     # inferred: SET OUTx AS INy routing commands
- levelable    # inferred: volume, balance, EQ commands present
```

## Actions
```yaml
- id: help
  label: Help
  kind: action
  params: []
- id: show_status
  label: Show Global System Status
  kind: action
  params: []
- id: factory_reset
  label: Reset to Factory Defaults
  kind: action
  params: []
- id: system_reboot
  label: System Reboot
  kind: action
  params: []
- id: lan_mcu_reset
  label: LAN MCU Reset to Reboot
  kind: action
  params: []
- id: set_addr
  label: Set System Address
  kind: action
  params:
    - name: xx
      type: integer
      description: Address 00-99 (00=single)
- id: set_baudr
  label: Set System Baudrate
  kind: action
  params:
    - name: x
      type: integer
      description: "0=9600, 1=14400, 2=19200, 3=38400, 4=57600, 5=115200"
- id: set_in_en
  label: Set Audio Input Enable/Disable
  kind: action
  params:
    - name: x
      type: integer
      description: Input 0-12 (0=all)
    - name: state
      type: enum
      values: [EN, DIS]
- id: set_in_vol
  label: Set Audio Input Volume
  kind: action
  params:
    - name: x
      type: integer
      description: Input 0-12 (0=all)
    - name: y
      type: integer
      description: Volume -50 to +50
- id: set_out_en
  label: Set Audio Output Enable/Disable
  kind: action
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
    - name: state
      type: enum
      values: [EN, DIS]
- id: set_out_as_in
  label: Set Audio Output to Input
  kind: action
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
    - name: y
      type: integer
      description: Input 1-12
- id: set_out_follow
  label: Set Audio Output Follow Mode
  kind: action
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all, excluding self)
    - name: y
      type: integer
      description: Follow Mode 0=None, 1=Source, 2=Volume, 3=Source+Volume
    - name: outz
      type: integer
      description: Output to follow (if Follow Mode != 0)
- id: set_out_mute
  label: Set Audio Output Mute/Unmute
  kind: action
  params:
    - name: x
      type: integer
      description: Output 1-12 (0=all)
    - name: state
      type: enum
      values: [MUTE, UNMUTE]
- id: set_out_vol
  label: Set Output Volume Level
  kind: action
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
    - name: y
      type: integer
      description: Volume 0-100
- id: set_out_vol_inc
  label: Increase Output Volume
  kind: action
  params:
    - name: x
      type: integer
      description: Output 1-12
    - name: y
      type: integer
      description: Increment 1-100 (optional default 1)
- id: set_out_vol_dec
  label: Decrease Output Volume
  kind: action
  params:
    - name: x
      type: integer
      description: Output 1-12
    - name: y
      type: integer
      description: Decrement 1-100 (optional default 1)
- id: set_out_bal_inc
  label: Increase Output Balance
  kind: action
  params:
    - name: x
      type: integer
      description: Output 1-12
    - name: y
      type: integer
      description: Increment 1-100 (optional default 1)
- id: set_out_bal_dec
  label: Decrease Output Balance
  kind: action
  params:
    - name: x
      type: integer
      description: Output 1-12
    - name: y
      type: integer
      description: Decrement 1-100 (optional default 1)
- id: set_out_eq
  label: Set Output EQ Mode
  kind: action
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
    - name: y
      type: integer
      description: "EQ Mode: 0=Off, 1=Classical, 2=Headphone, 3=Hall, 4=Live, 5=Pop, 6=Rock, 7=Vocal"
- id: set_rip
  label: Set Route IP Address
  kind: action
  params:
    - name: xxx
      type: string
      description: IP address xxx.xxx.xxx.xxx
- id: set_hip
  label: Set Host IP Address
  kind: action
  params:
    - name: xxx
      type: string
      description: IP address xxx.xxx.xxx.xxx
- id: set_nmk
  label: Set Net Mask
  kind: action
  params:
    - name: xxx
      type: string
      description: Net mask xxx.xxx.xxx.xxx
- id: set_tip
  label: Set TCP/IP Port
  kind: action
  params:
    - name: zzzz
      type: integer
      description: Port 0001-9999
- id: set_dhcp
  label: Set DHCP Enable/Disable
  kind: action
  params:
    - name: y
      type: integer
      description: "0=Disable, 1=Enable"
```

## Feedbacks
```yaml
- id: addr_status
  label: Get System Address
  kind: feedback
  returns:
    type: string
- id: sta_status
  label: Get System Status
  kind: feedback
  returns:
    type: string
- id: config_status
  label: Get System Configuration
  kind: feedback
  returns:
    type: string
- id: baudr_status
  label: Get System Baudrate
  kind: feedback
  returns:
    type: integer
- id: in_en_status
  label: Get Audio Input Enable/Disable
  kind: feedback
  params:
    - name: x
      type: integer
      description: Input 0-12 (0=all)
  returns:
    type: string
- id: in_vol_status
  label: Get Audio Input Volume
  kind: feedback
  params:
    - name: x
      type: integer
      description: Input 0-12 (0=all)
  returns:
    type: integer
- id: in_sig_status
  label: Get Input Signal Status
  kind: feedback
  params:
    - name: x
      type: integer
      description: Input 0-12 (0=all)
  returns:
    type: string
- id: out_en_status
  label: Get Audio Output Enable/Disable
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: string
- id: out_as_status
  label: Get Output Audio Route
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: string
- id: out_follow_status
  label: Get Audio Output Follow Settings
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all, excluding self)
  returns:
    type: string
- id: out_mute_status
  label: Get Audio Output Mute/Unmute
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: string
- id: out_vol_status
  label: Get Output Volume Level
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: integer
- id: out_eq_status
  label: Get Output EQ Mode
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: integer
- id: out_bal_status
  label: Get Output Balance
  kind: feedback
  params:
    - name: x
      type: integer
      description: Output 0-12 (0=all)
  returns:
    type: integer
    description: "Range 0-20, Left=0, Right=20, Balanced=10"
- id: rip_status
  label: Get Route IP Address
  kind: feedback
  returns:
    type: string
- id: hip_status
  label: Get Host IP Address
  kind: feedback
  returns:
    type: string
- id: nmk_status
  label: Get Net Mask
  kind: feedback
  returns:
    type: string
- id: tip_status
  label: Get TCP/IP Port
  kind: feedback
  returns:
    type: integer
- id: dhcp_status
  label: Get DHCP Status
  kind: feedback
  returns:
    type: integer
- id: mac_status
  label: Get MAC Address
  kind: feedback
  returns:
    type: string
```

## Variables
```yaml
# No discrete variable section applicable; all parameters are action/feedback pairs
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event format described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
RS-232 uses 3-pin terminal block to DB9 (pins 2, 3, 5 only). Null modem cable required. Commands require carriage return (Enter key) after each command.

<!-- UNRESOLVED: firmware version compatibility, fault behavior, error recovery sequences not stated in source -->

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
retrieved_at: 2026-05-04T18:01:29.430Z
last_checked_at: 2026-04-22T19:45:04.556Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T19:45:04.556Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions match literal command tokens in the source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
