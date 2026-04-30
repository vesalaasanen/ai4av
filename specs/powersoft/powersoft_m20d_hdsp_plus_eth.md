---
schema_version: ai4av-public-spec-v1
device_id: powersoft/m20d-hdspeth
entity_id: powersoft_m20d_hdsp_eth
spec_id: admin/powersoft-m20d-hdsp-eth
revision: 1
author: admin
title: "Powersoft M20D HDSP+ETH Control Spec"
status: published
manufacturer: Powersoft
manufacturer_key: powersoft
model_family: "M20D HDSP+ETH"
aliases: []
compatible_with:
  manufacturers:
    - Powersoft
  models:
    - "M20D HDSP+ETH"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: powersoft_m20d_hdsp_plus_eth.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:00.781Z
retrieved_at: 2026-04-25T21:50:00.781Z
last_checked_at: 2026-04-25T21:50:00.781Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:50:00.781Z
  matched_actions: 21
  action_count: 21
  confidence: low
  summary: "All 21 spec actions matched verbatim to source command table; transport parameters verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Powersoft M20D HDSP+ETH Control Spec

## Summary
The Powersoft M20D HDSP+ETH is a member of the Powersoft M Series amplifier family. This spec covers the NetLinx module control interface, which communicates with the amplifier over UDP. The module exposes commands for power control, muting, volume, and preset recall, along with telemetry feedback for temperature, impedance, current, and protection status.

<!-- UNRESOLVED: This source documents a NetLinx module API that wraps the native Powersoft protocol. The raw amplifier protocol commands are not documented here. -->
<!-- UNRESOLVED: The source references "M Series" generally; M20D HDSP+ETH model compatibility is assumed from the device name. -->
<!-- UNRESOLVED: Number of DSP modules/channels varies by model; not confirmed for M20D HDSP+ETH specifically. -->
<!-- UNRESOLVED: Firmware version compatibility not stated; source notes NetLinx Master firmware must be ≥ 4.xx -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 8002
  discovery_port: 30718
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - levelable    # inferred from volume up/down controls
  - queryable    # inferred from query feedbacks (temperature, impedance, firmware, etc.)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "<POWER>1."
    description: "Switch amplifier ON. Requires 12V external power supply."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "<POWER>2."
    description: "Switch amplifier OFF. Requires 12V external power supply."
    params: []

  - id: connect
    label: Connect
    kind: action
    command: "<CONNECT>1."
    description: "Connect amplifier to NetLinx master."
    params: []

  - id: disconnect
    label: Disconnect
    kind: action
    command: "<CONNECT>0."
    description: "Disconnect amplifier from NetLinx master. Required before using Armonia software."
    params: []

  - id: debug_on
    label: Debug On
    kind: action
    command: "<DEBUG>1."
    description: "Enable module debugger."
    params: []

  - id: debug_off
    label: Debug Off
    kind: action
    command: "<DEBUG>0."
    description: "Disable module debugger."
    params: []

  - id: preset_recall
    label: Recall Preset
    kind: action
    command: "<PRESET>z-y,x."
    description: "Recall a preset from the device. By default set to off at startup."
    params:
      - name: tp_index
        type: integer
        description: "Touchpanel count index (1 to max TP count), used for feedback"
      - name: module_id
        type: integer
        description: "Module ID (1-4)"
      - name: preset_number
        type: integer
        description: "Preset number (1-4)"

  - id: mute_on
    label: Mute On
    kind: action
    description: "Mute amplifier. Channel varies by NetLinx channel code (1005=Module1, 1019=Module2)."
    params:
      - name: module
        type: integer
        description: "DSP module number (1 or 2)"

  - id: mute_off
    label: Mute Off
    kind: action
    description: "Unmute amplifier. Channel varies by NetLinx channel code (1006=Module1, 1020=Module2)."
    params:
      - name: module
        type: integer
        description: "DSP module number (1 or 2)"

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    description: "Toggle mute state. Channel varies by NetLinx channel code (1007=Module1, 1021=Module2)."
    params:
      - name: module
        type: integer
        description: "DSP module number (1 or 2)"

  - id: mute_channel_on
    label: Mute Channel On
    kind: action
    description: "Software mute specific channel (1009=Ch1, 1011=Ch2, 1023=Ch3, 1025=Ch4)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)"

  - id: mute_channel_off
    label: Mute Channel Off
    kind: action
    description: "Software unmute specific channel (1008=Ch1, 1010=Ch2, 1022=Ch3, 1024=Ch4)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)"

  - id: mute_channel_toggle
    label: Mute Channel Toggle
    kind: action
    description: "Toggle mute on specific channel (1012=Ch1, 1013=Ch2, 1026=Ch3, 1027=Ch4)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)"

  - id: hw_mute_on
    label: Hardware Mute On
    kind: action
    description: "Hardware mute channel pair (1137=Ch1&2, 1138=Ch3&4)."
    params:
      - name: pair
        type: integer
        description: "Channel pair (1 for Ch1&2, 2 for Ch3&4)"

  - id: hw_mute_off
    label: Hardware Mute Off
    kind: action
    description: "Hardware unmute channel pair (1141=Ch1&2, 1142=Ch3&4)."
    params:
      - name: pair
        type: integer
        description: "Channel pair (1 for Ch1&2, 2 for Ch3&4)"

  - id: volume_up
    label: Volume Up
    kind: action
    description: "Increment volume for a channel. Step size defined by Dsp1VoldBStep."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)"

  - id: volume_down
    label: Volume Down
    kind: action
    description: "Decrement volume for a channel. Step size defined by Dsp1VoldBStep."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)"

  - id: volume_reload
    label: Reload Volume
    kind: action
    description: "Reload volume level from device (1301=Module1, 1302=Module2)."
    params:
      - name: module
        type: integer
        description: "DSP module number (1 or 2)"

  - id: led_blinking
    label: LED Blinking
    kind: action
    description: "Toggle LED blinking (1004=Module1, 1018=Module2)."
    params:
      - name: module
        type: integer
        description: "DSP module number (1 or 2)"

  - id: preset_edit_name
    label: Edit Preset Name
    kind: action
    description: "Edit the name of the current preset (channel code 1401)."
    params: []

  - id: preset_abort
    label: Abort Preset Operation
    kind: action
    description: "Abort current preset operation (channel code 1403)."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: temperature
    type: number
    description: "Module temperature (Module 1=addr 1001, Module 2=addr 1013)"
    unit: "°C"

  - id: rms_current
    type: number
    description: "RMS current per channel (Mod1 CH1=1002, Mod1 CH2=1003, Mod2 CH3=1014, Mod2 CH4=1015)"
    unit: "A"

  - id: impedance
    type: number
    description: "Impedance per channel (Mod1 CH1=1004, Mod1 CH2=1005, Mod2 CH3=1016, Mod2 CH4=1017)"
    unit: "Ohm"

  - id: protection_status
    type: string
    description: "Bitmap protection status per module (Mod1=1006, Mod2=1018)"

  - id: aux_positive_voltage
    type: number
    description: "Aux positive voltage (Mod1=1007, Mod2=1019)"
    unit: "V"

  - id: aux_negative_voltage
    type: number
    description: "Aux negative voltage (Mod1=1008, Mod2=1020)"
    unit: "V"

  - id: hardware_mute_state
    type: enum
    values: [muted, unmuted]
    description: "Hardware mute state per channel"

  - id: module_ready
    type: enum
    values: [ready, not_ready]
    description: "Module ready status (Mod1=1010, Mod2=1022)"

  - id: external_power
    type: enum
    values: [present, absent]
    description: "External 12V power status (addr 1011)"

  - id: current_preset
    type: integer
    description: "Current preset number per module (Mod1=1012, Mod2=1024)"

  - id: alarm
    type: enum
    description: "Alarm status per module (Mod1=1061, Mod2=1062)"

  - id: device_type
    type: string
    description: "Device type identifier (addr 1069)"

  - id: firmware_info
    type: string
    description: "Firmware version information (addr 1070)"

  - id: device_name
    type: string
    description: "Device name"
```

## Variables
```yaml
variables:
  - id: volume
    type: float
    min: null  # UNRESOLVED: minimum volume not stated
    max: null  # UNRESOLVED: maximum volume not stated
    step: 1.0
    unit: dB
    description: "Per-channel volume level. Step size configurable via Dsp1VoldBStep (default 1.0 dB starting from 0.1 dB)."
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source beyond async command feedback
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON/OFF commands only take effect if 12V external power supply is present"
  - "Amplifier accepts only one connection at a time; must disconnect from AMX before using Armonia software"
# UNRESOLVED: full power-on sequencing requirements not documented in source
```

## Notes
- This spec documents the **NetLinx module interface** (AMX), not the native Powersoft serial/IP protocol. The module wraps the actual Powersoft protocol internally.
- Command format for string commands: `<[COMMAND]>[VALUE].` (e.g., `<POWER>1.`, `<DEBUG>0.`).
- Mute and volume controls use NetLinx **channel codes** rather than string commands. The channel codes are mapped in the module configuration arrays.
- The amplifier may have one or two DSP modules depending on model. Module 2 channels/presets are marked "If Present" in the source.
- Preset names are stored persistently with defaults "Preset #1" through "Preset #4" plus "Preset Aux" per module.
- The source code comment mentions "Master Firmware version 4.1.373" as the development environment; the module requires NetLinx Master firmware ≥ 4.xx.
- Volume step size is configurable (`Dsp1VoldBStep`), defaulting to 1.0 dB.
<!-- UNRESOLVED: native Powersoft protocol commands sent between module and amplifier are not documented -->
<!-- UNRESOLVED: exact number of channels/modules for M20D HDSP+ETH not confirmed -->
<!-- UNRESOLVED: volume range (min/max dB) not stated -->
<!-- UNRESOLVED: protection bitmap interpretation not documented -->
<!-- UNRESOLVED: alarm types/codes not documented -->
<!-- UNRESOLVED: connection/disconnection timeout behavior not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: powersoft_m20d_hdsp_plus_eth.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:00.781Z
retrieved_at: 2026-04-25T21:50:00.781Z
last_checked_at: 2026-04-25T21:50:00.781Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:50:00.781Z
matched_actions: 21
action_count: 21
confidence: low
summary: "All 21 spec actions matched verbatim to source command table; transport parameters verified"
```

## Known Gaps

```yaml
[]
```
