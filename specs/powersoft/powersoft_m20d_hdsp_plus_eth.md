---
spec_id: admin/powersoft-m20d-hdsp-eth
schema_version: ai4av-public-spec-v1
revision: 1
title: "Powersoft M20D HDSP+ETH Control Spec"
manufacturer: Powersoft
model_family: "M20D HDSP+ETH"
aliases: []
compatible_with:
  manufacturers:
    - Powersoft
  models:
    - "M20D HDSP+ETH"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - powersoft.com
source_urls:
  - https://www.powersoft.com/wp-content/uploads/2019/01/Powersoft_M_Series_HDSPETH_AMX_ref_sheet.pdf
retrieved_at: 2026-04-30T04:33:24.415Z
last_checked_at: 2026-10-07T15:43:31.197Z
generated_at: 2026-10-07T15:43:31.197Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "1120 polling button"
  - "1314-1317/1328-1331 preset channels"
  - "1065/1066 Bat Former feedback"
  - "This source documents a NetLinx module API that wraps the native Powersoft protocol. The raw amplifier protocol commands are not documented here."
  - "The source references \"M Series\" generally; M20D HDSP+ETH model compatibility is assumed from the device name."
  - "Number of DSP modules/channels varies by model; not confirmed for M20D HDSP+ETH specifically."
  - "Firmware version compatibility for the amplifier is not stated. The source says the module will not work on a NetLinx Master with firmware below 4.xx."
  - "minimum volume not stated"
  - "maximum volume not stated"
  - "no unsolicited event/notification mechanism described in source beyond asynchronous command feedback."
  - "no multi-step sequences described in source."
  - "full power-on sequencing requirements not documented in source."
  - "native Powersoft protocol commands sent between module and amplifier are not documented."
  - "exact number of channels/modules for M20D HDSP+ETH not confirmed."
  - "volume range (min/max dB) not stated."
  - "protection bitmap interpretation not documented."
  - "alarm types/codes not documented."
  - "connection/disconnection timeout behavior not documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T15:43:31.197Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 action units match the source's string commands and channel-code arrays; transport values are supported; only a few minor channels are unrepresented. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Powersoft M20D HDSP+ETH Control Spec

## Summary
The source describes a NetLinx module for Powersoft M Series amplifiers. It communicates with an amplifier over UDP and exposes command and feedback interfaces through a NetLinx virtual device. The documented controls include power, connection, debugging, preset recall, mute, volume, and preset operations. Feedback addresses include temperature, current, impedance, protection, voltage, readiness, power, preset, alarm, device type, firmware, and device name.

<!-- UNRESOLVED: This source documents a NetLinx module API that wraps the native Powersoft protocol. The raw amplifier protocol commands are not documented here. -->
<!-- UNRESOLVED: The source references "M Series" generally; M20D HDSP+ETH model compatibility is assumed from the device name. -->
<!-- UNRESOLVED: Number of DSP modules/channels varies by model; not confirmed for M20D HDSP+ETH specifically. -->
<!-- UNRESOLVED: Firmware version compatibility for the amplifier is not stated. The source says the module will not work on a NetLinx Master with firmware below 4.xx. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 8002
  discovery_port: 30718
auth:
  type: UNRESOLVED  # Authentication behavior is not stated in the source.
```

## Traits
```yaml
traits:
  - powerable
  - levelable
  - queryable
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "<POWER>x."
    description: "Send the POWER command with x=1 to switch the amplifier ON. This takes effect only if external 12V power is present."
    params:
      - name: x
        type: integer
        description: "Use 1 for power on."

  - id: power_off
    label: Power Off
    kind: action
    command: "<POWER>x."
    description: "Send the POWER command with x=2 to switch the amplifier OFF. This takes effect only if external 12V power is present; otherwise the command recalls the reboot function."
    params:
      - name: x
        type: integer
        description: "Use 2 for power off."

  - id: connect
    label: Connect
    kind: action
    command: "<CONNECT>x."
    description: "Send the CONNECT command with x=1 to connect the device to the NetLinx Master."
    params:
      - name: x
        type: integer
        description: "Use 1 to connect."

  - id: disconnect
    label: Disconnect
    kind: action
    command: "<CONNECT>x."
    description: "Send the CONNECT command with x=0 to disconnect the device from the NetLinx Master. The source says to disconnect from AMX before using Armonia software."
    params:
      - name: x
        type: integer
        description: "Use 0 to disconnect."

  - id: debug_on
    label: Debug On
    kind: action
    command: "<DEBUG>x."
    description: "Send the DEBUG command with x=1 to enable the module debugger."
    params:
      - name: x
        type: integer
        description: "Use 1 to enable debugging."

  - id: debug_off
    label: Debug Off
    kind: action
    command: "<DEBUG>x."
    description: "Send the DEBUG command with x=0 to disable the module debugger."
    params:
      - name: x
        type: integer
        description: "Use 0 to disable debugging."

  - id: preset_recall
    label: Recall Preset
    kind: action
    command: "<PRESET>z-y,x."
    description: "Recall a preset from the device. By default, this is set to off at startup."
    params:
      - name: tp_index
        type: integer
        description: "z: Touchpanel count index (1 to max TP count), used for feedback."
      - name: module_id
        type: integer
        description: "y: Module ID (1-4)."
      - name: preset_number
        type: integer
        description: "x: Preset number (1-4)."

  - id: mute_on
    label: Mute On
    kind: action
    description: "Mute a module: channel code 1005 for Module 1 or 1019 for Module 2 (if present)."
    params:
      - name: module
        type: integer
        description: "Module number (1 or 2, if present)."

  - id: mute_off
    label: Mute Off
    kind: action
    description: "Unmute a module: channel code 1006 for Module 1 or 1020 for Module 2 (if present)."
    params:
      - name: module
        type: integer
        description: "Module number (1 or 2, if present)."

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    description: "Toggle module mute: channel code 1007 for Module 1 or 1021 for Module 2 (if present)."
    params:
      - name: module
        type: integer
        description: "Module number (1 or 2, if present)."

  - id: mute_channel_on
    label: Mute Channel On
    kind: action
    description: "Mute a channel: codes 1121-1124 for channels 1-4 respectively; channels 3 and 4 are marked if present in the source."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)."

  - id: mute_channel_off
    label: Mute Channel Off
    kind: action
    description: "Unmute a channel: codes 1129-1132 for channels 1-4 respectively; channels 3 and 4 are marked if present in the source."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)."

  - id: mute_channel_toggle
    label: Mute Channel Toggle
    kind: action
    description: "Toggle software mute: codes 1012 and 1013 for channels 1 and 2, and 1026 and 1027 for channels 3 and 4 (if present)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)."

  - id: hw_mute_on
    label: Hardware Mute On
    kind: action
    description: "Hardware mute channel pair: code 1137 for channels 1&2 or 1138 for channels 3&4 (if present)."
    params:
      - name: pair
        type: integer
        description: "Channel pair (1 for channels 1&2, 2 for channels 3&4)."

  - id: hw_mute_off
    label: Hardware Mute Off
    kind: action
    description: "Hardware unmute channel pair: code 1141 for channels 1&2 or 1142 for channels 3&4 (if present)."
    params:
      - name: pair
        type: integer
        description: "Channel pair (1 for channels 1&2, 2 for channels 3&4)."

  - id: volume_up
    label: Volume Up
    kind: action
    description: "Increment volume for a channel using channel codes 1201-1204 for Module 1 Ch.1/2 and Module 2 Ch.1/2 (if present). Step size is defined by Dsp1VoldBStep."
    params:
      - name: channel
        type: integer
        description: "Volume control index (1-4), corresponding to the listed channel codes."

  - id: volume_down
    label: Volume Down
    kind: action
    description: "Decrement volume for a channel using channel codes 1211-1214 for Module 1 Ch.1/2 and Module 2 Ch.1/2 (if present). Step size is defined by Dsp1VoldBStep."
    params:
      - name: channel
        type: integer
        description: "Volume control index (1-4), corresponding to the listed channel codes."

  - id: volume_reload
    label: Reload Volume
    kind: action
    description: "Reload volume level from device: code 1301 for Module 1 Ch.1/2, or 1302 for Module 2 Ch.3/4 (if present)."
    params:
      - name: module
        type: integer
        description: "Module number (1 or 2, if present)."

  - id: led_blinking
    label: LED Blinking
    kind: action
    description: "LED blinking channel code 1004 for Module 1 or 1018 for Module 2 (if present)."
    params:
      - name: module
        type: integer
        description: "Module number (1 or 2, if present)."

  - id: preset_edit_name
    label: Edit Preset Name
    kind: action
    description: "Edit preset name using channel code 1401."
    params: []

  - id: preset_abort
    label: Abort Preset Operation
    kind: action
    description: "Abort preset operation using channel code 1403."
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    description: "Power toggle channel code 1003; this will power toggle if 12V PSU is present."
    params: []

  - id: software_mute_channel_off
    label: Software Mute Channel Off
    kind: action
    description: "Turn software mute off: channel code 1008 for Ch1, 1010 for Ch2, and 1022 for CH3 or 1024 for CH4 (Module 2 if present)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)."

  - id: software_mute_channel_on
    label: Software Mute Channel On
    kind: action
    description: "Turn software mute on: channel code 1009 for Ch1, 1011 for Ch2, and 1023 for CH3 or 1025 for CH4 (Module 2 if present)."
    params:
      - name: channel
        type: integer
        description: "Channel number (1-4)."

  - id: device_type_request
    label: Device Type Request
    kind: action
    description: "Device Type channel code 1060."
    params: []

  - id: firmware_info_request
    label: Firmware Info Request
    kind: action
    description: "Firmware Info channel code 1061."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: temperature
    type: number
    description: "Module temperature (Module 1 address 1001, Module 2 address 1013)."
    unit: "°C"

  - id: rms_current
    type: number
    description: "RMS current per channel (Module 1 Ch.1=1002, Module 1 Ch.2=1003, Module 2 Ch.3=1014, Module 2 Ch.4=1015)."
    unit: "A"

  - id: impedance
    type: number
    description: "Impedance per channel (Module 1 Ch.1=1004, Module 1 Ch.2=1005, Module 2 Ch.3=1016, Module 2 Ch.4=1017)."
    unit: "Ohm"

  - id: protection_status
    type: string
    description: "Bitmap protection status per module (Module 1 address/channel 1006, Module 2 address/channel 1018); bitmap interpretation is not documented."

  - id: aux_positive_voltage
    type: number
    description: "Aux positive voltage (Module 1 address 1007, Module 2 address 1019)."
    unit: "V"

  - id: aux_negative_voltage
    type: number
    description: "Aux negative voltage (Module 1 address 1008, Module 2 address 1020)."
    unit: "V"

  - id: hardware_mute_state
    type: UNRESOLVED
    description: "Hardware mute feedback is listed at address/channel 4001 for each module; state encoding is not documented."

  - id: module_ready
    type: UNRESOLVED
    description: "Module ready feedback (Module 1 address/channel 1010, Module 2 address/channel 1022); value encoding is not documented."

  - id: external_power
    type: UNRESOLVED
    description: "External power feedback at address/channel 1011; value encoding is not documented."

  - id: current_preset
    type: integer
    description: "Current preset per module (Module 1 address 1012, Module 2 address/channel 1024)."

  - id: alarm
    type: UNRESOLVED
    description: "Alarm feedback for Module 1 at channel 1061 and Module 2 at channel 1062; value encoding is not documented."

  - id: device_type
    type: string
    description: "Device type identifier (address 1069)."
    query_command: 1060

  - id: firmware_info
    type: string
    description: "Firmware information (address 1070)."
    query_command: 1061

  - id: device_name
    type: UNRESOLVED
    description: "Device Name is listed at address 4001 in the source; its behavior is not further specified."
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
    description: "Per-channel volume level. Step size is configurable via Dsp1VoldBStep (source value 1.0 dB; comment says start from 0.1 dB)."
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source beyond asynchronous command feedback.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON/OFF commands take effect only if external 12V power is present."
  - "The amplifier accepts only one connection at a time; disconnect from AMX before using Armonia software."
# UNRESOLVED: full power-on sequencing requirements not documented in source.
```

## Notes
- This spec documents the **NetLinx module interface** (AMX), not the native Powersoft serial/IP protocol. The module implements the actual Powersoft protocol internally, but its commands are not documented in this source.
- String command format is `<[COMMAND]>[VALUE].`; documented examples include `<DEBUG>x.`, `<POWER>x.`, `<CONNECT>x.`, and `<PRESET>z-y,x.`.
- Mute and volume controls use NetLinx channel codes. The channel codes are listed in the module configuration arrays.
- The amplifier may have one or two DSP modules depending on model. Module 2 controls and feedback are marked "If Present" in the source.
- Preset names are stored persistently with defaults "Preset #1" through "Preset #4" plus "Preset Aux" per module.
- The source states that the module will not work on a NetLinx Master with firmware below 4.xx. It identifies Master Firmware version 4.1.373 as the development environment.
- Volume step size is configurable (`Dsp1VoldBStep`); the source value is 1.0 dB and its comment says "Start from 0.1 dB".
<!-- UNRESOLVED: native Powersoft protocol commands sent between module and amplifier are not documented. -->
<!-- UNRESOLVED: exact number of channels/modules for M20D HDSP+ETH not confirmed. -->
<!-- UNRESOLVED: volume range (min/max dB) not stated. -->
<!-- UNRESOLVED: protection bitmap interpretation not documented. -->
<!-- UNRESOLVED: alarm types/codes not documented. -->
<!-- UNRESOLVED: connection/disconnection timeout behavior not documented. -->

## Provenance

```yaml
source_domains:
  - powersoft.com
source_urls:
  - https://www.powersoft.com/wp-content/uploads/2019/01/Powersoft_M_Series_HDSPETH_AMX_ref_sheet.pdf
retrieved_at: 2026-04-30T04:33:24.415Z
last_checked_at: 2026-10-07T15:43:31.197Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:43:31.197Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 action units match the source's string commands and channel-code arrays; transport values are supported; only a few minor channels are unrepresented. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "1120 polling button"
- "1314-1317/1328-1331 preset channels"
- "1065/1066 Bat Former feedback"
- "This source documents a NetLinx module API that wraps the native Powersoft protocol. The raw amplifier protocol commands are not documented here."
- "The source references \"M Series\" generally; M20D HDSP+ETH model compatibility is assumed from the device name."
- "Number of DSP modules/channels varies by model; not confirmed for M20D HDSP+ETH specifically."
- "Firmware version compatibility for the amplifier is not stated. The source says the module will not work on a NetLinx Master with firmware below 4.xx."
- "minimum volume not stated"
- "maximum volume not stated"
- "no unsolicited event/notification mechanism described in source beyond asynchronous command feedback."
- "no multi-step sequences described in source."
- "full power-on sequencing requirements not documented in source."
- "native Powersoft protocol commands sent between module and amplifier are not documented."
- "exact number of channels/modules for M20D HDSP+ETH not confirmed."
- "volume range (min/max dB) not stated."
- "protection bitmap interpretation not documented."
- "alarm types/codes not documented."
- "connection/disconnection timeout behavior not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
