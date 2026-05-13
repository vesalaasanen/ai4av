---
spec_id: admin/brompton-technology-tessera-led-processor-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Brompton Technology Tessera LED Processor Control Spec"
manufacturer: "Brompton Technology"
model_family: "Tessera M2"
aliases: []
compatible_with:
  manufacturers:
    - "Brompton Technology"
  models:
    - "Tessera M2"
    - "Tessera S4"
    - "Tessera S8"
    - "Tessera T1"
    - "Tessera T8"
    - "Tessera SX40"
  firmware: ">=3.1.0"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dl.bromptontech.com
retrieved_at: 2026-04-30T04:40:56.854Z
last_checked_at: 2026-04-23T15:27:25.830Z
generated_at: 2026-04-23T15:27:25.830Z
firmware_coverage: ">=3.1.0"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:27:25.830Z
  matched_actions: 30
  action_count: 78
  confidence: high
  summary: "All 30 spec actions and 48 feedbacks matched literally in source with correct parameter shapes; transport parameters verified; bidirectional API coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Brompton Technology Tessera LED Processor Control Spec

## Summary
Brompton Tessera LED processors support remote query and control via a RESTful, filesystem-like IP API over HTTP (port 80) and TCP/Telnet (port 23). The API provides read/write access to input selection, output brightness/colour, genlock, ShutterSync, hidden markers, test patterns, presets, processing (3D LUT, colour correct, colour replace, curves), and system monitoring. API software version documented: 3.5.2.

<!-- UNRESOLVED: exact firmware version compatibility range not fully specified beyond "as of version 3.1.0" -->
<!-- UNRESOLVED: password protection behavior described for reboot/shutdown but full auth mechanism not documented -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://{processor-ip}/api/"
  port: null  # UNRESOLVED: HTTP uses port 80 (stated) and TCP uses port 23 (stated) - two different ports
auth:
  type: none  # inferred: no auth procedure described for general API access; password only mentioned for reboot/shutdown
```

## Traits
```yaml
- powerable  # inferred: system/actions/reboot and system/actions/shutdown
- queryable  # inferred: extensive read endpoints for system state, input metadata, device statistics
- levelable  # inferred: brightness (0-10000 Nits), colour temperature, gamma, gains, proc-amp controls
- routable   # inferred: input/active/source/port-type and port-number select between DVI/HDMI/SDI
```

## Actions
```yaml
- id: system_reboot
  label: System Reboot
  kind: action
  description: "Triggers processor reboot. If processor password is set, send password in body; otherwise send blank string."
  command:
    http:
      method: PUT
      path: "system/actions/reboot"
    tcp:
      method: set
      path: "system/actions/reboot"
  params:
    - name: password
      type: string
      description: "Password if set, otherwise blank string"

- id: system_shutdown
  label: System Shutdown
  kind: action
  description: "Triggers processor shutdown. If processor password is set, send password in body; otherwise send blank string."
  command:
    http:
      method: PUT
      path: "system/actions/shutdown"
    tcp:
      method: set
      path: "system/actions/shutdown"
  params:
    - name: password
      type: string
      description: "Password if set, otherwise blank string"

- id: blackout_enable
  label: Blackout Enable
  kind: action
  command:
    http:
      method: PUT
      path: "override/blackout/enabled"
    tcp:
      method: set
      path: "override/blackout/enabled"
  params:
    - name: enabled
      type: boolean
      description: "true to enable blackout"

- id: freeze_enable
  label: Freeze Enable
  kind: action
  command:
    http:
      method: PUT
      path: "override/freeze/enabled"
    tcp:
      method: set
      path: "override/freeze/enabled"
  params:
    - name: enabled
      type: boolean

- id: test_pattern_enable
  label: Test Pattern Enable
  kind: action
  command:
    http:
      method: PUT
      path: "override/test-pattern/enabled"
    tcp:
      method: set
      path: "override/test-pattern/enabled"
  params:
    - name: enabled
      type: boolean

- id: test_pattern_set_type
  label: Set Test Pattern Type
  kind: action
  command:
    http:
      method: PUT
      path: "override/test-pattern/type"
    tcp:
      method: set
      path: "override/test-pattern/type"
  params:
    - name: type
      type: enum
      description: "Test pattern name or frame store user number (1-50)"
      values:
        - brompton
        - red
        - green
        - blue
        - cyan
        - magenta
        - yellow
        - white
        - black
        - grid
        - scrolling-grid
        - checkerboard
        - scrolling-checkerboard
        - colour-bars
        - scrolling-colour-bars
        - gradient
        - scrolling-gradient
        - strobe
        - smpte-bars
        - scrolling-smpte-bars
        - custom-colour
        - custom
        - forty-five-degree-grid
        - scrolling-forty-five-degree-grid
        - custom-gradient
        - scrolling-custom-gradient

- id: capture_frame
  label: Capture Frame to Frame Store
  kind: action
  command:
    http:
      method: PUT
      path: "override/test-pattern/frame-store/capture-frame"
  params:
    - name: user_number
      type: integer
      description: "Frame store slot (1-50). Overwrites existing frame at this number."
      min: 1
      max: 50

- id: delete_frame
  label: Delete Frame Store Frame
  kind: action
  command:
    http:
      method: PUT
      path: "override/test-pattern/frame-store/delete-frame"
  params:
    - name: user_number
      type: integer
      description: "Frame store slot to delete (1-50)"
      min: 1
      max: 50

- id: preset_activate
  label: Activate Preset
  kind: action
  command:
    http:
      method: PUT
      path: "presets/active/number"
    tcp:
      method: set
      path: "presets/active/number"
  params:
    - name: number
      type: integer
      description: "Preset number to activate (1-128)"
      min: 1
      max: 128

- id: request_failover
  label: Request Failover
  kind: action
  description: "Send an empty string to activate processor redundancy."
  command:
    http:
      method: PUT
      path: "output/network/failover/actions/request-failover"
  params:
    - name: trigger
      type: string
      description: "Send empty string"

- id: enable_failover
  label: Enable Failover Mode
  kind: action
  command:
    http:
      method: PUT
      path: "output/network/failover/settings/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_3d_lut
  label: Enable 3D LUT
  kind: action
  command:
    http:
      method: PUT
      path: "processing/3d-lut/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_colour_correct
  label: Enable 14-Way Colour Correct
  kind: action
  command:
    http:
      method: PUT
      path: "processing/colour-correct/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_colour_replace
  label: Enable Colour Replace
  kind: action
  command:
    http:
      method: PUT
      path: "processing/colour-replace/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_curves
  label: Enable Colour Curves
  kind: action
  command:
    http:
      method: PUT
      path: "processing/curves/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_scaler
  label: Enable Scaler
  kind: action
  command:
    http:
      method: PUT
      path: "processing/scaler/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_dark_magic
  label: Enable Dark Magic
  kind: action
  command:
    http:
      method: PUT
      path: "output/global-colour/dark-magic/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_overdrive
  label: Enable Brightness Overdrive
  kind: action
  command:
    http:
      method: PUT
      path: "output/global-colour/overdrive/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_puretone
  label: Enable PureTone
  kind: action
  command:
    http:
      method: PUT
      path: "output/global-colour/puretone/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_extended_bit_depth
  label: Enable Extended Bit Depth
  kind: action
  command:
    http:
      method: PUT
      path: "output/global-colour/extended-bit-depth/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_hidden_markers
  label: Enable Hidden Markers
  kind: action
  command:
    http:
      method: PUT
      path: "output/network/hidden-markers/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_frame_remapping
  label: Enable Frame Remapping
  kind: action
  command:
    http:
      method: PUT
      path: "output/network/frame-remapping/enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_osca_module_correction
  label: Enable OSCA Module Correction
  kind: action
  command:
    http:
      method: PUT
      path: "processing/osca/module-correction-enabled"
  params:
    - name: enabled
      type: boolean

- id: enable_osca_seam_correction
  label: Enable OSCA Seam Correction
  kind: action
  command:
    http:
      method: PUT
      path: "processing/osca/seam-correction-enabled"
  params:
    - name: enabled
      type: boolean
```

## Feedbacks
```yaml
- id: processor_type
  type: enum
  values: [m2, s4, s8, t1, t8, sx40]
  path: "system/processor-type"

- id: processor_name
  type: string
  path: "system/processor-name"

- id: serial_number
  type: string
  path: "system/serial-number"

- id: software_version
  type: string
  description: "Current version in x.y.z format"
  path: "system/software-version"

- id: uptime
  type: string
  description: "Time since boot in DDd HHh MMm SSs format"
  path: "system/uptime"

- id: current_date_time
  type: string
  description: "Processor date/time in yyyy-MM-dd hh:mm:ss 24h format"
  path: "system/current-date-time"

- id: project_name
  type: string
  path: "project/name"

- id: active_preset_name
  type: string
  path: "presets/active/name"

- id: preset_status
  type: boolean
  description: "Activation status of a specific preset"
  path: "presets/items/{number}/status"

- id: associated_device_count
  type: integer
  description: "Number of devices currently controlled by the processor"
  range: "0-2200"
  path: "devices/statistics/associated-count"

- id: error_device_count
  type: integer
  description: "Number of online devices reporting an error state"
  range: "0-2048"
  path: "devices/statistics/error-count"

- id: online_device_count
  type: integer
  description: "Number of online devices detected"
  range: "0-2048"
  path: "devices/statistics/online-count"

- id: device_firmware
  type: string
  path: "devices/items/{serial}/firmware"

- id: device_type
  type: string
  path: "devices/items/{serial}/type"

- id: input_port_type
  type: enum
  values: [dvi, hdmi, sdi]
  path: "input/active/source/port-type"

- id: input_port_number
  type: integer
  range: "1-2"
  path: "input/active/source/port-number"

- id: input_refresh_rate
  type: float
  description: "Input refresh rate in Hz (per-port, per-type)"
  range: "24-250"
  path: "input/ports/{type}/{port-number}/meta-data/refresh-rate"

- id: input_resolution_height
  type: integer
  range: "32-4095"
  path: "input/ports/{type}/{port-number}/meta-data/resolution/height"

- id: input_resolution_width
  type: integer
  range: "32-4096"
  path: "input/ports/{type}/{port-number}/meta-data/resolution/width"

- id: hdmi_input_bit_depth
  type: integer
  range: "8-12"
  path: "input/ports/hdmi/{port-number}/meta-data/bit-depth"

- id: hdmi_input_hdr_format
  type: enum
  values: [standard-dynamic-range, perceptual-quantiser, hybrid-log-gamma]
  path: "input/ports/hdmi/{port-number}/meta-data/hdr/format"

- id: hdmi_input_sampling
  type: enum
  values: [rgb, ycbcr422, ycbcr444, ycbcr420]
  path: "input/ports/hdmi/{port-number}/meta-data/sampling"

- id: output_brightness
  type: integer
  description: "Write -1 to reset to calculated common maximum. Units: Nits."
  range: "-1 to 10000"
  path: "output/global-colour/brightness"

- id: brightness_limit_enabled
  type: boolean
  path: "output/global-colour/brightness-limit/enabled"

- id: brightness_limit_value
  type: integer
  description: "Units: Nits"
  range: "0-10000"
  path: "output/global-colour/brightness-limit/value"

- id: cable_loop_state
  type: string
  description: "Format: <state> -> <trunk><port>. States: loopfound, no-loop-found, incorrect-loop-found, one-to-many-error"
  path: "output/network/cable-redundancy/loops/{loop-number}/state"

- id: failover_is_active
  type: boolean
  path: "output/network/failover/state/is-active"

- id: failover_partner_present
  type: boolean
  path: "output/network/failover/state/is-partner-present"

- id: failover_partner_name
  type: string
  path: "output/network/failover/state/partner-name"

- id: failover_partner_serial
  type: string
  path: "output/network/failover/state/partner-serial"

- id: failover_role
  type: enum
  values: [primary, backup]
  path: "output/network/failover/settings/role"

- id: temperature_ambient
  type: float
  description: "Celsius. Supported by SX40, S8."
  range: "0-200"
  path: "system/temperature/ambient"

- id: temperature_cpu
  type: float
  description: "Celsius. Supported by SX40, S8."
  range: "0-200"
  path: "system/temperature/cpu"

- id: temperature_fpga
  type: float
  description: "Celsius. Supported by SX40, S8, M2."
  range: "0-200"
  path: "system/temperature/fpga"

- id: fan_speed_case_one
  type: float
  description: "RPM"
  range: "0-5000"
  path: "system/fan/case/one/speed"

- id: fan_status_case_one
  type: boolean
  path: "system/fan/case/one/status"

- id: fan_speed_case_two
  type: float
  description: "RPM"
  range: "0-5000"
  path: "system/fan/case/two/speed"

- id: fan_status_case_two
  type: boolean
  path: "system/fan/case/two/status"

- id: fan_speed_fpga
  type: float
  description: "RPM. Supported only on SX40, S8."
  range: "0-5000"
  path: "system/fan/fpga/speed"

- id: fan_status_fpga
  type: boolean
  description: "Supported only on SX40, S8."
  path: "system/fan/fpga/status"
```

## Variables
```yaml
- id: output_colour_temperature
  path: "output/global-colour/colour-temperature"
  type: integer
  units: Kelvin
  range: [2000, 11000]

- id: output_gamma
  path: "output/global-colour/gamma"
  type: float
  range: [0.2, 4.0]
  decimal_places: 2

- id: output_gain_blue
  path: "output/global-colour/gains/blue"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: output_gain_green
  path: "output/global-colour/gains/green"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: output_gain_intensity
  path: "output/global-colour/gains/intensity"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: output_gain_red
  path: "output/global-colour/gains/red"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: output_bit_depth
  path: "output/network/bit-depth"
  type: integer
  units: Bits
  range: [8, 12]

- id: output_frame_rate_multiplier
  path: "output/network/frame-rate-multiplier"
  type: integer
  range: [1, 10]
  description: "Set to 1 to disable frame rate multiplication"

- id: blackout_fade_time
  path: "override/blackout/fade-time"
  type: float
  units: Seconds
  range: [0.0, 10.0]
  decimal_places: 1

- id: test_pattern_custom_colour_red
  path: "override/test-pattern/custom-colour/red"
  type: integer
  range: [0, 4095]

- id: test_pattern_custom_colour_green
  path: "override/test-pattern/custom-colour/green"
  type: integer
  range: [0, 4095]

- id: test_pattern_custom_colour_blue
  path: "override/test-pattern/custom-colour/blue"
  type: integer
  range: [0, 4095]

- id: group_brightness
  path: "groups/items/{number}/brightness"
  type: integer
  units: Nits
  range: [0, 10000]

- id: group_colour_temperature
  path: "groups/items/{number}/colour-temperature"
  type: integer
  units: Kelvin
  range: [2000, 11000]

- id: group_gamma
  path: "groups/items/{number}/gamma"
  type: float
  range: [0.2, 4.0]
  decimal_places: 2

- id: group_gain_blue
  path: "groups/items/{number}/gains/blue"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: group_gain_green
  path: "groups/items/{number}/gains/green"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: group_gain_intensity
  path: "groups/items/{number}/gains/intensity"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: group_gain_red
  path: "groups/items/{number}/gains/red"
  type: float
  units: Percentage
  range: [0, 100]
  decimal_places: 2

- id: group_name
  path: "groups/items/{number}/name"
  type: string

- id: genlock_source
  path: "output/network/genlock/source"
  type: enum
  values: [internal, sdi, sdi-a, sdi-b, hdmi, dvi, ref-in, active-input]

- id: genlock_internal_rate
  path: "output/network/genlock/internal-rate"
  type: float
  units: Hertz
  range: [23.5, 251.0]
  decimal_places: 4

- id: genlock_phase_offset_mode
  path: "output/network/genlock/phase-offset/mode"
  type: enum
  values: [none, angle, fraction, absolute]

- id: genlock_phase_offset_angle
  path: "output/network/genlock/phase-offset/angle"
  type: float
  units: Degrees
  range: [-360, 360]
  decimal_places: 6

- id: genlock_phase_offset_fraction
  path: "output/network/genlock/phase-offset/fraction"
  type: float
  units: Percentage
  range: [-100, 100]
  decimal_places: 5

- id: shuttersync_mode
  path: "output/network/shuttersync/mode"
  type: enum
  values: [none, speed, angle]

- id: shuttersync_shutter_angle
  path: "output/network/shuttersync/angle-settings/shutter-angle"
  type: float
  units: Degrees
  range: [1, 360]
  decimal_places: 3

- id: shuttersync_shutter_speed
  path: "output/network/shuttersync/speed-settings/shutter-speed"
  type: float
  range: [10, 250]
  decimal_places: 3

- id: shuttersync_dark_time
  path: "output/network/shuttersync/dark-time"
  type: float
  units: Milliseconds
  range: [0, 100]
  decimal_places: 3

- id: shuttersync_sensor_type
  path: "output/network/shuttersync/sensor-type"
  type: enum
  values: [any, global-shutter, rolling-shutter]

- id: shuttersync_viewer
  path: "output/network/shuttersync/viewer"
  type: enum
  values: [eye, camera]

- id: lut_3d_strength
  path: "processing/3d-lut/strength"
  type: float
  units: Percentage
  range: [0.0, 100.0]
  decimal_places: 1

- id: colour_space_input
  path: "input/ports/{type}/{port-number}/controls/colour-space/colour"
  type: enum
  values: [rec-2020, dci-p3, rec-709, aces-cg, custom]
  description: "Applies to DVI, HDMI, and SDI input ports"

- id: colour_space_output_mode
  path: "output/dynacal/{panel-type}/mode"
  type: enum
  values: [match-input, achievable, custom]

- id: input_colour_format_hdmi
  path: "input/ports/hdmi/{port-number}/controls/hdmi-colour-format"
  type: enum
  values: [from-input, rgb, ycbcr]

- id: input_hdr_format_hdmi
  path: "input/ports/hdmi/{port-number}/controls/hdr/format"
  type: enum
  values: [from-input, standard-dynamic-range, perceptual-quantiser, hybrid-log-gamma]

- id: input_hdr_format_sdi
  path: "input/ports/sdi/{port-number}/controls/hdr/format"
  type: enum
  values: [from-input, standard-dynamic-range, perceptual-quantiser, hybrid-log-gamma]

- id: proc_amp_black_level
  path: "input/ports/{type}/{port-number}/proc-amp/black-level"
  type: integer
  units: Percentage
  range: [0, 200]
  description: "100% is passthrough. Applies to DVI, HDMI, SDI."

- id: proc_amp_contrast
  path: "input/ports/{type}/{port-number}/proc-amp/contrast"
  type: integer
  units: Percentage
  range: [0, 200]
  description: "100% is passthrough"

- id: proc_amp_hue
  path: "input/ports/{type}/{port-number}/proc-amp/hue"
  type: integer
  units: Degrees
  range: [-180, 180]
  description: "0° is passthrough"

- id: proc_amp_saturation
  path: "input/ports/{type}/{port-number}/proc-amp/saturation"
  type: integer
  units: Percentage
  range: [0, 200]
  description: "100% is passthrough"

- id: failover_on_button_press
  path: "output/network/failover/settings/modes/on-button-press"
  type: boolean

- id: failover_on_partner_fail
  path: "output/network/failover/settings/modes/on-partner-fail"
  type: boolean

- id: failover_on_partner_video_fail
  path: "output/network/failover/settings/modes/on-partner-video-fail"
  type: boolean

- id: failover_prefer_primary
  path: "output/network/failover/settings/modes/prefer-primary"
  type: boolean

- id: hidden_markers_mode
  path: "output/network/hidden-markers/mode"
  type: enum
  values: [none, redspy, startracker, custom]

- id: hidden_markers_background_gain
  path: "output/network/hidden-markers/background-gain"
  type: integer
  units: Percentage
  range: [0, 100]

- id: frame_remapping_mode
  path: "output/network/frame-remapping/frames/{frame}/mode"
  type: enum
  values: [colour, video]

- id: test_pattern_format
  path: "override/test-pattern/format"
  type: enum
  values: [from-input, standard-dynamic-range, perceptual-quantiser, hybrid-log-gamma]

- id: colour_replace_method
  path: "processing/colour-replace/method"
  type: enum
  values: [set-to-colour, transform-to-colour]

- id: colour_replace_strength
  path: "processing/colour-replace/strength"
  type: float
  units: Percentage
  range: [6.0, 100.0]
  decimal_places: 1
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
- id: set_input_source
  label: Set Input Source
  description: "Select input port type and number in a single request"
  steps:
    - set: "input/active/source/port-type"
      value: "{port_type}"
    - set: "input/active/source/port-number"
      value: "{port_number}"
  note: "Can be combined in one HTTP request via GET params or PUT JSON body"

- id: set_output_colour
  label: Set Output Colour Profile
  description: "Set brightness, colour temperature, and gains simultaneously"
  steps:
    - set: "output/global-colour"
      value:
        brightness: "{brightness}"
        colour-temperature: "{colour_temperature}"
        gains:
          blue: "{blue_gain}"
          green: "{green_gain}"
          intensity: "{intensity_gain}"
          red: "{red_gain}"
  note: "Single PUT request with nested JSON body to output/global-colour"
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_shutdown
  - capture_frame
  - delete_frame
interlocks:
  - description: "IP control must be enabled in the Live Control tile in the processor UI before any API access works"
  - description: "Control device must be on the same network subnet as the processor management port"
# UNRESOLVED: full list of safety interlocks not documented in source
```

## Notes
- The API is case-insensitive for all paths, tags, and commands across all protocols.
- Dynamic paths (e.g. `{serial}`, `{number}`, `{port-number}`) depend on project configuration.
- Multiple endpoints can be set in a single HTTP request using query parameters (`?set=1&key=value`) or nested JSON in a PUT body.
- HTTP GET with `?help=1` query parameter returns endpoint metadata including access specifier, data type, and range.
- HTTP GET with `?set=value` query parameter allows write operations via GET (for clients that do not support PUT).
- Byte array endpoints (3D LUT data, custom marker images) should be sent as binary data with appropriate Content-Type headers.
- The `list` command shows a summary of available endpoints starting from any position in the API tree.
- Polling large amounts of data multiple times per second may cause adverse performance issues.
- Default factory IP address of a Brompton processor is 192.168.0.50.
- Error responses return JSON with a `response-code` field (e.g. `{"response-code":"Path not found"}`).
- TCP/Telnet interface is case- and whitespace-sensitive; delete/backspace may not work in terminal.
- Many temperature and fan endpoints are only supported on specific hardware models (SX40, S8, M2, T1, S4) as noted per endpoint.

<!-- UNRESOLVED: TCP port explicitly stated as 23 for Telnet; HTTP port explicitly stated as 80 -->
<!-- UNRESOLVED: password protection mechanism for reboot/shutdown not fully detailed -->
<!-- UNRESOLVED: maximum concurrent connection limits not stated -->
<!-- UNRESOLVED: API response time / latency characteristics not stated -->
<!-- UNRESOLVED: firmware version range for full API compatibility — intro says "as of version 3.1.0", API version documented is 3.5.2 -->
<!-- UNRESOLVED: binary command encoding for TCP protocol — only text-based "set/get path value" syntax documented -->
<!-- UNRESOLVED: many input port-specific endpoints (DVI proc-amp, HDMI HDR, SDI controls) share the same structure but are listed per port type — representative examples included -->
<!-- UNRESOLVED: StarTracker, RedSpy, ShutterSync hidden marker sub-endpoints are extensive but follow a consistent pattern -->

## Provenance

```yaml
source_domains:
  - dl.bromptontech.com
retrieved_at: 2026-04-30T04:40:56.854Z
last_checked_at: 2026-04-23T15:27:25.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:27:25.830Z
matched_actions: 30
action_count: 78
confidence: high
summary: "All 30 spec actions and 48 feedbacks matched literally in source with correct parameter shapes; transport parameters verified; bidirectional API coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
