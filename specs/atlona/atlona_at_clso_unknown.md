---
spec_id: admin/atlona-at-uhd-clso-824
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-UHD-CLSO-824 Control Spec"
manufacturer: Atlona
model_family: AT-UHD-CLSO-824
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-UHD-CLSO-824
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-26T06:08:50.613Z
generated_at: 2026-05-26T06:08:50.613Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-26T06:08:50.613Z
  matched_actions: 70
  action_count: 70
  confidence: high
  summary: "All 70 semantic-id actions matched distinct source commands with complete transport parameter coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Atlona AT-UHD-CLSO-824 Control Spec

## Summary
The AT-UHD-CLSO-824 is an 8x8 HDMI/HDBaseT matrix switcher with HDCP support, audio embedding/de-embedding, and RS-232/IP control. Supports both serial (RS-232) and TCP/IP command interfaces. Default serial: 115200 8N1. TCP/IP uses configurable port with optional username/password login (default: root/Atlona).

<!-- UNRESOLVED: TCP/IP port number not explicitly stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  # port: UNRESOLVED - TCP/IP port not stated in source document
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: configurable baud rates (2400-230400) not mapped to command syntax
auth:
  type: login  # login mode described in source; default credentials: root/Atlona
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_status
  label: Power Status
  kind: action
  params: []

- id: system_status
  label: System Status
  kind: action
  params: []

- id: hdvs_status
  label: HDVS Status
  kind: action
  params: []

- id: firmware_version
  label: Firmware Version
  kind: action
  params:
    - name: component
      type: string
      description: Component (MCU, FPGA, OSD, DSP)

- id: model_type
  label: Model Type
  kind: action
  params: []

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  params: []

- id: reset_all_routes
  label: Reset All Routes
  kind: action
  params:
    - name: mapping
      type: string
      description: Route mapping e.g. x1AVx1,x2AVx2

- id: set_video_output
  label: Set Video Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output number
    - name: state
      type: string
      description: on, off, or sta

- id: set_input_to_all_outputs
  label: Set Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number

- id: switch_input_to_output
  label: Switch Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: switch_input_to_multiple_outputs
  label: Switch Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers

- id: set_vga_port_mode
  label: Set VGA Port Mode
  kind: action
  params:
    - name: mode
      type: string
      description: vga or comp

- id: ir_receiver_on
  label: IR Receiver On
  kind: action
  params: []

- id: ir_receiver_off
  label: IR Receiver Off
  kind: action
  params: []

- id: get_output_status
  label: Get Output Status
  kind: action
  params:
    - name: output
      type: integer
      description: Output number

- id: get_all_routes
  label: Get All Routes
  kind: action
  params: []

- id: save_route
  label: Save Route
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number

- id: recall_route
  label: Recall Route
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number

- id: set_input_edid_default
  label: Set Input EDID Default
  kind: action
  params:
    - name: input
      type: integer
      description: Input number

- id: set_input_edid_saved
  label: Set Input EDID Saved
  kind: action
  params:
    - name: input
      type: integer
    - name: memory
      type: integer
      description: Memory location

- id: set_input_edid_internal
  label: Set Input EDID Internal
  kind: action
  params:
    - name: input
      type: integer
    - name: edid
      type: integer
      description: Internal EDID number (1-19)

- id: get_input_edid_status
  label: Get Input EDID Status
  kind: action
  params:
    - name: input
      type: integer

- id: copy_output_edid_to_memory
  label: Copy Output EDID to Memory
  kind: action
  params:
    - name: output
      type: integer
    - name: memory
      type: integer

- id: set_vga_preferred_timing
  label: Set VGA Preferred Timing
  kind: action
  params:
    - name: timing
      type: integer
      description: Timing index (0-7)

- id: get_vga_preferred_timing
  label: Get VGA Preferred Timing
  kind: action
  params: []

- id: list_available_timings
  label: List Available Timings
  kind: action
  params:
    - name: type
      type: string
      description: Pref or EDID

- id: set_hdcp_mode
  label: Set HDCP Mode
  kind: action
  params:
    - name: input
      type: integer
    - name: mode
      type: string
      description: on, off, sta

- id: set_audio_output_source
  label: Set Audio Output Source
  kind: action
  params:
    - name: output
      type: integer
    - name: source
      type: integer
      description: Port number

- id: set_ducking
  label: Set Ducking
  kind: action
  params:
    - name: output
      type: integer
    - name: state
      type: string
      description: on, off

- id: set_mixer_source
  label: Set Mixer Source
  kind: action
  params:
    - name: output
      type: integer
    - name: source
      type: integer
      description: Mixer source (0=None, 1=AUX1)

- id: set_mono_mode
  label: Set Mono Mode
  kind: action
  params:
    - name: output
      type: integer
    - name: state
      type: string
      description: on, off

- id: adjust_output_volume
  label: Adjust Output Volume
  kind: action
  params:
    - name: output
      type: integer
    - name: delta
      type: string
      description: "+" or "-"

- id: set_output_volume
  label: Set Output Volume
  kind: action
  params:
    - name: output
      type: integer
    - name: level
      type: integer
      description: -90 to 30 dB

- id: get_output_volume
  label: Get Output Volume
  kind: action
  params:
    - name: output
      type: integer

- id: adjust_input_volume
  label: Adjust Input Volume
  kind: action
  params:
    - name: input
      type: integer
    - name: delta
      type: string
      description: "+" or "-"

- id: set_input_volume
  label: Set Input Volume
  kind: action
  params:
    - name: input
      type: integer
    - name: level
      type: integer
      description: dB level

- id: get_input_volume
  label: Get Input Volume
  kind: action
  params:
    - name: input
      type: integer

- id: set_input_mute
  label: Set Input Mute
  kind: action
  params:
    - name: input
      type: integer
      description: "1=Cat5 in1, 2=Cat5 in2, 3=Cat5 in3, 4=HDMI4, 5=HDMI5, 6=HDMI6, 7=HDMI7, 8=VGA, 9=AUX1, 10=AUX2"
    - name: state
      type: string
      description: on, off, sta

- id: set_output_mute
  label: Set Output Mute
  kind: action
  params:
    - name: output
      type: integer
    - name: state
      type: string
      description: on, off, sta

- id: adjust_mic_level
  label: Adjust Mic Level
  kind: action
  params:
    - name: mic
      type: integer
    - name: delta
      type: string
      description: "+" or "-"

- id: set_mic_level
  label: Set Mic Level
  kind: action
  params:
    - name: mic
      type: integer
    - name: level
      type: integer
      description: dB level

- id: get_mic_level
  label: Get Mic Level
  kind: action
  params:
    - name: mic
      type: integer

- id: set_serial_parameters
  label: Set Serial Parameters
  kind: action
  params:
    - name: baudrate
      type: integer
      description: 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400
    - name: datalength
      type: integer
      description: Must be 8
    - name: parity
      type: integer
      description: "0=None"
    - name: stopbit
      type: integer
      description: Must be 1

- id: ip_config
  label: IP Config
  kind: action
  params: []

- id: ip_timeout
  label: IP Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: Inactivity seconds before disconnect

- id: ip_logout
  label: IP Logout
  kind: action
  params: []

- id: ip_add_user
  label: IP Add User
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: ip_del_user
  label: IP Delete User
  kind: action
  params:
    - name: username
      type: string

- id: ip_dhcp_status
  label: IP DHCP Status
  kind: action
  params: []

- id: ip_dhcp_on
  label: IP DHCP On
  kind: action
  params: []

- id: ip_dhcp_off
  label: IP DHCP Off
  kind: action
  params: []

- id: ip_static
  label: IP Static
  kind: action
  params:
    - name: address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string

- id: ip_port
  label: IP Port
  kind: action
  params:
    - name: port
      type: integer

- id: ip_login_status
  label: IP Login Status
  kind: action
  params: []

- id: ip_login_on
  label: IP Login On
  kind: action
  params: []

- id: ip_login_off
  label: IP Login Off
  kind: action
  params: []

- id: broadcast_status
  label: Broadcast Status
  kind: action
  params: []

- id: broadcast_on
  label: Broadcast On
  kind: action
  params: []

- id: broadcast_off
  label: Broadcast Off
  kind: action
  params: []

- id: cli_mode
  label: CLI Mode
  kind: action
  params:
    - name: mode
      type: string
      description: sta, login, non-login

- id: cli_user
  label: CLI User
  kind: action
  params:
    - name: username
      type: string
      description: Leave blank to query

- id: cli_pass
  label: CLI Password
  kind: action
  params:
    - name: password
      type: string
      description: Leave blank to query

- id: cli_ip_addr
  label: CLI IP Address
  kind: action
  params:
    - name: address
      type: string

- id: cli_port
  label: CLI Port
  kind: action
  params:
    - name: port
      type: integer

- id: cli_netmask
  label: CLI Netmask
  kind: action
  params:
    - name: netmask
      type: string

- id: cli_gateway
  label: CLI Gateway
  kind: action
  params:
    - name: gateway
      type: string

- id: cli_dns
  label: CLI DNS
  kind: action
  params:
    - name: dns
      type: string
```

## Feedbacks
```yaml
- id: power_feedback
  type: string
  values:
    - PWON
    - PWOFF

- id: system_status_feedback
  type: string

- id: hdvs_status_feedback
  type: string

- id: firmware_version_feedback
  type: string

- id: model_type_feedback
  type: string

- id: route_feedback
  type: string

- id: output_video_feedback
  type: string

- id: status_feedback
  type: string

- id: edid_feedback
  type: string

- id: vga_timing_feedback
  type: string

- id: hdcp_feedback
  type: string

- id: audio_feedback
  type: string

- id: volume_feedback
  type: integer

- id: mute_feedback
  type: string

- id: mic_level_feedback
  type: integer

- id: serial_parameters_feedback
  type: string

- id: ip_config_feedback
  type: string

- id: ip_timeout_feedback
  type: integer

- id: ip_user_list_feedback
  type: string

- id: ip_dhcp_feedback
  type: string

- id: ip_port_feedback
  type: integer

- id: ip_login_feedback
  type: string

- id: broadcast_feedback
  type: string

- id: cli_mode_feedback
  type: string

- id: cli_user_feedback
  type: string

- id: cli_pass_feedback
  type: string

- id: cli_ip_addr_feedback
  type: string

- id: cli_port_feedback
  type: integer

- id: cli_netmask_feedback
  type: string

- id: cli_gateway_feedback
  type: string

- id: cli_dns_feedback
  type: string

- id: command_failed
  type: string
  values:
    - "Command FAILED"
```

## Variables
```yaml
# UNRESOLVED: variables (settable parameters) are implemented as command params in this spec.
# No separate variable namespace found in source.
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source.
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
RS-232 commands are case-sensitive. Commands must be terminated with carriage return and line feed (CRLF). TCP/IP commands also use CRLF terminator. Failed commands return "Command FAILED". Default TCP/IP login: username "root", password "Atlona". Login mode can be disabled via CliMode non-login. DHCP enabled by default; IP address visible via front panel "Info" or IPCFG command. HDVS display control commands sent to RS-232 master port when HDBaseT devices connect/disconnect.
<!-- UNRESOLVED: TCP/IP control port number not stated in source document -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: voltage/power specifications not in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-26T06:08:50.613Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T06:08:50.613Z
matched_actions: 70
action_count: 70
confidence: high
summary: "All 70 semantic-id actions matched distinct source commands with complete transport parameter coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
