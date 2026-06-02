---
spec_id: admin/ampetronic-c-series-drivers
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ampetronic C-Series Hearing Loop Drivers Control Spec"
manufacturer: Ampetronic
model_family: "C-Series Hearing Loop Drivers"
aliases: []
compatible_with:
  manufacturers:
    - Ampetronic
  models:
    - "C-Series Hearing Loop Drivers"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ampetronic.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP39808-4-C-Series-Protocol-Guide.pdf
retrieved_at: 2026-04-30T04:36:26.602Z
last_checked_at: 2026-06-02T21:39:39.690Z
generated_at: 2026-06-02T21:39:39.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; SNMP v1.6.0+ mentioned only for multi-version feature"
  - "no explicit multi-step sequences described in source."
  - "no explicit safety warnings or interlock procedures described in source."
  - "firmware version compatibility not stated in source; firmware v1.6.0+ mentioned only as threshold for multi-version SNMP. Exact C-Series model variants and their feature support (e.g. which support inp3/Dante, which are dual channel) not enumerated in the protocol document."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:39.690Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions matched literal Telnet commands in source; transport parameters (port 9760, login format) verified; no missing or extra commands. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Ampetronic C-Series Hearing Loop Drivers Control Spec

## Summary
C-Series Hearing Loop Drivers expose Telnet (port 9760) and SNMP for remote control and monitoring. Telnet uses a case-sensitive `command=value` syntax terminated by return; SNMP offers V1/V2C/V3 with traps under enterprise OID 1.3.6.1.4.1.48943.

<!-- UNRESOLVED: firmware version compatibility not stated; SNMP v1.6.0+ mentioned only for multi-version feature -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9760
auth:
  type: password
  # Source: "The Telnet interface requires the same authentication as the web interface to access relevant commands. To authenticate at the start of a session send the command login=username&password."
  login_command: "login={username}&{password}"  # exact format from source
```

## Traits
```yaml
# - levelable       (cur, curo, inp1, inp2, inp3, in2d, mlc1, mlc2, mlcq gain/slope settings)
# - queryable       (mac, ip, disA, disB, comp, pwri, lpra, lpla, lprb, lplb, temp, errs, id)
# - powerable       # inferred from stnd (standby), slp (sleep), dco (12V DC output) commands
```

## Actions
```yaml
# === Telnet: Authentication ===
- id: login
  label: Login
  kind: action
  command: "login={username}&{password}"
  params:
    - name: username
      type: string
    - name: password
      type: string
  notes: "Required before any other command. Source: 'login=username&password'."

- id: logout
  label: Logout
  kind: action
  command: "logout"
  params: []

# === Telnet: Audio / drive level ===
- id: cur
  label: Set current drive level
  kind: action
  command: "cur={value}"
  params:
    - name: value
      type: number
      description: "Current drive level in dB. Range -80 to 0. Source example: cur=-20, cur=-4.3"

- id: curo
  label: Set current offset (channel A vs B)
  kind: action
  command: "curo={value}"
  params:
    - name: value
      type: integer
      description: "Channel offset in dB. Range -11 to +11. Values beyond +/-10 disable respective channel (dual channel drivers only)."

# === Telnet: Input gain & filters ===
- id: inp1
  label: Set input 1 gain
  kind: action
  command: "inp1={value}"
  params:
    - name: value
      type: number
      description: "Input 1 gain in dB. Range -80 to 0."

- id: lowcf1
  label: Enable/disable low cut filter for input 1
  kind: action
  command: "lowcf1={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]

- id: inp2
  label: Set input 2 gain
  kind: action
  command: "inp2={value}"
  params:
    - name: value
      type: number
      description: "Input 2 gain in dB. Range -80 to 0."

- id: lowcf2
  label: Enable/disable low cut filter for input 2
  kind: action
  command: "lowcf2={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]

- id: in2p
  label: Enable/disable priority option for input 2
  kind: action
  command: "in2p={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]

- id: in2d
  label: Set ducking level for input 2
  kind: action
  command: "in2d={value}"
  params:
    - name: value
      type: number
      description: "Ducking level in dB. Range -80 to 0."

- id: inp3
  label: Set input 3 gain (Dante-enabled drivers only)
  kind: action
  command: "inp3={value}"
  params:
    - name: value
      type: number
      description: "Input 3 gain in dB. Range -80 to 0."

# === Telnet: Test signal ===
- id: tfrq
  label: Set test sine wave frequency
  kind: action
  command: "tfrq={value}"
  params:
    - name: value
      type: integer
      description: "Test sine wave frequency in Hz. Range 100 to 5000."

- id: tsts
  label: Set test signal
  kind: action
  command: "tsts={value}"
  params:
    - name: value
      type: enum
      values: [Off, Combi10, Combi16, Combi25, Pink, Sine]

# === Telnet: MLC (Metal Loss Compensation) ===
- id: mlc1
  label: Set first MLC slope level
  kind: action
  command: "mlc1={value}"
  params:
    - name: value
      type: number
      description: "First MLC slope in dB/Octave. Range 0.0 to 4.0."

- id: mlcf
  label: Set MLC mid frequency
  kind: action
  command: "mlcf={value}"
  params:
    - name: value
      type: integer
      description: "MLC mid frequency in Hz. Range 200 to 5000."

- id: mlc2
  label: Set second MLC slope level
  kind: action
  command: "mlc2={value}"
  params:
    - name: value
      type: number
      description: "Second MLC slope in dB/Octave. Range 0.0 to 4.0."

- id: mlcq
  label: Use preset MLC response
  kind: action
  command: "mlcq={value}"
  params:
    - name: value
      type: integer
      description: "0=custom, 1=off, 2-17=fixed slopes in 0.25 dB/Octave steps."

- id: mlch
  label: Enable/disable MLC HF Boost on fixed slope
  kind: action
  command: "mlch={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]

# === Telnet: Phase ===
- id: phse
  label: Set phase shift on channel B (dual channel drivers)
  kind: action
  command: "phse={value}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0=no phase shift, 1=channel B shifted by 90 degrees."

- id: phseA
  label: Set phase shift on channel A (single channel drivers)
  kind: action
  command: "phseA={value}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0=no phase shift, 1=channel A shifted by 90 degrees."

# === Telnet: Power state ===
- id: slp
  label: Set sleep delay
  kind: action
  command: "slp={value}"
  params:
    - name: value
      type: enum
      values: [off, "10", "30", "60"]
      description: "Seconds of no audio before entering sleep mode."

- id: stnd
  label: Set standby mode
  kind: action
  command: "stnd={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]
      description: "en=enter standby, dis=leave standby."

# === Telnet: Network configuration ===
- id: setip
  label: Set static IP address (when DHCP disabled)
  kind: action
  command: "setip={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string
      description: "IPv4 address in dotted-quad format."

- id: setgw
  label: Set gateway address (when DHCP disabled)
  kind: action
  command: "setgw={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string

- id: setmask
  label: Set subnet mask (when DHCP disabled)
  kind: action
  command: "setmask={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string

- id: setdns1
  label: Set primary DNS (when DHCP disabled)
  kind: action
  command: "setdns1={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string

- id: setdns2
  label: Set secondary DNS (when DHCP disabled)
  kind: action
  command: "setdns2={xxx.xxx.xxx.xxx}"
  params:
    - name: address
      type: string

- id: dhcp_option61
  label: Configure DHCP option 61
  kind: action
  command: "dhcp_option61={value}"
  params:
    - name: value
      type: string
      description: "en|dis|en[&id]|dis[&id]. Client ID max 12 characters."

# === Telnet: Email & status reporting ===
- id: mail
  label: Set reporting email address
  kind: action
  command: "mail={email}"
  params:
    - name: email
      type: string

- id: erlc
  label: Enable/disable emails on error conditions
  kind: action
  command: "erlc={value}"
  params:
    - name: value
      type: enum
      values: ["true", "false"]

- id: itlc
  label: Set status email interval
  kind: action
  command: "itlc={value}"
  params:
    - name: value
      type: enum
      values: [off, 6h, 12h, 24h, 48h, 4d, 1w, 2w, 4w]

- id: dco
  label: Control 12V DC output
  kind: action
  command: "dco={value}"
  params:
    - name: value
      type: enum
      values: [on, off, onf, offf]
      description: "on/off=force state, onf/offf=state on fault condition."

- id: snmp
  label: Enable/disable SNMP
  kind: action
  command: "snmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis]

- id: freset
  label: Factory reset (superadmin only)
  kind: action
  command: "freset"
  params: []
  notes: "Resets unit to factory settings including user passwords."

# === Telnet: Error reporting (email/relay/SNMP per error) ===
# These commands double as readers when sent with =val suffix.
- id: pwlc
  label: Power-on reporting over email
  kind: action
  command: "pwlc={value}"
  params:
    - name: value
      type: enum
      values: ["true", "false", val]
      description: "val returns current value."

- id: PowerOnSnmp
  label: Power-on reporting over SNMP
  kind: action
  command: "PowerOnSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipEmail
  label: Channel A clipping error reporting over email
  kind: action
  command: "ChAClipEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipRelay
  label: Channel A clipping error reporting over DC out/relay
  kind: action
  command: "ChAClipRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipSnmp
  label: Channel A clipping error reporting over SNMP
  kind: action
  command: "ChAClipSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipAttenEmail
  label: Channel A clipping attenuation reporting over email
  kind: action
  command: "ChAClipAttenEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipAttenRelay
  label: Channel A clipping attenuation reporting over DC out/relay
  kind: action
  command: "ChAClipAttenRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAClipAttenSnmp
  label: Channel A clipping attenuation reporting over SNMP
  kind: action
  command: "ChAClipAttenSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAOpenLpEmail
  label: Channel A open loop error reporting over email
  kind: action
  command: "ChAOpenLpEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAOpenLpRelay
  label: Channel A open loop error reporting over DC out/relay
  kind: action
  command: "ChAOpenLpRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: ChAOpenLpSnmp
  label: Channel A open loop error reporting over SNMP
  kind: action
  command: "ChAOpenLpSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotDeratedEmail
  label: Amplifier too hot derated reporting over email
  kind: action
  command: "AmpHotDeratedEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotDeratedRelay
  label: Amplifier too hot derated reporting over DC out/relay
  kind: action
  command: "AmpHotDeratedRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotDeratedSnmp
  label: Amplifier too hot derated reporting over SNMP
  kind: action
  command: "AmpHotDeratedSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotMutedEmail
  label: Amplifier too hot muted reporting over email
  kind: action
  command: "AmpHotMutedEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotMutedRelay
  label: Amplifier too hot muted reporting over DC out/relay
  kind: action
  command: "AmpHotMutedRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: AmpHotMutedSnmp
  label: Amplifier too hot muted reporting over SNMP
  kind: action
  command: "AmpHotMutedSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverDeratedEmail
  label: Transformer overload derated reporting over email
  kind: action
  command: "TransOverDeratedEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverDeratedRelay
  label: Transformer overload derated reporting over DC out/relay
  kind: action
  command: "TransOverDeratedRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverDeratedSnmp
  label: Transformer overload derated reporting over SNMP
  kind: action
  command: "TransOverDeratedSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverMutedEmail
  label: Transformer overload muted reporting over email
  kind: action
  command: "TransOverMutedEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverMutedRelay
  label: Transformer overload muted reporting over DC out/relay
  kind: action
  command: "TransOverMutedRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverMutedSnmp
  label: Transformer overload muted reporting over SNMP
  kind: action
  command: "TransOverMutedSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverShutdownEmail
  label: Transformer overload shutdown reporting over email
  kind: action
  command: "TransOverShutdownEmail={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverShutdownRelay
  label: Transformer overload shutdown reporting over DC out/relay
  kind: action
  command: "TransOverShutdownRelay={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

- id: TransOverShutdownSnmp
  label: Transformer overload shutdown reporting over SNMP
  kind: action
  command: "TransOverShutdownSnmp={value}"
  params:
    - name: value
      type: enum
      values: [en, dis, val]

# === Telnet: Reading (state queries) ===
- id: query_mac
  label: Read MAC address
  kind: query
  command: "mac"
  params: []

- id: query_ip
  label: Read IP address
  kind: query
  command: "ip"
  params: []

- id: query_dns1
  label: Read primary DNS
  kind: query
  command: "dns1"
  params: []

- id: query_dns2
  label: Read secondary DNS
  kind: query
  command: "dns2"
  params: []

- id: query_gw
  label: Read gateway address
  kind: query
  command: "gw"
  params: []

- id: query_msk
  label: Read subnet mask
  kind: query
  command: "msk"
  params: []

- id: query_dhcp_option61
  label: Read DHCP option 61 settings
  kind: query
  command: "dhcp_option61"
  params: []

- id: query_disA
  label: Read displayed peak current on channel A
  kind: query
  command: "disA"
  params: []
  notes: "Full rated current is 1; instantaneous value."

- id: query_disB
  label: Read displayed peak current on channel B
  kind: query
  command: "disB"
  params: []
  notes: "Dual channel drivers only. Full rated current is 1; instantaneous value."

- id: query_comp
  label: Read compression level
  kind: query
  command: "comp"
  params: []
  notes: "Returned in dB; instantaneous value."

- id: query_pwri
  label: Read transformer input current
  kind: query
  command: "pwri"
  params: []
  notes: "Returned in Amps."

- id: query_lpra
  label: Read loop A resistance
  kind: query
  command: "lpra"
  params: []
  notes: "Measured at last power cycle."

- id: query_lpla
  label: Read loop A inductance
  kind: query
  command: "lpla"
  params: []
  notes: "Measured at last power cycle."

- id: query_lprb
  label: Read loop B resistance
  kind: query
  command: "lprb"
  params: []
  notes: "Dual channel drivers only; measured at last power cycle."

- id: query_lplb
  label: Read loop B inductance
  kind: query
  command: "lplb"
  params: []
  notes: "Dual channel drivers only; measured at last power cycle."

- id: query_temp
  label: Read heatsink temperature
  kind: query
  command: "temp"
  params: []
  notes: "Returned in Celsius."

- id: query_errs
  label: Read list of active errors
  kind: query
  command: "errs"
  params: []

- id: query_id
  label: Read driver type
  kind: query
  command: "id"
  params: []
```

## Feedbacks
```yaml
# Telnet: =val suffix on any Telnet Setting Command or Error Reporting Command returns current value.
# e.g. "ChAClipEmail=val" returns "Current value=en".
#
# SNMP trap OID: 1.3.6.1.4.1.48943.0.<n>
- id: power_state
  type: enum
  values: [on, off]
  notes: "Derived from SNMP trap #21 (Power On) and stnd (standby) state."

- id: mac_address
  type: string
  notes: "Source command: mac"

- id: ip_address
  type: string
  notes: "Source command: ip"

- id: subnet_mask
  type: string
  notes: "Source command: msk"

- id: gateway
  type: string
  notes: "Source command: gw"

- id: primary_dns
  type: string
  notes: "Source command: dns1"

- id: secondary_dns
  type: string
  notes: "Source command: dns2"

- id: driver_type
  type: string
  notes: "Source command: id"

- id: heatsink_temperature_c
  type: number
  notes: "Source command: temp; Celsius."

- id: channel_a_peak_current
  type: number
  notes: "Source command: disA; 1.0 = full rated current."

- id: channel_b_peak_current
  type: number
  notes: "Source command: disB; dual channel only."

- id: compression_level_db
  type: number
  notes: "Source command: comp; instantaneous dB."

- id: transformer_input_current_a
  type: number
  notes: "Source command: pwri; Amps."

- id: loop_a_resistance
  type: number
  notes: "Source command: lpra; measured at last power cycle."

- id: loop_a_inductance
  type: number
  notes: "Source command: lpla; measured at last power cycle."

- id: loop_b_resistance
  type: number
  notes: "Source command: lprb; dual channel only."

- id: loop_b_inductance
  type: number
  notes: "Source command: lplb; dual channel only."

- id: active_errors
  type: string
  notes: "Source command: errs; list of currently active errors."
```

## Variables
```yaml
# All settable numeric/enum parameters are already enumerated as parameterized actions
# in the Actions section. No additional variable-only entries are documented separately
# in the source.
```

## Events
```yaml
# SNMP traps are sent under OID 1.3.6.1.4.1.48943.0.<n>.
# Trap numbers from source:
- id: trap_fatal_firmware_error
  trap_oid_suffix: 0
  description: "Fatal Firmware Error"

- id: trap_chA_clipping
  trap_oid_suffix: 1
  description: "Channel A Clipping"

- id: trap_chB_clipping
  trap_oid_suffix: 2
  description: "Channel B Clipping"

- id: trap_chA_clipping_attenuation
  trap_oid_suffix: 3
  description: "Channel A Clipping Attenuation"

- id: trap_chB_clipping_attenuation
  trap_oid_suffix: 4
  description: "Channel B Clipping Attenuation"

- id: trap_chA_open_loop
  trap_oid_suffix: 5
  description: "Channel A Open Loop"

- id: trap_chB_open_loop
  trap_oid_suffix: 6
  description: "Channel B Open Loop"

- id: trap_amp_hot_muted
  trap_oid_suffix: 9
  description: "Amplifier Too Hot - Muted"

- id: trap_amp_hot_derated
  trap_oid_suffix: 10
  description: "Amplifier Too Hot - Derated"

- id: trap_trans_overload_muted
  trap_oid_suffix: 11
  description: "Transformer Overload - Muted"

- id: trap_trans_overload_derated
  trap_oid_suffix: 12
  description: "Transformer Overload - Derated"

- id: trap_trans_overload_shutdown
  trap_oid_suffix: 13
  description: "Transformer Overload - Shutdown"

- id: trap_heat_sink_too_hot
  trap_oid_suffix: 14
  description: "Heat Sink Too Hot (always reported if SNMP enabled)"

- id: trap_loopA_overcurrent
  trap_oid_suffix: 15
  description: "Loop A Overcurrent"

- id: trap_loopB_overcurrent
  trap_oid_suffix: 16
  description: "Loop B Overcurrent"

- id: trap_loopA_cross_wired
  trap_oid_suffix: 17
  description: "Loop A Cross Wired"

- id: trap_loopB_cross_wired
  trap_oid_suffix: 18
  description: "Loop B Cross Wired"

- id: trap_loopA_resistance_too_small
  trap_oid_suffix: 19
  description: "Loop A Resistance Too Small"

- id: trap_loopB_resistance_too_small
  trap_oid_suffix: 20
  description: "Loop B Resistance Too Small"

- id: trap_power_on
  trap_oid_suffix: 21
  description: "Power On"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - freset  # Factory reset wipes user passwords (superadmin only per source)
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures described in source.
```

## Notes
Telnet disabled by default; must enable via web interface. Commands case-sensitive; no spaces inside commands; return key terminates each command. Invalid value returns `Illegal value, gain will be off limit` or `Usage: command=en|dis`. Unrecognised command returns `Not recognised`. SNMP Engine ID derived from MAC: `80 00 BF 2F 80 <MAC>`. V1/V2C use community strings `public` (read, traps) and `private` (write). V3 default user `ampetronic` with `authPriv`, SHA1-96, AES-128. A custom MIB is available for trap decoding.

<!-- UNRESOLVED: firmware version compatibility not stated in source; firmware v1.6.0+ mentioned only as threshold for multi-version SNMP. Exact C-Series model variants and their feature support (e.g. which support inp3/Dante, which are dual channel) not enumerated in the protocol document. -->

## Provenance

```yaml
source_domains:
  - ampetronic.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP39808-4-C-Series-Protocol-Guide.pdf
retrieved_at: 2026-04-30T04:36:26.602Z
last_checked_at: 2026-06-02T21:39:39.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:39.690Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions matched literal Telnet commands in source; transport parameters (port 9760, login format) verified; no missing or extra commands. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; SNMP v1.6.0+ mentioned only for multi-version feature"
- "no explicit multi-step sequences described in source."
- "no explicit safety warnings or interlock procedures described in source."
- "firmware version compatibility not stated in source; firmware v1.6.0+ mentioned only as threshold for multi-version SNMP. Exact C-Series model variants and their feature support (e.g. which support inp3/Dante, which are dual channel) not enumerated in the protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
