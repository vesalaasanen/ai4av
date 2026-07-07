---
spec_id: admin/lea-124n
schema_version: ai4av-public-spec-v1
revision: 1
title: "LEA 124N Control Spec"
manufacturer: LEA
model_family: 124N
aliases: []
compatible_with:
  manufacturers:
    - LEA
  models:
    - 124N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - leaprofessional.com
source_urls:
  - https://leaprofessional.com/wp-content/uploads/2020/06/LEA-Open-API-TCP-Protocol-June-2020.pdf
  - https://leaprofessional.com/download/websocket-control-api/
  - https://leaprofessional.com/download/users-manual-network-connect-series/
  - https://leaprofessional.com/downloads/
retrieved_at: 2026-07-01T13:55:44.751Z
last_checked_at: 2026-07-07T11:46:01.098Z
generated_at: 2026-07-07T11:46:01.098Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec applies to LEA Connect Series broadly (Network and Dante Connect); per-channel URL uses \"x\" and input uses \"#\" placeholders that depend on the specific amplifier model. 124N is a 4-channel Network Connect Series amplifier. Source does not enumerate channel counts or per-model availability for each element — see Notes."
  - "source does not define multi-step macro sequences"
  - "source contains power-supply fault/thermal protection sensors but no explicit"
  - "source describes the protocol generically for all Connect Series models; device-specific channel count, available inputs/outputs, and per-model element availability for the 124N must be confirmed from LEA product documentation."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:46:01.098Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions matched verbatim to source URLs; transport parameters (TCP port 4321, no auth) verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# LEA 124N Control Spec

## Summary
Network Connect Series professional amplifier (4-channel, low-Z/Hi-Z). TCP/IP control protocol on port 4321 using ASCII command strings terminated by newline. Supports GET / SET / SUBSCRIBE / UNSUBSCRIBE against a hierarchical URL-based object/element namespace covering channel inputs, crossover, EQ, limiters, output, levels, load monitor, device info, power supply, auto-standby, and signal generator.

<!-- UNRESOLVED: spec applies to LEA Connect Series broadly (Network and Dante Connect); per-channel URL uses "x" and input uses "#" placeholders that depend on the specific amplifier model. 124N is a 4-channel Network Connect Series amplifier. Source does not enumerate channel counts or per-model availability for each element — see Notes. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4321
auth:
  type: none  # inferred: no auth procedure in source (doc states TCP works even if WebUI is password-protected)
```

## Traits
```yaml
- powerable       # inferred from output enable / channel-ready commands and auto-standby commands
- routable        # inferred from primary/secondary input source selection commands
- queryable       # inferred from GET commands returning state
- levelable       # inferred from fader, gain, EQ, and threshold control commands
```

## Actions
```yaml
- id: get_element
  label: Get Element Value
  kind: query
  command: "get <object/element>\n"
  params:
    - name: object_element
      type: string
      description: Object/element URL from the supported namespace

- id: set_element
  label: Set Element Value
  kind: action
  command: "set <object/element> <value>\n"
  params:
    - name: object_element
      type: string
      description: Object/element URL
    - name: value
      type: string
      description: Value to assign (string/enum values containing spaces must be enclosed in double quotes)

- id: subscribe_element
  label: Subscribe to Element Changes
  kind: action
  command: "subscribe <object/element>\n"
  params:
    - name: object_element
      type: string
      description: Object/element URL

- id: unsubscribe_element
  label: Unsubscribe from Element Changes
  kind: action
  command: "unsubscribe <object/element>\n"
  params:
    - name: object_element
      type: string
      description: Object/element URL

- id: set_device_name
  label: Set Device Name
  kind: action
  command: "set /amp/deviceInfo/deviceName <value>\n"
  params:
    - name: value
      type: string
      description: Free-form device name string

- id: set_venue_name
  label: Set Venue Name
  kind: action
  command: "set /amp/deviceInfo/venueName <value>\n"
  params:
    - name: value
      type: string
      description: Free-form venue name string

- id: get_model_id
  label: Get Model ID
  kind: query
  command: "get /amp/deviceInfo/modelID\n"
  params: []

- id: set_asset_tag_number
  label: Set Asset Tag Number
  kind: action
  command: "set /amp/deviceInfo/assetTagNumber <value>\n"
  params:
    - name: value
      type: string

- id: set_installer_name
  label: Set Installer Name
  kind: action
  command: "set /amp/deviceInfo/installerName <value>\n"
  params:
    - name: value
      type: string

- id: set_installer_contact_info
  label: Set Installer Contact Info
  kind: action
  command: "set /amp/deviceInfo/installerContactInfo <value>\n"
  params:
    - name: value
      type: string

- id: set_date_of_installation
  label: Set Date of Installation
  kind: action
  command: "set /amp/deviceInfo/dateOfInstallation <value>\n"
  params:
    - name: value
      type: string
      description: ISO 8601 timestamp (e.g. "2020-02-16T20:47:00.000Z")

- id: set_rack_name
  label: Set Rack Name
  kind: action
  command: "set /amp/deviceInfo/rackName <value>\n"
  params:
    - name: value
      type: string

- id: set_rack_position
  label: Set Rack Position
  kind: action
  command: "set /amp/deviceInfo/rackPosition <value>\n"
  params:
    - name: value
      type: string
      description: Free-form rack position string (e.g. "RU 1")

- id: get_ac_line_voltage
  label: Get AC Line Voltage RMS
  kind: query
  command: "get /amp/powerSupply/acLineVoltage\n"
  params: []

- id: get_ac_line_current
  label: Get AC Line Current RMS
  kind: query
  command: "get /amp/powerSupply/acLineCurrent\n"
  params: []

- id: get_ac_line_power
  label: Get AC Line Power Draw
  kind: query
  command: "get /amp/powerSupply/acLineWatts\n"
  params: []

- id: get_power_supply_fault
  label: Get Power Supply Fault Status
  kind: query
  command: "get /amp/powerSupply/fault\n"
  params: []

- id: get_power_supply_thermal
  label: Get Power Supply Thermal Protection Status
  kind: query
  command: "get /amp/powerSupply/thermal\n"
  params: []

- id: get_power_supply_power_ok
  label: Get Power Supply Power OK Status
  kind: query
  command: "get /amp/powerSupply/powerOk\n"
  params: []

- id: get_power_supply_line_warning
  label: Get AC Line Voltage Ok
  kind: query
  command: "get /amp/powerSupply/lineWarning\n"
  params: []

- id: set_auto_standby_enable
  label: Set Auto Standby Enable
  kind: action
  command: "set /amp/autoStandby/enable <value>\n"
  params:
    - name: value
      type: string
      description: '"true" or "false"'

- id: set_auto_standby_threshold
  label: Set Auto Standby Threshold
  kind: action
  command: "set /amp/autoStandby/threshold <value>\n"
  params:
    - name: value
      type: number
      description: Threshold in dBFS

- id: set_auto_standby_wait_time
  label: Set Auto Standby Wait Time
  kind: action
  command: "set /amp/autoStandby/timeToWait <value>\n"
  params:
    - name: value
      type: integer
      description: Minutes (1 through 240)

- id: set_signal_generator_type
  label: Set Signal Generator Type
  kind: action
  command: "set /amp/signalGenerator/type <value>\n"
  params:
    - name: value
      type: enum
      description: '"Pink Noise", "White Noise", or "Tone"'

- id: set_signal_generator_frequency
  label: Set Signal Generator Tone Frequency
  kind: action
  command: "set /amp/signalGenerator/frequency <value>\n"
  params:
    - name: value
      type: integer
      description: Hz (20 through 20000)

- id: set_analog_input_sensitivity
  label: Set Analog Input Sensitivity
  kind: action
  command: "set /amp/inputs/analog/<input>/sensitivity <value>\n"
  params:
    - name: input
      type: integer
      description: Input number
    - name: value
      type: enum
      description: '"26dB" or "34dB"'

- id: set_primary_input_source
  label: Set Primary Input Source
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/primary <value>\n"
  params:
    - name: channel
      type: integer
      description: Channel number (1-4 on 124N)
    - name: value
      type: enum
      description: Analog or Dante source string (Network Connect Series supports Analog inputs only)

- id: get_primary_input_source
  label: Get Primary Input Source
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/primary\n"
  params:
    - name: channel
      type: integer

- id: set_primary_fader
  label: Set Primary Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/primaryFader <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: dB (-80 through 0)

- id: get_primary_fader
  label: Get Primary Gain Attenuation Fader
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/primaryFader\n"
  params:
    - name: channel
      type: integer

- id: subscribe_primary_input_meter
  label: Subscribe to Primary Input Meter
  kind: action
  command: "subscribe /amp/channels/<channel>/inputSelector/primaryLevel\n"
  params:
    - name: channel
      type: integer

- id: get_primary_signal_detect
  label: Get Primary Input Signal Present
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/primarySignalDetect\n"
  params:
    - name: channel
      type: integer

- id: subscribe_primary_clip
  label: Subscribe to Primary Input Clip Indicator
  kind: action
  command: "subscribe /amp/channels/<channel>/inputSelector/primaryClip\n"
  params:
    - name: channel
      type: integer

- id: set_primary_threshold
  label: Set Primary Input Signal Override Threshold
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/primaryThreshold <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: dB (-80 through 0)

- id: set_secondary_input_source
  label: Set Secondary Input Source
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/secondary <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: Analog, Dante source string, or "None"

- id: get_secondary_input_source
  label: Get Secondary Input Source
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/secondary\n"
  params:
    - name: channel
      type: integer

- id: set_secondary_fader
  label: Set Secondary Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/secondaryFader <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: dB (-80 through 0)

- id: get_secondary_fader
  label: Get Secondary Gain Attenuation Fader
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/secondaryFader\n"
  params:
    - name: channel
      type: integer

- id: subscribe_secondary_input_meter
  label: Subscribe to Secondary Input Meter
  kind: action
  command: "subscribe /amp/channels/<channel>/inputSelector/secondaryLevel\n"
  params:
    - name: channel
      type: integer

- id: get_secondary_signal_detect
  label: Get Secondary Input Signal Present
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/secondarySignalDetect\n"
  params:
    - name: channel
      type: integer

- id: subscribe_secondary_clip
  label: Subscribe to Secondary Input Clip Indicator
  kind: action
  command: "subscribe /amp/channels/<channel>/inputSelector/secondaryClip\n"
  params:
    - name: channel
      type: integer

- id: set_secondary_threshold
  label: Set Secondary Input Signal Override Threshold
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/secondaryThreshold <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: dB (-80 through 0)

- id: get_input_signal_detect
  label: Get Input Signal Present (Primary+Secondary aggregate)
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/signalDetect\n"
  params:
    - name: channel
      type: integer

- id: subscribe_input_clip
  label: Subscribe to Input Clip Indicator (aggregate)
  kind: action
  command: "subscribe /amp/channels/<channel>/inputSelector/clip\n"
  params:
    - name: channel
      type: integer

- id: set_input_priority_mode
  label: Set Input Signal Priority Override Mode
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/mode <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"Override" (Auto Override Primary) or "Backup" (Signal Sensing Override)'

- id: set_signal_generator_channel_enable
  label: Set Signal Generator Channel Enable
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/signalGeneratorEnable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_signal_generator_channel_fader
  label: Set Signal Generator Channel Fader
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/signalGeneratorFader <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: dB (-80 through 0)

- id: set_dante_on_ramp
  label: Set Dante On Ramp
  kind: action
  command: "set /amp/channels/<channel>/inputSelector/danteOnRamp <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"Post Crossover", "Analog Input", etc. (Network Connect Series typically not applicable)'

- id: get_dante_on_ramp
  label: Get Dante On Ramp
  kind: query
  command: "get /amp/channels/<channel>/inputSelector/danteOnRamp\n"
  params:
    - name: channel
      type: integer

- id: set_crossover_gain
  label: Set Crossover Gain
  kind: action
  command: "set /amp/channels/<channel>/crossover/bandGainAndDelay/gain <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: dB (-15.0 through 15.0)

- id: set_crossover_delay
  label: Set Crossover Delay
  kind: action
  command: "set /amp/channels/<channel>/crossover/bandGainAndDelay/delay <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: ms (0.0 through 100.0)

- id: set_crossover_polarity
  label: Set Crossover Polarity
  kind: action
  command: "set /amp/channels/<channel>/crossover/bandGainAndDelay/invert <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" (negative) or "false"'

- id: set_crossover_lowpass_enable
  label: Set Crossover Low Pass Filter Enable
  kind: action
  command: "set /amp/channels/<channel>/crossover/lowPassFilter/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_crossover_lowpass_type
  label: Set Crossover Low Pass Filter Type
  kind: action
  command: "set /amp/channels/<channel>/crossover/lowPassFilter/type <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: Filter type string (Butterworth/Linkwitz-Riley/Bessel 6/12/18/24/48 dB/oct)

- id: set_crossover_lowpass_frequency
  label: Set Crossover Low Pass Filter Frequency
  kind: action
  command: "set /amp/channels/<channel>/crossover/lowPassFilter/frequency <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: Hz (20 through 20000)

- id: set_crossover_highpass_enable
  label: Set Crossover High Pass Filter Enable
  kind: action
  command: "set /amp/channels/<channel>/crossover/highPassFilter/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_crossover_highpass_type
  label: Set Crossover High Pass Filter Type
  kind: action
  command: "set /amp/channels/<channel>/crossover/highPassFilter/type <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: Filter type string (Butterworth/Linkwitz-Riley/Bessel 6/12/18/24/48 dB/oct)

- id: set_crossover_highpass_frequency
  label: Set Crossover High Pass Filter Frequency
  kind: action
  command: "set /amp/channels/<channel>/crossover/highPassFilter/frequency <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: Hz (20 through 20000)

- id: set_eq_filter_enable
  label: Set Output EQ Filter Enable
  kind: action
  command: "set /amp/channels/<channel>/outputEqFilters/<filter>/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: filter
      type: integer
      description: Filter number
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_eq_filter_type
  label: Set Output EQ Filter Type
  kind: action
  command: "set /amp/channels/<channel>/outputEqFilters/<filter>/type <value>\n"
  params:
    - name: channel
      type: integer
    - name: filter
      type: integer
    - name: value
      type: enum
      description: '"Parametric", "LP Shelf 6dB/oct", "HP Shelf 6dB/oct", "LP Shelf 12dB/oct", "HP Shelf 12dB/oct"'

- id: set_eq_filter_gain
  label: Set Output EQ Filter Gain
  kind: action
  command: "set /amp/channels/<channel>/outputEqFilters/<filter>/gain <value>\n"
  params:
    - name: channel
      type: integer
    - name: filter
      type: integer
    - name: value
      type: number
      description: dB (-15.0 through 15.0)

- id: set_eq_filter_frequency
  label: Set Output EQ Filter Frequency
  kind: action
  command: "set /amp/channels/<channel>/outputEqFilters/<filter>/frequency <value>\n"
  params:
    - name: channel
      type: integer
    - name: filter
      type: integer
    - name: value
      type: integer
      description: Hz (20 through 20000)

- id: set_eq_filter_q
  label: Set Output EQ Filter Q
  kind: action
  command: "set /amp/channels/<channel>/outputEqFilters/<filter>/q <value>\n"
  params:
    - name: channel
      type: integer
    - name: filter
      type: integer
    - name: value
      type: number
      description: Q (0.1 through 24.0)

- id: set_rms_limiter_enable
  label: Set RMS Limiter Enable
  kind: action
  command: "set /amp/channels/<channel>/rmsLimiter/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_rms_limiter_threshold
  label: Set RMS Limiter Threshold
  kind: action
  command: "set /amp/channels/<channel>/rmsLimiter/threshold <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: V (10.0 through 140.0)

- id: set_rms_limiter_attack
  label: Set RMS Limiter Attack Time
  kind: action
  command: "set /amp/channels/<channel>/rmsLimiter/attackTime <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: ms (1000.0 through 10000.0)

- id: set_rms_limiter_release
  label: Set RMS Limiter Release Time
  kind: action
  command: "set /amp/channels/<channel>/rmsLimiter/releaseTime <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: ms (1000.0 through 10000.0)

- id: subscribe_rms_limiter_gain_reduction
  label: Subscribe to RMS Limiter Speaker Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/<channel>/rmsLimiter/gainReduction\n"
  params:
    - name: channel
      type: integer

- id: subscribe_rms_limiter_total_gain_reduction
  label: Subscribe to RMS Limiter Protection Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/<channel>/rmsLimiter/totalGainReduction\n"
  params:
    - name: channel
      type: integer

- id: set_peak_limiter_enable
  label: Set Peak Limiter Enable
  kind: action
  command: "set /amp/channels/<channel>/peakLimiter/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_peak_limiter_threshold
  label: Set Peak Limiter Threshold
  kind: action
  command: "set /amp/channels/<channel>/peakLimiter/threshold <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: V (14.0 through 198.0)

- id: set_peak_limiter_attack
  label: Set Peak Limiter Attack Time
  kind: action
  command: "set /amp/channels/<channel>/peakLimiter/attackTime <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: ms (1.0 through 1000.0)

- id: set_peak_limiter_release
  label: Set Peak Limiter Release Time
  kind: action
  command: "set /amp/channels/<channel>/peakLimiter/releaseTime <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: ms (1.0 through 1000.0)

- id: subscribe_peak_limiter_gain_reduction
  label: Subscribe to Peak Limiter Speaker Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/<channel>/peakLimiter/gainReduction\n"
  params:
    - name: channel
      type: integer

- id: subscribe_peak_limiter_total_gain_reduction
  label: Subscribe to Peak Limiter Protection Limiter Reduction
  kind: action
  command: "subscribe /amp/channels/<channel>/peakLimiter/totalGainReduction\n"
  params:
    - name: channel
      type: integer

- id: set_output_name
  label: Set Output Channel Name
  kind: action
  command: "set /amp/channels/<channel>/output/name <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: string

- id: get_output_name
  label: Get Output Channel Name
  kind: query
  command: "get /amp/channels/<channel>/output/name\n"
  params:
    - name: channel
      type: integer

- id: set_output_enable
  label: Set Output Channel Ready Enable
  kind: action
  command: "set /amp/channels/<channel>/output/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: set_output_mute
  label: Set Output Channel Mute
  kind: action
  command: "set /amp/channels/<channel>/output/mute <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: get_output_mute
  label: Get Output Channel Mute
  kind: query
  command: "get /amp/channels/<channel>/output/mute\n"
  params:
    - name: channel
      type: integer

- id: set_output_fader
  label: Set Output Channel Gain Attenuation Fader
  kind: action
  command: "set /amp/channels/<channel>/output/fader <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: dB (-80.0 through 0.0)

- id: get_output_fader
  label: Get Output Channel Gain Attenuation Fader
  kind: query
  command: "get /amp/channels/<channel>/output/fader\n"
  params:
    - name: channel
      type: integer

- id: set_output_hiz_loz_mode
  label: Set Output Channel Hi-Z Low-Z Mode
  kind: action
  command: "set /amp/channels/<channel>/output/hiZLoZ <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"HiZ-70V", "HiZ-100V", or "LoZ"'

- id: set_output_hiz_hpf_frequency
  label: Set Output Channel Hi-Z Mode High Pass Frequency
  kind: action
  command: "set /amp/channels/<channel>/output/hiZHpfFrequency <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: Hz (35 through 5000)

- id: get_output_fault
  label: Get Output Channel Fault
  kind: query
  command: "get /amp/channels/<channel>/output/fault\n"
  params:
    - name: channel
      type: integer

- id: get_output_thermal
  label: Get Output Channel Thermal Fault
  kind: query
  command: "get /amp/channels/<channel>/output/thermal\n"
  params:
    - name: channel
      type: integer

- id: get_output_limiting
  label: Get Output Channel Limiting
  kind: query
  command: "get /amp/channels/<channel>/output/limiting\n"
  params:
    - name: channel
      type: integer

- id: get_output_clip
  label: Get Output Channel Clip
  kind: query
  command: "get /amp/channels/<channel>/output/clip\n"
  params:
    - name: channel
      type: integer

- id: get_output_signal_detect
  label: Get Output Channel Signal Presence
  kind: query
  command: "get /amp/channels/<channel>/output/signalDetect\n"
  params:
    - name: channel
      type: integer

- id: get_output_ready
  label: Get Output Channel Ready Indicator
  kind: query
  command: "get /amp/channels/<channel>/output/ready\n"
  params:
    - name: channel
      type: integer

- id: get_output_level_db
  label: Get Output Channel Meter Level dBFS
  kind: query
  command: "get /amp/channels/<channel>/levels/level_db\n"
  params:
    - name: channel
      type: integer

- id: get_output_level_volts
  label: Get Output Channel Level Volts RMS
  kind: query
  command: "get /amp/channels/<channel>/levels/level_volts\n"
  params:
    - name: channel
      type: integer

- id: get_output_level_watts
  label: Get Output Channel Level Watts RMS
  kind: query
  command: "get /amp/channels/<channel>/levels/level_watts\n"
  params:
    - name: channel
      type: integer

- id: set_load_monitor_enable
  label: Set Load Monitor Enable
  kind: action
  command: "set /amp/channels/<channel>/loadMonitor/enable <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: enum
      description: '"true" or "false"'

- id: get_load_monitor_measured_impedance
  label: Get Load Monitor Measured Impedance
  kind: query
  command: "get /amp/channels/<channel>/loadMonitor/measuredImpedance\n"
  params:
    - name: channel
      type: integer

- id: set_load_monitor_high_limit
  label: Set Load Monitor High Limit
  kind: action
  command: "set /amp/channels/<channel>/loadMonitor/highLimit <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: Ohms (8.0 through 250.0)

- id: set_load_monitor_low_limit
  label: Set Load Monitor Low Limit
  kind: action
  command: "set /amp/channels/<channel>/loadMonitor/lowLimit <value>\n"
  params:
    - name: channel
      type: integer
    - name: value
      type: number
      description: Ohms (1.0 through 250.0)

- id: get_load_monitor_status
  label: Get Load Monitor Status
  kind: query
  command: "get /amp/channels/<channel>/loadMonitor/status\n"
  params:
    - name: channel
      type: integer
```

## Feedbacks
```yaml
- id: ac_line_voltage_rms
  type: number
  description: AC line voltage in V (0.0-300.0)
- id: ac_line_current_rms
  type: number
  description: AC line current in A (0.0-100.0)
- id: ac_line_power_watts
  type: number
  description: AC line power draw in W (0.0-5000.0)
- id: power_supply_fault
  type: boolean
- id: power_supply_thermal
  type: boolean
- id: power_supply_power_ok
  type: boolean
- id: power_supply_line_warning
  type: boolean
- id: primary_signal_detect
  type: boolean
- id: primary_clip
  type: boolean
- id: primary_input_level_dbfs
  type: number
  description: dBFS (-80 to 0)
- id: secondary_signal_detect
  type: boolean
- id: secondary_clip
  type: boolean
- id: secondary_input_level_dbfs
  type: number
- id: input_signal_detect
  type: boolean
  description: Aggregate primary+secondary
- id: input_clip
  type: boolean
  description: Aggregate primary+secondary
- id: rms_limiter_speaker_gain_reduction
  type: number
  description: Active gain reduction from user-defined RMS limiter
- id: rms_limiter_total_gain_reduction
  type: number
  description: Total active gain reduction including internal protection
- id: peak_limiter_speaker_gain_reduction
  type: number
- id: peak_limiter_total_gain_reduction
  type: number
- id: output_fault
  type: boolean
- id: output_thermal
  type: boolean
- id: output_limiting
  type: boolean
- id: output_clip
  type: boolean
- id: output_signal_detect
  type: boolean
- id: output_ready
  type: boolean
- id: output_level_dbfs
  type: number
- id: output_level_volts_rms
  type: number
- id: output_level_watts_rms
  type: number
- id: load_monitor_measured_impedance
  type: number
  description: Ohms (0.0-250.0)
- id: load_monitor_status
  type: enum
  values: [Ok, Short, Open, Low Signal]
- id: ok_response
  type: enum
  values: [OK]
  description: Standard success response for SET and UNSUBSCRIBE
- id: error_response
  type: string
  description: Error messages begin with the prefix "error:"
```

## Variables
```yaml
# No additional settable scalar variables beyond what is captured in Actions.
```

## Events
```yaml
# SUBSCRIBE commands produce asynchronous notifications on the same TCP connection.
# Notification payload format mirrors the GET response: "<object/element> <value>\n".
# Examples:
#   /amp/channels/1/levels/level_db -52.78131103515625\n
#   /amp/channels/1/inputSelector/danteOnRamp "Post Crossover"\n
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains power-supply fault/thermal protection sensors but no explicit
# safety interlock procedures or confirmation requirements
```

## Notes
Source document covers the LEA Connect Series protocol (Network Connect and Dante Connect). The LEA 124N is a 4-channel Network Connect Series amplifier with no Dante inputs. Per the source, Network Connect Series supports only Analog inputs (limited to the number of channels on the amplifier) and Dante elements are not applicable to a 124N.

- TCP port: 4321 (verified). All messages are newline (0x0a) delimited. Out-of-range numeric values are clamped silently. Illegal commands produce `error: ...` responses.
- Auth: source states TCP communication works even if the WebUI is password-protected; no auth handshake is documented.
- Firmware: source states "LEA Connect Firmware version 1.1.0.29 and higher" supports TCP; earlier versions only support WebSocket. Per-device firmware for the 124N itself is not stated.
- For Network Connect Series, Dante-related elements (Dante sources, danteOnRamp) are not applicable.
- Crossover high-pass filter URL is sometimes given with `lowPassFilter` in the source's HP filter type example — likely a doc typo; URL follows element name `highPassFilter`.
- `/amp/deviceInfo/venueName` example response in source shows a model ID value (`"Connect Series Model 704D"`) — likely doc typo; URL is `/amp/deviceInfo/modelID` per the "Model ID" section.
- `get /amp/powerSupply/fault` example response shows the `acLineWatts` URL — likely doc typo; expected response is the fault boolean value.
- `get /amp/channels/1/loadMonitor/measuredImpedance` example response shows `/amp/channels/1/level` — likely doc typo; expected response is the impedance value.
- `get /amp/channels/1/loadMonitor/status` example response shows `/amp/channels/1/level` — likely doc typo.

<!-- UNRESOLVED: source describes the protocol generically for all Connect Series models; device-specific channel count, available inputs/outputs, and per-model element availability for the 124N must be confirmed from LEA product documentation. -->

## Provenance

```yaml
source_domains:
  - leaprofessional.com
source_urls:
  - https://leaprofessional.com/wp-content/uploads/2020/06/LEA-Open-API-TCP-Protocol-June-2020.pdf
  - https://leaprofessional.com/download/websocket-control-api/
  - https://leaprofessional.com/download/users-manual-network-connect-series/
  - https://leaprofessional.com/downloads/
retrieved_at: 2026-07-01T13:55:44.751Z
last_checked_at: 2026-07-07T11:46:01.098Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:46:01.098Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions matched verbatim to source URLs; transport parameters (TCP port 4321, no auth) verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec applies to LEA Connect Series broadly (Network and Dante Connect); per-channel URL uses \"x\" and input uses \"#\" placeholders that depend on the specific amplifier model. 124N is a 4-channel Network Connect Series amplifier. Source does not enumerate channel counts or per-model availability for each element — see Notes."
- "source does not define multi-step macro sequences"
- "source contains power-supply fault/thermal protection sensors but no explicit"
- "source describes the protocol generically for all Connect Series models; device-specific channel count, available inputs/outputs, and per-model element availability for the 124N must be confirmed from LEA product documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
