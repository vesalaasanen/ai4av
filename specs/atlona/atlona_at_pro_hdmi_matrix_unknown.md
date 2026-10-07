---
spec_id: admin/atlona-at-pro5-mx810
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PRO5-MX810 Control Spec"
manufacturer: Atlona
model_family: AT-PRO5-MX810
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PRO5-MX810
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-PRO5-MX810_API.pdf
  - https://atlona.com/pdf/manuals/AT-PRO5-MX810.pdf
  - https://atlona.com/pdf/data_sheet/AT-PRO5-MX810_Spec.pdf
  - https://atlona.com/product/at-pro5-mx810/
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-05-22T15:23:34.834Z
last_checked_at: 2026-10-07T18:13:02.834Z
generated_at: 2026-10-07T18:13:02.834Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "no settable continuous parameters beyond those captured as actions"
  - "source does not document unsolicited push notifications or event subscriptions"
  - "source does not document safety interlock procedures or power-on sequencing"
  - "WebSocket connection lifecycle (ping/pong, reconnection) not documented"
  - "Telnet/SSH command format over those transports not documented — only JSON-RPC examples shown"
  - "error response format not documented"
  - "maximum concurrent connection limit not stated"
  - "firmware version compatibility range not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:13:02.834Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec methods (53 actions, 25 queries) match the source's 78-method catalogue for the AT-PRO5-MX810, and the declared transport values are supported. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Atlona AT-PRO5-MX810 Control Spec

## Summary
8×10 HDMI matrix switcher with HDBaseT extension, controlled via JSON-RPC 2.0 over WebSocket, Telnet, SSH, or RS-232. Supports video/audio routing, video wall, EDID management, HDCP, display control (CEC/RS-232), IR pass-through, and receiver management.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 80  # WS default; Telnet=23, SSH=22, WSS=443 also stated
  base_url: "ws://<IP>/ws"
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred from SystemStandby.Set, Platform.Reboot
- routable     # inferred from VideoSwitch.Set, AudioSwitch.Set
- queryable    # inferred from numerous .Get methods
- levelable    # inferred from AudioOutputVol.Set, ReceiverAnalogAudioVol.Set
```

## Actions
```yaml
- id: video_switch_set
  label: Route Video Input to Output
  kind: action
  method: VideoSwitch.Set
  params:
    - name: in
      type: string
      description: "Input source (in1...in8, none to mute)"
    - name: out
      type: string
      description: "Output destination (out1...out10, all)"

- id: audio_switch_set
  label: Route Audio Input to Output
  kind: action
  method: AudioSwitch.Set
  params:
    - name: audioin
      type: string
      description: "Audio input (in1...in8, none to mute)"
    - name: analogaudioout
      type: string
      description: "Analog audio output (out1...out8)"

- id: audio_output_mute_set
  label: Mute/Unmute Audio Output
  kind: action
  method: AudioOutputMute.Set
  params:
    - name: analogaudioout
      type: string
      description: "Output (out1...out8)"
    - name: mute
      type: boolean
      description: "true to mute, false to unmute"

- id: audio_output_vol_set
  label: Set Audio Output Volume
  kind: action
  method: AudioOutputVol.Set
  params:
    - name: analogaudioout
      type: string
      description: "Output (out1...out8)"
    - name: volume
      type: integer
      description: "Volume in dB (-80 to 0)"

- id: audio_switch_mode_set
  label: Set Audio Follow Video Mode
  kind: action
  method: AudioSwitchMode.Set
  params:
    - name: followvideo
      type: boolean
      description: "Enable/disable audio follows video"

- id: system_standby_set
  label: Set System Standby
  kind: action
  method: SystemStandby.Set
  params:
    - name: standby
      type: boolean
      description: "true for standby, false to wake"

- id: platform_reboot
  label: Reboot Device
  kind: action
  method: Platform.Reboot
  params: []

- id: platform_factory_reset
  label: Factory Reset
  kind: action
  method: Platform.FactoryReset
  params: []

- id: video_preset_save
  label: Save Video Preset
  kind: action
  method: VideoPresetSave
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_preset_load
  label: Load Video Preset
  kind: action
  method: VideoPresetLoad
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_preset_clear
  label: Clear Video Preset
  kind: action
  method: VideoPreset.Clear
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_preset_name_set
  label: Name Video Preset
  kind: action
  method: VideoPresetName.Set
  params:
    - name: preset
      type: string
      description: "Preset number (1...10)"
    - name: name
      type: string
      description: "Preset name (max 16 chars)"

- id: video_input_alias_set
  label: Set Video Input Alias
  kind: action
  method: VideoInputAlias.Set
  params:
    - name: port
      type: string
      description: "Input port (in1...in8)"
    - name: alias
      type: string
      description: "Alias name (max 16 chars)"

- id: video_output_alias_set
  label: Set Video Output Alias
  kind: action
  method: VideoOutputAlias.Set
  params:
    - name: port
      type: string
      description: "Output port (out1...out10)"
    - name: alias
      type: string
      description: "Alias name (max 16 chars)"

- id: video_hdmi_out_5v_set
  label: Set HDMI Output +5V
  kind: action
  method: VideoHDMIOut5V.Set
  params:
    - name: sink
      type: string
      description: "Output port (out1...out10)"
    - name: HDMIOut5V
      type: boolean
      description: "Enable/disable +5V when no signal"

- id: edid_input_set
  label: Assign EDID to Input
  kind: action
  method: EdidInput.Set
  params:
    - name: source
      type: string
      description: "Input (in1...in8)"
    - name: edidmode
      type: integer
      description: "EDID mode (1...26)"

- id: custom_edid_file_set
  label: Upload Custom EDID
  kind: action
  method: CustomEdidFile.Set
  params:
    - name: index
      type: integer
      description: "Memory slot (1...5)"
    - name: alias
      type: string
      description: "EDID name"
    - name: edid
      type: string
      description: "Raw 512-byte EDID data"

- id: custom_edid_file_clear
  label: Clear Custom EDID
  kind: action
  method: CustomEdidFile.Clear
  params:
    - name: index
      type: integer
      description: "Memory slot (1...5)"

- id: hdcp_compliant_set
  label: Set HDCP State
  kind: action
  method: HdcpCompliant.Set
  params:
    - name: source
      type: string
      description: "Input (in1...in8)"
    - name: hdcpCompliant
      type: boolean
      description: "Enable/disable HDCP"

- id: display_ctrl_cec_cmd_set
  label: Send Display CEC Command
  kind: action
  method: DisplayCtrlCecCmd.Set
  params:
    - name: port
      type: string
      description: "Extension port (out1...out8)"
    - name: cmd
      type: string
      description: "CEC command (poweron, poweroff, volumeup, volumedown)"

- id: display_ctrl_delay_set
  label: Set Display Auto-Off Delay
  kind: action
  method: DisplayCtrlDelay.Set
  params:
    - name: port
      type: string
      description: "Extension port"
    - name: AutocontrolDelay
      type: integer
      description: "Delay in minutes (1...38)"

- id: display_ctrl_rs232_set
  label: Configure Display RS-232
  kind: action
  method: DisplayCtrlRs232.Set
  params:
    - name: port
      type: string
      description: "Port (1...8)"
    - name: baudrate
      type: string
      description: "Baud rate (9600, 19200, 38400, 57600, 115200)"
    - name: parity
      type: string
      description: "Parity (none, even, odd, mark)"
    - name: dataBit
      type: string
      description: "Data bits (7, 8)"
    - name: stopBit
      type: string
      description: "Stop bits (0, 1)"

- id: display_ctrl_rs232_cmd_send
  label: Send RS-232 Command to Display
  kind: action
  method: DisplayCtrlRs232Cmd.Send
  params:
    - name: port
      type: string
      description: "Extension port (out1...out8)"
    - name: mode
      type: string
      description: "Mode (str, hex)"
    - name: data
      type: string
      description: "Command data"

- id: display_ctrl_store_cec_cmd_set
  label: Store Display CEC Command
  kind: action
  method: DisplayCtrlStoreCecCmd.Set
  params:
    - name: port
      type: string
      description: "Extension port (out1...out8)"
    - name: cmd
      type: string
      description: "CEC command type (poweron, poweroff, volumeup, volumedown)"
    - name: data
      type: string
      description: "CEC command bytes"

- id: display_power_on_auto_set
  label: Set Display Auto Power
  kind: action
  method: DisplayPowerOnAuto.Set
  params:
    - name: port
      type: string
      description: "Extension port (out1...out8)"
    - name: AutocontrolEnable
      type: boolean
      description: "Enable/disable auto power"

- id: local_ctrl_rs232_set
  label: Configure Local RS-232 Port
  kind: action
  method: LocalCtrlRs232.Set
  params:
    - name: port
      type: string
      description: "Port (out1...out8)"
    - name: baudrate
      type: string
      description: "Baud rate (9600, 19200, 38400, 57600, 115200)"
    - name: dataBit
      type: string
      description: "Data bits (7, 8)"
    - name: parity
      type: string
      description: "Parity (NONE, ODD, EVEN)"
    - name: stopBit
      type: string
      description: "Stop bits (1, 2)"

- id: extension_port_auto_sw_set
  label: Set Extension Port Auto-Switch
  kind: action
  method: ExtensionPortAutoSw.Set
  params:
    - name: port
      type: string
      description: "Extension port"
    - name: autoswitch
      type: boolean
      description: "Enable/disable auto copper/fiber detection"

- id: extension_port_ctrl_poe_set
  label: Set Extension Port PoE
  kind: action
  method: ExtensionPortCtrlPoe.Set
  params:
    - name: port
      type: string
      description: "Extension port"
    - name: PoEenable
      type: boolean
      description: "Enable/disable PoE"

- id: extension_port_switch_set
  label: Set Extension Port Copper/Fiber
  kind: action
  method: ExtensionPortSwitch.Set
  params:
    - name: port
      type: string
      description: "Extension port"
    - name: switch
      type: string
      description: "Port type (copper, fiber)"

- id: ir_ctrl_cmd_set
  label: Send IR Command
  kind: action
  method: IRCtrlCmd.Set
  params:
    - name: port
      type: string
      description: "Extension port (out1...out8)"
    - name: irdata
      type: string
      description: "IR data in Pronto code format"

- id: network_set
  label: Configure Network
  kind: action
  method: Network.Set
  params:
    - name: ip_mode
      type: string
      description: "IP mode (autoip, dhcp, static)"
    - name: ipaddr
      type: string
      description: "IP address"
    - name: netmask
      type: string
      description: "Subnet mask"
    - name: gateway
      type: string
      description: "Gateway address"

- id: network_hostname_set
  label: Set Hostname
  kind: action
  method: NetworkHostname.Set
  params:
    - name: hostname
      type: string
      description: "Hostname string (empty for default)"

- id: ssh_telnet_enable_set
  label: Enable/Disable SSH/Telnet
  kind: action
  method: SSHTelnetEnable.Set
  params:
    - name: enable
      type: boolean
      description: "true to enable, false to disable"

- id: tcp_proxy_enable_set
  label: Enable/Disable TCP Proxy
  kind: action
  method: TCPProxyEnable.Set
  params:
    - name: enable
      type: boolean
      description: "true to enable, false to disable"

- id: web_https_enable_set
  label: Enable/Disable HTTPS
  kind: action
  method: WebHttpsEnable.Set
  params:
    - name: enable
      type: boolean
      description: "true to enable, false to disable"

- id: system_blink_led_set
  label: Set LED Blink
  kind: action
  method: SystemBlinkLed.Set
  params:
    - name: enable
      type: boolean
      description: "Enable/disable front panel LED blinking"

- id: time_set
  label: Set System Time
  kind: action
  method: Time.Set
  params:
    - name: time
      type: string
      description: "Time as YYYY-MM-DD hh:mm:ss"

- id: time_ntp_set
  label: Configure NTP
  kind: action
  method: TimeNTP.Set
  params:
    - name: enabled
      type: boolean
      description: "Enable/disable NTP"
    - name: hostname
      type: string
      description: "NTP server hostname or IPv4"

- id: timezone_set
  label: Set Timezone
  kind: action
  method: TimeZone.Set
  params:
    - name: timezone
      type: string
      description: "Timezone as COUNTRY(CONTINENT)/CITY"

- id: video_wall_set
  label: Create Video Wall
  kind: action
  method: VideoWall.Set
  params:
    - name: walllayout
      type: string
      description: "Layout (2x2, 1x3, 2x4)"
    - name: routedinput
      type: string
      description: "Input source (in1...in8, none to mute)"
    - name: walloutput
      type: string
      description: "Comma-separated output ports (out1...out8)"

- id: video_wall_enable_set
  label: Enable/Disable Video Wall
  kind: action
  method: VideoWallEnable.Set
  params:
    - name: enable
      type: boolean
      description: "true to enable, false to disable"

- id: video_wall_mode_set
  label: Set Video Wall Display Mode
  kind: action
  method: VideoWallMode.Set
  params:
    - name: walllayout
      type: string
      description: "Layout (2x2, 1x3, 2x4)"
    - name: wallmode
      type: string
      description: "Mode (wall_genlock, wall_fastswitch)"

- id: video_wall_bezel_set
  label: Set Video Wall Bezel Compensation
  kind: action
  method: VideoWallBezel.Set
  params:
    - name: walllayout
      type: string
      description: "Layout (2x2, 1x3, 2x4)"
    - name: wallbezel
      type: string
      description: "Bezel mm as InnerW,OuterW,InnerH,OuterH"

- id: video_wall_resolution_set
  label: Set Video Wall Resolution
  kind: action
  method: VideoWallResolution.Set
  params:
    - name: walllayout
      type: string
      description: "Layout (2x2, 1x3, 2x4)"
    - name: wallresolution
      type: string
      description: "Resolution (Auto, 1280x720, 1920x1080, 3840x2160, 4096x2160, etc.)"

- id: video_wall_preset_save
  label: Save Video Wall Preset
  kind: action
  method: VideoWallPresetSave
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_wall_preset_load
  label: Load Video Wall Preset
  kind: action
  method: VideoWallPresetLoad
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_wall_preset_clear
  label: Clear Video Wall Preset
  kind: action
  method: VideoWallPreset.Clear
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"

- id: video_wall_preset_name_set
  label: Name Video Wall Preset
  kind: action
  method: VideoWallPresetName.Set
  params:
    - name: preset
      type: integer
      description: "Preset number (1...10)"
    - name: name
      type: string
      description: "Preset name (max 16 chars)"

- id: receiver_analog_audio_alias_set
  label: Set Receiver Audio Alias
  kind: action
  method: ReceiverAnalogAudioAlias.Set
  params:
    - name: port
      type: string
      description: "Extension port"
    - name: alias
      type: string
      description: "Alias name (max 16 chars)"

- id: receiver_analog_audio_mute_set
  label: Mute/Unmute Receiver Audio
  kind: action
  method: ReceiverAnalogAudioMute.Set
  params:
    - name: port
      type: string
      description: "Receiver output port"
    - name: mute
      type: boolean
      description: "true to mute, false to unmute"

- id: receiver_analog_audio_vol_set
  label: Set Receiver Audio Volume
  kind: action
  method: ReceiverAnalogAudioVol.Set
  params:
    - name: port
      type: string
      description: "Receiver output port"
    - name: volume
      type: integer
      description: "Volume in dBVU (-80 to 0)"

- id: receiver_display_resolution_set
  label: Set Receiver Display Resolution
  kind: action
  method: ReceiverDisplayResolution.Set
  params:
    - name: port
      type: string
      description: "Receiver port"
    - name: resolution
      type: string
      description: "Resolution (720P, 1080P, 2160P, 4096x2160, 1024x768, etc.)"

- id: receiver_display_mode_set
  label: Set Receiver Display Mode
  kind: action
  method: ReceiverDisplayMode.Set
  params:
    - name: port
      type: string
      description: "Receiver port"
    - name: displaymode
      type: string
      description: "Mode (genlock, genlock_scaling, fastswitch)"
```

## Feedbacks
```yaml
- id: audio_status
  label: Audio Status
  method: Audio.Get
  query_command: Audio.Get
  type: object
  description: "Audio status for each output including routed input, mute, volume"

- id: audio_input_format
  label: Audio Input Format
  method: AudioInputFormat.Get
  query_command: AudioInputFormat.Get
  type: string
  description: "Source audio format for specified input (e.g. PCM;48kHZ)"
  params:
    - name: input
      type: string
      description: "Input (in1...in8)"

- id: audio_out_format
  label: Audio Output Format
  method: AudioOutFormat.Get
  query_command: AudioOutFormat.Get
  type: string
  description: "Audio format for specified output"
  params:
    - name: output
      type: string
      description: "Output (out1...out8)"

- id: audio_switch_routing
  label: Audio Routing
  method: AudioSwitch.Get
  query_command: AudioSwitch.Get
  type: object
  description: "Audio routing for each output and follow-video mode"

- id: video_switch_routing
  label: Video Routing
  method: VideoSwitch.Get
  query_command: VideoSwitch.Get
  type: object
  description: "Current video routing state for each output"

- id: video_input_status
  label: Video Input Status
  method: VideoInputStatus.Get
  query_command: VideoInputStatus.Get
  type: object
  description: "Input connection, signal, video format, HDCP status"
  params:
    - name: input
      type: string
      description: "Input (in1...in8)"

- id: video_output_status
  label: Video Output Status
  method: VideoOutputStatus.Get
  query_command: VideoOutputStatus.Get
  type: object
  description: "Output connection, signal, video format, HDCP status"
  params:
    - name: output
      type: string
      description: "Output (out1...out10)"

- id: video_input_aliases
  label: Video Input Aliases
  method: VideoInputAlias.Get
  query_command: VideoInputAlias.Get
  type: array
  description: "Alias names for each video input"

- id: video_output_aliases
  label: Video Output Aliases
  method: VideoOutputAlias.Get
  query_command: VideoOutputAlias.Get
  type: array
  description: "Alias names for each video output"

- id: video_hdmi_out_5v
  label: HDMI Output +5V Status
  method: VideoHDMIOut5V.Get
  query_command: VideoHDMIOut5V.Get
  type: array
  description: "HDMI +5V status per output"

- id: video_preset_info
  label: Video Preset Info
  method: VideoPresetInfo.Get
  query_command: VideoPresetInfo.Get
  type: array
  description: "Names and info for all video presets"

- id: display_ctrl
  label: Display Control Settings
  method: DisplayCtrl.Get
  query_command: DisplayCtrl.Get
  type: object
  description: "Display control config for specified output"
  params:
    - name: output
      type: string
      description: "Output (out1...out8)"

- id: edid_input
  label: EDID Assignments
  method: EDIDInput.Get
  query_command: EDIDInput.Get
  type: array
  description: "Currently assigned EDID for all inputs"

- id: edid_sink_file
  label: Raw EDID Data
  method: EDIDSinkFile.Get
  query_command: EDIDSinkFile.Get
  type: object
  description: "Raw EDID data for specified EDID mode"
  params:
    - name: edidmode
      type: integer
      description: "EDID mode (1...26)"

- id: custom_edid_aliases
  label: Custom EDID Aliases
  method: CustomEdidAlias.Get
  query_command: CustomEdidAlias.Get
  type: array
  description: "Names of custom EDIDs from banks 21-26"

- id: hdcp_compliant_status
  label: HDCP Status
  method: HdcpCompliant.Get
  query_command: HdcpCompliant.Get
  type: array
  description: "HDCP-compliant status for each input"

- id: extension_port_info
  label: Extension Port Info
  method: ExtensionPort.Get
  query_command: ExtensionPort.Get
  type: array
  description: "Extension port details (PoE, link, auto-switch, active port)"

- id: receiver_info
  label: Receiver Info
  method: Receiver.Get
  query_command: Receiver.Get
  type: array
  description: "Receiver connection status, audio, model, firmware, display mode"

- id: system_info
  label: System Info
  method: System.Get
  query_command: System.Get
  type: object
  description: "Hardware/firmware version, model, serial, standby, temperature, fan speed, network"

- id: network_info
  label: Network Settings
  method: Network.Get
  query_command: Network.Get
  type: object
  description: "IP mode, address, netmask, gateway, MAC"

- id: network_hostname
  label: Hostname
  method: NetworkHostname.Get
  query_command: NetworkHostname.Get
  type: string
  description: "Current hostname"

- id: time_info
  label: System Time
  method: Time.Get
  query_command: Time.Get
  type: string
  description: "Current system time"

- id: timezone_info
  label: Timezone Info
  method: TimeZone.Get
  query_command: TimeZone.Get
  type: object
  description: "Available timezones and current timezone settings"

- id: video_wall_status
  label: Video Wall Status
  method: VideoWall.Get
  query_command: VideoWall.Get
  type: object
  description: "Video wall configurations and enable state"

- id: video_wall_preset_info
  label: Video Wall Preset Info
  method: VideoWallPresetInfo.Get
  query_command: VideoWallPresetInfo.Get
  type: array
  description: "Video wall preset details"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters beyond those captured as actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications or event subscriptions
```

## Macros
```yaml
- id: video_preset_recall
  label: Video Preset Recall
  description: "Load a saved video routing preset (1...10) to restore a full routing state"
  steps:
    - action: video_preset_load
      params:
        preset: integer

- id: video_wall_preset_recall
  label: Video Wall Preset Recall
  description: "Load a saved video wall preset (1...10)"
  steps:
    - action: video_wall_preset_load
      params:
        preset: integer
```

## Safety
```yaml
confirmation_required_for:
  - platform_factory_reset
  - platform_reboot
interlocks: []
# UNRESOLVED: source does not document safety interlock procedures or power-on sequencing
```

## Notes
- JSON-RPC 2.0 protocol over WebSocket. The `id` field should follow the pattern `[Namespace][Method]Results` for real-time web client updates (e.g. `VideoSwitchSetResults`), but any string works for command execution.
- TCP proxy ports 9001–9008 map to EXT 1–8 for serial pass-through to connected displays.
- Video input range is in1–in8; output range is out1–out10. Audio analog output range is out1–out8.
- `VideoSwitch.Set` accepts `"all"` as output to route one input to every output. `"none"` as input mutes an output.
- `AudioSwitch.Set` accepts `"none"` as audioin to mute a line out port.
- Video wall supports layouts 2×2, 1×3, 2×4 with modes `wall_genlock` and `wall_fastswitch`.
- Receiver commands only apply to connected AT-PRO5-101-RX or AT-PRO5-101-SC-RX receivers.
- `ReceiverDisplayResolution.Set` is not compatible with video wall applications.

<!-- UNRESOLVED: WebSocket connection lifecycle (ping/pong, reconnection) not documented -->
<!-- UNRESOLVED: Telnet/SSH command format over those transports not documented — only JSON-RPC examples shown -->
<!-- UNRESOLVED: error response format not documented -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-PRO5-MX810_API.pdf
  - https://atlona.com/pdf/manuals/AT-PRO5-MX810.pdf
  - https://atlona.com/pdf/data_sheet/AT-PRO5-MX810_Spec.pdf
  - https://atlona.com/product/at-pro5-mx810/
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-05-22T15:23:34.834Z
last_checked_at: 2026-10-07T18:13:02.834Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:13:02.834Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec methods (53 actions, 25 queries) match the source's 78-method catalogue for the AT-PRO5-MX810, and the declared transport values are supported. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "no settable continuous parameters beyond those captured as actions"
- "source does not document unsolicited push notifications or event subscriptions"
- "source does not document safety interlock procedures or power-on sequencing"
- "WebSocket connection lifecycle (ping/pong, reconnection) not documented"
- "Telnet/SSH command format over those transports not documented — only JSON-RPC examples shown"
- "error response format not documented"
- "maximum concurrent connection limit not stated"
- "firmware version compatibility range not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
