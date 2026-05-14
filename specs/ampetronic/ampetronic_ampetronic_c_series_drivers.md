---
spec_id: admin/ampetronic-c-series-drivers
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ampetronic C Series Drivers Control Spec"
manufacturer: Ampetronic
model_family: "C Series"
aliases: []
compatible_with:
  manufacturers:
    - Ampetronic
  models:
    - "C Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ampetronic.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP39808-4-C-Series-Protocol-Guide.pdf
retrieved_at: 2026-04-30T04:36:26.602Z
last_checked_at: 2026-04-30T09:30:14.169Z
generated_at: 2026-04-30T09:30:14.169Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:30:14.169Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions matched verbatim in source; transport parameters (port 9760, auth password, SNMP v1/v2c/v3) confirmed; complete command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Ampetronic C Series Drivers Control Spec

## Summary
Ampetronic C Series Hearing Loop Drivers support remote control and monitoring via Telnet (TCP/IP) and SNMP. Telnet runs on port 9760. Authentication via web interface credentials required (login=username&password). SNMPv1, V2C, and V3 supported with configurable community strings and user auth. Driver firmware v1.6.0+ required for multi-SNMP-version support.

<!-- UNRESOLVED: specific model variants (single/dual channel) affect command availability -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9760
auth:
  type: password  # inferred: login required, web interface credentials used
  notes: Telnet interface requires same authentication as web interface. Send login=username&password to authenticate.
snmp:
  versions:
    - v1
    - v2c
    - v3
  default_community_read: public
  default_community_write: private
  # UNRESOLVED: default SNMPv3 credentials not confirmed; source specifies "ampetronic" as example but not as mandatory default
```

## Traits
```yaml
- powerable       # inferred: sleep, standby, power-on commands present
- routable        # inferred: multi-input routing (inp1, inp2, inp3) present
- queryable       # inferred: reading commands (mac, ip, temp, errs, etc.) present
- levelable       # inferred: current drive level, input gain, ducking level, MLC slope commands present
```

## Actions
```yaml
# Authentication
- id: login
  label: Login
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string
  notes: Send login=username&password at session start. Case sensitive.

- id: logout
  label: Logout
  kind: action
  params: []

# Drive & Input
- id: cur
  label: Set Current Drive Level
  kind: action
  params:
    - name: value
      type: number
      description: Current drive level in dB (-80 to 0)

- id: curo
  label: Set Current Offset
  kind: action
  params:
    - name: value
      type: number
      description: Offset in dB (-11 to +11). Dual channel drivers only. Values beyond +/-10 disable respective channel.

- id: inp1
  label: Set Input 1 Gain
  kind: action
  params:
    - name: value
      type: number
      description: Input 1 gain in dB (-80 to 0)

- id: lowcf1
  label: Set Low Cut Filter Input 1
  kind: action
  params:
    - name: value
      type: enum
      values:
        - en
        - dis

- id: inp2
  label: Set Input 2 Gain
  kind: action
  params:
    - name: value
      type: number
      description: Input 2 gain in dB (-80 to 0)

- id: lowcf2
  label: Set Low Cut Filter Input 2
  kind: action
  params:
    - name: value
      type: enum
      values:
        - en
        - dis

- id: in2p
  label: Set Priority Option Input 2
  kind: action
  params:
    - name: value
      type: enum
      values:
        - en
        - dis

- id: in2d
  label: Set Ducking Level
  kind: action
  params:
    - name: value
      type: number
      description: Ducking level in dB (-80 to 0)

- id: inp3
  label: Set Input 3 Gain
  kind: action
  params:
    - name: value
      type: number
      description: Input 3 gain in dB (-80 to 0). Dante enabled drivers only.

# Test & MLC
- id: tfrq
  label: Set Test Sine Wave Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: Frequency in Hz (100 to 5000)

- id: tsts
  label: Set Test Signal
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "Off"
        - "Combi10"
        - "Combi16"
        - "Combi25"
        - "Pink"
        - "Sine"

- id: mlc1
  label: Set MLC Slope Level 1
  kind: action
  params:
    - name: value
      type: number
      description: MLC slope level in dB/Octave (0.0 to 4.0)

- id: mlcf
  label: Set MLC Mid Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: MLC mid frequency in Hz (200 to 5000)

- id: mlc2
  label: Set MLC Slope Level 2
  kind: action
  params:
    - name: value
      type: number
      description: MLC slope level in dB/Octave (0.0 to 4.0)

- id: mlcq
  label: Set MLC Response Preset
  kind: action
  params:
    - name: value
      type: integer
      description: "MLC preset: 0=custom, 1=off, 2-17=fixed slopes in 0.25dB/Octave steps"

- id: mlch
  label: Set MLC HF Boost
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "end"
        - "dis"

- id: phse
  label: Set Phase Shift Channel B
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
  notes: Dual channel drivers only. "0" = no phase shift, "1" = channel B shifted by 90 degrees.

- id: phseA
  label: Set Phase Shift Channel A
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
  notes: Single channel drivers only.

# Power & Network
- id: slp
  label: Set Sleep Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "off"
        - "10"
        - "30"
        - "60"
  description: "Wait time (seconds) after no audio signal before entering sleep mode: off, 10, 30, or 60"

- id: stnd
  label: Set Standby Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"

- id: setip
  label: Set IP Address
  kind: action
  params:
    - name: value
      type: string
      description: IPv4 address (XXX.XXX.XXX.XXX). Use when DHCP is disabled.

- id: setgw
  label: Set Gateway Address
  kind: action
  params:
    - name: value
      type: string
      description: Gateway address. Use when DHCP is disabled.

- id: setmask
  label: Set Subnet Mask
  kind: action
  params:
    - name: value
      type: string
      description: Subnet mask. Use when DHCP is disabled.

- id: setdns1
  label: Set Primary DNS
  kind: action
  params:
    - name: value
      type: string
      description: Primary DNS address. Use when DHCP is disabled.

- id: setdns2
  label: Set Secondary DNS
  kind: action
  params:
    - name: value
      type: string
      description: Secondary DNS address. Use when DHCP is disabled.

- id: dhcp_option61
  label: Set DHCP Option 61
  kind: action
  params:
    - name: value
      type: string
      description: '"en" enables, "dis" disables, "en&id" enables with client ID, "dis&id" disables with client ID. Client ID max 12 characters.'

- id: mail
  label: Set Reporting Email Address
  kind: action
  params:
    - name: value
      type: string
      description: Email address string, format mail=email

- id: erlc
  label: Enable/Disable Email on Error
  kind: action
  params:
    - name: value
      type: boolean
      description: '"true" enables email errors, "false" disables'

- id: itlc
  label: Set Status Email Interval
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "off"
        - "6h"
        - "12h"
        - "24h"
        - "48h"
        - "4d"
        - "1w"
        - "2w"
        - "4w"

- id: dco
  label: Control DC Output
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "on"
        - "off"
        - "onf"
        - "offf"
  description: '"on"=DC on, "off"=DC off, "onf"=DC on if fault, "offf"=DC off if fault'

- id: snmp
  label: Enable/Disable SNMP
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"

- id: freset
  label: Factory Reset
  kind: action
  params: []
  notes: Resets unit to factory settings including user passwords. Superadmin only.

# Error Reporting (settable - also support =val query)
- id: pwlc
  label: Enable/Disable Power On Email Reporting
  kind: action
  params:
    - name: value
      type: boolean
      description: '"true" enables, "false" disables'

- id: PowerOnSnmp
  label: Enable/Disable Power On SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipEmail
  label: Channel A Clipping Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipRelay
  label: Channel A Clipping Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipSnmp
  label: Channel A Clipping SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipAttenEmail
  label: Channel A Clipping Attenuation Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipAttenRelay
  label: Channel A Clipping Attenuation Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAClipAttenSnmp
  label: Channel A Clipping Attenuation SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAOpenLpEmail
  label: Channel A Open Loop Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAOpenLpRelay
  label: Channel A Open Loop Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: ChAOpenLpSnmp
  label: Channel A Open Loop SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotDeratedEmail
  label: Amp Too Hot Derated Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotDeratedRelay
  label: Amp Too Hot Derated Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotDeratedSnmp
  label: Amp Too Hot Derated SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotMutedEmail
  label: Amp Too Hot Muted Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotMutedRelay
  label: Amp Too Hot Muted Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: AmpHotMutedSnmp
  label: Amp Too Hot Muted SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverDeratedEmail
  label: Transformer Overload Derated Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverDeratedRelay
  label: Transformer Overload Derated Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverDeratedSnmp
  label: Transformer Overload Derated SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverMutedEmail
  label: Transformer Overload Muted Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverMutedRelay
  label: Transformer Overload Muted Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverMutedSnmp
  label: Transformer Overload Muted SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverShutdownEmail
  label: Transformer Overload Shutdown Email Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverShutdownRelay
  label: Transformer Overload Shutdown Relay Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"

- id: TransOverShutdownSnmp
  label: Transformer Overload Shutdown SNMP Reporting
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "en"
        - "dis"
        - "val"
```

## Feedbacks
```yaml
# Reading commands return current values - these double as both reading and reporting actions
# Error reporting commands also return current value when followed by =val
# Variables capture the continuous monitoring responses

- id: mac
  label: MAC Address
  type: string
  description: MAC address of the unit

- id: ip
  label: IP Address
  type: string
  description: IP address in format XXX.XXX.XXX.XXX

- id: dns1
  label: Primary DNS Address
  type: string

- id: dns2
  label: Secondary DNS Address
  type: string

- id: gw
  label: Gateway Address
  type: string

- id: msk
  label: Subnet Mask
  type: string

- id: dhcp_option61
  label: DHCP Option 61 Status
  type: string
  description: Current settings (enabled/disabled state and client ID)

- id: disA
  label: Displayed Peak Current Channel A
  type: number
  description: "Instantaneous peak current on channel A. Full rated current = 1."

- id: disB
  label: Displayed Peak Current Channel B
  type: number
  description: "Instantaneous peak current on channel B (dual channel drivers only). Full rated current = 1."

- id: comp
  label: Compression Level
  type: number
  description: Compression level in dB (instantaneous value)

- id: pwri
  label: Input Current
  type: number
  description: Input current from transformer in Amps

- id: lpra
  label: Loop A Resistance
  type: number
  description: Loop A resistance as measured at last power cycle (Ohms)

- id: lpla
  label: Loop A Inductance
  type: number
  description: Loop A inductance as measured at last power cycle (Henries)

- id: lprb
  label: Loop B Resistance
  type: number
  description: Loop B resistance as measured at last power cycle (dual channel drivers only)

- id: lplb
  label: Loop B Inductance
  type: number
  description: Loop B inductance as measured at last power cycle (dual channel drivers only)

- id: temp
  label: Heatsink Temperature
  type: number
  description: Heatsink temperature in Celsius

- id: errs
  label: Active Errors
  type: string
  description: List of currently active errors

- id: id
  label: Driver Type
  type: string
  description: Returns driver type identifier
```

## Events
```yaml
# SNMP traps sent to registered managers on status change or error
- id: trap_fatal_firmware_error
  label: Fatal Firmware Error
  trap_number: 0

- id: trap_ChA_clipping
  label: Channel A Clipping
  trap_number: 1

- id: trap_ChB_clipping
  label: Channel B Clipping
  trap_number: 2

- id: trap_ChA_clipping_attenuation
  label: Channel A Clipping Attenuation
  trap_number: 3

- id: trap_ChB_clipping_attenuation
  label: Channel B Clipping Attenuation
  trap_number: 4

- id: trap_ChA_open_loop
  label: Channel A Open Loop
  trap_number: 5

- id: trap_ChB_open_loop
  label: Channel B Open Loop
  trap_number: 6

- id: trap_amp_too_hot_muted
  label: Amplifier Too Hot Muted
  trap_number: 9

- id: trap_amp_too_hot_derated
  label: Amplifier Too Hot Derated
  trap_number: 10

- id: trap_trans_overload_muted
  label: Transformer Overload Muted
  trap_number: 11

- id: trap_trans_overload_derated
  label: Transformer Overload Derated
  trap_number: 12

- id: trap_trans_overload_shutdown
  label: Transformer Overload Shutdown
  trap_number: 13

- id: trap_heatsink_too_hot
  label: Heat Sink Too Hot
  trap_number: 14

- id: trap_loopA_overcurrent
  label: Loop A Overcurrent
  trap_number: 15

- id: trap_loopB_overcurrent
  label: Loop B Overcurrent
  trap_number: 16

- id: trap_loopA_cross_wired
  label: Loop A Cross Wired
  trap_number: 17

- id: trap_loopB_cross_wired
  label: Loop B Cross Wired
  trap_number: 18

- id: trap_loopA_resistance_too_small
  label: Loop A Resistance Too Small
  trap_number: 19

- id: trap_loopB_resistance_too_small
  label: Loop B Resistance Too Small
  trap_number: 20

- id: trap_power_on
  label: Power On
  trap_number: 21

# OID for traps: 1.3.6.1.4.1.48943.0.n where n is trap_number
# A custom MIB is available to download for textual trap descriptions
```

## Safety
```yaml
confirmation_required_for:
  - freset  # Factory reset clears user passwords; superadmin only
interlocks: []
# UNRESOLVED: no explicit interlock procedure stated in source for power-on sequencing
# Note: Heat Sink Too Hot errors cannot be configured out; trap always fires if SNMP enabled when condition occurs
```

## Notes
- Telnet commands are case sensitive and must use exact strings as documented.
- Commands do not contain spaces; format is `command=value` with return key to execute.
- Setting commands without a value act as queries when followed by `=val`.
- Error reporting commands support enable/disable/query and mirror across both channels on dual-channel drivers (enabling channel A automatically enables channel B).
- SNMP is disabled by default; enable via web interface before use.
- Telnet is disabled by default; enable via web interface before use.
- V3 is default SNMP mode for firmware v1.6.0+ unless upgrading (V1/V2C retained for backward compatibility).
- SNMP Engine ID format: 80 00 BF 2F 80 <MAC Address>.
- SNMPv3 user: 8-32 characters alphanumeric plus @$!%*#?-_{}([]). Auth password 8-32 chars. Privacy password 8-32 chars.
- SNMPv3 defaults to authPriv with MD5/SHA1-96 (auth) and AES-128 (privacy) when not explicitly configured.
- SNMP community strings for V1/V2C: "public" (read), "private" (write).
- SNMP traps limited to 16 registered managers; configurable via web interface.
- A custom MIB is available for download to provide textual trap descriptions via SNMP manager.
- Input 3 (inp3) Dante functionality requires Dante-enabled driver hardware.
- Dual channel commands (phse, curo, disB, lprb, lplb) not available on single channel models.
<!-- UNRESOLVED: specific model numbers for C Series variants (e.g., C5-1, C7-2, etc.) -->
<!-- UNRESOLVED: voltage/current/power specifications not present in source -->
<!-- UNRESOLVED: firmware version compatibility beyond v1.6.0 for SNMP v3 not stated -->
<!-- UNRESOLVED: fault recovery sequences and error handling behavior not documented -->

## Provenance

```yaml
source_domains:
  - ampetronic.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP39808-4-C-Series-Protocol-Guide.pdf
retrieved_at: 2026-04-30T04:36:26.602Z
last_checked_at: 2026-04-30T09:30:14.169Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:30:14.169Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions matched verbatim in source; transport parameters (port 9760, auth password, SNMP v1/v2c/v3) confirmed; complete command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
