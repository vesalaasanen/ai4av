---
spec_id: admin/lea-connect-series-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LEA Connect Series Series Control Spec"
manufacturer: LEA
model_family: "Connect Series"
aliases: []
compatible_with:
  manufacturers:
    - LEA
  models:
    - "Connect Series"
    - "Network Connect Series"
    - "Dante Connect Series"
  firmware: ">=1.1.0"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - leaprofessional.com
source_urls:
  - https://leaprofessional.com/wp-content/uploads/2020/10/LEA-Open-API-TCP-Protocol-October-2020.pdf
  - https://leaprofessional.com/download/tcp-control-api/
  - https://leaprofessional.com/download/websocket-control-api/
  - https://leaprofessional.com/blog/open-api-first-look/
retrieved_at: 2026-05-07T07:02:51.556Z
last_checked_at: 2026-07-22T00:08:31.019Z
generated_at: 2026-07-22T00:08:31.019Z
firmware_coverage: ">=1.1.0"
protocol_coverage: []
known_gaps:
  - /amp/channels/x/inputSelector/danteOnRamp
  - "command catalogue here only documents elements explicitly listed in source; LEA notes \"more advanced commands available which are not listed\" — coverage is partial."
  - "no multi-step sequences described in source"
  - "source documents no explicit safety warnings or interlock procedures."
  - "error response strings beyond `error: ...` examples not fully catalogued; documented behavior suffices for implementers."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:08:31.019Z
  matched_actions: 108
  action_count: 108
  confidence: medium
  summary: "All 108 spec actions map 1:1 to documented /amp element URLs with matching verbs and value ranges; only the example-only danteOnRamp element is unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# LEA Connect Series Control Spec

## Summary
TCP text-line control protocol for LEA Dante Connect Series and Network Connect Series amplifiers. Commands are ASCII verb + URL path (+ optional value), newline-delimited, served on TCP port 4321 (firmware 1.1.0.X+). The same surface supports `get`, `set`, `subscribe`, and `unsubscribe` operations on a tree of `/amp/...` objects (deviceInfo, powerSupply, autoStandby, signalGenerator, analog inputs, per-channel inputSelector/crossover/outputEqFilters/rmsLimiter/peakLimiter/output/levels/loadMonitor).

<!-- UNRESOLVED: command catalogue here only documents elements explicitly listed in source; LEA notes "more advanced commands available which are not listed" — coverage is partial. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4321
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# Source documents get/set/subscribe on per-channel faders, mutes, input sources,
# crossover, EQ, limiters, auto-standby, and signal generator - all strong evidence.
- levelable  # inferred: per-channel output/input faders, EQ gain, limiter threshold
- routable  # inferred: inputSelector primary/secondary source selection
- queryable  # inferred: get/subscribe on every documented element
- powerable  # inferred: auto-standby controls and output enable state imply power management
```

## Actions
```yaml
# TCP text-line protocol. Every command is `verb /url [value]\n` where verb ∈
# {get, set, subscribe, unsubscribe}. Channel index `x` is 1-based, input `#`
# is 1-based, EQ filter `*` is 1-based. Strings with spaces must be quoted.

- id: get_element
  label: Get Element Value
  kind: query
  command: "get /amp/{path}\n"
  params:
    - name: path
      type: string
      description: Dotted element URL path under /amp (e.g. deviceInfo/deviceName)

- id: set_element
  label: Set Element Value
  kind: action
  command: "set /amp/{path} {value}\n"
  params:
    - name: path
      type: string
      description: Dotted element URL path under /amp
    - name: value
      type: string
      description: New value; enclose in double-quotes if it contains spaces

- id: subscribe_element
  label: Subscribe To Element
  kind: action
  command: "subscribe /amp/{path}\n"
  params:
    - name: path
      type: string
      description: Dotted element URL path under /amp

- id: unsubscribe_element
  label: Unsubscribe From Element
  kind: action
  command: "unsubscribe /amp/{path}\n"
  params:
    - name: path
      type: string
      description: Dotted element URL path under /amp

# --- Device Info ---
- id: get_device_name
  label: Get Device Name
  kind: query
  command: "get /amp/deviceInfo/deviceName\n"

- id: set_device_name
  label: Set Device Name
  kind: action
  command: "set /amp/deviceInfo/deviceName {value}\n"
  params:
    - name: value
      type: string
      description: New device name

- id: get_venue_name
  label: Get Venue Name
  kind: query
  command: "get /amp/deviceInfo/venueName\n"

- id: set_venue_name
  label: Set Venue Name
  kind: action
  command: "set /amp/deviceInfo/venueName {value}\n"
  params:
    - name: value
      type: string
      description: Venue name

- id: get_model_id
  label: Get Model ID
  kind: query
  command: "get /amp/deviceInfo/modelID\n"

- id: get_asset_tag_number
  label: Get Asset Tag Number
  kind: query
  command: "get /amp/deviceInfo/assetTagNumber\n"

- id: set_asset_tag_number
  label: Set Asset Tag Number
  kind: action
  command: "set /amp/deviceInfo/assetTagNumber {value}\n"
  params:
    - name: value
      type: string
      description: Asset tag identifier

- id: get_installer_name
  label: Get Installer Name
  kind: query
  command: "get /amp/deviceInfo/installerName\n"

- id: set_installer_name
  label: Set Installer Name
  kind: action
  command: "set /amp/deviceInfo/installerName {value}\n"
  params:
    - name: value
      type: string
      description: Installer name

- id: get_installer_contact_info
  label: Get Installer Contact Info
  kind: query
  command: "get /amp/deviceInfo/installerContactInfo\n"

- id: set_installer_contact_info
  label: Set Installer Contact Info
  kind: action
  command: "set /amp/deviceInfo/installerContactInfo {value}\n"
  params:
    - name: value
      type: string
      description: Contact info string

- id: get_date_of_installation
  label: Get Date Of Installation
  kind: query
  command: "get /amp/deviceInfo/dateOfInstallation\n"

- id: get_rack_name
  label: Get Rack Name
  kind: query
  command: "get /amp/deviceInfo/rackName\n"

- id: set_rack_name
  label: Set Rack Name
  kind: action
  command: "set /amp/deviceInfo/rackName {value}\n"
  params:
    - name: value
      type: string
      description: Rack name

- id: get_rack_position
  label: Get Rack Position
  kind: query
  command: "get /amp/deviceInfo/rackPosition\n"

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "get /amp/deviceInfo/serialNumber\n"

- id: get_date_of_mfg
  label: Get Date Of Manufacture
  kind: query
  command: "get /amp/deviceInfo/dateOfMfg\n"

- id: get_hardware_id
  label: Get Hardware ID
  kind: query
  command: "get /amp/deviceInfo/hardwareID\n"

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "get /amp/deviceInfo/firmwareVersion\n"

- id: get_power_supply_firmware_version
  label: Get Power Supply Firmware Version
  kind: query
  command: "get /amp/deviceInfo/powerSupplyfirmwareVersion\n"

- id: get_amp12_firmware_version
  label: Get Amp 12 Firmware Version
  kind: query
  command: "get /amp/deviceInfo/amp12firmwareVersion\n"

- id: get_amp34_firmware_version
  label: Get Amp 34 Firmware Version
  kind: query
  command: "get /amp/deviceInfo/amp34firmwareVersion\n"

- id: get_up_time
  label: Get Up Time
  kind: query
  command: "get /amp/deviceInfo/upTime\n"

- id: get_num_inputs
  label: Get Number Of Inputs
  kind: query
  command: "get /amp/deviceInfo/numInputs\n"

- id: get_num_outputs
  label: Get Number Of Outputs
  kind: query
  command: "get /amp/deviceInfo/numOutputs\n"

# --- Power Supply ---
- id: get_ac_line_voltage
  label: Get AC Line Voltage RMS
  kind: query
  command: "get /amp/powerSupply/acLineVoltage\n"

- id: get_ac_line_current
  label: Get AC Line Current RMS
  kind: query
  command: "get /amp/powerSupply/acLineCurrent\n"

- id: get_ac_line_watts
  label: Get AC Line Power Draw
  kind: query
  command: "get /amp/powerSupply/acLineWatts\n"

- id: get_power_supply_fault
  label: Get Power Supply Fault Status
  kind: query
  command: "get /amp/powerSupply/fault\n"

- id: get_power_supply_thermal
  label: Get Power Supply Thermal Protection Status
  kind: query
  command: "get /amp/powerSupply/thermal\n"

- id: get_power_supply_power_ok
  label: Get Power Supply Power OK Status
  kind: query
  command: "get /amp/powerSupply/powerOk\n"

- id: get_power_supply_line_warning
  label: Get Power Supply AC Line Voltage Ok
  kind: query
  command: "get /amp/powerSupply/lineWarning\n"

# --- Auto Standby ---
- id: set_auto_standby_enable
  label: Set Auto Standby Enable
  kind: action
  command: "set /amp/autoStandby/enable \"{value}\"\n"
  params:
    - name: value
      type: string
      description: "true" or "false"

- id: set_auto_standby_threshold
  label: Set Auto Standby Threshold
  kind: action
  command: "set /amp/autoStandby/threshold {value}\n"
  params:
    - name: value
      type: number
      description: dB threshold (e.g. -60.0)

- id: set_auto_standby_time_to_wait
  label: Set Auto Standby Wait Time
  kind: action
  command: "set /amp/autoStandby/timeToWait {value}\n"
  params:
    - name: value
      type: integer
      description: Minutes (1..240)

# --- Signal Generator ---
- id: set_signal_generator_type
  label: Set Signal Generator Type
  kind: action
  command: "set /amp/signalGenerator/type \"{value}\"\n"
  params:
    - name: value
      type: string
      description: "Pink Noise" | "White Noise" | "Tone"

- id: set_signal_generator_frequency
  label: Set Signal Generator Tone Frequency
  kind: action
  command: "set /amp/signalGenerator/frequency {value}\n"
  params:
    - name: value
      type: integer
      description: Hz (20..20000)

# --- Analog Inputs ---
- id: set_analog_input_sensitivity
  label: Set Analog Input Sensitivity
  kind: action
  command: "set /amp/inputs/analog/{input}/sensitivity \"{value}\"\n"
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: value
      type: string
      description: "26dB" | "34dB"

# --- Input Selector (per channel) ---
- id: get_primary_input_source
  label: Get Primary Input Source
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/primary\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_primary_input_source
  label: Set Primary Input Source
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/primary \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "Analog 1"|"Analog 2"|"Analog 1+2"|...|"Dante 7+8"

- id: set_primary_fader
  label: Set Primary Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/primaryFader {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: Attenuation in dB (-80..0)

- id: subscribe_primary_level
  label: Subscribe Primary Input Meter
  kind: action
  command: "subscribe /amp/channels/{channel}/inputSelector/primaryLevel\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_primary_signal_detect
  label: Get Primary Input Signal Present
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/primarySignalDetect\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: subscribe_primary_clip
  label: Subscribe Primary Input Clip Indicator
  kind: action
  command: "subscribe /amp/channels/{channel}/inputSelector/primaryClip\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_primary_threshold
  label: Set Primary Input Signal Override Threshold
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/primaryThreshold {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (-80..0)

- id: get_secondary_input_source
  label: Get Secondary Input Source
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/secondary\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_secondary_input_source
  label: Set Secondary Input Source
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/secondary \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: Analog/Dante source, or "None"

- id: get_secondary_fader
  label: Get Secondary Gain Attenuation Fader
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/secondaryFader\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_secondary_fader
  label: Set Secondary Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/secondaryFader {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: Attenuation in dB (-80..0)

- id: subscribe_secondary_level
  label: Subscribe Secondary Input Meter
  kind: action
  command: "subscribe /amp/channels/{channel}/inputSelector/secondaryLevel\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_secondary_signal_detect
  label: Get Secondary Input Signal Present
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/secondarySignalDetect\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: subscribe_secondary_clip
  label: Subscribe Secondary Input Clip Indicator
  kind: action
  command: "subscribe /amp/channels/{channel}/inputSelector/secondaryClip\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_secondary_threshold
  label: Set Secondary Input Signal Override Threshold
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/secondaryThreshold {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (-80..0)

- id: get_signal_detect
  label: Get Input Signal Present
  kind: query
  command: "get /amp/channels/{channel}/inputSelector/signalDetect\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: subscribe_clip
  label: Subscribe Input Signal Clip Indicator
  kind: action
  command: "subscribe /amp/channels/{channel}/inputSelector/clip\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_signal_priority_mode
  label: Set Input Signal Priority Override Mode
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/mode \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "Override" (auto override primary) | "Backup" (signal sensing override)

- id: set_signal_generator_channel_enable
  label: Set Signal Generator Channel Enable
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/signalGeneratorEnable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_signal_generator_channel_fader
  label: Set Signal Generator Channel Fader
  kind: action
  command: "set /amp/channels/{channel}/inputSelector/signalGeneratorFader {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (-80..0)

# --- Crossover (per channel) ---
- id: set_crossover_gain
  label: Set Crossover Gain
  kind: action
  command: "set /amp/channels/{channel}/crossover/bandGainAndDelay/gain {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (-15.0..15.0)

- id: set_crossover_delay
  label: Set Crossover Delay
  kind: action
  command: "set /amp/channels/{channel}/crossover/bandGainAndDelay/delay {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: ms (0.0..100.0)

- id: set_crossover_invert
  label: Set Crossover Polarity
  kind: action
  command: "set /amp/channels/{channel}/crossover/bandGainAndDelay/invert \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_lowpass_enable
  label: Set Crossover Low Pass Filter Enable
  kind: action
  command: "set /amp/channels/{channel}/crossover/lowPassFilter/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_lowpass_type
  label: Set Crossover Low Pass Filter Type
  kind: action
  command: "set /amp/channels/{channel}/crossover/lowPassFilter/type \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "Butterworth 6dB/oct"|"Butterworth 12dB/oct"|...|"Bessel 48dB/oct"

- id: set_lowpass_frequency
  label: Set Crossover Low Pass Filter Frequency
  kind: action
  command: "set /amp/channels/{channel}/crossover/lowPassFilter/frequency {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: integer
      description: Hz (20..20000)

- id: set_highpass_enable
  label: Set Crossover High Pass Filter Enable
  kind: action
  command: "set /amp/channels/{channel}/crossover/highPassFilter/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_highpass_type
  label: Set Crossover High Pass Filter Type
  kind: action
  command: "set /amp/channels/{channel}/crossover/highPassFilter/type \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "Butterworth 6dB/oct"|"Butterworth 12dB/oct"|...|"Bessel 48dB/oct"

# --- Output EQ (per channel, per filter) ---
- id: set_output_eq_enable
  label: Set Output EQ Filter Enable
  kind: action
  command: "set /amp/channels/{channel}/outputEqFilters/{filter}/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: filter
      type: integer
      description: Filter number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_output_eq_type
  label: Set Output EQ Filter Type
  kind: action
  command: "set /amp/channels/{channel}/outputEqFilters/{filter}/type \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: filter
      type: integer
      description: Filter number (1-based)
    - name: value
      type: string
      description: "Parametric"|"LP Shelf 6dB/oct"|"HP Shelf 6dB/oct"|"LP Shelf 12dB/oct"|"HP Shelf 12dB/oct"

- id: set_output_eq_gain
  label: Set Output EQ Filter Gain
  kind: action
  command: "set /amp/channels/{channel}/outputEqFilters/{filter}/gain {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: filter
      type: integer
      description: Filter number (1-based)
    - name: value
      type: number
      description: dB (-15.0..15.0)

- id: set_output_eq_frequency
  label: Set Output EQ Filter Frequency
  kind: action
  command: "set /amp/channels/{channel}/outputEqFilters/{filter}/frequency {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: filter
      type: integer
      description: Filter number (1-based)
    - name: value
      type: integer
      description: Hz (20..20000)

- id: set_output_eq_q
  label: Set Output EQ Filter Q
  kind: action
  command: "set /amp/channels/{channel}/outputEqFilters/{filter}/q {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: filter
      type: integer
      description: Filter number (1-based)
    - name: value
      type: number
      description: Q factor (0.1..24.0)

# --- RMS Limiter (per channel) ---
- id: set_rms_limiter_enable
  label: Set RMS Limiter Enable
  kind: action
  command: "set /amp/channels/{channel}/rmsLimiter/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_rms_limiter_threshold
  label: Set RMS Limiter Threshold
  kind: action
  command: "set /amp/channels/{channel}/rmsLimiter/threshold {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (10.0..140.0)

- id: set_rms_limiter_attack
  label: Set RMS Limiter Attack
  kind: action
  command: "set /amp/channels/{channel}/rmsLimiter/attackTime {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: ms (1000.0..10000.0)

- id: set_rms_limiter_release
  label: Set RMS Limiter Release
  kind: action
  command: "set /amp/channels/{channel}/rmsLimiter/releaseTime {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: ms (1000.0..10000.0)

- id: subscribe_rms_limiter_gain_reduction
  label: Subscribe RMS Limiter Speaker Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/{channel}/rmsLimiter/gainReduction\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: subscribe_rms_limiter_total_gain_reduction
  label: Subscribe RMS Limiter Protection Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/{channel}/rmsLimiter/totalGainReduction\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

# --- Peak Limiter (per channel) ---
- id: set_peak_limiter_enable
  label: Set Peak Limiter Enable
  kind: action
  command: "set /amp/channels/{channel}/peakLimiter/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_peak_limiter_threshold
  label: Set Peak Limiter Threshold
  kind: action
  command: "set /amp/channels/{channel}/peakLimiter/threshold {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB (14.0..198.0)

- id: set_peak_limiter_attack
  label: Set Peak Limiter Attack
  kind: action
  command: "set /amp/channels/{channel}/peakLimiter/attackTime {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: ms (1.0..1000.0)

- id: set_peak_limiter_release
  label: Set Peak Limiter Release
  kind: action
  command: "set /amp/channels/{channel}/peakLimiter/releaseTime {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: ms (1.0..1000.0)

- id: subscribe_peak_limiter_gain_reduction
  label: Subscribe Peak Limiter Speaker Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/{channel}/peakLimiter/gainReduction\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: subscribe_peak_limiter_total_gain_reduction
  label: Subscribe Peak Limiter Protection Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/{channel}/peakLimiter/totalGainReduction\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

# --- Output (per channel) ---
- id: get_output_channel_name
  label: Get Output Channel Name
  kind: query
  command: "get /amp/channels/{channel}/output/name\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_output_channel_name
  label: Set Output Channel Name
  kind: action
  command: "set /amp/channels/{channel}/output/name {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: Channel name (e.g. "Bar Speakers")

- id: set_output_channel_enable
  label: Set Output Channel Ready Enable
  kind: action
  command: "set /amp/channels/{channel}/output/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_output_channel_mute
  label: Set Output Channel Mute
  kind: action
  command: "set /amp/channels/{channel}/output/mute \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: set_output_channel_fader
  label: Set Output Channel Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/{channel}/output/fader {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: dB attenuation

- id: set_output_channel_hi_z_lo_z
  label: Set Output Channel Hi-Z Low-Z Mode
  kind: action
  command: "set /amp/channels/{channel}/output/hiZLoZ \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "HiZ-70V" | "HiZ-100V" | "LoZ"

- id: set_output_channel_hi_z_hpf_frequency
  label: Set Output Channel Hi-Z Mode High Pass Frequency
  kind: action
  command: "set /amp/channels/{channel}/output/hiZHpfFrequency {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: integer
      description: Hz (35..5000)

- id: get_output_channel_fault
  label: Get Output Channel Fault
  kind: query
  command: "get /amp/channels/{channel}/output/fault\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_thermal
  label: Get Output Channel Thermal Fault
  kind: query
  command: "get /amp/channels/{channel}/output/thermal\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_limiting
  label: Get Output Channel Limiting
  kind: query
  command: "get /amp/channels/{channel}/output/limiting\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_clip
  label: Get Output Channel Clip
  kind: query
  command: "get /amp/channels/{channel}/output/clip\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_signal_detect
  label: Get Output Channel Signal Presence
  kind: query
  command: "get /amp/channels/{channel}/output/signalDetect\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_ready
  label: Get Output Channel Ready Indicator
  kind: query
  command: "get /amp/channels/{channel}/output/ready\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

# --- Levels (per channel) ---
- id: get_output_channel_level_db
  label: Get Output Channel Meter Level dBFS
  kind: query
  command: "get /amp/channels/{channel}/levels/level_db\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_level_volts
  label: Get Output Channel Level Volts RMS
  kind: query
  command: "get /amp/channels/{channel}/levels/level_volts\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: get_output_channel_level_watts
  label: Get Output Channel Level Watts RMS
  kind: query
  command: "get /amp/channels/{channel}/levels/level_watts\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

# --- Load Monitor (per channel) ---
- id: set_load_monitor_enable
  label: Set Load Monitor Enable
  kind: action
  command: "set /amp/channels/{channel}/loadMonitor/enable \"{value}\"\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: string
      description: "true" | "false"

- id: get_load_monitor_measured_impedance
  label: Get Load Monitor Measured Impedance
  kind: query
  command: "get /amp/channels/{channel}/loadMonitor/measuredImpedance\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)

- id: set_load_monitor_high_limit
  label: Set Load Monitor High Limit
  kind: action
  command: "set /amp/channels/{channel}/loadMonitor/highLimit {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: Ohms (8.0..250.0)

- id: set_load_monitor_low_limit
  label: Set Load Monitor Low Limit
  kind: action
  command: "set /amp/channels/{channel}/loadMonitor/lowLimit {value}\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: value
      type: number
      description: Ohms (1.0..250.0)

- id: get_load_monitor_status
  label: Get Load Monitor Status
  kind: query
  command: "get /amp/channels/{channel}/loadMonitor/status\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
```

## Feedbacks
```yaml
# One entry per observable state or query response. Values mirror the source.
- id: ac_line_voltage
  type: number
  values: null
  units: V
- id: ac_line_current
  type: number
  values: null
  units: A
- id: ac_line_watts
  type: number
  values: null
  units: W
- id: power_supply_fault
  type: enum
  values: [true, false]
- id: power_supply_thermal
  type: enum
  values: [true, false]
- id: power_supply_power_ok
  type: enum
  values: [true, false]
- id: power_supply_line_warning
  type: enum
  values: [true, false]
- id: signal_generator_type
  type: enum
  values: ["Pink Noise", "White Noise", "Tone"]
- id: signal_generator_frequency
  type: integer
  values: null
  units: Hz
- id: primary_input_source
  type: enum
  values: ["Analog 1", "Analog 2", "Analog 1+2", "Analog 3", "Analog 4", "Analog 3+4", "Analog 5", "Analog 6", "Analog 5+6", "Analog 7", "Analog 8", "Analog 7+8", "Dante 1", "Dante 2", "Dante 1+2", "Dante 3", "Dante 4", "Dante 3+4", "Dante 5", "Dante 6", "Dante 5+6", "Dante 7", "Dante 8", "Dante 7+8"]
- id: primary_fader
  type: number
  values: null
  units: dB
- id: primary_level
  type: number
  values: null
  units: dBFS
- id: primary_signal_detect
  type: enum
  values: [true, false]
- id: primary_clip
  type: enum
  values: [true, false]
- id: secondary_input_source
  type: enum
  values: ["Analog 1", "Analog 2", "Analog 1+2", "Analog 3", "Analog 4", "Analog 3+4", "Analog 5", "Analog 6", "Analog 5+6", "Analog 7", "Analog 8", "Analog 7+8", "Dante 1", "Dante 2", "Dante 1+2", "Dante 3", "Dante 4", "Dante 3+4", "Dante 5", "Dante 6", "Dante 5+6", "Dante 7", "Dante 8", "Dante 7+8", "None"]
- id: secondary_signal_detect
  type: enum
  values: [true, false]
- id: secondary_clip
  type: enum
  values: [true, false]
- id: input_signal_detect
  type: enum
  values: [true, false]
- id: input_clip
  type: enum
  values: [true, false]
- id: signal_priority_mode
  type: enum
  values: ["Override", "Backup"]
- id: lowpass_filter_type
  type: enum
  values: ["Butterworth 6dB/oct", "Butterworth 12dB/oct", "Butterworth 18dB/oct", "Butterworth 24dB/oct", "Butterworth 48dB/oct", "Linkwitz-Riley 24dB/oct", "Linkwitz-Riley 48dB/oct", "Bessel 6dB/oct", "Bessel 12dB/oct", "Bessel 18dB/oct", "Bessel 24dB/oct", "Bessel 48dB/oct"]
- id: highpass_filter_type
  type: enum
  values: ["Butterworth 6dB/oct", "Butterworth 12dB/oct", "Butterworth 18dB/oct", "Butterworth 24dB/oct", "Butterworth 48dB/oct", "Linkwitz-Riley 24dB/oct", "Linkwitz-Riley 48dB/oct", "Bessel 6dB/oct", "Bessel 12dB/oct", "Bessel 18dB/oct", "Bessel 24dB/oct", "Bessel 48dB/oct"]
- id: output_eq_filter_type
  type: enum
  values: ["Parametric", "LP Shelf 6dB/oct", "HP Shelf 6dB/oct", "LP Shelf 12dB/oct", "HP Shelf 12dB/oct"]
- id: output_channel_mute
  type: enum
  values: [true, false]
- id: output_channel_hi_z_lo_z
  type: enum
  values: ["HiZ-70V", "HiZ-100V", "LoZ"]
- id: output_channel_fault
  type: enum
  values: [true, false]
- id: output_channel_thermal
  type: enum
  values: [true, false]
- id: output_channel_limiting
  type: enum
  values: [true, false]
- id: output_channel_clip
  type: enum
  values: [true, false]
- id: output_channel_signal_detect
  type: enum
  values: [true, false]
- id: output_channel_ready
  type: enum
  values: [true, false]
- id: output_channel_level_db
  type: number
  values: null
  units: dBFS
- id: output_channel_level_volts
  type: number
  values: null
  units: V
- id: output_channel_level_watts
  type: number
  values: null
  units: W
- id: load_monitor_measured_impedance
  type: number
  values: null
  units: ohms
- id: load_monitor_status
  type: enum
  values: ["Ok", "Short", "Open", "Low Signal"]
```

## Variables
```yaml
# Settable parameters already captured as actions; this section is intentionally
# empty. Channel-addressed numeric values are set via the per-element actions.
```

## Events
```yaml
# Subscriptions produce asynchronous messages of the form
#   /amp/<path> <value>\n
# Example: subscribe /amp/channels/1/levels/level_db → repeated
#   /amp/channels/1/levels/level_db -52.78131103515625
# These stream on the persistent TCP connection for the lifetime of the
# subscription and stop after unsubscribe.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents no explicit safety warnings or interlock procedures.
# Auto-standby and limiter-related thresholds are operational, not safety locks.
```

## Notes
- All commands and responses are newline-delimited (`\n`, 0x0A); missing delimiter yields no response.
- Commands are case-insensitive; element URLs are case-sensitive.
- Strings/enums containing spaces must be wrapped in double quotes.
- Out-of-range numeric values are clamped silently (no error response).
- TCP control requires LEA Connect Series firmware 1.1.0.X or higher; older firmware is websocket-only.
- The amplifier accepts and emits commands on TCP port 4321 only.
- For Network Connect Series: only Analog inputs are available, and only up to the channel count of the unit (e.g. 354 lacks Analog 5–8).
- For Dante Connect Series: only Analog inputs up to the unit's input count are exposed; all 8 Dante inputs are available on every Dante model.
- The source explicitly states "more advanced commands available which are not listed" — request techsupport@leaprofessional.com for advanced API integration.
- Subscriptions require a persistent connection; an `unsubscribe` returns `OK` followed by the trailing in-flight messages.

<!-- UNRESOLVED: error response strings beyond `error: ...` examples not fully catalogued; documented behavior suffices for implementers. -->

## Provenance

```yaml
source_domains:
  - leaprofessional.com
source_urls:
  - https://leaprofessional.com/wp-content/uploads/2020/10/LEA-Open-API-TCP-Protocol-October-2020.pdf
  - https://leaprofessional.com/download/tcp-control-api/
  - https://leaprofessional.com/download/websocket-control-api/
  - https://leaprofessional.com/blog/open-api-first-look/
retrieved_at: 2026-05-07T07:02:51.556Z
last_checked_at: 2026-07-22T00:08:31.019Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:08:31.019Z
matched_actions: 108
action_count: 108
confidence: medium
summary: "All 108 spec actions map 1:1 to documented /amp element URLs with matching verbs and value ranges; only the example-only danteOnRamp element is unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /amp/channels/x/inputSelector/danteOnRamp
- "command catalogue here only documents elements explicitly listed in source; LEA notes \"more advanced commands available which are not listed\" — coverage is partial."
- "no multi-step sequences described in source"
- "source documents no explicit safety warnings or interlock procedures."
- "error response strings beyond `error: ...` examples not fully catalogued; documented behavior suffices for implementers."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
