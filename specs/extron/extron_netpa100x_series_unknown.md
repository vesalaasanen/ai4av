---
spec_id: admin/extron-netpa100x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron NetPA U 1002 / NetPA U 1004 Control Spec"
manufacturer: Extron
model_family: "NetPA U 1002"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "NetPA U 1002"
    - "NetPA U 1002-70V"
    - "NetPA U 1002-100V"
    - "NetPA U 1004"
    - "NetPA U 1004-70V"
    - "NetPA U 1004-100V"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3165-01_revE.pdf
  - https://www.extron.com/product/netpa1001at
  - https://www.manua.ls/extron/netpa-1001-70v-at/manual
  - https://www.extron.com/download/files/userman/68-3165-50_B_NetPAU1004_1002_revB.pdf
retrieved_at: 2026-06-11T04:56:00.246Z
last_checked_at: 2026-06-11T13:42:36.297Z
generated_at: 2026-06-11T13:42:36.297Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "AT port IP control is via Dante (UDP), not generic TCP — the only TCP-style framing is RS-232 (serial). Dante control-plane commands are pass-through and not enumerated in the source."
  - "source does not document user-definable macro sequences"
  - "firmware version compatibility not stated in source; error recovery sequences not documented; line-voltage/fuse ratings not part of the protocol manual."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:42:36.297Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions matched verbatim in source command tables; source contains exactly 62 commands with no extras; transport confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Extron NetPA U 1002 / NetPA U 1004 Control Spec

## Summary
SIS (Simple Instruction Set) command protocol for the Extron NetPA Ultra Series Dante-equipped DSP power amplifiers, covering NetPA U 1002 (2-channel) and NetPA U 1004 (4-channel) variants in low-impedance, 70 V, and 100 V versions. Control is exposed over RS-232 (38400 8N1), USB Config, and the Dante/AT Ethernet port. Includes device identification, firmware queries, verbose mode, network configuration, standby control, naming, preset recall, per-block audio gain/mute, group master control, system resets, and extensive status/fault monitoring with unsolicited notification support.

<!-- UNRESOLVED: AT port IP control is via Dante (UDP), not generic TCP — the only TCP-style framing is RS-232 (serial). Dante control-plane commands are pass-through and not enumerated in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "AT port" / Dante Ethernet network commands
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from standby / power-save commands
- routable        # inferred from mix-point OID matrix and preset recall
- queryable       # inferred from query command examples
- levelable       # inferred from gain / fader commands
```

## Actions
```yaml
# --- Generic Hardware Setup and Access ---
- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []

- id: query_model_number
  label: Query Model Number
  kind: query
  command: "1I"
  params: []

- id: query_model_description
  label: Query Model Description
  kind: query
  command: "2I"
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []

- id: query_firmware_version_with_patch
  label: Query Firmware Version (w/patch)
  kind: query
  command: "*Q"
  params: []

- id: query_embedded_os_version
  label: Query Embedded OS Type/Version
  kind: query
  command: "14Q"
  params: []

- id: query_build_info
  label: Query Build and Special-build Text
  kind: query
  command: "20Q"
  params: []

- id: query_detailed_firmware_version
  label: Query Detailed Firmware Version
  kind: query
  command: "0Q"
  params: []

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "EX2@CV}"
  params:
    - name: mode
      type: integer
      description: 0=clear, 1=verbose, 2=tagged query, 3=verbose+tagged

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "ECV}"
  params: []

- id: reboot_dante_device
  label: Reboot Dante Device
  kind: action
  command: "EBEXPD}"
  params: []

- id: query_current_status
  label: Query Current Status (Verbose 2/3)
  kind: query
  command: "EKEXPD}"
  params: []

# --- Network Commands ---
- id: set_dhcp_on
  label: Set DHCP On
  kind: action
  command: "ED1EXPD}"
  params: []

- id: view_dhcp_status
  label: View DHCP Status
  kind: query
  command: "EDEXPD}"
  params: []

- id: set_dante_ip
  label: Set Dante IP/Subnet/Gateway
  kind: action
  command: "EIX#*X$*X%EXPD}"
  params:
    - name: ip
      type: string
      description: IP address
    - name: subnet
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway address

- id: view_dante_ip
  label: View IP/Subnet/Gateway
  kind: query
  command: "EIEXPD}"
  params: []

- id: view_mac_address
  label: View MAC Address
  kind: query
  command: "EHEXPD}"
  params: []

- id: view_dante_device_name
  label: View Dante Device Name
  kind: query
  command: "ENEXPD}"
  params: []

# --- Standby Commands ---
- id: disable_standby
  label: Disable Standby (Mode 0)
  kind: action
  command: "E0PSAV}"
  params: []

- id: enable_auto_standby
  label: Enable Auto Standby (Mode 1, default)
  kind: action
  command: "E1PSAV}"
  params: []

- id: force_standby_on
  label: Force Standby On (Mode 2)
  kind: action
  command: "E2PSAV}"
  params: []

- id: query_standby_mode
  label: Query Standby Power Mode and Power Save State
  kind: query
  command: "EPSAV}"
  params: []

# --- Naming ---
- id: write_input_name
  label: Write Input Name
  kind: action
  command: "EX!,X@NI}"
  params:
    - name: input
      type: integer
      description: Input number (1-4)
    - name: name
      type: string
      description: Input name (max 12 chars, illegal: ~ , @ = ` [ ] { } < > " ; : | \ ?)

- id: write_output_name
  label: Write Output Name
  kind: action
  command: "EX!,X@NO}"
  params:
    - name: output
      type: integer
      description: Output number
    - name: name
      type: string
      description: Output name (max 12 chars, illegal: ~ , @ = ` [ ] { } < > " ; : | \ ?)

- id: write_preset_name
  label: Write Preset Name
  kind: action
  command: "EX#,X$NG}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)
    - name: name
      type: string
      description: Preset name (illegal: ~ , @ = ` [ ] { } < > " ; : | \ ?)

- id: write_group_master_name
  label: Write Group Master Name
  kind: action
  command: "ENX1$*nameGRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)
    - name: name
      type: string
      description: Group master name

- id: view_input_name
  label: View Input Name
  kind: query
  command: "EX!NI}"
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: view_output_name
  label: View Output Name
  kind: query
  command: "EX!NO}"
  params:
    - name: output
      type: integer
      description: Output number

- id: view_group_master_name
  label: View Group Master Name
  kind: query
  command: "ENX1$GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

# --- Presets ---
- id: recall_preset
  label: Recall Preset
  kind: action
  command: "X#."
  params:
    - name: preset
      type: integer
      description: Preset number (1-8)

# --- Audio Level Control ---
- id: set_gain_level
  label: Set Gain Level on OID
  kind: action
  command: "EGX7@*X7#AU}"
  params:
    - name: oid
      type: integer
      description: Target OID (see OID tables)
    - name: gain
      type: integer
      description: Gain in 0.1 dB steps using 10x multiplier (e.g. +10.4 dB = 104, -3.2 dB = -32)

- id: read_gain_level
  label: Read Gain Level on OID
  kind: query
  command: "EGX7@AU}"
  params:
    - name: oid
      type: integer
      description: Target OID (see OID tables)

# --- Audio Mute ---
- id: audio_mute
  label: Mute Audio on OID
  kind: action
  command: "EMX7@*1AU}"
  params:
    - name: oid
      type: integer
      description: Target OID (see OID tables)

- id: audio_unmute
  label: Unmute Audio on OID
  kind: action
  command: "EMX7@*0AU}"
  params:
    - name: oid
      type: integer
      description: Target OID (see OID tables)

- id: read_mute_status
  label: Read Mute Status on OID
  kind: query
  command: "EMX7@AU}"
  params:
    - name: oid
      type: integer
      description: Target OID (see OID tables)

# --- Audio Group Master Commands ---
- id: set_group_fader
  label: Set Group Fader Value
  kind: action
  command: "EDX1$*X1^GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)
    - name: fader
      type: integer
      description: Fader value in 0.1 dB (10x multiplier, e.g. -29.3 dB = -293)

- id: increment_group_fader
  label: Increment Group Fader
  kind: action
  command: "EDX1$*X2)+GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)
    - name: delta
      type: integer
      description: Increment in 0.1 dB (10x multiplier, e.g. +3 dB = 30)

- id: decrement_group_fader
  label: Decrement Group Fader
  kind: action
  command: "EDX1$*X2)-GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)
    - name: delta
      type: integer
      description: Decrement in 0.1 dB (10x multiplier, e.g. -3 dB = -30)

- id: view_group_fader
  label: View Group Fader Value
  kind: query
  command: "EDX1$GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

- id: mute_group
  label: Mute Group
  kind: action
  command: "EDX1$*1GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

- id: unmute_group
  label: Unmute Group
  kind: action
  command: "EDX1$*0GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

- id: set_soft_limits
  label: Set Group Soft Limits
  kind: action
  command: "ELX1$*X1& upper*X1& lowerGRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)
    - name: upper
      type: integer
      description: Upper soft limit in 0.1 dB (10x multiplier, e.g. +6.0 dB = 60)
    - name: lower
      type: integer
      description: Lower soft limit in 0.1 dB (10x multiplier, e.g. -6.0 dB = -60)

- id: view_soft_limits
  label: View Group Soft Limits
  kind: query
  command: "ELX1$GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

- id: view_group_type
  label: View Group Type
  kind: query
  command: "EPX1$GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

- id: view_group_members
  label: View Group Members
  kind: query
  command: "EOX1$GRPM}"
  params:
    - name: group
      type: integer
      description: Group master number (1-32)

# --- Resets ---
- id: reset_status
  label: Reset Status Flag
  kind: action
  command: "EX99(ZSTS}"
  params:
    - name: status
      type: integer
      description: 0=all flags, or 53/54/55/57/58/60/61/64 for specific status

- id: reset_presets_and_names
  label: Reset Presets and Names
  kind: action
  command: "EZG}"
  params: []

- id: reset_individual_preset
  label: Reset Individual Preset
  kind: action
  command: "EX31!ZG}"
  params:
    - name: preset
      type: integer
      description: Preset number to reset

- id: system_reset_factory_default
  label: System Reset (Factory Default)
  kind: action
  command: "EZXXX}"
  params: []

# --- Status / Monitoring ---
- id: configure_monitoring
  label: Configure Monitoring Unsolicited Responses
  kind: action
  command: "EMX10$*X10%NTFY}"
  params:
    - name: flags
      type: integer
      description: 4-digit bitmap nBasic nDigitalClip nOverload nSignalPresence (each 0/1)
    - name: port
      type: integer
      description: 0=all, 1=Dante, 2=RS-232, 3=USB

- id: view_monitoring_config
  label: View Monitoring Configuration
  kind: query
  command: "EMNTFY}"
  params: []

- id: view_internal_temp
  label: View Internal Operating Temperature
  kind: query
  command: "E20STAT}"
  params: []

- id: view_fault_statuses
  label: View System Fault Statuses
  kind: query
  command: "E32STAT}"
  params: []

- id: view_system_overtemp
  label: View System Over-temp Fault Status
  kind: query
  command: "E53STAT}"
  params: []

- id: view_dc_protect
  label: View DC Protection Fault Status
  kind: query
  command: "E54STAT}"
  params: []

- id: view_thermal_limit
  label: View Thermal Limiting Status (per channel)
  kind: query
  command: "E55STAT}"
  params: []

- id: view_overload_protect
  label: View Overload Protect Status (per channel)
  kind: query
  command: "E57STAT}"
  params: []

- id: view_output_open_circuit
  label: View Output Open Circuit Status (per channel)
  kind: query
  command: "E58STAT}"
  params: []

- id: view_loss_of_ac
  label: View Loss of AC Status
  kind: query
  command: "E60STAT}"
  params: []

- id: view_main_power_supply
  label: View Main Power Supply Status
  kind: query
  command: "E61STAT}"
  params: []

- id: view_signal_presence
  label: View Signal Presence (per channel)
  kind: query
  command: "E62STAT}"
  params: []

- id: view_digital_clip
  label: View Digital Clip Status (per channel)
  kind: query
  command: "E64STAT}"
  params: []
```

## Feedbacks
```yaml
- id: model_name
  type: string
  description: "From 1I: e.g. NetPA U 1004, NetPA U 1002-70V, etc."

- id: model_description
  type: string
  description: "From 2I: e.g. 100 watt 4 Channel low impedance amplifier with DSP and Dante"

- id: firmware_version
  type: string
  description: "From Q, returns Vn.nn"

- id: firmware_version_with_patch
  type: string
  description: "From *Q"

- id: embedded_os_version
  type: string
  description: "From 14Q"

- id: build_info
  type: string
  description: "From 20Q, includes build and special-build text"

- id: detailed_firmware_version
  type: string
  description: "From 0Q, format <bootloader> - <factory> - <updated>"

- id: verbose_mode
  type: integer
  values: [0, 1, 2, 3]
  description: "0=clear, 1=verbose, 2=tagged query, 3=verbose+tagged"

- id: dhcp_status
  type: integer
  values: [0, 1]
  description: "0=off, 1=on"

- id: dante_ip
  type: string
  description: "IP address (X#)"

- id: dante_subnet
  type: string
  description: "Subnet mask (X$)"

- id: dante_gateway
  type: string
  description: "Gateway address (X%)"

- id: mac_address
  type: string
  description: "From EH command (X^)"

- id: dante_device_name
  type: string
  description: "From EN command (X&)"

- id: standby_mode
  type: integer
  values: [0, 1, 2]
  description: "0=timer disabled, 1=timer running not triggered, 2=standby triggered (SIS)"

- id: standby_state
  type: integer
  values: [0, 1, 2, 3, 4]
  description: "0=active+timer off, 1=timer running (default), 2=SIS triggered, 3=timer triggered, 4=contact closure triggered"

- id: gain_level
  type: integer
  description: "Gain in 0.1 dB units, 10x multiplier (e.g. +10.4 dB = 104)"

- id: mute_state
  type: integer
  values: [0, 1]
  description: "0=unmuted, 1=muted"

- id: internal_temp_c
  type: integer
  description: "Internal temperature in degrees Celsius"

- id: global_fault_status
  type: string
  description: "5-digit string: nSystemOvertemp nDCProtect nLossOfAC nPowerSupplyFault nStandby"

- id: system_overtemp_fault
  type: integer
  values: [0, 1, 2]
  description: "0=never, 1=no longer detected, 2=detected now"

- id: dc_protect_fault
  type: integer
  values: [0, 1, 2]
  description: "0=never, 1=no longer, 2=active protection (amber power LED; may need service)"

- id: loss_of_ac_fault
  type: integer
  values: [0, 1, 2]
  description: "0=never, 1=past disruption, 2=current loss"

- id: power_supply_fault
  type: integer
  values: [0, 1, 2]
  description: "0=never, 1=past, 2=current fault (may need service)"

- id: monitoring_config
  type: string
  description: "4-digit bitmap nBasic nDigitalClip nOverload nSignalPresence"

- id: monitoring_port
  type: integer
  values: [0, 1, 2, 3]
  description: "0=all, 1=Dante, 2=RS-232, 3=USB"
```

## Variables
```yaml
# Audio gain (per OID) - 10x multiplier in 0.1 dB steps. Acceptable range varies by block:
- id: mic_line_input_gain
  type: integer
  description: "Mic/Line input gain, -18 dB to +60 dB in 0.1 dB increments (10x multiplier, e.g. 104 = +10.4 dB)"

- id: pre_mixer_gain
  type: integer
  description: "Pre-mixer or virtual return gain, -100 dB to +12 dB in 0.1 dB increments"

- id: post_mixer_gain
  type: integer
  description: "Post-mixer gain, -12 dB to +12 dB in 0.1 dB increments. Post-mixer trim cannot be muted."

- id: output_attenuation
  type: integer
  description: "Output attenuation, -100 dB to 0 dB in 0.1 dB increments"

- id: group_fader
  type: integer
  description: "Group fader value in 0.1 dB (10x multiplier)"

- id: group_soft_limit_upper
  type: integer
  description: "Group soft limit upper in 0.1 dB (10x multiplier)"

- id: group_soft_limit_lower
  type: integer
  description: "Group soft limit lower in 0.1 dB (10x multiplier)"
```

## Events
```yaml
- id: copyright_message
  description: "Sent on power-up or first USB connection: (c) Copyright 2020, Extron Electronics, {model}, Vn.nn, 60-nnnn-nn"
  direction: device_to_host

- id: status_change_notice
  description: "Unsolicited status changes reported in verbose modes 1 or 3. Enabled via the NTFY command and directed to a specific port (all/Dante/RS-232/USB). Includes basic monitoring (system over-temp, DC protect, output thermal limit, loss of AC, standby status, output open circuit, main power supply status), digital clip, overload, and signal presence."
  direction: device_to_host

- id: standby_change_notice
  description: "Unsolicited response when unit enters or leaves standby mode"
  direction: device_to_host
```

## Macros
```yaml
# UNRESOLVED: source does not document user-definable macro sequences
# Standby command is single-step; bridging is a hardware procedure, not a macro.
```

## Safety
```yaml
confirmation_required_for:
  - system_reset_factory_default  # E ZXXX - restores most settings; Dante settings preserved
  - reset_presets_and_names       # E ZG - wipes all presets and group master memory
interlocks:
  - standby_priority_contact_closure > SIS > timer
  # Contact closure shorted → mode 4 standby, persists until port un-shorted;
  # supersedes all other standby conditions
  - on_88_2_96khz_at_tx_disabled  # NetPA U 1004: 88.2/96 kHz sample rate disables AT transmit channels
# Source contains explicit safety notes: attenuation blocks default to -24 dB on amp
# outputs out-of-the-box to prevent excessive signal at first power-up.
```

## Notes
- Commands begin with a `W` (Esc, hex 1B) prefix; the `}` terminator is CR only (no LF) for the command itself, while responses end with CR+LF. `*` is a literal command character, not a wildcard.
- 38400 baud is unusual for Extron products; ensure host (DataViewer, control system) matches.
- DSP Configurator software is the primary configuration tool; SIS is the scripted/textual control plane. Both target the same internal model.
- Gain uses a 10x multiplier with no decimal; +10.4 dB = `104`, -3.2 dB = `-32`. Negative values use an explicit `-` prefix.
- Six model variants exist (1002/1004 × low-Z/70V/100V). OID table contents differ; the input/output naming convention (`1I`, `2I`, `N`, etc.) returns the variant-specific model string.
- The AT port is Dante (UDP/IP via AES67-compatible). SIS over Dante requires a DMP Plus device to bridge RS-232-style SIS into the Dante control plane; commands then use `w` in place of Esc and `|` in place of CR.
- The standby contact closure (rear-panel 2-pin captive screw) is the highest-priority standby trigger and forces mode 4 until released; cannot be overridden by SIS or the inactivity timer.
- 44.1/88.2/96 kHz sample rates are supported on the AT port, but the DSP itself runs at 48 kHz. On the 1004, 88.2 and 96 kHz disable AT transmit.
- AT port latency can be set per device to 1.0, 2.0, or 5.0 ms (Dante Controller).

<!-- UNRESOLVED: firmware version compatibility not stated in source; error recovery sequences not documented; line-voltage/fuse ratings not part of the protocol manual. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3165-01_revE.pdf
  - https://www.extron.com/product/netpa1001at
  - https://www.manua.ls/extron/netpa-1001-70v-at/manual
  - https://www.extron.com/download/files/userman/68-3165-50_B_NetPAU1004_1002_revB.pdf
retrieved_at: 2026-06-11T04:56:00.246Z
last_checked_at: 2026-06-11T13:42:36.297Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:42:36.297Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions matched verbatim in source command tables; source contains exactly 62 commands with no extras; transport confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "AT port IP control is via Dante (UDP), not generic TCP — the only TCP-style framing is RS-232 (serial). Dante control-plane commands are pass-through and not enumerated in the source."
- "source does not document user-definable macro sequences"
- "firmware version compatibility not stated in source; error recovery sequences not documented; line-voltage/fuse ratings not part of the protocol manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
