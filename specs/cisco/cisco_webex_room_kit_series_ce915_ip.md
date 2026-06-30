---
spec_id: admin/cisco-webex-room-kit-series-ce915
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Room Kit Series Control Spec"
manufacturer: Cisco
model_family: "Room Kit"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Room Kit"
    - "Room Kit Mini"
    - "Room Bar"
    - "Room Bar Pro"
    - "Codec EQ"
    - "Codec Plus"
    - "Codec Pro"
    - "Room 55"
    - "Room 70 / Room 55D"
    - "Room 70 G2"
    - "Room Panorama / Room 70 Panorama"
    - "Desk Pro"
    - "Desk Mini"
    - Desk
    - "Board Pro"
  firmware: "\"RoomOS 11.5.2\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:34:59.643Z
last_checked_at: 2026-06-25T08:52:53.790Z
generated_at: 2026-06-25T08:52:53.790Z
firmware_coverage: "\"RoomOS 11.5.2\""
protocol_coverage: []
known_gaps:
  - "Specific product-variant hardware capabilities (port counts, connector types) vary across the covered models; this spec documents the common API surface."
  - "The source models settable parameters as xConfiguration entries"
  - "complete event catalogue not authored in this prose pass."
  - "the source describes an xCommand Macros subsystem (macro"
  - "the source does not document explicit safety interlocks, power-on"
  - "SSH listen port not explicitly stated in source (do not assume 22)."
  - "Firmware/software compatibility ranges not stated beyond the source's \"RoomOS 11.5.2\" banner; Cisco notes command return values may change between releases and are not documented."
  - "Per-model connector counts, PoE port counts, and hardware specs vary and are not enumerated as control-protocol data here."
verification:
  verdict: verified
  checked_at: 2026-06-25T08:52:53.790Z
  matched_actions: 1475
  action_count: 1475
  confidence: medium
  summary: "deterministic presence proof: 1475/1475 payloads verbatim in source; stratified Sonnet sample corroborated (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Cisco Webex Room Kit Series Control Spec

## Summary
The Cisco Webex Room Kit Series is a family of RoomOS video conferencing codecs and collaboration devices. This spec covers the device's xAPI (Extended API), a hierarchical control interface exposed over SSH (TCP/IP), HTTP/HTTPS, WebSocket (JSON-RPC), and RS-232 serial connections. The API is organised into four groups — Commands (`xCommand`), Configurations (`xConfiguration`), Status (`xStatus`), and Events (`xEvent`) — and supports a feedback subscription mechanism for state synchronisation.

<!-- UNRESOLVED: Specific product-variant hardware capabilities (port counts, connector types) vary across the covered models; this spec documents the common API surface. -->

## Transport
```yaml
# The source documents four access methods: SSH (TCP/IP, default on), HTTP/HTTPS
# (connectionless), WebSocket (JSON-RPC, rides on HTTP), and RS-232 serial.
# WebSocket carries xAPI commands embedded in JSON-RPC objects. SSH/HTTP/Serial
# use the terminal/XML API. All methods expose the identical API structure.
protocols:
  - tcp       # SSH access (secure TCP/IP, enabled by default)
  - http      # HTTP/HTTPS XMLAPI; also carries WebSocket transport
  - serial    # RS-232 serial API access

addressing:
  # Port 443 is stated for reaching the device over HTTPS on the internal
  # peripheral network (169.254.1.1). SSH port is not explicitly stated.
  port: 443
  # URL pattern as documented in the HTTP XMLAPI cheat sheet. LAN address is
  # the device's own IP; internal-network peripherals reach it at 169.254.1.1.
  base_url: "http://<ip-address>/"
  # Documented HTTP XMLAPI endpoints:
  #   GET  /status.xml                       (complete status document)
  #   GET  /configuration.xml                (complete configuration document)
  #   GET  /command.xml                      (complete command document)
  #   GET  /valuespace.xml                   (complete valuespace document)
  #   GET  /getxml?location=<path>           (path-based document retrieval)
  #   POST /putxml                           (configurations and commands in body)
  #   POST /xmlapi/session/begin             (open session, returns SessionId cookie)
  #   POST /xmlapi/session/end               (close session)

serial:
  # Values below are for the Room Kit / Room Kit Mini / Room Bar / Codec Plus
  # device category (USB-A + RS-232 adapter). Codec Pro / Room 70 G2 / Room
  # Panorama category accepts 9600/19200/38400/57600/115200 (default 115200).
  # Serial API access is unavailable for Room 55 Dual and Room 70.
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # "Hardware flow control: Off" in source

auth:
  # Source explicitly documents authentication; not inferred as none.
  type: basic
  # HTTP XMLAPI requires HTTP Basic Access Authentication as a user with the
  # ADMIN role; unauthenticated requests receive a 401 challenge. Session
  # authentication is supported (POST /xmlapi/session/begin) to avoid
  # per-request re-authentication.
  # Serial/SSH login is governed by xConfiguration SerialPort LoginRequired
  # (<Off/On>); password prompting is ON by default. Default user is "admin"
  # with a passphrase that must be set.
  notes: "ADMIN role required for HTTP XMLAPI; serial/SSH login configurable (default On)"
```

## Traits
```yaml
traits:
  - powerable    # inferred: Standby Activate/Deactivate, SystemUnit Boot/FactoryReset commands present
  - queryable    # inferred: extensive xStatus queries and query-returning commands present
  - routable     # inferred: Video Matrix assign/swap, Audio Select, input source selection present
  - levelable    # inferred: Audio Volume Set, per-channel gain/level controls present
```

## Actions
```yaml
- id: x_configuration_apps_wallpaper_bundles_halfwake_image
  label: "xConfiguration Apps WallpaperBundles HalfwakeImage"
  kind: action
  command: "xConfiguration Apps WallpaperBundles HalfwakeImage"
  params: []

- id: x_configuration_audio_default_volume
  label: "xConfiguration Audio DefaultVolume"
  kind: action
  command: "xConfiguration Audio DefaultVolume"
  params: []

- id: x_configuration_audio_input_arc_n_mode
  label: "xConfiguration Audio Input ARC [n] Mode"
  kind: action
  command: "xConfiguration Audio Input ARC [n] Mode"
  params: []

- id: x_configuration_audio_input_ethernet_n_channel_1_8_level
  label: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Level"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Level"
  params: []

- id: x_configuration_audio_input_ethernet_n_channel_1_8_gain
  label: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Gain"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Gain"
  params: []

- id: x_configuration_audio_input_ethernet_n_channel_1_8_mode
  label: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Mode"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Mode"
  params: []

- id: x_configuration_audio_input_ethernet_n_channel_1_8_pan
  label: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Pan"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Channel [1..8] Pan"
  params: []

- id: x_configuration_audio_input_ethernet_n_echo_control_mode
  label: "xConfiguration Audio Input Ethernet [n] EchoControl Mode"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] EchoControl Mode"
  params: []

- id: x_configuration_audio_input_ethernet_n_echo_control_noise_reduction
  label: "xConfiguration Audio Input Ethernet [n] EchoControl NoiseReduction"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] EchoControl NoiseReduction"
  params: []

- id: x_configuration_audio_input_ethernet_n_equalizer_id
  label: "xConfiguration Audio Input Ethernet [n] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Equalizer ID"
  params: []

- id: x_configuration_audio_input_ethernet_n_mode
  label: "xConfiguration Audio Input Ethernet [n] Mode"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Mode"
  params: []

- id: x_configuration_audio_input_ethernet_n_equalizer_mode
  label: "xConfiguration Audio Input Ethernet [n] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Ethernet [n] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_hdmi_n_level
  label: "xConfiguration Audio Input HDMI [n] Level"
  kind: action
  command: "xConfiguration Audio Input HDMI [n] Level"
  params: []

- id: x_configuration_audio_input_hdmi_n_gain
  label: "xConfiguration Audio Input HDMI [n] Gain"
  kind: action
  command: "xConfiguration Audio Input HDMI [n] Gain"
  params: []

- id: x_configuration_audio_input_hdmi_n_mode
  label: "xConfiguration Audio Input HDMI [n] Mode"
  kind: action
  command: "xConfiguration Audio Input HDMI [n] Mode"
  params: []

- id: x_configuration_audio_input_hdmi_n_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input HDMI [n] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input HDMI [n] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_microphone_n_channel
  label: "xConfiguration Audio Input Microphone [n] Channel"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Channel"
  params: []

- id: x_configuration_audio_input_microphone_n_echo_control_mode
  label: "xConfiguration Audio Input Microphone [n] EchoControl Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] EchoControl Mode"
  params: []

- id: x_configuration_audio_input_microphone_n_echo_control_dereverberation
  label: "xConfiguration Audio Input Microphone [n] EchoControl Dereverberation"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] EchoControl Dereverberation"
  params: []

- id: x_configuration_audio_input_microphone_n_echo_control_noise_reduction
  label: "xConfiguration Audio Input Microphone [n] EchoControl NoiseReduction"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] EchoControl NoiseReduction"
  params: []

- id: x_configuration_audio_input_microphone_n_equalizer_id
  label: "xConfiguration Audio Input Microphone [n] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Equalizer ID"
  params: []

- id: x_configuration_audio_input_microphone_n_equalizer_mode
  label: "xConfiguration Audio Input Microphone [n] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_microphone_n_level
  label: "xConfiguration Audio Input Microphone [n] Level"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Level"
  params: []

- id: x_configuration_audio_input_microphone_n_gain
  label: "xConfiguration Audio Input Microphone [n] Gain"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Gain"
  params: []

- id: x_configuration_audio_input_microphone_n_mode
  label: "xConfiguration Audio Input Microphone [n] Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Mode"
  params: []

- id: x_configuration_audio_input_microphone_n_mute_override
  label: "xConfiguration Audio Input Microphone [n] MuteOverride"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] MuteOverride"
  params: []

- id: x_configuration_audio_input_microphone_n_pan
  label: "xConfiguration Audio Input Microphone [n] Pan"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Pan"
  params: []

- id: x_configuration_audio_input_microphone_n_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input Microphone [n] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_microphone_n_phantom_power
  label: "xConfiguration Audio Input Microphone [n] PhantomPower"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] PhantomPower"
  params: []

- id: x_configuration_audio_input_microphone_n_video_association_video_input_source
  label: "xConfiguration Audio Input Microphone [n] VideoAssociation VideoInputSource"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] VideoAssociation VideoInputSource"
  params: []

- id: x_configuration_audio_input_microphone_mode
  label: "xConfiguration Audio Input MicrophoneMode"
  kind: action
  command: "xConfiguration Audio Input MicrophoneMode"
  params: []

- id: x_configuration_audio_input_usbc_n_level
  label: "xConfiguration Audio Input USBC [n] Level"
  kind: action
  command: "xConfiguration Audio Input USBC [n] Level"
  params: []

- id: x_configuration_audio_input_usbc_n_gain
  label: "xConfiguration Audio Input USBC [n] Gain"
  kind: action
  command: "xConfiguration Audio Input USBC [n] Gain"
  params: []

- id: x_configuration_audio_input_usbc_n_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input USBC [n] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input USBC [n] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_usbc_n_mode
  label: "xConfiguration Audio Input USBC [n] Mode"
  kind: action
  command: "xConfiguration Audio Input USBC [n] Mode"
  params: []

- id: x_configuration_audio_input_usbinterface_n_echo_control_mode
  label: "xConfiguration Audio Input USBInterface [n] EchoControl Mode"
  kind: action
  command: "xConfiguration Audio Input USBInterface [n] EchoControl Mode"
  params: []

- id: x_configuration_audio_input_usbinterface_n_level
  label: "xConfiguration Audio Input USBInterface [n] Level"
  kind: action
  command: "xConfiguration Audio Input USBInterface [n] Level"
  params: []

- id: x_configuration_audio_input_usbinterface_n_gain
  label: "xConfiguration Audio Input USBInterface [n] Gain"
  kind: action
  command: "xConfiguration Audio Input USBInterface [n] Gain"
  params: []

- id: x_configuration_audio_input_usbinterface_n_mode
  label: "xConfiguration Audio Input USBInterface [n] Mode"
  kind: action
  command: "xConfiguration Audio Input USBInterface [n] Mode"
  params: []

- id: x_configuration_audio_input_usbmicrophone_n_echo_control_mode
  label: "xConfiguration Audio Input USBMicrophone [n] EchoControl Mode"
  kind: action
  command: "xConfiguration Audio Input USBMicrophone [n] EchoControl Mode"
  params: []

- id: x_configuration_audio_input_usbmicrophone_n_gain
  label: "xConfiguration Audio Input USBMicrophone [n] Gain"
  kind: action
  command: "xConfiguration Audio Input USBMicrophone [n] Gain"
  params: []

- id: x_configuration_audio_input_web_view_n_mode
  label: "xConfiguration Audio Input WebView [n] Mode"
  kind: action
  command: "xConfiguration Audio Input WebView [n] Mode"
  params: []

- id: x_configuration_audio_microphones_agc
  label: "xConfiguration Audio Microphones AGC"
  kind: action
  command: "xConfiguration Audio Microphones AGC"
  params: []

- id: x_configuration_audio_input_usbmicrophone_n_level
  label: "xConfiguration Audio Input USBMicrophone [n] Level"
  kind: action
  command: "xConfiguration Audio Input USBMicrophone [n] Level"
  params: []

- id: x_configuration_audio_microphones_hdmi_passthrough_mute_button
  label: "xConfiguration Audio Microphones HdmiPassthrough MuteButton"
  kind: action
  command: "xConfiguration Audio Microphones HdmiPassthrough MuteButton"
  params: []

- id: x_configuration_audio_microphones_noise_removal_mode
  label: "xConfiguration Audio Microphones NoiseRemoval Mode"
  kind: action
  command: "xConfiguration Audio Microphones NoiseRemoval Mode"
  params: []

- id: x_configuration_audio_microphones_mute_enabled
  label: "xConfiguration Audio Microphones Mute Enabled"
  kind: action
  command: "xConfiguration Audio Microphones Mute Enabled"
  params: []

- id: x_configuration_audio_microphones_usb_passthrough_mute_button
  label: "xConfiguration Audio Microphones UsbPassthrough MuteButton"
  kind: action
  command: "xConfiguration Audio Microphones UsbPassthrough MuteButton"
  params: []

- id: x_configuration_audio_microphones_phantom_power
  label: "xConfiguration Audio Microphones PhantomPower"
  kind: action
  command: "xConfiguration Audio Microphones PhantomPower"
  params: []

- id: x_configuration_audio_output_arc_n_delay_delay_ms
  label: "xConfiguration Audio Output ARC [n] Delay DelayMs"
  kind: action
  command: "xConfiguration Audio Output ARC [n] Delay DelayMs"
  params: []

- id: x_configuration_audio_output_arc_n_delay_mode
  label: "xConfiguration Audio Output ARC [n] Delay Mode"
  kind: action
  command: "xConfiguration Audio Output ARC [n] Delay Mode"
  params: []

- id: x_configuration_audio_output_arc_n_mode
  label: "xConfiguration Audio Output ARC [n] Mode"
  kind: action
  command: "xConfiguration Audio Output ARC [n] Mode"
  params: []

- id: x_configuration_audio_output_connector_setup
  label: "xConfiguration Audio Output ConnectorSetup"
  kind: action
  command: "xConfiguration Audio Output ConnectorSetup"
  params: []

- id: x_configuration_audio_output_ethernet_n_mode
  label: "xConfiguration Audio Output Ethernet [n] Mode"
  kind: action
  command: "xConfiguration Audio Output Ethernet [n] Mode"
  params: []

- id: x_configuration_audio_output_hdmi_n_delay_delay_ms
  label: "xConfiguration Audio Output HDMI [n] Delay DelayMs"
  kind: action
  command: "xConfiguration Audio Output HDMI [n] Delay DelayMs"
  params: []

- id: x_configuration_audio_output_hdmi_n_delay_mode
  label: "xConfiguration Audio Output HDMI [n] Delay Mode"
  kind: action
  command: "xConfiguration Audio Output HDMI [n] Delay Mode"
  params: []

- id: x_configuration_audio_output_hdmi_n_level
  label: "xConfiguration Audio Output HDMI [n] Level"
  kind: action
  command: "xConfiguration Audio Output HDMI [n] Level"
  params: []

- id: x_configuration_audio_output_hdmi_n_gain
  label: "xConfiguration Audio Output HDMI [n] Gain"
  kind: action
  command: "xConfiguration Audio Output HDMI [n] Gain"
  params: []

- id: x_configuration_audio_output_hdmi_n_mode
  label: "xConfiguration Audio Output HDMI [n] Mode"
  kind: action
  command: "xConfiguration Audio Output HDMI [n] Mode"
  params: []

- id: x_configuration_audio_output_internal_speaker_mode
  label: "xConfiguration Audio Output InternalSpeaker Mode"
  kind: action
  command: "xConfiguration Audio Output InternalSpeaker Mode"
  params: []

- id: x_configuration_audio_output_line_n_channel
  label: "xConfiguration Audio Output Line [n] Channel"
  kind: action
  command: "xConfiguration Audio Output Line [n] Channel"
  params: []

- id: x_configuration_audio_output_line_n_delay_delay_ms
  label: "xConfiguration Audio Output Line [n] Delay DelayMs"
  kind: action
  command: "xConfiguration Audio Output Line [n] Delay DelayMs"
  params: []

- id: x_configuration_audio_output_line_n_delay_mode
  label: "xConfiguration Audio Output Line [n] Delay Mode"
  kind: action
  command: "xConfiguration Audio Output Line [n] Delay Mode"
  params: []

- id: x_configuration_audio_output_line_n_equalizer_id
  label: "xConfiguration Audio Output Line [n] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Output Line [n] Equalizer ID"
  params: []

- id: x_configuration_audio_output_line_n_equalizer_mode
  label: "xConfiguration Audio Output Line [n] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Output Line [n] Equalizer Mode"
  params: []

- id: x_configuration_audio_output_line_n_gain
  label: "xConfiguration Audio Output Line [n] Gain"
  kind: action
  command: "xConfiguration Audio Output Line [n] Gain"
  params: []

- id: x_configuration_audio_output_line_n_level
  label: "xConfiguration Audio Output Line [n] Level"
  kind: action
  command: "xConfiguration Audio Output Line [n] Level"
  params: []

- id: x_configuration_audio_output_line_n_mode
  label: "xConfiguration Audio Output Line [n] Mode"
  kind: action
  command: "xConfiguration Audio Output Line [n] Mode"
  params: []

- id: x_configuration_audio_output_line_n_output_type
  label: "xConfiguration Audio Output Line [n] OutputType"
  kind: action
  command: "xConfiguration Audio Output Line [n] OutputType"
  params: []

- id: x_configuration_audio_output_usbc_n_mode
  label: "xConfiguration Audio Output USBC [n] Mode"
  kind: action
  command: "xConfiguration Audio Output USBC [n] Mode"
  params: []

- id: x_configuration_audio_output_usbinterface_n_mode
  label: "xConfiguration Audio Output USBInterface [n] Mode"
  kind: action
  command: "xConfiguration Audio Output USBInterface [n] Mode"
  params: []

- id: x_configuration_audio_panning_mode
  label: "xConfiguration Audio Panning Mode"
  kind: action
  command: "xConfiguration Audio Panning Mode"
  params: []

- id: x_configuration_audio_panning_headset_analog_mode
  label: "xConfiguration Audio Panning HeadsetAnalog Mode"
  kind: action
  command: "xConfiguration Audio Panning HeadsetAnalog Mode"
  params: []

- id: x_configuration_audio_panning_headset_analog_binaural_processing
  label: "xConfiguration Audio Panning HeadsetAnalog BinauralProcessing"
  kind: action
  command: "xConfiguration Audio Panning HeadsetAnalog BinauralProcessing"
  params: []

- id: x_configuration_audio_panning_headset_usb_binaural_processing
  label: "xConfiguration Audio Panning HeadsetUSB BinauralProcessing"
  kind: action
  command: "xConfiguration Audio Panning HeadsetUSB BinauralProcessing"
  params: []

- id: x_configuration_audio_panning_headset_usb_mode
  label: "xConfiguration Audio Panning HeadsetUSB Mode"
  kind: action
  command: "xConfiguration Audio Panning HeadsetUSB Mode"
  params: []

- id: x_configuration_audio_sounds_and_alerts_ring_tone
  label: "xConfiguration Audio SoundsAndAlerts RingTone"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingTone"
  params: []

- id: x_configuration_audio_placement
  label: "xConfiguration Audio Placement"
  kind: action
  command: "xConfiguration Audio Placement"
  params: []

- id: x_configuration_audio_sounds_and_alerts_ring_volume
  label: "xConfiguration Audio SoundsAndAlerts RingVolume"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingVolume"
  params: []

- id: x_configuration_audio_ultrasound_max_volume
  label: "xConfiguration Audio Ultrasound MaxVolume"
  kind: action
  command: "xConfiguration Audio Ultrasound MaxVolume"
  params: []

- id: x_configuration_audio_usb_mode
  label: "xConfiguration Audio USB Mode"
  kind: action
  command: "xConfiguration Audio USB Mode"
  params: []

- id: x_configuration_bluetooth_allowed
  label: "xConfiguration Bluetooth Allowed"
  kind: action
  command: "xConfiguration Bluetooth Allowed"
  params: []

- id: x_configuration_bookings_protocol_priority
  label: "xConfiguration Bookings ProtocolPriority"
  kind: action
  command: "xConfiguration Bookings ProtocolPriority"
  params: []

- id: x_configuration_bluetooth_enabled
  label: "xConfiguration Bluetooth Enabled"
  kind: action
  command: "xConfiguration Bluetooth Enabled"
  params: []

- id: x_configuration_byod_hid_forwarding_enabled
  label: "xConfiguration BYOD HidForwarding Enabled"
  kind: action
  command: "xConfiguration BYOD HidForwarding Enabled"
  params: []

- id: x_configuration_byod_qrcode_pairing
  label: "xConfiguration BYOD QRCodePairing"
  kind: action
  command: "xConfiguration BYOD QRCodePairing"
  params: []

- id: x_configuration_byod_touch_forwarding_enabled
  label: "xConfiguration BYOD TouchForwarding Enabled"
  kind: action
  command: "xConfiguration BYOD TouchForwarding Enabled"
  params: []

- id: x_configuration_byod_usbcxapi
  label: "xConfiguration BYOD USBCXapi"
  kind: action
  command: "xConfiguration BYOD USBCXapi"
  params: []

- id: x_configuration_call_history_mode
  label: "xConfiguration CallHistory Mode"
  kind: action
  command: "xConfiguration CallHistory Mode"
  params: []

- id: x_configuration_call_history_recents_display_name
  label: "xConfiguration CallHistory Recents DisplayName"
  kind: action
  command: "xConfiguration CallHistory Recents DisplayName"
  params: []

- id: x_configuration_cameras_background_enabled
  label: "xConfiguration Cameras Background Enabled"
  kind: action
  command: "xConfiguration Cameras Background Enabled"
  params: []

- id: x_configuration_cameras_camera_n_assigned_serial_number
  label: "xConfiguration Cameras Camera [n] AssignedSerialNumber"
  kind: action
  command: "xConfiguration Cameras Camera [n] AssignedSerialNumber"
  params: []

- id: x_configuration_cameras_background_user_images_allowed
  label: "xConfiguration Cameras Background UserImagesAllowed"
  kind: action
  command: "xConfiguration Cameras Background UserImagesAllowed"
  params: []

- id: x_configuration_cameras_camera_n_backlight_default_mode
  label: "xConfiguration Cameras Camera [n] Backlight DefaultMode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Backlight DefaultMode"
  params: []

- id: x_configuration_cameras_camera_n_brightness_algorithm
  label: "xConfiguration Cameras Camera [n] Brightness Algorithm"
  kind: action
  command: "xConfiguration Cameras Camera [n] Brightness Algorithm"
  params: []

- id: x_configuration_cameras_camera_n_brightness_default_level
  label: "xConfiguration Cameras Camera [n] Brightness DefaultLevel"
  kind: action
  command: "xConfiguration Cameras Camera [n] Brightness DefaultLevel"
  params: []

- id: x_configuration_cameras_camera_n_brightness_mode
  label: "xConfiguration Cameras Camera [n] Brightness Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Brightness Mode"
  params: []

- id: x_configuration_cameras_camera_n_ir_cut_filter_mode
  label: "xConfiguration Cameras Camera [n] IrCutFilter Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] IrCutFilter Mode"
  params: []

- id: x_configuration_cameras_camera_n_ir_cut_filter_threshold
  label: "xConfiguration Cameras Camera [n] IrCutFilter Threshold"
  kind: action
  command: "xConfiguration Cameras Camera [n] IrCutFilter Threshold"
  params: []

- id: x_configuration_cameras_camera_n_flip
  label: "xConfiguration Cameras Camera [n] Flip"
  kind: action
  command: "xConfiguration Cameras Camera [n] Flip"
  params: []

- id: x_configuration_cameras_camera_n_focus_mode
  label: "xConfiguration Cameras Camera [n] Focus Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Focus Mode"
  params: []

- id: x_configuration_cameras_camera_n_gamma_level
  label: "xConfiguration Cameras Camera [n] Gamma Level"
  kind: action
  command: "xConfiguration Cameras Camera [n] Gamma Level"
  params: []

- id: x_configuration_cameras_camera_n_gamma_mode
  label: "xConfiguration Cameras Camera [n] Gamma Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Gamma Mode"
  params: []

- id: x_configuration_cameras_camera_n_mirror
  label: "xConfiguration Cameras Camera [n] Mirror"
  kind: action
  command: "xConfiguration Cameras Camera [n] Mirror"
  params: []

- id: x_configuration_cameras_camera_n_video_format
  label: "xConfiguration Cameras Camera [n] VideoFormat"
  kind: action
  command: "xConfiguration Cameras Camera [n] VideoFormat"
  params: []

- id: x_configuration_cameras_camera_n_whitebalance_mode
  label: "xConfiguration Cameras Camera [n] Whitebalance Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Whitebalance Mode"
  params: []

- id: x_configuration_cameras_camera_n_whitebalance_level
  label: "xConfiguration Cameras Camera [n] Whitebalance Level"
  kind: action
  command: "xConfiguration Cameras Camera [n] Whitebalance Level"
  params: []

- id: x_configuration_cameras_camera_color_saturation_level
  label: "xConfiguration Cameras Camera ColorSaturation Level"
  kind: action
  command: "xConfiguration Cameras Camera ColorSaturation Level"
  params: []

- id: x_configuration_cameras_camera_exposure_compensation_level
  label: "xConfiguration Cameras Camera ExposureCompensation Level"
  kind: action
  command: "xConfiguration Cameras Camera ExposureCompensation Level"
  params: []

- id: x_configuration_cameras_power_line_frequency
  label: "xConfiguration Cameras PowerLine Frequency"
  kind: action
  command: "xConfiguration Cameras PowerLine Frequency"
  params: []

- id: x_configuration_cameras_camera_framerate
  label: "xConfiguration Cameras Camera Framerate"
  kind: action
  command: "xConfiguration Cameras Camera Framerate"
  params: []

- id: x_configuration_cameras_presenter_track_camera_position_pan
  label: "xConfiguration Cameras PresenterTrack CameraPosition Pan"
  kind: action
  command: "xConfiguration Cameras PresenterTrack CameraPosition Pan"
  params: []

- id: x_configuration_cameras_presenter_track_camera_position_tilt
  label: "xConfiguration Cameras PresenterTrack CameraPosition Tilt"
  kind: action
  command: "xConfiguration Cameras PresenterTrack CameraPosition Tilt"
  params: []

- id: x_configuration_cameras_presenter_track_connector
  label: "xConfiguration Cameras PresenterTrack Connector"
  kind: action
  command: "xConfiguration Cameras PresenterTrack Connector"
  params: []

- id: x_configuration_cameras_presenter_track_camera_position_zoom
  label: "xConfiguration Cameras PresenterTrack CameraPosition Zoom"
  kind: action
  command: "xConfiguration Cameras PresenterTrack CameraPosition Zoom"
  params: []

- id: x_configuration_cameras_presenter_track_enabled
  label: "xConfiguration Cameras PresenterTrack Enabled"
  kind: action
  command: "xConfiguration Cameras PresenterTrack Enabled"
  params: []

- id: x_configuration_cameras_presenter_track_presenter_detected_status
  label: "xConfiguration Cameras PresenterTrack PresenterDetectedStatus"
  kind: action
  command: "xConfiguration Cameras PresenterTrack PresenterDetectedStatus"
  params: []

- id: x_configuration_cameras_presenter_track_trigger_zone
  label: "xConfiguration Cameras PresenterTrack TriggerZone"
  kind: action
  command: "xConfiguration Cameras PresenterTrack TriggerZone"
  params: []

- id: x_configuration_cameras_speaker_track_default_behavior
  label: "xConfiguration Cameras SpeakerTrack DefaultBehavior"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack DefaultBehavior"
  params: []

- id: x_configuration_cameras_speaker_track_frames_mode
  label: "xConfiguration Cameras SpeakerTrack Frames Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Frames Mode"
  params: []

- id: x_configuration_cameras_speaker_track_head_detector_range
  label: "xConfiguration Cameras SpeakerTrack HeadDetectorRange"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack HeadDetectorRange"
  params: []

- id: x_configuration_cameras_speaker_track_zoom_range
  label: "xConfiguration Cameras SpeakerTrack ZoomRange"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ZoomRange"
  params: []

- id: x_configuration_cameras_speaker_track_mode
  label: "xConfiguration Cameras SpeakerTrack Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Mode"
  params: []

- id: x_configuration_cameras_speaker_track_closeup
  label: "xConfiguration Cameras SpeakerTrack Closeup"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Closeup"
  params: []

- id: x_configuration_cameras_speaker_track_tracking_mode
  label: "xConfiguration Cameras SpeakerTrack TrackingMode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack TrackingMode"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_camera_left
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraLeft"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraLeft"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_mode
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_camera_right
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraRight"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraRight"
  params: []

- id: x_configuration_cameras_speaker_track_whiteboard_mode
  label: "xConfiguration Cameras SpeakerTrack Whiteboard Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Whiteboard Mode"
  params: []

- id: x_configuration_conference_auto_answer_mode
  label: "xConfiguration Conference AutoAnswer Mode"
  kind: action
  command: "xConfiguration Conference AutoAnswer Mode"
  params: []

- id: x_configuration_conference_auto_answer_mute
  label: "xConfiguration Conference AutoAnswer Mute"
  kind: action
  command: "xConfiguration Conference AutoAnswer Mute"
  params: []

- id: x_configuration_conference_auto_answer_delay
  label: "xConfiguration Conference AutoAnswer Delay"
  kind: action
  command: "xConfiguration Conference AutoAnswer Delay"
  params: []

- id: x_configuration_conference_default_call_protocol
  label: "xConfiguration Conference DefaultCall Protocol"
  kind: action
  command: "xConfiguration Conference DefaultCall Protocol"
  params: []

- id: x_configuration_conference_capset_filter
  label: "xConfiguration Conference CapsetFilter"
  kind: action
  command: "xConfiguration Conference CapsetFilter"
  params: []

- id: x_configuration_conference_default_call_rate
  label: "xConfiguration Conference DefaultCall Rate"
  kind: action
  command: "xConfiguration Conference DefaultCall Rate"
  params: []

- id: x_configuration_conference_default_call_webex_rate
  label: "xConfiguration Conference DefaultCall Webex Rate"
  kind: action
  command: "xConfiguration Conference DefaultCall Webex Rate"
  params: []

- id: x_configuration_conference_do_not_disturb_default_timeout
  label: "xConfiguration Conference DoNotDisturb DefaultTimeout"
  kind: action
  command: "xConfiguration Conference DoNotDisturb DefaultTimeout"
  params: []

- id: x_configuration_conference_embedded_app_notifications_only
  label: "xConfiguration Conference EmbeddedApp NotificationsOnly"
  kind: action
  command: "xConfiguration Conference EmbeddedApp NotificationsOnly"
  params: []

- id: x_configuration_conference_encryption_mode
  label: "xConfiguration Conference Encryption Mode"
  kind: action
  command: "xConfiguration Conference Encryption Mode"
  params: []

- id: x_configuration_conference_end_to_end_encryption_identity_preferred_domain
  label: "xConfiguration Conference EndToEndEncryption Identity PreferredDomain"
  kind: action
  command: "xConfiguration Conference EndToEndEncryption Identity PreferredDomain"
  params: []

- id: x_configuration_conference_far_end_control_mode
  label: "xConfiguration Conference FarEndControl Mode"
  kind: action
  command: "xConfiguration Conference FarEndControl Mode"
  params: []

- id: x_configuration_conference_far_end_control_signal_capability
  label: "xConfiguration Conference FarEndControl SignalCapability"
  kind: action
  command: "xConfiguration Conference FarEndControl SignalCapability"
  params: []

- id: x_configuration_conference_farend_message_mode
  label: "xConfiguration Conference FarendMessage Mode"
  kind: action
  command: "xConfiguration Conference FarendMessage Mode"
  params: []

- id: x_configuration_conference_join_leave_notifications
  label: "xConfiguration Conference JoinLeaveNotifications"
  kind: action
  command: "xConfiguration Conference JoinLeaveNotifications"
  params: []

- id: x_configuration_conference_hide_non_video_on_call_mode
  label: "xConfiguration Conference HideNonVideo OnCall Mode"
  kind: action
  command: "xConfiguration Conference HideNonVideo OnCall Mode"
  params: []

- id: x_configuration_conference_max_receive_call_rate
  label: "xConfiguration Conference MaxReceiveCallRate"
  kind: action
  command: "xConfiguration Conference MaxReceiveCallRate"
  params: []

- id: x_configuration_conference_max_transmit_call_rate
  label: "xConfiguration Conference MaxTransmitCallRate"
  kind: action
  command: "xConfiguration Conference MaxTransmitCallRate"
  params: []

- id: x_configuration_conference_max_multisite_receive_rate
  label: "xConfiguration Conference MaxMultisiteReceiveRate"
  kind: action
  command: "xConfiguration Conference MaxMultisiteReceiveRate"
  params: []

- id: x_configuration_conference_max_multisite_transmit_rate
  label: "xConfiguration Conference MaxMultisiteTransmitRate"
  kind: action
  command: "xConfiguration Conference MaxMultisiteTransmitRate"
  params: []

- id: x_configuration_conference_mic_unmute_on_disconnect_mode
  label: "xConfiguration Conference MicUnmuteOnDisconnect Mode"
  kind: action
  command: "xConfiguration Conference MicUnmuteOnDisconnect Mode"
  params: []

- id: x_configuration_conference_multipoint_mode
  label: "xConfiguration Conference Multipoint Mode"
  kind: action
  command: "xConfiguration Conference Multipoint Mode"
  params: []

- id: x_configuration_conference_multi_stream_mode
  label: "xConfiguration Conference MultiStream Mode"
  kind: action
  command: "xConfiguration Conference MultiStream Mode"
  params: []

- id: x_configuration_conference_people_focus_on_call_mode
  label: "xConfiguration Conference PeopleFocus OnCall Mode"
  kind: action
  command: "xConfiguration Conference PeopleFocus OnCall Mode"
  params: []

- id: x_configuration_facility_service_service_n_call_type
  label: "xConfiguration FacilityService Service [n] CallType"
  kind: action
  command: "xConfiguration FacilityService Service [n] CallType"
  params: []

- id: x_configuration_facility_service_service_n_name
  label: "xConfiguration FacilityService Service [n] Name"
  kind: action
  command: "xConfiguration FacilityService Service [n] Name"
  params: []

- id: x_configuration_facility_service_service_n_type
  label: "xConfiguration FacilityService Service [n] Type"
  kind: action
  command: "xConfiguration FacilityService Service [n] Type"
  params: []

- id: x_configuration_facility_service_service_n_number
  label: "xConfiguration FacilityService Service [n] Number"
  kind: action
  command: "xConfiguration FacilityService Service [n] Number"
  params: []

- id: x_configuration_files_services_one_drive_temporary_personal_sign_in
  label: "xConfiguration Files Services OneDrive TemporaryPersonalSignIn"
  kind: action
  command: "xConfiguration Files Services OneDrive TemporaryPersonalSignIn"
  params: []

- id: x_configuration_gpio_pin_n_mode
  label: "xConfiguration GPIO Pin [n] Mode"
  kind: action
  command: "xConfiguration GPIO Pin [n] Mode"
  params: []

- id: x_configuration_h323_authentication_mode
  label: "xConfiguration H323 Authentication Mode"
  kind: action
  command: "xConfiguration H323 Authentication Mode"
  params: []

- id: x_configuration_h323_authentication_login_name
  label: "xConfiguration H323 Authentication LoginName"
  kind: action
  command: "xConfiguration H323 Authentication LoginName"
  params: []

- id: x_configuration_h323_authentication_password
  label: "xConfiguration H323 Authentication Password"
  kind: action
  command: "xConfiguration H323 Authentication Password"
  params: []

- id: x_configuration_h323_encryption_aes256_support
  label: "xConfiguration H323 Encryption AES256Support"
  kind: action
  command: "xConfiguration H323 Encryption AES256Support"
  params: []

- id: x_configuration_h323_call_setup_mode
  label: "xConfiguration H323 CallSetup Mode"
  kind: action
  command: "xConfiguration H323 CallSetup Mode"
  params: []

- id: x_configuration_h323_encryption_key_size
  label: "xConfiguration H323 Encryption KeySize"
  kind: action
  command: "xConfiguration H323 Encryption KeySize"
  params: []

- id: x_configuration_h323_gatekeeper_address
  label: "xConfiguration H323 Gatekeeper Address"
  kind: action
  command: "xConfiguration H323 Gatekeeper Address"
  params: []

- id: x_configuration_h323_h323_alias_id
  label: "xConfiguration H323 H323Alias ID"
  kind: action
  command: "xConfiguration H323 H323Alias ID"
  params: []

- id: x_configuration_h323_h323_alias_e164
  label: "xConfiguration H323 H323Alias E164"
  kind: action
  command: "xConfiguration H323 H323Alias E164"
  params: []

- id: x_configuration_h323_nat_mode
  label: "xConfiguration H323 NAT Mode"
  kind: action
  command: "xConfiguration H323 NAT Mode"
  params: []

- id: x_configuration_h323_nat_address
  label: "xConfiguration H323 NAT Address"
  kind: action
  command: "xConfiguration H323 NAT Address"
  params: []

- id: x_configuration_http_client_mode
  label: "xConfiguration HttpClient Mode"
  kind: action
  command: "xConfiguration HttpClient Mode"
  params: []

- id: x_configuration_http_client_allow_insecure_https
  label: "xConfiguration HttpClient AllowInsecureHTTPS"
  kind: action
  command: "xConfiguration HttpClient AllowInsecureHTTPS"
  params: []

- id: x_configuration_http_client_allow_http
  label: "xConfiguration HttpClient AllowHTTP"
  kind: action
  command: "xConfiguration HttpClient AllowHTTP"
  params: []

- id: x_configuration_http_client_use_http_proxy
  label: "xConfiguration HttpClient UseHttpProxy"
  kind: action
  command: "xConfiguration HttpClient UseHttpProxy"
  params: []

- id: x_configuration_http_feedback_tls_verify
  label: "xConfiguration HttpFeedback TlsVerify"
  kind: action
  command: "xConfiguration HttpFeedback TlsVerify"
  params: []

- id: x_configuration_http_feedback_use_http_proxy
  label: "xConfiguration HttpFeedback UseHttpProxy"
  kind: action
  command: "xConfiguration HttpFeedback UseHttpProxy"
  params: []

- id: x_configuration_logging_cloud_upload_mode
  label: "xConfiguration Logging CloudUpload Mode"
  kind: action
  command: "xConfiguration Logging CloudUpload Mode"
  params: []

- id: x_configuration_logging_external_mode
  label: "xConfiguration Logging External Mode"
  kind: action
  command: "xConfiguration Logging External Mode"
  params: []

- id: x_configuration_logging_external_protocol
  label: "xConfiguration Logging External Protocol"
  kind: action
  command: "xConfiguration Logging External Protocol"
  params: []

- id: x_configuration_logging_external_server_address
  label: "xConfiguration Logging External Server Address"
  kind: action
  command: "xConfiguration Logging External Server Address"
  params: []

- id: x_configuration_logging_external_tls_verify
  label: "xConfiguration Logging External TlsVerify"
  kind: action
  command: "xConfiguration Logging External TlsVerify"
  params: []

- id: x_configuration_logging_external_server_port
  label: "xConfiguration Logging External Server Port"
  kind: action
  command: "xConfiguration Logging External Server Port"
  params: []

- id: x_configuration_logging_internal_mode
  label: "xConfiguration Logging Internal Mode"
  kind: action
  command: "xConfiguration Logging Internal Mode"
  params: []

- id: x_configuration_macros_mode
  label: "xConfiguration Macros Mode"
  kind: action
  command: "xConfiguration Macros Mode"
  params: []

- id: x_configuration_macros_diagnostics_javascript_errors
  label: "xConfiguration Macros Diagnostics JavascriptErrors"
  kind: action
  command: "xConfiguration Macros Diagnostics JavascriptErrors"
  params: []

- id: x_configuration_macros_auto_start
  label: "xConfiguration Macros AutoStart"
  kind: action
  command: "xConfiguration Macros AutoStart"
  params: []

- id: x_configuration_macros_unresponsive_timeout
  label: "xConfiguration Macros UnresponsiveTimeout"
  kind: action
  command: "xConfiguration Macros UnresponsiveTimeout"
  params: []

- id: x_configuration_network_n_dns_dnssec_mode
  label: "xConfiguration Network [n] DNS DNSSEC Mode"
  kind: action
  command: "xConfiguration Network [n] DNS DNSSEC Mode"
  params: []

- id: x_configuration_network_n_dns_server_m_address
  label: "xConfiguration Network [n] DNS Server [m] Address"
  kind: action
  command: "xConfiguration Network [n] DNS Server [m] Address"
  params: []

- id: x_configuration_network_n_dns_domain_name
  label: "xConfiguration Network [n] DNS Domain Name"
  kind: action
  command: "xConfiguration Network [n] DNS Domain Name"
  params: []

- id: x_configuration_network_n_ieee8021_x_mode
  label: "xConfiguration Network [n] IEEE8021X Mode"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Mode"
  params: []

- id: x_configuration_network_n_ieee8021_x_tls_verify
  label: "xConfiguration Network [n] IEEE8021X TlsVerify"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X TlsVerify"
  params: []

- id: x_configuration_network_n_ieee8021_x_use_client_certificate
  label: "xConfiguration Network [n] IEEE8021X UseClientCertificate"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X UseClientCertificate"
  params: []

- id: x_configuration_network_n_ieee8021_x_identity
  label: "xConfiguration Network [n] IEEE8021X Identity"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Identity"
  params: []

- id: x_configuration_network_n_ieee8021_x_password
  label: "xConfiguration Network [n] IEEE8021X Password"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Password"
  params: []

- id: x_configuration_network_n_ieee8021_x_eap_md5
  label: "xConfiguration Network [n] IEEE8021X Eap Md5"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Md5"
  params: []

- id: x_configuration_network_n_ieee8021_x_anonymous_identity
  label: "xConfiguration Network [n] IEEE8021X AnonymousIdentity"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X AnonymousIdentity"
  params: []

- id: x_configuration_network_n_ieee8021_x_eap_ttls
  label: "xConfiguration Network [n] IEEE8021X Eap Ttls"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Ttls"
  params: []

- id: x_configuration_network_n_ieee8021_x_eap_tls
  label: "xConfiguration Network [n] IEEE8021X Eap Tls"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Tls"
  params: []

- id: x_configuration_network_n_ipstack
  label: "xConfiguration Network [n] IPStack"
  kind: action
  command: "xConfiguration Network [n] IPStack"
  params: []

- id: x_configuration_network_n_ieee8021_x_eap_peap
  label: "xConfiguration Network [n] IEEE8021X Eap Peap"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Peap"
  params: []

- id: x_configuration_network_n_ipv4_assignment
  label: "xConfiguration Network [n] IPv4 Assignment"
  kind: action
  command: "xConfiguration Network [n] IPv4 Assignment"
  params: []

- id: x_configuration_network_n_ipv4_address
  label: "xConfiguration Network [n] IPv4 Address"
  kind: action
  command: "xConfiguration Network [n] IPv4 Address"
  params: []

- id: x_configuration_network_n_ipv4_gateway
  label: "xConfiguration Network [n] IPv4 Gateway"
  kind: action
  command: "xConfiguration Network [n] IPv4 Gateway"
  params: []

- id: x_configuration_network_n_ipv4_interface_identifier
  label: "xConfiguration Network [n] IPv4 InterfaceIdentifier"
  kind: action
  command: "xConfiguration Network [n] IPv4 InterfaceIdentifier"
  params: []

- id: x_configuration_network_n_ipv4_subnet_mask
  label: "xConfiguration Network [n] IPv4 SubnetMask"
  kind: action
  command: "xConfiguration Network [n] IPv4 SubnetMask"
  params: []

- id: x_configuration_network_n_ipv6_assignment
  label: "xConfiguration Network [n] IPv6 Assignment"
  kind: action
  command: "xConfiguration Network [n] IPv6 Assignment"
  params: []

- id: x_configuration_network_n_ipv6_address
  label: "xConfiguration Network [n] IPv6 Address"
  kind: action
  command: "xConfiguration Network [n] IPv6 Address"
  params: []

- id: x_configuration_network_n_ipv6_dhcpoptions
  label: "xConfiguration Network [n] IPv6 DHCPOptions"
  kind: action
  command: "xConfiguration Network [n] IPv6 DHCPOptions"
  params: []

- id: x_configuration_network_n_ipv6_gateway
  label: "xConfiguration Network [n] IPv6 Gateway"
  kind: action
  command: "xConfiguration Network [n] IPv6 Gateway"
  params: []

- id: x_configuration_network_n_ipv6_interface_identifier
  label: "xConfiguration Network [n] IPv6 InterfaceIdentifier"
  kind: action
  command: "xConfiguration Network [n] IPv6 InterfaceIdentifier"
  params: []

- id: x_configuration_network_n_mtu
  label: "xConfiguration Network [n] MTU"
  kind: action
  command: "xConfiguration Network [n] MTU"
  params: []

- id: x_configuration_network_n_qo_s_mode
  label: "xConfiguration Network [n] QoS Mode"
  kind: action
  command: "xConfiguration Network [n] QoS Mode"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_audio
  label: "xConfiguration Network [n] QoS Diffserv Audio"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv Audio"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_video
  label: "xConfiguration Network [n] QoS Diffserv Video"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv Video"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_data
  label: "xConfiguration Network [n] QoS Diffserv Data"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv Data"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_signalling
  label: "xConfiguration Network [n] QoS Diffserv Signalling"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv Signalling"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_icmpv6
  label: "xConfiguration Network [n] QoS Diffserv ICMPv6"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv ICMPv6"
  params: []

- id: x_configuration_network_n_qo_s_diffserv_ntp
  label: "xConfiguration Network [n] QoS Diffserv NTP"
  kind: action
  command: "xConfiguration Network [n] QoS Diffserv NTP"
  params: []

- id: x_configuration_network_n_remote_access_allow
  label: "xConfiguration Network [n] RemoteAccess Allow"
  kind: action
  command: "xConfiguration Network [n] RemoteAccess Allow"
  params: []

- id: x_configuration_network_n_speed
  label: "xConfiguration Network [n] Speed"
  kind: action
  command: "xConfiguration Network [n] Speed"
  params: []

- id: x_configuration_network_n_vlan_voice_mode
  label: "xConfiguration Network [n] VLAN Voice Mode"
  kind: action
  command: "xConfiguration Network [n] VLAN Voice Mode"
  params: []

- id: x_configuration_network_services_cdp_mode
  label: "xConfiguration NetworkServices CDP Mode"
  kind: action
  command: "xConfiguration NetworkServices CDP Mode"
  params: []

- id: x_configuration_network_n_vlan_voice_vlan_id
  label: "xConfiguration Network [n] VLAN Voice VlanId"
  kind: action
  command: "xConfiguration Network [n] VLAN Voice VlanId"
  params: []

- id: x_configuration_network_services_h323_mode
  label: "xConfiguration NetworkServices H323 Mode"
  kind: action
  command: "xConfiguration NetworkServices H323 Mode"
  params: []

- id: x_configuration_network_services_http_mode
  label: "xConfiguration NetworkServices HTTP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Mode"
  params: []

- id: x_configuration_network_services_http_proxy_mode
  label: "xConfiguration NetworkServices HTTP Proxy Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Mode"
  params: []

- id: x_configuration_network_services_http_proxy_login_name
  label: "xConfiguration NetworkServices HTTP Proxy LoginName"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy LoginName"
  params: []

- id: x_configuration_network_services_http_proxy_pacurl
  label: "xConfiguration NetworkServices HTTP Proxy PACUrl"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy PACUrl"
  params: []

- id: x_configuration_network_services_http_proxy_password
  label: "xConfiguration NetworkServices HTTP Proxy Password"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Password"
  params: []

- id: x_configuration_network_services_http_proxy_url
  label: "xConfiguration NetworkServices HTTP Proxy Url"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Url"
  params: []

- id: x_configuration_network_services_https_server_minimum_tlsversion
  label: "xConfiguration NetworkServices HTTPS Server MinimumTLSVersion"
  kind: action
  command: "xConfiguration NetworkServices HTTPS Server MinimumTLSVersion"
  params: []

- id: x_configuration_network_services_https_strict_transport_security
  label: "xConfiguration NetworkServices HTTPS StrictTransportSecurity"
  kind: action
  command: "xConfiguration NetworkServices HTTPS StrictTransportSecurity"
  params: []

- id: x_configuration_network_services_ntp_mode
  label: "xConfiguration NetworkServices NTP Mode"
  kind: action
  command: "xConfiguration NetworkServices NTP Mode"
  params: []

- id: x_configuration_network_services_https_verify_client_certificate
  label: "xConfiguration NetworkServices HTTPS VerifyClientCertificate"
  kind: action
  command: "xConfiguration NetworkServices HTTPS VerifyClientCertificate"
  params: []

- id: x_configuration_network_services_ntp_server_n_address
  label: "xConfiguration NetworkServices NTP Server [n] Address"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] Address"
  params: []

- id: x_configuration_network_services_ntp_server_n_key
  label: "xConfiguration NetworkServices NTP Server [n] Key"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] Key"
  params: []

- id: x_configuration_network_services_ntp_server_n_key_algorithm
  label: "xConfiguration NetworkServices NTP Server [n] KeyAlgorithm"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] KeyAlgorithm"
  params: []

- id: x_configuration_network_services_ntp_server_n_key_id
  label: "xConfiguration NetworkServices NTP Server [n] KeyId"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] KeyId"
  params: []

- id: x_configuration_network_services_sip_mode
  label: "xConfiguration NetworkServices SIP Mode"
  kind: action
  command: "xConfiguration NetworkServices SIP Mode"
  params: []

- id: x_configuration_network_services_smtp_mode
  label: "xConfiguration NetworkServices SMTP Mode"
  kind: action
  command: "xConfiguration NetworkServices SMTP Mode"
  params: []

- id: x_configuration_network_services_smtp_port
  label: "xConfiguration NetworkServices SMTP Port"
  kind: action
  command: "xConfiguration NetworkServices SMTP Port"
  params: []

- id: x_configuration_network_services_smtp_server
  label: "xConfiguration NetworkServices SMTP Server"
  kind: action
  command: "xConfiguration NetworkServices SMTP Server"
  params: []

- id: x_configuration_network_services_smtp_username
  label: "xConfiguration NetworkServices SMTP Username"
  kind: action
  command: "xConfiguration NetworkServices SMTP Username"
  params: []

- id: x_configuration_network_services_smtp_password
  label: "xConfiguration NetworkServices SMTP Password"
  kind: action
  command: "xConfiguration NetworkServices SMTP Password"
  params: []

- id: x_configuration_network_services_smtp_security
  label: "xConfiguration NetworkServices SMTP Security"
  kind: action
  command: "xConfiguration NetworkServices SMTP Security"
  params: []

- id: x_configuration_network_services_smtp_from
  label: "xConfiguration NetworkServices SMTP From"
  kind: action
  command: "xConfiguration NetworkServices SMTP From"
  params: []

- id: x_configuration_network_services_snmp_community_name
  label: "xConfiguration NetworkServices SNMP CommunityName"
  kind: action
  command: "xConfiguration NetworkServices SNMP CommunityName"
  params: []

- id: x_configuration_network_services_snmp_mode
  label: "xConfiguration NetworkServices SNMP Mode"
  kind: action
  command: "xConfiguration NetworkServices SNMP Mode"
  params: []

- id: x_configuration_network_services_snmp_system_location
  label: "xConfiguration NetworkServices SNMP SystemLocation"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemLocation"
  params: []

- id: x_configuration_network_services_snmp_system_contact
  label: "xConfiguration NetworkServices SNMP SystemContact"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemContact"
  params: []

- id: x_configuration_network_services_ssh_mode
  label: "xConfiguration NetworkServices SSH Mode"
  kind: action
  command: "xConfiguration NetworkServices SSH Mode"
  params: []

- id: x_configuration_network_services_ssh_host_key_algorithm
  label: "xConfiguration NetworkServices SSH HostKeyAlgorithm"
  kind: action
  command: "xConfiguration NetworkServices SSH HostKeyAlgorithm"
  params: []

- id: x_configuration_network_services_upn_p_mode
  label: "xConfiguration NetworkServices UPnP Mode"
  kind: action
  command: "xConfiguration NetworkServices UPnP Mode"
  params: []

- id: x_configuration_network_services_websocket
  label: "xConfiguration NetworkServices Websocket"
  kind: action
  command: "xConfiguration NetworkServices Websocket"
  params: []

- id: x_configuration_network_services_welcome_text
  label: "xConfiguration NetworkServices WelcomeText"
  kind: action
  command: "xConfiguration NetworkServices WelcomeText"
  params: []

- id: x_configuration_network_services_wifi_allowed
  label: "xConfiguration NetworkServices Wifi Allowed"
  kind: action
  command: "xConfiguration NetworkServices Wifi Allowed"
  params: []

- id: x_configuration_network_services_wifi_settings_frequency_band
  label: "xConfiguration NetworkServices Wifi Settings FrequencyBand"
  kind: action
  command: "xConfiguration NetworkServices Wifi Settings FrequencyBand"
  params: []

- id: x_configuration_peripherals_input_device_mode
  label: "xConfiguration Peripherals InputDevice Mode"
  kind: action
  command: "xConfiguration Peripherals InputDevice Mode"
  params: []

- id: x_configuration_peripherals_pairing_cisco_touch_panels_http_proxy
  label: "xConfiguration Peripherals Pairing CiscoTouchPanels HttpProxy"
  kind: action
  command: "xConfiguration Peripherals Pairing CiscoTouchPanels HttpProxy"
  params: []

- id: x_configuration_peripherals_pairing_cisco_touch_panels_remote_pairing
  label: "xConfiguration Peripherals Pairing CiscoTouchPanels RemotePairing"
  kind: action
  command: "xConfiguration Peripherals Pairing CiscoTouchPanels RemotePairing"
  params: []

- id: x_configuration_peripherals_profile_cameras
  label: "xConfiguration Peripherals Profile Cameras"
  kind: action
  command: "xConfiguration Peripherals Profile Cameras"
  params: []

- id: x_configuration_peripherals_profile_control_systems
  label: "xConfiguration Peripherals Profile ControlSystems"
  kind: action
  command: "xConfiguration Peripherals Profile ControlSystems"
  params: []

- id: x_configuration_peripherals_profile_touch_panels
  label: "xConfiguration Peripherals Profile TouchPanels"
  kind: action
  command: "xConfiguration Peripherals Profile TouchPanels"
  params: []

- id: x_configuration_phonebook_server_n_id
  label: "xConfiguration Phonebook Server [n] ID"
  kind: action
  command: "xConfiguration Phonebook Server [n] ID"
  params: []

- id: x_configuration_phonebook_server_n_pagination
  label: "xConfiguration Phonebook Server [n] Pagination"
  kind: action
  command: "xConfiguration Phonebook Server [n] Pagination"
  params: []

- id: x_configuration_phonebook_server_n_tls_verify
  label: "xConfiguration Phonebook Server [n] TlsVerify"
  kind: action
  command: "xConfiguration Phonebook Server [n] TlsVerify"
  params: []

- id: x_configuration_phonebook_server_n_type
  label: "xConfiguration Phonebook Server [n] Type"
  kind: action
  command: "xConfiguration Phonebook Server [n] Type"
  params: []

- id: x_configuration_phonebook_server_n_url
  label: "xConfiguration Phonebook Server [n] URL"
  kind: action
  command: "xConfiguration Phonebook Server [n] URL"
  params: []

- id: x_configuration_provisioning_connectivity
  label: "xConfiguration Provisioning Connectivity"
  kind: action
  command: "xConfiguration Provisioning Connectivity"
  params: []

- id: x_configuration_provisioning_external_manager_address
  label: "xConfiguration Provisioning ExternalManager Address"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Address"
  params: []

- id: x_configuration_provisioning_cucm_call_management_records_call_diagnostics
  label: "xConfiguration Provisioning CUCM CallManagementRecords CallDiagnostics"
  kind: action
  command: "xConfiguration Provisioning CUCM CallManagementRecords CallDiagnostics"
  params: []

- id: x_configuration_provisioning_external_manager_alternate_address
  label: "xConfiguration Provisioning ExternalManager AlternateAddress"
  kind: action
  command: "xConfiguration Provisioning ExternalManager AlternateAddress"
  params: []

- id: x_configuration_provisioning_external_manager_protocol
  label: "xConfiguration Provisioning ExternalManager Protocol"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Protocol"
  params: []

- id: x_configuration_provisioning_external_manager_domain
  label: "xConfiguration Provisioning ExternalManager Domain"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Domain"
  params: []

- id: x_configuration_provisioning_external_manager_path
  label: "xConfiguration Provisioning ExternalManager Path"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Path"
  params: []

- id: x_configuration_provisioning_mode
  label: "xConfiguration Provisioning Mode"
  kind: action
  command: "xConfiguration Provisioning Mode"
  params: []

- id: x_configuration_provisioning_login_name
  label: "xConfiguration Provisioning LoginName"
  kind: action
  command: "xConfiguration Provisioning LoginName"
  params: []

- id: x_configuration_provisioning_password
  label: "xConfiguration Provisioning Password"
  kind: action
  command: "xConfiguration Provisioning Password"
  params: []

- id: x_configuration_provisioning_tls_verify
  label: "xConfiguration Provisioning TlsVerify"
  kind: action
  command: "xConfiguration Provisioning TlsVerify"
  params: []

- id: x_configuration_provisioning_webex_edge
  label: "xConfiguration Provisioning WebexEdge"
  kind: action
  command: "xConfiguration Provisioning WebexEdge"
  params: []

- id: x_configuration_proximity_alternate_port_enabled
  label: "xConfiguration Proximity AlternatePort Enabled"
  kind: action
  command: "xConfiguration Proximity AlternatePort Enabled"
  params: []

- id: x_configuration_proximity_mode
  label: "xConfiguration Proximity Mode"
  kind: action
  command: "xConfiguration Proximity Mode"
  params: []

- id: x_configuration_proximity_services_call_control
  label: "xConfiguration Proximity Services CallControl"
  kind: action
  command: "xConfiguration Proximity Services CallControl"
  params: []

- id: x_configuration_proximity_services_content_share_to_clients
  label: "xConfiguration Proximity Services ContentShare ToClients"
  kind: action
  command: "xConfiguration Proximity Services ContentShare ToClients"
  params: []

- id: x_configuration_proximity_services_content_share_from_clients
  label: "xConfiguration Proximity Services ContentShare FromClients"
  kind: action
  command: "xConfiguration Proximity Services ContentShare FromClients"
  params: []

- id: x_configuration_room_analytics_ambient_noise_estimation_interval
  label: "xConfiguration RoomAnalytics AmbientNoiseEstimation Interval"
  kind: action
  command: "xConfiguration RoomAnalytics AmbientNoiseEstimation Interval"
  params: []

- id: x_configuration_room_analytics_ambient_noise_estimation_mode
  label: "xConfiguration RoomAnalytics AmbientNoiseEstimation Mode"
  kind: action
  command: "xConfiguration RoomAnalytics AmbientNoiseEstimation Mode"
  params: []

- id: x_configuration_room_analytics_people_count_out_of_call
  label: "xConfiguration RoomAnalytics PeopleCountOutOfCall"
  kind: action
  command: "xConfiguration RoomAnalytics PeopleCountOutOfCall"
  params: []

- id: x_configuration_room_analytics_people_presence_detector
  label: "xConfiguration RoomAnalytics PeoplePresenceDetector"
  kind: action
  command: "xConfiguration RoomAnalytics PeoplePresenceDetector"
  params: []

- id: x_configuration_room_analytics_people_presence_input_head_detector
  label: "xConfiguration RoomAnalytics PeoplePresence Input HeadDetector"
  kind: action
  command: "xConfiguration RoomAnalytics PeoplePresence Input HeadDetector"
  params: []

- id: x_configuration_room_analytics_people_presence_input_ultrasound
  label: "xConfiguration RoomAnalytics PeoplePresence Input Ultrasound"
  kind: action
  command: "xConfiguration RoomAnalytics PeoplePresence Input Ultrasound"
  params: []

- id: x_configuration_room_analytics_reverberation_time_interval
  label: "xConfiguration RoomAnalytics ReverberationTime Interval"
  kind: action
  command: "xConfiguration RoomAnalytics ReverberationTime Interval"
  params: []

- id: x_configuration_room_analytics_reverberation_time_mode
  label: "xConfiguration RoomAnalytics ReverberationTime Mode"
  kind: action
  command: "xConfiguration RoomAnalytics ReverberationTime Mode"
  params: []

- id: x_configuration_room_analytics_t3_alarm_detection_mode
  label: "xConfiguration RoomAnalytics T3AlarmDetection Mode"
  kind: action
  command: "xConfiguration RoomAnalytics T3AlarmDetection Mode"
  params: []

- id: x_configuration_room_cleanup_auto_run_content_type_temporary_accounts
  label: "xConfiguration RoomCleanup AutoRun ContentType TemporaryAccounts"
  kind: action
  command: "xConfiguration RoomCleanup AutoRun ContentType TemporaryAccounts"
  params: []

- id: x_configuration_room_cleanup_auto_run_content_type_web_data
  label: "xConfiguration RoomCleanup AutoRun ContentType WebData"
  kind: action
  command: "xConfiguration RoomCleanup AutoRun ContentType WebData"
  params: []

- id: x_configuration_room_analytics_t3_alarm_detection_timeout
  label: "xConfiguration RoomAnalytics T3AlarmDetection Timeout"
  kind: action
  command: "xConfiguration RoomAnalytics T3AlarmDetection Timeout"
  params: []

- id: x_configuration_room_cleanup_auto_run_content_type_whiteboards
  label: "xConfiguration RoomCleanup AutoRun ContentType Whiteboards"
  kind: action
  command: "xConfiguration RoomCleanup AutoRun ContentType Whiteboards"
  params: []

- id: x_configuration_room_scheduler_enabled
  label: "xConfiguration RoomScheduler Enabled"
  kind: action
  command: "xConfiguration RoomScheduler Enabled"
  params: []

- id: x_configuration_room_cleanup_auto_run_hour_of_day
  label: "xConfiguration RoomCleanup AutoRun HourOfDay"
  kind: action
  command: "xConfiguration RoomCleanup AutoRun HourOfDay"
  params: []

- id: x_configuration_security_audit_logging_mode
  label: "xConfiguration Security Audit Logging Mode"
  kind: action
  command: "xConfiguration Security Audit Logging Mode"
  params: []

- id: x_configuration_security_audit_on_error_action
  label: "xConfiguration Security Audit OnError Action"
  kind: action
  command: "xConfiguration Security Audit OnError Action"
  params: []

- id: x_configuration_security_audit_server_address
  label: "xConfiguration Security Audit Server Address"
  kind: action
  command: "xConfiguration Security Audit Server Address"
  params: []

- id: x_configuration_security_audit_server_port
  label: "xConfiguration Security Audit Server Port"
  kind: action
  command: "xConfiguration Security Audit Server Port"
  params: []

- id: x_configuration_security_audit_server_port_assignment
  label: "xConfiguration Security Audit Server PortAssignment"
  kind: action
  command: "xConfiguration Security Audit Server PortAssignment"
  params: []

- id: x_configuration_security_fips_mode
  label: "xConfiguration Security Fips Mode"
  kind: action
  command: "xConfiguration Security Fips Mode"
  params: []

- id: x_configuration_security_session_failed_logins_lockout_time
  label: "xConfiguration Security Session FailedLoginsLockoutTime"
  kind: action
  command: "xConfiguration Security Session FailedLoginsLockoutTime"
  params: []

- id: x_configuration_security_session_inactivity_timeout
  label: "xConfiguration Security Session InactivityTimeout"
  kind: action
  command: "xConfiguration Security Session InactivityTimeout"
  params: []

- id: x_configuration_security_session_max_failed_logins
  label: "xConfiguration Security Session MaxFailedLogins"
  kind: action
  command: "xConfiguration Security Session MaxFailedLogins"
  params: []

- id: x_configuration_security_session_max_sessions_per_user
  label: "xConfiguration Security Session MaxSessionsPerUser"
  kind: action
  command: "xConfiguration Security Session MaxSessionsPerUser"
  params: []

- id: x_configuration_security_session_max_total_sessions
  label: "xConfiguration Security Session MaxTotalSessions"
  kind: action
  command: "xConfiguration Security Session MaxTotalSessions"
  params: []

- id: x_configuration_security_session_show_last_logon
  label: "xConfiguration Security Session ShowLastLogon"
  kind: action
  command: "xConfiguration Security Session ShowLastLogon"
  params: []

- id: x_configuration_serial_port_mode
  label: "xConfiguration SerialPort Mode"
  kind: action
  command: "xConfiguration SerialPort Mode"
  params: []

- id: x_configuration_security_xapi_web_socket_api_key_allowed
  label: "xConfiguration Security Xapi WebSocket ApiKey Allowed"
  kind: action
  command: "xConfiguration Security Xapi WebSocket ApiKey Allowed"
  params: []

- id: x_configuration_serial_port_baud_rate
  label: "xConfiguration SerialPort BaudRate"
  kind: action
  command: "xConfiguration SerialPort BaudRate"
  params: []

- id: x_configuration_sip_anat
  label: "xConfiguration SIP ANAT"
  kind: action
  command: "xConfiguration SIP ANAT"
  params: []

- id: x_configuration_sip_authentication_user_name
  label: "xConfiguration SIP Authentication UserName"
  kind: action
  command: "xConfiguration SIP Authentication UserName"
  params: []

- id: x_configuration_serial_port_login_required
  label: "xConfiguration SerialPort LoginRequired"
  kind: action
  command: "xConfiguration SerialPort LoginRequired"
  params: []

- id: x_configuration_sip_authentication_password
  label: "xConfiguration SIP Authentication Password"
  kind: action
  command: "xConfiguration SIP Authentication Password"
  params: []

- id: x_configuration_sip_default_transport
  label: "xConfiguration SIP DefaultTransport"
  kind: action
  command: "xConfiguration SIP DefaultTransport"
  params: []

- id: x_configuration_sip_display_name
  label: "xConfiguration SIP DisplayName"
  kind: action
  command: "xConfiguration SIP DisplayName"
  params: []

- id: x_configuration_sip_ice_default_candidate
  label: "xConfiguration SIP Ice DefaultCandidate"
  kind: action
  command: "xConfiguration SIP Ice DefaultCandidate"
  params: []

- id: x_configuration_sip_ice_mode
  label: "xConfiguration SIP Ice Mode"
  kind: action
  command: "xConfiguration SIP Ice Mode"
  params: []

- id: x_configuration_sip_minimum_tlsversion
  label: "xConfiguration SIP MinimumTLSVersion"
  kind: action
  command: "xConfiguration SIP MinimumTLSVersion"
  params: []

- id: x_configuration_sip_proxy_n_address
  label: "xConfiguration SIP Proxy [n] Address"
  kind: action
  command: "xConfiguration SIP Proxy [n] Address"
  params: []

- id: x_configuration_sip_listen_port
  label: "xConfiguration SIP ListenPort"
  kind: action
  command: "xConfiguration SIP ListenPort"
  params: []

- id: x_configuration_sip_tls_verify
  label: "xConfiguration SIP TlsVerify"
  kind: action
  command: "xConfiguration SIP TlsVerify"
  params: []

- id: x_configuration_sip_turn_user_name
  label: "xConfiguration SIP Turn UserName"
  kind: action
  command: "xConfiguration SIP Turn UserName"
  params: []

- id: x_configuration_sip_turn_password
  label: "xConfiguration SIP Turn Password"
  kind: action
  command: "xConfiguration SIP Turn Password"
  params: []

- id: x_configuration_sip_turn_server
  label: "xConfiguration SIP Turn Server"
  kind: action
  command: "xConfiguration SIP Turn Server"
  params: []

- id: x_configuration_sip_uri
  label: "xConfiguration SIP URI"
  kind: action
  command: "xConfiguration SIP URI"
  params: []

- id: x_configuration_standby_boot_action
  label: "xConfiguration Standby BootAction"
  kind: action
  command: "xConfiguration Standby BootAction"
  params: []

- id: x_configuration_standby_control
  label: "xConfiguration Standby Control"
  kind: action
  command: "xConfiguration Standby Control"
  params: []

- id: x_configuration_standby_delay
  label: "xConfiguration Standby Delay"
  kind: action
  command: "xConfiguration Standby Delay"
  params: []

- id: x_configuration_standby_level_networked_delay
  label: "xConfiguration Standby Level Networked Delay"
  kind: action
  command: "xConfiguration Standby Level Networked Delay"
  params: []

- id: x_configuration_standby_level_networked_mode
  label: "xConfiguration Standby Level Networked Mode"
  kind: action
  command: "xConfiguration Standby Level Networked Mode"
  params: []

- id: x_configuration_standby_halfwake_mode
  label: "xConfiguration Standby Halfwake Mode"
  kind: action
  command: "xConfiguration Standby Halfwake Mode"
  params: []

- id: x_configuration_standby_signage_interaction_mode
  label: "xConfiguration Standby Signage InteractionMode"
  kind: action
  command: "xConfiguration Standby Signage InteractionMode"
  params: []

- id: x_configuration_standby_signage_mode
  label: "xConfiguration Standby Signage Mode"
  kind: action
  command: "xConfiguration Standby Signage Mode"
  params: []

- id: x_configuration_standby_signage_audio
  label: "xConfiguration Standby Signage Audio"
  kind: action
  command: "xConfiguration Standby Signage Audio"
  params: []

- id: x_configuration_standby_signage_refresh_interval
  label: "xConfiguration Standby Signage RefreshInterval"
  kind: action
  command: "xConfiguration Standby Signage RefreshInterval"
  params: []

- id: x_configuration_standby_standby_action
  label: "xConfiguration Standby StandbyAction"
  kind: action
  command: "xConfiguration Standby StandbyAction"
  params: []

- id: x_configuration_standby_signage_url
  label: "xConfiguration Standby Signage Url"
  kind: action
  command: "xConfiguration Standby Signage Url"
  params: []

- id: x_configuration_standby_wakeup_action
  label: "xConfiguration Standby WakeupAction"
  kind: action
  command: "xConfiguration Standby WakeupAction"
  params: []

- id: x_configuration_standby_wakeup_at_meeting_start
  label: "xConfiguration Standby WakeupAtMeetingStart"
  kind: action
  command: "xConfiguration Standby WakeupAtMeetingStart"
  params: []

- id: x_configuration_system_unit_name
  label: "xConfiguration SystemUnit Name"
  kind: action
  command: "xConfiguration SystemUnit Name"
  params: []

- id: x_configuration_standby_wakeup_on_motion_detection
  label: "xConfiguration Standby WakeupOnMotionDetection"
  kind: action
  command: "xConfiguration Standby WakeupOnMotionDetection"
  params: []

- id: x_configuration_system_unit_broadcast_name
  label: "xConfiguration SystemUnit BroadcastName"
  kind: action
  command: "xConfiguration SystemUnit BroadcastName"
  params: []

- id: x_configuration_system_unit_crash_reporting_mode
  label: "xConfiguration SystemUnit CrashReporting Mode"
  kind: action
  command: "xConfiguration SystemUnit CrashReporting Mode"
  params: []

- id: x_configuration_system_unit_custom_device_id
  label: "xConfiguration SystemUnit CustomDeviceId"
  kind: action
  command: "xConfiguration SystemUnit CustomDeviceId"
  params: []

- id: x_configuration_system_unit_crash_reporting_url
  label: "xConfiguration SystemUnit CrashReporting URL"
  kind: action
  command: "xConfiguration SystemUnit CrashReporting URL"
  params: []

- id: x_configuration_time_date_format
  label: "xConfiguration Time DateFormat"
  kind: action
  command: "xConfiguration Time DateFormat"
  params: []

- id: x_configuration_time_zone
  label: "xConfiguration Time Zone"
  kind: action
  command: "xConfiguration Time Zone"
  params: []

- id: x_configuration_time_time_format
  label: "xConfiguration Time TimeFormat"
  kind: action
  command: "xConfiguration Time TimeFormat"
  params: []

- id: x_configuration_time_office_hours_enabled
  label: "xConfiguration Time OfficeHours Enabled"
  kind: action
  command: "xConfiguration Time OfficeHours Enabled"
  params: []

- id: x_configuration_time_office_hours_outside_office_hours_standby_delay
  label: "xConfiguration Time OfficeHours OutsideOfficeHours Standby Delay"
  kind: action
  command: "xConfiguration Time OfficeHours OutsideOfficeHours Standby Delay"
  params: []

- id: x_configuration_time_office_hours_work_day_end
  label: "xConfiguration Time OfficeHours WorkDay End"
  kind: action
  command: "xConfiguration Time OfficeHours WorkDay End"
  params: []

- id: x_configuration_time_office_hours_outside_office_hours_standby_auto_wakeup
  label: "xConfiguration Time OfficeHours OutsideOfficeHours Standby AutoWakeup"
  kind: action
  command: "xConfiguration Time OfficeHours OutsideOfficeHours Standby AutoWakeup"
  params: []

- id: x_configuration_time_office_hours_work_day_start
  label: "xConfiguration Time OfficeHours WorkDay Start"
  kind: action
  command: "xConfiguration Time OfficeHours WorkDay Start"
  params: []

- id: x_configuration_time_office_hours_work_week_monday
  label: "xConfiguration Time OfficeHours WorkWeek Monday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Monday"
  params: []

- id: x_configuration_time_office_hours_work_week_tuesday
  label: "xConfiguration Time OfficeHours WorkWeek Tuesday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Tuesday"
  params: []

- id: x_configuration_time_office_hours_work_week_wednesday
  label: "xConfiguration Time OfficeHours WorkWeek Wednesday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Wednesday"
  params: []

- id: x_configuration_time_office_hours_work_week_thursday
  label: "xConfiguration Time OfficeHours WorkWeek Thursday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Thursday"
  params: []

- id: x_configuration_time_office_hours_work_week_friday
  label: "xConfiguration Time OfficeHours WorkWeek Friday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Friday"
  params: []

- id: x_configuration_time_office_hours_work_week_saturday
  label: "xConfiguration Time OfficeHours WorkWeek Saturday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Saturday"
  params: []

- id: x_configuration_time_office_hours_work_week_sunday
  label: "xConfiguration Time OfficeHours WorkWeek Sunday"
  kind: action
  command: "xConfiguration Time OfficeHours WorkWeek Sunday"
  params: []

- id: x_configuration_user_interface_accessibility_incoming_call_notification
  label: "xConfiguration UserInterface Accessibility IncomingCallNotification"
  kind: action
  command: "xConfiguration UserInterface Accessibility IncomingCallNotification"
  params: []

- id: x_configuration_user_interface_assistant_mode
  label: "xConfiguration UserInterface Assistant Mode"
  kind: action
  command: "xConfiguration UserInterface Assistant Mode"
  params: []

- id: x_configuration_user_interface_assistant_proactive_meeting_join
  label: "xConfiguration UserInterface Assistant ProactiveMeetingJoin"
  kind: action
  command: "xConfiguration UserInterface Assistant ProactiveMeetingJoin"
  params: []

- id: x_configuration_user_interface_bookings_visibility_early_join
  label: "xConfiguration UserInterface Bookings Visibility EarlyJoin"
  kind: action
  command: "xConfiguration UserInterface Bookings Visibility EarlyJoin"
  params: []

- id: x_configuration_user_interface_bookings_visibility_joined_participants_avatars
  label: "xConfiguration UserInterface Bookings Visibility JoinedParticipants Avatars"
  kind: action
  command: "xConfiguration UserInterface Bookings Visibility JoinedParticipants Avatars"
  params: []

- id: x_configuration_user_interface_bookings_visibility_tentative_meetings
  label: "xConfiguration UserInterface Bookings Visibility TentativeMeetings"
  kind: action
  command: "xConfiguration UserInterface Bookings Visibility TentativeMeetings"
  params: []

- id: x_configuration_user_interface_bookings_visibility_title
  label: "xConfiguration UserInterface Bookings Visibility Title"
  kind: action
  command: "xConfiguration UserInterface Bookings Visibility Title"
  params: []

- id: x_configuration_user_interface_branding_awake_branding_colors
  label: "xConfiguration UserInterface Branding AwakeBranding Colors"
  kind: action
  command: "xConfiguration UserInterface Branding AwakeBranding Colors"
  params: []

- id: x_configuration_user_interface_contact_info_type
  label: "xConfiguration UserInterface ContactInfo Type"
  kind: action
  command: "xConfiguration UserInterface ContactInfo Type"
  params: []

- id: x_configuration_user_interface_custom_message
  label: "xConfiguration UserInterface CustomMessage"
  kind: action
  command: "xConfiguration UserInterface CustomMessage"
  params: []

- id: x_configuration_user_interface_custom_wallpaper_overlay
  label: "xConfiguration UserInterface CustomWallpaperOverlay"
  kind: action
  command: "xConfiguration UserInterface CustomWallpaperOverlay"
  params: []

- id: x_configuration_user_interface_diagnostics_notifications
  label: "xConfiguration UserInterface Diagnostics Notifications"
  kind: action
  command: "xConfiguration UserInterface Diagnostics Notifications"
  params: []

- id: x_configuration_user_interface_features_call_camera_controls
  label: "xConfiguration UserInterface Features Call CameraControls"
  kind: action
  command: "xConfiguration UserInterface Features Call CameraControls"
  params: []

- id: x_configuration_user_interface_features_call_end
  label: "xConfiguration UserInterface Features Call End"
  kind: action
  command: "xConfiguration UserInterface Features Call End"
  params: []

- id: x_configuration_user_interface_features_call_hdmi_passthrough
  label: "xConfiguration UserInterface Features Call HdmiPassthrough"
  kind: action
  command: "xConfiguration UserInterface Features Call HdmiPassthrough"
  params: []

- id: x_configuration_user_interface_features_call_join_zoom
  label: "xConfiguration UserInterface Features Call JoinZoom"
  kind: action
  command: "xConfiguration UserInterface Features Call JoinZoom"
  params: []

- id: x_configuration_user_interface_features_call_join_webex
  label: "xConfiguration UserInterface Features Call JoinWebex"
  kind: action
  command: "xConfiguration UserInterface Features Call JoinWebex"
  params: []

- id: x_configuration_user_interface_features_call_join_google_meet
  label: "xConfiguration UserInterface Features Call JoinGoogleMeet"
  kind: action
  command: "xConfiguration UserInterface Features Call JoinGoogleMeet"
  params: []

- id: x_configuration_user_interface_features_call_keypad
  label: "xConfiguration UserInterface Features Call Keypad"
  kind: action
  command: "xConfiguration UserInterface Features Call Keypad"
  params: []

- id: x_configuration_user_interface_features_call_mid_call_controls
  label: "xConfiguration UserInterface Features Call MidCallControls"
  kind: action
  command: "xConfiguration UserInterface Features Call MidCallControls"
  params: []

- id: x_configuration_user_interface_features_call_layout_controls
  label: "xConfiguration UserInterface Features Call LayoutControls"
  kind: action
  command: "xConfiguration UserInterface Features Call LayoutControls"
  params: []

- id: x_configuration_user_interface_features_call_music_mode
  label: "xConfiguration UserInterface Features Call MusicMode"
  kind: action
  command: "xConfiguration UserInterface Features Call MusicMode"
  params: []

- id: x_configuration_user_interface_features_call_participant_list
  label: "xConfiguration UserInterface Features Call ParticipantList"
  kind: action
  command: "xConfiguration UserInterface Features Call ParticipantList"
  params: []

- id: x_configuration_user_interface_features_call_start
  label: "xConfiguration UserInterface Features Call Start"
  kind: action
  command: "xConfiguration UserInterface Features Call Start"
  params: []

- id: x_configuration_user_interface_features_call_selfview_controls
  label: "xConfiguration UserInterface Features Call SelfviewControls"
  kind: action
  command: "xConfiguration UserInterface Features Call SelfviewControls"
  params: []

- id: x_configuration_user_interface_features_call_video_mute
  label: "xConfiguration UserInterface Features Call VideoMute"
  kind: action
  command: "xConfiguration UserInterface Features Call VideoMute"
  params: []

- id: x_configuration_user_interface_features_call_webcam
  label: "xConfiguration UserInterface Features Call Webcam"
  kind: action
  command: "xConfiguration UserInterface Features Call Webcam"
  params: []

- id: x_configuration_user_interface_features_hide_all
  label: "xConfiguration UserInterface Features HideAll"
  kind: action
  command: "xConfiguration UserInterface Features HideAll"
  params: []

- id: x_configuration_user_interface_features_files_start
  label: "xConfiguration UserInterface Features Files Start"
  kind: action
  command: "xConfiguration UserInterface Features Files Start"
  params: []

- id: x_configuration_user_interface_features_share_start
  label: "xConfiguration UserInterface Features Share Start"
  kind: action
  command: "xConfiguration UserInterface Features Share Start"
  params: []

- id: x_configuration_user_interface_features_whiteboard_start
  label: "xConfiguration UserInterface Features Whiteboard Start"
  kind: action
  command: "xConfiguration UserInterface Features Whiteboard Start"
  params: []

- id: x_configuration_user_interface_home_screen_dashboard
  label: "xConfiguration UserInterface HomeScreen Dashboard"
  kind: action
  command: "xConfiguration UserInterface HomeScreen Dashboard"
  params: []

- id: x_configuration_user_interface_help_tips
  label: "xConfiguration UserInterface Help Tips"
  kind: action
  command: "xConfiguration UserInterface Help Tips"
  params: []

- id: x_configuration_user_interface_home_screen_peripherals_web_app_url
  label: "xConfiguration UserInterface HomeScreen Peripherals WebApp URL"
  kind: action
  command: "xConfiguration UserInterface HomeScreen Peripherals WebApp URL"
  params: []

- id: x_configuration_user_interface_key_tones_mode
  label: "xConfiguration UserInterface KeyTones Mode"
  kind: action
  command: "xConfiguration UserInterface KeyTones Mode"
  params: []

- id: x_configuration_user_interface_kiosk_url
  label: "xConfiguration UserInterface Kiosk URL"
  kind: action
  command: "xConfiguration UserInterface Kiosk URL"
  params: []

- id: x_configuration_user_interface_kiosk_mode
  label: "xConfiguration UserInterface Kiosk Mode"
  kind: action
  command: "xConfiguration UserInterface Kiosk Mode"
  params: []

- id: x_configuration_user_interface_language
  label: "xConfiguration UserInterface Language"
  kind: action
  command: "xConfiguration UserInterface Language"
  params: []

- id: x_configuration_user_interface_led_control_mode
  label: "xConfiguration UserInterface LedControl Mode"
  kind: action
  command: "xConfiguration UserInterface LedControl Mode"
  params: []

- id: x_configuration_user_interface_name_and_site_labels_mode
  label: "xConfiguration UserInterface NameAndSiteLabels Mode"
  kind: action
  command: "xConfiguration UserInterface NameAndSiteLabels Mode"
  params: []

- id: x_configuration_user_interface_osd_encryption_indicator
  label: "xConfiguration UserInterface OSD EncryptionIndicator"
  kind: action
  command: "xConfiguration UserInterface OSD EncryptionIndicator"
  params: []

- id: x_configuration_user_interface_mute_warning
  label: "xConfiguration UserInterface MuteWarning"
  kind: action
  command: "xConfiguration UserInterface MuteWarning"
  params: []

- id: x_configuration_user_interface_osd_halfwake_message
  label: "xConfiguration UserInterface OSD HalfwakeMessage"
  kind: action
  command: "xConfiguration UserInterface OSD HalfwakeMessage"
  params: []

- id: x_configuration_user_interface_osd_mode
  label: "xConfiguration UserInterface OSD Mode"
  kind: action
  command: "xConfiguration UserInterface OSD Mode"
  params: []

- id: x_configuration_user_interface_osd_output
  label: "xConfiguration UserInterface OSD Output"
  kind: action
  command: "xConfiguration UserInterface OSD Output"
  params: []

- id: x_configuration_user_interface_phonebook_default_search_filter
  label: "xConfiguration UserInterface Phonebook DefaultSearchFilter"
  kind: action
  command: "xConfiguration UserInterface Phonebook DefaultSearchFilter"
  params: []

- id: x_configuration_user_interface_phonebook_mode
  label: "xConfiguration UserInterface Phonebook Mode"
  kind: action
  command: "xConfiguration UserInterface Phonebook Mode"
  params: []

- id: x_configuration_user_interface_proximity_notifications
  label: "xConfiguration UserInterface Proximity Notifications"
  kind: action
  command: "xConfiguration UserInterface Proximity Notifications"
  params: []

- id: x_configuration_user_interface_room_scheduler_ambient_temperature_show
  label: "xConfiguration UserInterface RoomScheduler AmbientTemperature Show"
  kind: action
  command: "xConfiguration UserInterface RoomScheduler AmbientTemperature Show"
  params: []

- id: x_configuration_user_interface_room_scheduler_people_count_current
  label: "xConfiguration UserInterface RoomScheduler PeopleCount Current"
  kind: action
  command: "xConfiguration UserInterface RoomScheduler PeopleCount Current"
  params: []

- id: x_configuration_user_interface_room_scheduler_status_when_in_use
  label: "xConfiguration UserInterface RoomScheduler StatusWhenInUse"
  kind: action
  command: "xConfiguration UserInterface RoomScheduler StatusWhenInUse"
  params: []

- id: x_configuration_user_interface_room_status_menu_visibility
  label: "xConfiguration UserInterface RoomStatusMenu Visibility"
  kind: action
  command: "xConfiguration UserInterface RoomStatusMenu Visibility"
  params: []

- id: x_configuration_user_interface_security_mode
  label: "xConfiguration UserInterface Security Mode"
  kind: action
  command: "xConfiguration UserInterface Security Mode"
  params: []

- id: x_configuration_user_interface_settings_menu_mode
  label: "xConfiguration UserInterface SettingsMenu Mode"
  kind: action
  command: "xConfiguration UserInterface SettingsMenu Mode"
  params: []

- id: x_configuration_user_interface_sound_effects_mode
  label: "xConfiguration UserInterface SoundEffects Mode"
  kind: action
  command: "xConfiguration UserInterface SoundEffects Mode"
  params: []

- id: x_configuration_user_interface_theme_name
  label: "xConfiguration UserInterface Theme Name"
  kind: action
  command: "xConfiguration UserInterface Theme Name"
  params: []

- id: x_configuration_user_interface_settings_menu_visibility
  label: "xConfiguration UserInterface SettingsMenu Visibility"
  kind: action
  command: "xConfiguration UserInterface SettingsMenu Visibility"
  params: []

- id: x_configuration_user_interface_usb_promotion
  label: "xConfiguration UserInterface UsbPromotion"
  kind: action
  command: "xConfiguration UserInterface UsbPromotion"
  params: []

- id: x_configuration_user_interface_whiteboard_activity_indicators
  label: "xConfiguration UserInterface Whiteboard ActivityIndicators"
  kind: action
  command: "xConfiguration UserInterface Whiteboard ActivityIndicators"
  params: []

- id: x_configuration_user_interface_webcam_only_mode
  label: "xConfiguration UserInterface WebcamOnlyMode"
  kind: action
  command: "xConfiguration UserInterface WebcamOnlyMode"
  params: []

- id: x_configuration_user_management_ldap_admin_filter
  label: "xConfiguration UserManagement LDAP Admin Filter"
  kind: action
  command: "xConfiguration UserManagement LDAP Admin Filter"
  params: []

- id: x_configuration_user_management_ldap_attribute
  label: "xConfiguration UserManagement LDAP Attribute"
  kind: action
  command: "xConfiguration UserManagement LDAP Attribute"
  params: []

- id: x_configuration_user_management_ldap_base_dn
  label: "xConfiguration UserManagement LDAP BaseDN"
  kind: action
  command: "xConfiguration UserManagement LDAP BaseDN"
  params: []

- id: x_configuration_user_management_ldap_admin_group
  label: "xConfiguration UserManagement LDAP Admin Group"
  kind: action
  command: "xConfiguration UserManagement LDAP Admin Group"
  params: []

- id: x_configuration_user_management_ldap_encryption
  label: "xConfiguration UserManagement LDAP Encryption"
  kind: action
  command: "xConfiguration UserManagement LDAP Encryption"
  params: []

- id: x_configuration_user_management_ldap_mode
  label: "xConfiguration UserManagement LDAP Mode"
  kind: action
  command: "xConfiguration UserManagement LDAP Mode"
  params: []

- id: x_configuration_user_management_ldap_minimum_tlsversion
  label: "xConfiguration UserManagement LDAP MinimumTLSVersion"
  kind: action
  command: "xConfiguration UserManagement LDAP MinimumTLSVersion"
  params: []

- id: x_configuration_user_management_ldap_server_address
  label: "xConfiguration UserManagement LDAP Server Address"
  kind: action
  command: "xConfiguration UserManagement LDAP Server Address"
  params: []

- id: x_configuration_user_management_ldap_server_port
  label: "xConfiguration UserManagement LDAP Server Port"
  kind: action
  command: "xConfiguration UserManagement LDAP Server Port"
  params: []

- id: x_configuration_user_management_ldap_verify_server_certificate
  label: "xConfiguration UserManagement LDAP VerifyServerCertificate"
  kind: action
  command: "xConfiguration UserManagement LDAP VerifyServerCertificate"
  params: []

- id: x_configuration_user_management_password_policy_complexity_minimum_digits
  label: "xConfiguration UserManagement PasswordPolicy Complexity MinimumDigits"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy Complexity MinimumDigits"
  params: []

- id: x_configuration_user_management_password_policy_complexity_minimum_length
  label: "xConfiguration UserManagement PasswordPolicy Complexity MinimumLength"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy Complexity MinimumLength"
  params: []

- id: x_configuration_user_management_password_policy_complexity_minimum_lowercase
  label: "xConfiguration UserManagement PasswordPolicy Complexity MinimumLowercase"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy Complexity MinimumLowercase"
  params: []

- id: x_configuration_user_management_password_policy_complexity_minimum_special
  label: "xConfiguration UserManagement PasswordPolicy Complexity MinimumSpecial"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy Complexity MinimumSpecial"
  params: []

- id: x_configuration_user_management_password_policy_complexity_minimum_uppercase
  label: "xConfiguration UserManagement PasswordPolicy Complexity MinimumUppercase"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy Complexity MinimumUppercase"
  params: []

- id: x_configuration_user_management_password_policy_max_lifetime
  label: "xConfiguration UserManagement PasswordPolicy MaxLifetime"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy MaxLifetime"
  params: []

- id: x_configuration_user_management_password_policy_reuse_limit
  label: "xConfiguration UserManagement PasswordPolicy ReuseLimit"
  kind: action
  command: "xConfiguration UserManagement PasswordPolicy ReuseLimit"
  params: []

- id: x_configuration_video_default_layout_family_local
  label: "xConfiguration Video DefaultLayoutFamily Local"
  kind: action
  command: "xConfiguration Video DefaultLayoutFamily Local"
  params: []

- id: x_configuration_video_default_layout_family_local_content
  label: "xConfiguration Video DefaultLayoutFamily LocalContent"
  kind: action
  command: "xConfiguration Video DefaultLayoutFamily LocalContent"
  params: []

- id: x_configuration_video_default_main_source
  label: "xConfiguration Video DefaultMainSource"
  kind: action
  command: "xConfiguration Video DefaultMainSource"
  params: []

- id: x_configuration_video_input_air_play_beacon
  label: "xConfiguration Video Input AirPlay Beacon"
  kind: action
  command: "xConfiguration Video Input AirPlay Beacon"
  params: []

- id: x_configuration_video_input_air_play_discovery_instructions_show_network_info
  label: "xConfiguration Video Input AirPlay DiscoveryInstructions ShowNetworkInfo"
  kind: action
  command: "xConfiguration Video Input AirPlay DiscoveryInstructions ShowNetworkInfo"
  params: []

- id: x_configuration_video_input_air_play_mode
  label: "xConfiguration Video Input AirPlay Mode"
  kind: action
  command: "xConfiguration Video Input AirPlay Mode"
  params: []

- id: x_configuration_video_input_air_play_discovery_instructions_network_name
  label: "xConfiguration Video Input AirPlay DiscoveryInstructions NetworkName"
  kind: action
  command: "xConfiguration Video Input AirPlay DiscoveryInstructions NetworkName"
  params: []

- id: x_configuration_video_input_air_play_password
  label: "xConfiguration Video Input AirPlay Password"
  kind: action
  command: "xConfiguration Video Input AirPlay Password"
  params: []

- id: x_configuration_video_input_connector_n_camera_control_camera_id
  label: "xConfiguration Video Input Connector [n] CameraControl CameraId"
  kind: action
  command: "xConfiguration Video Input Connector [n] CameraControl CameraId"
  params: []

- id: x_configuration_video_input_air_play_security_mode
  label: "xConfiguration Video Input AirPlay SecurityMode"
  kind: action
  command: "xConfiguration Video Input AirPlay SecurityMode"
  params: []

- id: x_configuration_video_input_connector_n_camera_control_mode
  label: "xConfiguration Video Input Connector [n] CameraControl Mode"
  kind: action
  command: "xConfiguration Video Input Connector [n] CameraControl Mode"
  params: []

- id: x_configuration_video_input_connector_n_cec_mode
  label: "xConfiguration Video Input Connector [n] CEC Mode"
  kind: action
  command: "xConfiguration Video Input Connector [n] CEC Mode"
  params: []

- id: x_configuration_video_input_connector_n_hdcp_mode
  label: "xConfiguration Video Input Connector [n] HDCP Mode"
  kind: action
  command: "xConfiguration Video Input Connector [n] HDCP Mode"
  params: []

- id: x_configuration_video_input_connector_n_input_source_type
  label: "xConfiguration Video Input Connector [n] InputSourceType"
  kind: action
  command: "xConfiguration Video Input Connector [n] InputSourceType"
  params: []

- id: x_configuration_video_input_connector_n_name
  label: "xConfiguration Video Input Connector [n] Name"
  kind: action
  command: "xConfiguration Video Input Connector [n] Name"
  params: []

- id: x_configuration_video_input_connector_n_preferred_resolution
  label: "xConfiguration Video Input Connector [n] PreferredResolution"
  kind: action
  command: "xConfiguration Video Input Connector [n] PreferredResolution"
  params: []

- id: x_configuration_video_input_connector_n_presentation_selection
  label: "xConfiguration Video Input Connector [n] PresentationSelection"
  kind: action
  command: "xConfiguration Video Input Connector [n] PresentationSelection"
  params: []

- id: x_configuration_video_input_connector_n_quality
  label: "xConfiguration Video Input Connector [n] Quality"
  kind: action
  command: "xConfiguration Video Input Connector [n] Quality"
  params: []

- id: x_configuration_video_input_connector_n_rgbquantization_range
  label: "xConfiguration Video Input Connector [n] RGBQuantizationRange"
  kind: action
  command: "xConfiguration Video Input Connector [n] RGBQuantizationRange"
  params: []

- id: x_configuration_video_input_connector_n_visibility
  label: "xConfiguration Video Input Connector [n] Visibility"
  kind: action
  command: "xConfiguration Video Input Connector [n] Visibility"
  params: []

- id: x_configuration_video_input_miracast_mode
  label: "xConfiguration Video Input Miracast Mode"
  kind: action
  command: "xConfiguration Video Input Miracast Mode"
  params: []

- id: x_configuration_video_input_miracast_pin_length
  label: "xConfiguration Video Input Miracast Pin Length"
  kind: action
  command: "xConfiguration Video Input Miracast Pin Length"
  params: []

- id: x_configuration_video_monitors
  label: "xConfiguration Video Monitors"
  kind: action
  command: "xConfiguration Video Monitors"
  params: []

- id: x_configuration_video_output_connector_n_brightness_mode
  label: "xConfiguration Video Output Connector [n] BrightnessMode"
  kind: action
  command: "xConfiguration Video Output Connector [n] BrightnessMode"
  params: []

- id: x_configuration_video_output_connector_n_cec_mode
  label: "xConfiguration Video Output Connector [n] CEC Mode"
  kind: action
  command: "xConfiguration Video Output Connector [n] CEC Mode"
  params: []

- id: x_configuration_video_output_connector_n_hdcppolicy
  label: "xConfiguration Video Output Connector [n] HDCPPolicy"
  kind: action
  command: "xConfiguration Video Output Connector [n] HDCPPolicy"
  params: []

- id: x_configuration_video_output_connector_n_location_horizontal_offset
  label: "xConfiguration Video Output Connector [n] Location HorizontalOffset"
  kind: action
  command: "xConfiguration Video Output Connector [n] Location HorizontalOffset"
  params: []

- id: x_configuration_video_output_connector_n_location_vertical_offset
  label: "xConfiguration Video Output Connector [n] Location VerticalOffset"
  kind: action
  command: "xConfiguration Video Output Connector [n] Location VerticalOffset"
  params: []

- id: x_configuration_video_output_connector_n_monitor_role
  label: "xConfiguration Video Output Connector [n] MonitorRole"
  kind: action
  command: "xConfiguration Video Output Connector [n] MonitorRole"
  params: []

- id: x_configuration_video_output_connector_n_overscan_level
  label: "xConfiguration Video Output Connector [n] OverscanLevel"
  kind: action
  command: "xConfiguration Video Output Connector [n] OverscanLevel"
  params: []

- id: x_configuration_video_output_connector_n_resolution
  label: "xConfiguration Video Output Connector [n] Resolution"
  kind: action
  command: "xConfiguration Video Output Connector [n] Resolution"
  params: []

- id: x_configuration_video_output_connector_n_rgbquantization_range
  label: "xConfiguration Video Output Connector [n] RGBQuantizationRange"
  kind: action
  command: "xConfiguration Video Output Connector [n] RGBQuantizationRange"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_allowed
  label: "xConfiguration Video Output HDMI Passthrough Allowed"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough Allowed"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_hdmi_usb_converter_mode
  label: "xConfiguration Video Output HDMI Passthrough HdmiUsbConverter Mode"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough HdmiUsbConverter Mode"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_hdmi_usb_converter_name
  label: "xConfiguration Video Output HDMI Passthrough HdmiUsbConverter Name"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough HdmiUsbConverter Name"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_output_connector
  label: "xConfiguration Video Output HDMI Passthrough OutputConnector"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough OutputConnector"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_auto_disconnect_enabled
  label: "xConfiguration Video Output HDMI Passthrough AutoDisconnect Enabled"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough AutoDisconnect Enabled"
  params: []

- id: x_configuration_video_output_webcam_usbmode
  label: "xConfiguration Video Output Webcam USBMode"
  kind: action
  command: "xConfiguration Video Output Webcam USBMode"
  params: []

- id: x_configuration_video_presentation_default_source
  label: "xConfiguration Video Presentation DefaultSource"
  kind: action
  command: "xConfiguration Video Presentation DefaultSource"
  params: []

- id: x_configuration_video_output_hdmi_passthrough_auto_disconnect_delay
  label: "xConfiguration Video Output HDMI Passthrough AutoDisconnect Delay"
  kind: action
  command: "xConfiguration Video Output HDMI Passthrough AutoDisconnect Delay"
  params: []

- id: x_configuration_video_presentation_priority
  label: "xConfiguration Video Presentation Priority"
  kind: action
  command: "xConfiguration Video Presentation Priority"
  params: []

- id: x_configuration_video_selfview_default_fullscreen_mode
  label: "xConfiguration Video Selfview Default FullscreenMode"
  kind: action
  command: "xConfiguration Video Selfview Default FullscreenMode"
  params: []

- id: x_configuration_video_selfview_default_mode
  label: "xConfiguration Video Selfview Default Mode"
  kind: action
  command: "xConfiguration Video Selfview Default Mode"
  params: []

- id: x_configuration_video_selfview_default_on_monitor_role
  label: "xConfiguration Video Selfview Default OnMonitorRole"
  kind: action
  command: "xConfiguration Video Selfview Default OnMonitorRole"
  params: []

- id: x_configuration_video_selfview_default_pipposition
  label: "xConfiguration Video Selfview Default PIPPosition"
  kind: action
  command: "xConfiguration Video Selfview Default PIPPosition"
  params: []

- id: x_configuration_video_selfview_on_call_mode
  label: "xConfiguration Video Selfview OnCall Mode"
  kind: action
  command: "xConfiguration Video Selfview OnCall Mode"
  params: []

- id: x_configuration_video_selfview_on_call_duration
  label: "xConfiguration Video Selfview OnCall Duration"
  kind: action
  command: "xConfiguration Video Selfview OnCall Duration"
  params: []

- id: x_configuration_voice_control_wakeword_mode
  label: "xConfiguration VoiceControl Wakeword Mode"
  kind: action
  command: "xConfiguration VoiceControl Wakeword Mode"
  params: []

- id: x_configuration_web_engine_features_local_web_app_management
  label: "xConfiguration WebEngine Features LocalWebAppManagement"
  kind: action
  command: "xConfiguration WebEngine Features LocalWebAppManagement"
  params: []

- id: x_configuration_web_engine_features_web_gl
  label: "xConfiguration WebEngine Features WebGL"
  kind: action
  command: "xConfiguration WebEngine Features WebGL"
  params: []

- id: x_configuration_web_engine_features_xapi_peripherals_allowed_hosts_hosts
  label: "xConfiguration WebEngine Features Xapi Peripherals AllowedHosts Hosts"
  kind: action
  command: "xConfiguration WebEngine Features Xapi Peripherals AllowedHosts Hosts"
  params: []

- id: x_configuration_web_engine_features_sip_url_handler
  label: "xConfiguration WebEngine Features SipUrlHandler"
  kind: action
  command: "xConfiguration WebEngine Features SipUrlHandler"
  params: []

- id: x_configuration_web_engine_minimum_tlsversion
  label: "xConfiguration WebEngine MinimumTLSVersion"
  kind: action
  command: "xConfiguration WebEngine MinimumTLSVersion"
  params: []

- id: x_configuration_web_engine_mode
  label: "xConfiguration WebEngine Mode"
  kind: action
  command: "xConfiguration WebEngine Mode"
  params: []

- id: x_configuration_web_engine_use_http_proxy
  label: "xConfiguration WebEngine UseHttpProxy"
  kind: action
  command: "xConfiguration WebEngine UseHttpProxy"
  params: []

- id: x_configuration_web_engine_remote_debugging
  label: "xConfiguration WebEngine RemoteDebugging"
  kind: action
  command: "xConfiguration WebEngine RemoteDebugging"
  params: []

- id: x_configuration_webex_cloud_proximity_guest_share
  label: "xConfiguration Webex CloudProximity GuestShare"
  kind: action
  command: "xConfiguration Webex CloudProximity GuestShare"
  params: []

- id: x_configuration_webex_cloud_proximity_mode
  label: "xConfiguration Webex CloudProximity Mode"
  kind: action
  command: "xConfiguration Webex CloudProximity Mode"
  params: []

- id: x_configuration_webex_cloud_upgrades_mode
  label: "xConfiguration Webex CloudUpgrades Mode"
  kind: action
  command: "xConfiguration Webex CloudUpgrades Mode"
  params: []

- id: x_configuration_webex_hotdesking_default_booking_end_time
  label: "xConfiguration Webex Hotdesking DefaultBookingEndTime"
  kind: action
  command: "xConfiguration Webex Hotdesking DefaultBookingEndTime"
  params: []

- id: x_configuration_webex_meetings_join_protocol
  label: "xConfiguration Webex Meetings JoinProtocol"
  kind: action
  command: "xConfiguration Webex Meetings JoinProtocol"
  params: []

- id: x_configuration_webex_meetings_audio_notifications
  label: "xConfiguration Webex Meetings AudioNotifications"
  kind: action
  command: "xConfiguration Webex Meetings AudioNotifications"
  params: []

- id: x_configuration_webex_meetings_meeting_chat_notifications_mode
  label: "xConfiguration Webex Meetings MeetingChatNotifications Mode"
  kind: action
  command: "xConfiguration Webex Meetings MeetingChatNotifications Mode"
  params: []

- id: x_configuration_webex_meetings_meeting_chat_preview
  label: "xConfiguration Webex Meetings MeetingChatPreview"
  kind: action
  command: "xConfiguration Webex Meetings MeetingChatPreview"
  params: []

- id: x_configuration_webex_meetings_room_observed_by_host
  label: "xConfiguration Webex Meetings RoomObservedByHost"
  kind: action
  command: "xConfiguration Webex Meetings RoomObservedByHost"
  params: []

- id: x_configuration_web_rtc_provider_microsoft_teams_compatibility_mode
  label: "xConfiguration WebRTC Provider MicrosoftTeams CompatibilityMode"
  kind: action
  command: "xConfiguration WebRTC Provider MicrosoftTeams CompatibilityMode"
  params: []

- id: x_configuration_zoom_default_domain
  label: "xConfiguration Zoom DefaultDomain"
  kind: action
  command: "xConfiguration Zoom DefaultDomain"
  params: []

- id: x_configuration_zoom_dial_string_options
  label: "xConfiguration Zoom DialStringOptions"
  kind: action
  command: "xConfiguration Zoom DialStringOptions"
  params: []

- id: x_command_air_play_key_event_back
  label: "xCommand AirPlay KeyEvent Back"
  kind: action
  command: "xCommand AirPlay KeyEvent Back"
  params: []

- id: x_command_air_play_key_event_click
  label: "xCommand AirPlay KeyEvent Click"
  kind: action
  command: "xCommand AirPlay KeyEvent Click"
  params: []

- id: x_command_air_play_key_event_down
  label: "xCommand AirPlay KeyEvent Down"
  kind: action
  command: "xCommand AirPlay KeyEvent Down"
  params: []

- id: x_command_air_play_key_event_fast_forward
  label: "xCommand AirPlay KeyEvent FastForward"
  kind: action
  command: "xCommand AirPlay KeyEvent FastForward"
  params: []

- id: x_command_air_play_key_event_fast_reverse
  label: "xCommand AirPlay KeyEvent FastReverse"
  kind: action
  command: "xCommand AirPlay KeyEvent FastReverse"
  params: []

- id: x_command_air_play_key_event_left
  label: "xCommand AirPlay KeyEvent Left"
  kind: action
  command: "xCommand AirPlay KeyEvent Left"
  params: []

- id: x_command_air_play_key_event_play
  label: "xCommand AirPlay KeyEvent Play"
  kind: action
  command: "xCommand AirPlay KeyEvent Play"
  params: []

- id: x_command_air_play_key_event_right
  label: "xCommand AirPlay KeyEvent Right"
  kind: action
  command: "xCommand AirPlay KeyEvent Right"
  params: []

- id: x_command_air_play_key_event_up
  label: "xCommand AirPlay KeyEvent Up"
  kind: action
  command: "xCommand AirPlay KeyEvent Up"
  params: []

- id: x_command_air_play_reset_paired_devices
  label: "xCommand AirPlay ResetPairedDevices"
  kind: action
  command: "xCommand AirPlay ResetPairedDevices"
  params: []

- id: x_command_audio_diagnostics_advanced_run
  label: "xCommand Audio Diagnostics Advanced Run"
  kind: action
  command: "xCommand Audio Diagnostics Advanced Run"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_reset
  label: "xCommand Audio Diagnostics AecReverb Reset"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Reset"
  params: []

- id: x_command_audio_diagnostics_aec_reverb_run
  label: "xCommand Audio Diagnostics AecReverb Run"
  kind: action
  command: "xCommand Audio Diagnostics AecReverb Run"
  params: []

- id: x_command_audio_diagnostics_measure_delay
  label: "xCommand Audio Diagnostics MeasureDelay"
  kind: action
  command: "xCommand Audio Diagnostics MeasureDelay"
  params: []

- id: x_command_audio_equalizer_list
  label: "xCommand Audio Equalizer List"
  kind: action
  command: "xCommand Audio Equalizer List"
  params: []

- id: x_command_audio_equalizer_update
  label: "xCommand Audio Equalizer Update"
  kind: action
  command: "xCommand Audio Equalizer Update"
  params: []

- id: x_command_audio_local_input_add
  label: "xCommand Audio LocalInput Add"
  kind: action
  command: "xCommand Audio LocalInput Add"
  params: []

- id: x_command_audio_local_input_add_connector
  label: "xCommand Audio LocalInput AddConnector"
  kind: action
  command: "xCommand Audio LocalInput AddConnector"
  params: []

- id: x_command_audio_local_input_remove
  label: "xCommand Audio LocalInput Remove"
  kind: action
  command: "xCommand Audio LocalInput Remove"
  params: []

- id: x_command_audio_local_input_remove_connector
  label: "xCommand Audio LocalInput RemoveConnector"
  kind: action
  command: "xCommand Audio LocalInput RemoveConnector"
  params: []

- id: x_command_audio_local_input_update
  label: "xCommand Audio LocalInput Update"
  kind: action
  command: "xCommand Audio LocalInput Update"
  params: []

- id: x_command_audio_local_input_ethernet_deregister
  label: "xCommand Audio LocalInput Ethernet Deregister"
  kind: action
  command: "xCommand Audio LocalInput Ethernet Deregister"
  params: []

- id: x_command_audio_local_input_ethernet_register
  label: "xCommand Audio LocalInput Ethernet Register"
  kind: action
  command: "xCommand Audio LocalInput Ethernet Register"
  params: []

- id: x_command_audio_local_output_add
  label: "xCommand Audio LocalOutput Add"
  kind: action
  command: "xCommand Audio LocalOutput Add"
  params: []

- id: x_command_audio_local_output_add_connector
  label: "xCommand Audio LocalOutput AddConnector"
  kind: action
  command: "xCommand Audio LocalOutput AddConnector"
  params: []

- id: x_command_audio_local_output_connect_input
  label: "xCommand Audio LocalOutput ConnectInput"
  kind: action
  command: "xCommand Audio LocalOutput ConnectInput"
  params: []

- id: x_command_audio_local_output_disconnect_input
  label: "xCommand Audio LocalOutput DisconnectInput"
  kind: action
  command: "xCommand Audio LocalOutput DisconnectInput"
  params: []

- id: x_command_audio_local_output_remove
  label: "xCommand Audio LocalOutput Remove"
  kind: action
  command: "xCommand Audio LocalOutput Remove"
  params: []

- id: x_command_audio_local_output_remove_connector
  label: "xCommand Audio LocalOutput RemoveConnector"
  kind: action
  command: "xCommand Audio LocalOutput RemoveConnector"
  params: []

- id: x_command_audio_local_output_update
  label: "xCommand Audio LocalOutput Update"
  kind: action
  command: "xCommand Audio LocalOutput Update"
  params: []

- id: x_command_audio_local_output_update_input_gain
  label: "xCommand Audio LocalOutput UpdateInputGain"
  kind: action
  command: "xCommand Audio LocalOutput UpdateInputGain"
  params: []

- id: x_command_audio_microphones_music_mode_start
  label: "xCommand Audio Microphones MusicMode Start"
  kind: action
  command: "xCommand Audio Microphones MusicMode Start"
  params: []

- id: x_command_audio_microphones_music_mode_stop
  label: "xCommand Audio Microphones MusicMode Stop"
  kind: action
  command: "xCommand Audio Microphones MusicMode Stop"
  params: []

- id: x_command_audio_microphones_noise_removal_deactivate
  label: "xCommand Audio Microphones NoiseRemoval Deactivate"
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Deactivate"
  params: []

- id: x_command_audio_microphones_passthrough_start
  label: "xCommand Audio Microphones Passthrough Start"
  kind: action
  command: "xCommand Audio Microphones Passthrough Start"
  params: []

- id: x_command_audio_microphones_mute
  label: "xCommand Audio Microphones Mute"
  kind: action
  command: "xCommand Audio Microphones Mute"
  params: []

- id: x_command_audio_microphones_noise_removal_activate
  label: "xCommand Audio Microphones NoiseRemoval Activate"
  kind: action
  command: "xCommand Audio Microphones NoiseRemoval Activate"
  params: []

- id: x_command_audio_microphones_passthrough_stop
  label: "xCommand Audio Microphones Passthrough Stop"
  kind: action
  command: "xCommand Audio Microphones Passthrough Stop"
  params: []

- id: x_command_audio_microphones_toggle_mute
  label: "xCommand Audio Microphones ToggleMute"
  kind: action
  command: "xCommand Audio Microphones ToggleMute"
  params: []

- id: x_command_audio_microphones_unmute
  label: "xCommand Audio Microphones Unmute"
  kind: action
  command: "xCommand Audio Microphones Unmute"
  params: []

- id: x_command_audio_remote_output_connect_input
  label: "xCommand Audio RemoteOutput ConnectInput"
  kind: action
  command: "xCommand Audio RemoteOutput ConnectInput"
  params: []

- id: x_command_audio_remote_output_disconnect_input
  label: "xCommand Audio RemoteOutput DisconnectInput"
  kind: action
  command: "xCommand Audio RemoteOutput DisconnectInput"
  params: []

- id: x_command_audio_remote_output_update_input_gain
  label: "xCommand Audio RemoteOutput UpdateInputGain"
  kind: action
  command: "xCommand Audio RemoteOutput UpdateInputGain"
  params: []

- id: x_command_audio_select
  label: "xCommand Audio Select"
  kind: action
  command: "xCommand Audio Select"
  params: []

- id: x_command_audio_sound_play
  label: "xCommand Audio Sound Play"
  kind: action
  command: "xCommand Audio Sound Play"
  params: []

- id: x_command_audio_setup_clear
  label: "xCommand Audio Setup Clear"
  kind: action
  command: "xCommand Audio Setup Clear"
  params: []

- id: x_command_audio_sound_stop
  label: "xCommand Audio Sound Stop"
  kind: action
  command: "xCommand Audio Sound Stop"
  params: []

- id: x_command_audio_setup_reset
  label: "xCommand Audio Setup Reset"
  kind: action
  command: "xCommand Audio Setup Reset"
  params: []

- id: x_command_audio_speaker_check
  label: "xCommand Audio SpeakerCheck"
  kind: action
  command: "xCommand Audio SpeakerCheck"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_play
  label: "xCommand Audio SoundsAndAlerts Ringtone Play"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Play"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_list
  label: "xCommand Audio SoundsAndAlerts Ringtone List"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_stop
  label: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  params: []

- id: x_command_audio_volume_decrease
  label: "xCommand Audio Volume Decrease"
  kind: action
  command: "xCommand Audio Volume Decrease"
  params: []

- id: x_command_audio_volume_increase
  label: "xCommand Audio Volume Increase"
  kind: action
  command: "xCommand Audio Volume Increase"
  params: []

- id: x_command_audio_volume_mute
  label: "xCommand Audio Volume Mute"
  kind: action
  command: "xCommand Audio Volume Mute"
  params: []

- id: x_command_audio_volume_set
  label: "xCommand Audio Volume Set"
  kind: action
  command: "xCommand Audio Volume Set"
  params: []

- id: x_command_audio_volume_set_to_default
  label: "xCommand Audio Volume SetToDefault"
  kind: action
  command: "xCommand Audio Volume SetToDefault"
  params: []

- id: x_command_audio_volume_toggle_mute
  label: "xCommand Audio Volume ToggleMute"
  kind: action
  command: "xCommand Audio Volume ToggleMute"
  params: []

- id: x_command_audio_volume_unmute
  label: "xCommand Audio Volume Unmute"
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []

- id: x_command_audio_vu_meter_start
  label: "xCommand Audio VuMeter Start"
  kind: action
  command: "xCommand Audio VuMeter Start"
  params: []

- id: x_command_audio_vu_meter_stop
  label: "xCommand Audio VuMeter Stop"
  kind: action
  command: "xCommand Audio VuMeter Stop"
  params: []

- id: x_command_bluetooth_streaming_next
  label: "xCommand Bluetooth Streaming Next"
  kind: action
  command: "xCommand Bluetooth Streaming Next"
  params: []

- id: x_command_bluetooth_streaming_pause
  label: "xCommand Bluetooth Streaming Pause"
  kind: action
  command: "xCommand Bluetooth Streaming Pause"
  params: []

- id: x_command_audio_vu_meter_stop_all
  label: "xCommand Audio VuMeter StopAll"
  kind: action
  command: "xCommand Audio VuMeter StopAll"
  params: []

- id: x_command_bluetooth_streaming_play
  label: "xCommand Bluetooth Streaming Play"
  kind: action
  command: "xCommand Bluetooth Streaming Play"
  params: []

- id: x_command_bluetooth_streaming_previous
  label: "xCommand Bluetooth Streaming Previous"
  kind: action
  command: "xCommand Bluetooth Streaming Previous"
  params: []

- id: x_command_bookings_book
  label: "xCommand Bookings Book"
  kind: action
  command: "xCommand Bookings Book"
  params: []

- id: x_command_bookings_clear
  label: "xCommand Bookings Clear"
  kind: action
  command: "xCommand Bookings Clear"
  params: []

- id: x_command_bookings_delete
  label: "xCommand Bookings Delete"
  kind: action
  command: "xCommand Bookings Delete"
  params: []

- id: x_command_bookings_edit
  label: "xCommand Bookings Edit"
  kind: action
  command: "xCommand Bookings Edit"
  params: []

- id: x_command_bookings_extend
  label: "xCommand Bookings Extend"
  kind: action
  command: "xCommand Bookings Extend"
  params: []

- id: x_command_bookings_list
  label: "xCommand Bookings List"
  kind: action
  command: "xCommand Bookings List"
  params: []

- id: x_command_bookings_get
  label: "xCommand Bookings Get"
  kind: action
  command: "xCommand Bookings Get"
  params: []

- id: x_command_bookings_notification_snooze
  label: "xCommand Bookings NotificationSnooze"
  kind: action
  command: "xCommand Bookings NotificationSnooze"
  params: []

- id: x_command_bookings_put
  label: "xCommand Bookings Put"
  kind: action
  command: "xCommand Bookings Put"
  params: []

- id: x_command_bookings_respond
  label: "xCommand Bookings Respond"
  kind: action
  command: "xCommand Bookings Respond"
  params: []

- id: x_command_call_accept
  label: "xCommand Call Accept"
  kind: action
  command: "xCommand Call Accept"
  params: []

- id: x_command_call_disconnect
  label: "xCommand Call Disconnect"
  kind: action
  command: "xCommand Call Disconnect"
  params: []

- id: x_command_call_dtmfsend
  label: "xCommand Call DTMFSend"
  kind: action
  command: "xCommand Call DTMFSend"
  params: []

- id: x_command_call_far_end_control_camera_move
  label: "xCommand Call FarEndControl Camera Move"
  kind: action
  command: "xCommand Call FarEndControl Camera Move"
  params: []

- id: x_command_call_far_end_control_camera_stop
  label: "xCommand Call FarEndControl Camera Stop"
  kind: action
  command: "xCommand Call FarEndControl Camera Stop"
  params: []

- id: x_command_call_far_end_control_request_capabilities
  label: "xCommand Call FarEndControl RequestCapabilities"
  kind: action
  command: "xCommand Call FarEndControl RequestCapabilities"
  params: []

- id: x_command_call_far_end_control_room_preset_activate
  label: "xCommand Call FarEndControl RoomPreset Activate"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate"
  params: []

- id: x_command_call_far_end_control_room_preset_store
  label: "xCommand Call FarEndControl RoomPreset Store"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Store"
  params: []

- id: x_command_call_far_end_control_source_select
  label: "xCommand Call FarEndControl Source Select"
  kind: action
  command: "xCommand Call FarEndControl Source Select"
  params: []

- id: x_command_call_far_end_message_send
  label: "xCommand Call FarEndMessage Send"
  kind: action
  command: "xCommand Call FarEndMessage Send"
  params: []

- id: x_command_call_forward
  label: "xCommand Call Forward"
  kind: action
  command: "xCommand Call Forward"
  params: []

- id: x_command_call_hold
  label: "xCommand Call Hold"
  kind: action
  command: "xCommand Call Hold"
  params: []

- id: x_command_call_join
  label: "xCommand Call Join"
  kind: action
  command: "xCommand Call Join"
  params: []

- id: x_command_call_reject
  label: "xCommand Call Reject"
  kind: action
  command: "xCommand Call Reject"
  params: []

- id: x_command_call_ignore
  label: "xCommand Call Ignore"
  kind: action
  command: "xCommand Call Ignore"
  params: []

- id: x_command_call_resume
  label: "xCommand Call Resume"
  kind: action
  command: "xCommand Call Resume"
  params: []

- id: x_command_call_history_acknowledge_all_missed_calls
  label: "xCommand CallHistory AcknowledgeAllMissedCalls"
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
  params: []

- id: x_command_call_unattended_transfer
  label: "xCommand Call UnattendedTransfer"
  kind: action
  command: "xCommand Call UnattendedTransfer"
  params: []

- id: x_command_call_history_acknowledge_missed_call
  label: "xCommand CallHistory AcknowledgeMissedCall"
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall"
  params: []

- id: x_command_call_history_delete_all
  label: "xCommand CallHistory DeleteAll"
  kind: action
  command: "xCommand CallHistory DeleteAll"
  params: []

- id: x_command_call_history_get
  label: "xCommand CallHistory Get"
  kind: action
  command: "xCommand CallHistory Get"
  params: []

- id: x_command_call_history_delete_entry
  label: "xCommand CallHistory DeleteEntry"
  kind: action
  command: "xCommand CallHistory DeleteEntry"
  params: []

- id: x_command_call_history_recents
  label: "xCommand CallHistory Recents"
  kind: action
  command: "xCommand CallHistory Recents"
  params: []

- id: x_command_camera_position_reset
  label: "xCommand Camera PositionReset"
  kind: action
  command: "xCommand Camera PositionReset"
  params: []

- id: x_command_camera_position_set
  label: "xCommand Camera PositionSet"
  kind: action
  command: "xCommand Camera PositionSet"
  params: []

- id: x_command_camera_preset_activate
  label: "xCommand Camera Preset Activate"
  kind: action
  command: "xCommand Camera Preset Activate"
  params: []

- id: x_command_camera_preset_activate_default_position
  label: "xCommand Camera Preset ActivateDefaultPosition"
  kind: action
  command: "xCommand Camera Preset ActivateDefaultPosition"
  params: []

- id: x_command_camera_preset_edit
  label: "xCommand Camera Preset Edit"
  kind: action
  command: "xCommand Camera Preset Edit"
  params: []

- id: x_command_camera_preset_list
  label: "xCommand Camera Preset List"
  kind: action
  command: "xCommand Camera Preset List"
  params: []

- id: x_command_camera_preset_remove
  label: "xCommand Camera Preset Remove"
  kind: action
  command: "xCommand Camera Preset Remove"
  params: []

- id: x_command_camera_preset_show
  label: "xCommand Camera Preset Show"
  kind: action
  command: "xCommand Camera Preset Show"
  params: []

- id: x_command_camera_preset_store
  label: "xCommand Camera Preset Store"
  kind: action
  command: "xCommand Camera Preset Store"
  params: []

- id: x_command_camera_ramp
  label: "xCommand Camera Ramp"
  kind: action
  command: "xCommand Camera Ramp"
  params: []

- id: x_command_camera_trigger_autofocus
  label: "xCommand Camera TriggerAutofocus"
  kind: action
  command: "xCommand Camera TriggerAutofocus"
  params: []

- id: x_command_camera_trigger_whitebalance
  label: "xCommand Camera TriggerWhitebalance"
  kind: action
  command: "xCommand Camera TriggerWhitebalance"
  params: []

- id: x_command_cameras_background_delete
  label: "xCommand Cameras Background Delete"
  kind: action
  command: "xCommand Cameras Background Delete"
  params: []

- id: x_command_cameras_auto_focus_diagnostics_start
  label: "xCommand Cameras AutoFocus Diagnostics Start"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Start"
  params: []

- id: x_command_cameras_background_fetch
  label: "xCommand Cameras Background Fetch"
  kind: action
  command: "xCommand Cameras Background Fetch"
  params: []

- id: x_command_cameras_auto_focus_diagnostics_stop
  label: "xCommand Cameras AutoFocus Diagnostics Stop"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Stop"
  params: []

- id: x_command_cameras_background_clear
  label: "xCommand Cameras Background Clear"
  kind: action
  command: "xCommand Cameras Background Clear"
  params: []

- id: x_command_cameras_background_foreground_parameters_reset
  label: "xCommand Cameras Background ForegroundParameters Reset"
  kind: action
  command: "xCommand Cameras Background ForegroundParameters Reset"
  params: []

- id: x_command_cameras_background_foreground_parameters_set
  label: "xCommand Cameras Background ForegroundParameters Set"
  kind: action
  command: "xCommand Cameras Background ForegroundParameters Set"
  params: []

- id: x_command_cameras_background_get
  label: "xCommand Cameras Background Get"
  kind: action
  command: "xCommand Cameras Background Get"
  params: []

- id: x_command_cameras_background_list
  label: "xCommand Cameras Background List"
  kind: action
  command: "xCommand Cameras Background List"
  params: []

- id: x_command_cameras_background_set
  label: "xCommand Cameras Background Set"
  kind: action
  command: "xCommand Cameras Background Set"
  params: []

- id: x_command_cameras_background_upload
  label: "xCommand Cameras Background Upload"
  kind: action
  command: "xCommand Cameras Background Upload"
  params: []

- id: x_command_cameras_presenter_track_clear_position
  label: "xCommand Cameras PresenterTrack ClearPosition"
  kind: action
  command: "xCommand Cameras PresenterTrack ClearPosition"
  params: []

- id: x_command_cameras_presenter_track_set
  label: "xCommand Cameras PresenterTrack Set"
  kind: action
  command: "xCommand Cameras PresenterTrack Set"
  params: []

- id: x_command_cameras_presenter_track_store_position
  label: "xCommand Cameras PresenterTrack StorePosition"
  kind: action
  command: "xCommand Cameras PresenterTrack StorePosition"
  params: []

- id: x_command_cameras_speaker_track_background_mode_deactivate
  label: "xCommand Cameras SpeakerTrack BackgroundMode Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Deactivate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_start
  label: "xCommand Cameras SpeakerTrack Diagnostics Start"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Start"
  params: []

- id: x_command_cameras_speaker_track_activate
  label: "xCommand Cameras SpeakerTrack Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Activate"
  params: []

- id: x_command_cameras_speaker_track_deactivate
  label: "xCommand Cameras SpeakerTrack Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Deactivate"
  params: []

- id: x_command_cameras_speaker_track_background_mode_activate
  label: "xCommand Cameras SpeakerTrack BackgroundMode Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack BackgroundMode Activate"
  params: []

- id: x_command_cameras_speaker_track_diagnostics_stop
  label: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  params: []

- id: x_command_cameras_speaker_track_frames_activate
  label: "xCommand Cameras SpeakerTrack Frames Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Activate"
  params: []

- id: x_command_cameras_speaker_track_view_limits_deactivate
  label: "xCommand Cameras SpeakerTrack ViewLimits Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Deactivate"
  params: []

- id: x_command_cameras_speaker_track_frames_deactivate
  label: "xCommand Cameras SpeakerTrack Frames Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Frames Deactivate"
  params: []

- id: x_command_cameras_speaker_track_view_limits_store_position
  label: "xCommand Cameras SpeakerTrack ViewLimits StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits StorePosition"
  params: []

- id: x_command_cameras_speaker_track_view_limits_activate
  label: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  kind: action
  command: "xCommand Cameras SpeakerTrack ViewLimits Activate"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_activate_position
  label: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_align_position
  label: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard AlignPosition"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_set_distance
  label: "xCommand Cameras SpeakerTrack Whiteboard SetDistance"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard SetDistance"
  params: []

- id: x_command_conference_admit_all
  label: "xCommand Conference AdmitAll"
  kind: action
  command: "xCommand Conference AdmitAll"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_store_position
  label: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  params: []

- id: x_command_conference_call_authentication_response
  label: "xCommand Conference Call AuthenticationResponse"
  kind: action
  command: "xCommand Conference Call AuthenticationResponse"
  params: []

- id: x_command_conference_do_not_disturb_activate
  label: "xCommand Conference DoNotDisturb Activate"
  kind: action
  command: "xCommand Conference DoNotDisturb Activate"
  params: []

- id: x_command_conference_do_not_disturb_deactivate
  label: "xCommand Conference DoNotDisturb Deactivate"
  kind: action
  command: "xCommand Conference DoNotDisturb Deactivate"
  params: []

- id: x_command_conference_end_meeting
  label: "xCommand Conference EndMeeting"
  kind: action
  command: "xCommand Conference EndMeeting"
  params: []

- id: x_command_conference_hand_raise
  label: "xCommand Conference Hand Raise"
  kind: action
  command: "xCommand Conference Hand Raise"
  params: []

- id: x_command_conference_hard_mute
  label: "xCommand Conference HardMute"
  kind: action
  command: "xCommand Conference HardMute"
  params: []

- id: x_command_conference_hand_lower
  label: "xCommand Conference Hand Lower"
  kind: action
  command: "xCommand Conference Hand Lower"
  params: []

- id: x_command_conference_lock
  label: "xCommand Conference Lock"
  kind: action
  command: "xCommand Conference Lock"
  params: []

- id: x_command_conference_meeting_assistant_start
  label: "xCommand Conference MeetingAssistant Start"
  kind: action
  command: "xCommand Conference MeetingAssistant Start"
  params: []

- id: x_command_conference_meeting_assistant_stop
  label: "xCommand Conference MeetingAssistant Stop"
  kind: action
  command: "xCommand Conference MeetingAssistant Stop"
  params: []

- id: x_command_conference_lower_all_hands
  label: "xCommand Conference LowerAllHands"
  kind: action
  command: "xCommand Conference LowerAllHands"
  params: []

- id: x_command_conference_meeting_chat_notifications_default
  label: "xCommand Conference MeetingChatNotifications Default"
  kind: action
  command: "xCommand Conference MeetingChatNotifications Default"
  params: []

- id: x_command_conference_meeting_chat_notifications_in_call
  label: "xCommand Conference MeetingChatNotifications InCall"
  kind: action
  command: "xCommand Conference MeetingChatNotifications InCall"
  params: []

- id: x_command_conference_mute_all
  label: "xCommand Conference MuteAll"
  kind: action
  command: "xCommand Conference MuteAll"
  params: []

- id: x_command_conference_mute_on_entry
  label: "xCommand Conference MuteOnEntry"
  kind: action
  command: "xCommand Conference MuteOnEntry"
  params: []

- id: x_command_conference_participant_add
  label: "xCommand Conference Participant Add"
  kind: action
  command: "xCommand Conference Participant Add"
  params: []

- id: x_command_conference_participant_admit
  label: "xCommand Conference Participant Admit"
  kind: action
  command: "xCommand Conference Participant Admit"
  params: []

- id: x_command_conference_participant_disconnect
  label: "xCommand Conference Participant Disconnect"
  kind: action
  command: "xCommand Conference Participant Disconnect"
  params: []

- id: x_command_conference_participant_lower_hand
  label: "xCommand Conference Participant LowerHand"
  kind: action
  command: "xCommand Conference Participant LowerHand"
  params: []

- id: x_command_conference_participant_mute
  label: "xCommand Conference Participant Mute"
  kind: action
  command: "xCommand Conference Participant Mute"
  params: []

- id: x_command_conference_participant_list_search
  label: "xCommand Conference ParticipantList Search"
  kind: action
  command: "xCommand Conference ParticipantList Search"
  params: []

- id: x_command_conference_people_focus_activate
  label: "xCommand Conference PeopleFocus Activate"
  kind: action
  command: "xCommand Conference PeopleFocus Activate"
  params: []

- id: x_command_conference_reaction_enable
  label: "xCommand Conference Reaction Enable"
  kind: action
  command: "xCommand Conference Reaction Enable"
  params: []

- id: x_command_conference_people_focus_deactivate
  label: "xCommand Conference PeopleFocus Deactivate"
  kind: action
  command: "xCommand Conference PeopleFocus Deactivate"
  params: []

- id: x_command_conference_reaction_disable
  label: "xCommand Conference Reaction Disable"
  kind: action
  command: "xCommand Conference Reaction Disable"
  params: []

- id: x_command_conference_reaction_send
  label: "xCommand Conference Reaction Send"
  kind: action
  command: "xCommand Conference Reaction Send"
  params: []

- id: x_command_conference_recording_pause
  label: "xCommand Conference Recording Pause"
  kind: action
  command: "xCommand Conference Recording Pause"
  params: []

- id: x_command_conference_recording_resume
  label: "xCommand Conference Recording Resume"
  kind: action
  command: "xCommand Conference Recording Resume"
  params: []

- id: x_command_conference_recording_start
  label: "xCommand Conference Recording Start"
  kind: action
  command: "xCommand Conference Recording Start"
  params: []

- id: x_command_conference_recording_stop
  label: "xCommand Conference Recording Stop"
  kind: action
  command: "xCommand Conference Recording Stop"
  params: []

- id: x_command_conference_skin_tone
  label: "xCommand Conference SkinTone"
  kind: action
  command: "xCommand Conference SkinTone"
  params: []

- id: x_command_conference_speaker_lock_set
  label: "xCommand Conference SpeakerLock Set"
  kind: action
  command: "xCommand Conference SpeakerLock Set"
  params: []

- id: x_command_conference_speaker_lock_release
  label: "xCommand Conference SpeakerLock Release"
  kind: action
  command: "xCommand Conference SpeakerLock Release"
  params: []

- id: x_command_conference_transfer_host_and_leave
  label: "xCommand Conference TransferHostAndLeave"
  kind: action
  command: "xCommand Conference TransferHostAndLeave"
  params: []

- id: x_command_diagnostics_run
  label: "xCommand Diagnostics Run"
  kind: action
  command: "xCommand Diagnostics Run"
  params: []

- id: x_command_dial
  label: "xCommand Dial"
  kind: action
  command: "xCommand Dial"
  params: []

- id: x_command_gpio_manual_state_set
  label: "xCommand GPIO ManualState Set"
  kind: action
  command: "xCommand GPIO ManualState Set"
  params: []

- id: x_command_http_client_allow_hostname_add
  label: "xCommand HttpClient Allow Hostname Add"
  kind: action
  command: "xCommand HttpClient Allow Hostname Add"
  params: []

- id: x_command_http_client_allow_hostname_remove
  label: "xCommand HttpClient Allow Hostname Remove"
  kind: action
  command: "xCommand HttpClient Allow Hostname Remove"
  params: []

- id: x_command_http_client_allow_hostname_clear
  label: "xCommand HttpClient Allow Hostname Clear"
  kind: action
  command: "xCommand HttpClient Allow Hostname Clear"
  params: []

- id: x_command_http_client_allow_hostname_list
  label: "xCommand HttpClient Allow Hostname List"
  kind: action
  command: "xCommand HttpClient Allow Hostname List"
  params: []

- id: x_command_http_client_delete
  label: "xCommand HttpClient Delete"
  kind: action
  command: "xCommand HttpClient Delete"
  params: []

- id: x_command_http_client_get
  label: "xCommand HttpClient Get"
  kind: action
  command: "xCommand HttpClient Get"
  params: []

- id: x_command_http_client_patch
  label: "xCommand HttpClient Patch"
  kind: action
  command: "xCommand HttpClient Patch"
  params: []

- id: x_command_http_client_post
  label: "xCommand HttpClient Post"
  kind: action
  command: "xCommand HttpClient Post"
  params: []

- id: x_command_http_client_put
  label: "xCommand HttpClient Put"
  kind: action
  command: "xCommand HttpClient Put"
  params: []

- id: x_command_http_feedback_deregister
  label: "xCommand HttpFeedback Deregister"
  kind: action
  command: "xCommand HttpFeedback Deregister"
  params: []

- id: x_command_http_feedback_enable
  label: "xCommand HttpFeedback Enable"
  kind: action
  command: "xCommand HttpFeedback Enable"
  params: []

- id: x_command_http_feedback_register
  label: "xCommand HttpFeedback Register"
  kind: action
  command: "xCommand HttpFeedback Register"
  params: []

- id: x_command_logging_add_event
  label: "xCommand Logging AddEvent"
  kind: action
  command: "xCommand Logging AddEvent"
  params: []

- id: x_command_logging_extended_logging_start
  label: "xCommand Logging ExtendedLogging Start"
  kind: action
  command: "xCommand Logging ExtendedLogging Start"
  params: []

- id: x_command_logging_extended_logging_stop
  label: "xCommand Logging ExtendedLogging Stop"
  kind: action
  command: "xCommand Logging ExtendedLogging Stop"
  params: []

- id: x_command_macros_log_clear
  label: "xCommand Macros Log Clear"
  kind: action
  command: "xCommand Macros Log Clear"
  params: []

- id: x_command_logging_send_logs
  label: "xCommand Logging SendLogs"
  kind: action
  command: "xCommand Logging SendLogs"
  params: []

- id: x_command_macros_log_get
  label: "xCommand Macros Log Get"
  kind: action
  command: "xCommand Macros Log Get"
  params: []

- id: x_command_macros_macro_activate
  label: "xCommand Macros Macro Activate"
  kind: action
  command: "xCommand Macros Macro Activate"
  params: []

- id: x_command_macros_macro_deactivate
  label: "xCommand Macros Macro Deactivate"
  kind: action
  command: "xCommand Macros Macro Deactivate"
  params: []

- id: x_command_macros_macro_get
  label: "xCommand Macros Macro Get"
  kind: action
  command: "xCommand Macros Macro Get"
  params: []

- id: x_command_macros_macro_remove
  label: "xCommand Macros Macro Remove"
  kind: action
  command: "xCommand Macros Macro Remove"
  params: []

- id: x_command_macros_macro_remove_all
  label: "xCommand Macros Macro RemoveAll"
  kind: action
  command: "xCommand Macros Macro RemoveAll"
  params: []

- id: x_command_macros_macro_rename
  label: "xCommand Macros Macro Rename"
  kind: action
  command: "xCommand Macros Macro Rename"
  params: []

- id: x_command_macros_macro_save
  label: "xCommand Macros Macro Save"
  kind: action
  command: "xCommand Macros Macro Save"
  params: []

- id: x_command_macros_macro_roles_set
  label: "xCommand Macros Macro Roles Set"
  kind: action
  command: "xCommand Macros Macro Roles Set"
  params: []

- id: x_command_macros_runtime_restart
  label: "xCommand Macros Runtime Restart"
  kind: action
  command: "xCommand Macros Runtime Restart"
  params: []

- id: x_command_macros_runtime_start
  label: "xCommand Macros Runtime Start"
  kind: action
  command: "xCommand Macros Runtime Start"
  params: []

- id: x_command_macros_runtime_status
  label: "xCommand Macros Runtime Status"
  kind: action
  command: "xCommand Macros Runtime Status"
  params: []

- id: x_command_message_send
  label: "xCommand Message Send"
  kind: action
  command: "xCommand Message Send"
  params: []

- id: x_command_macros_runtime_stop
  label: "xCommand Macros Runtime Stop"
  kind: action
  command: "xCommand Macros Runtime Stop"
  params: []

- id: x_command_network_snmp_usm_user_add
  label: "xCommand Network SNMP USM User Add"
  kind: action
  command: "xCommand Network SNMP USM User Add"
  params: []

- id: x_command_network_smtp_verify_config
  label: "xCommand Network SMTP VerifyConfig"
  kind: action
  command: "xCommand Network SMTP VerifyConfig"
  params: []

- id: x_command_network_snmp_usm_user_delete
  label: "xCommand Network SNMP USM User Delete"
  kind: action
  command: "xCommand Network SNMP USM User Delete"
  params: []

- id: x_command_network_snmp_usm_user_list
  label: "xCommand Network SNMP USM User List"
  kind: action
  command: "xCommand Network SNMP USM User List"
  params: []

- id: x_command_network_wifi_configure
  label: "xCommand Network Wifi Configure"
  kind: action
  command: "xCommand Network Wifi Configure"
  params: []

- id: x_command_network_wifi_scan_start
  label: "xCommand Network Wifi Scan Start"
  kind: action
  command: "xCommand Network Wifi Scan Start"
  params: []

- id: x_command_network_wifi_delete
  label: "xCommand Network Wifi Delete"
  kind: action
  command: "xCommand Network Wifi Delete"
  params: []

- id: x_command_network_wifi_scan_stop
  label: "xCommand Network Wifi Scan Stop"
  kind: action
  command: "xCommand Network Wifi Scan Stop"
  params: []

- id: x_command_network_wifi_list
  label: "xCommand Network Wifi List"
  kind: action
  command: "xCommand Network Wifi List"
  params: []

- id: x_command_peripherals_connect
  label: "xCommand Peripherals Connect"
  kind: action
  command: "xCommand Peripherals Connect"
  params: []

- id: x_command_peripherals_heart_beat
  label: "xCommand Peripherals HeartBeat"
  kind: action
  command: "xCommand Peripherals HeartBeat"
  params: []

- id: x_command_peripherals_list
  label: "xCommand Peripherals List"
  kind: action
  command: "xCommand Peripherals List"
  params: []

- id: x_command_peripherals_pairing_pin_pairing_start
  label: "xCommand Peripherals Pairing PinPairing Start"
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Start"
  params: []

- id: x_command_peripherals_pairing_pair
  label: "xCommand Peripherals Pairing Pair"
  kind: action
  command: "xCommand Peripherals Pairing Pair"
  params: []

- id: x_command_peripherals_pairing_pin_pairing_stop
  label: "xCommand Peripherals Pairing PinPairing Stop"
  kind: action
  command: "xCommand Peripherals Pairing PinPairing Stop"
  params: []

- id: x_command_peripherals_pairing_unpair
  label: "xCommand Peripherals Pairing Unpair"
  kind: action
  command: "xCommand Peripherals Pairing Unpair"
  params: []

- id: x_command_peripherals_purge
  label: "xCommand Peripherals Purge"
  kind: action
  command: "xCommand Peripherals Purge"
  params: []

- id: x_command_peripherals_touch_panel_configure
  label: "xCommand Peripherals TouchPanel Configure"
  kind: action
  command: "xCommand Peripherals TouchPanel Configure"
  params: []

- id: x_command_phonebook_contact_add
  label: "xCommand Phonebook Contact Add"
  kind: action
  command: "xCommand Phonebook Contact Add"
  params: []

- id: x_command_phonebook_contact_delete
  label: "xCommand Phonebook Contact Delete"
  kind: action
  command: "xCommand Phonebook Contact Delete"
  params: []

- id: x_command_phonebook_contact_modify
  label: "xCommand Phonebook Contact Modify"
  kind: action
  command: "xCommand Phonebook Contact Modify"
  params: []

- id: x_command_phonebook_contact_method_add
  label: "xCommand Phonebook ContactMethod Add"
  kind: action
  command: "xCommand Phonebook ContactMethod Add"
  params: []

- id: x_command_phonebook_contact_method_delete
  label: "xCommand Phonebook ContactMethod Delete"
  kind: action
  command: "xCommand Phonebook ContactMethod Delete"
  params: []

- id: x_command_phonebook_contact_method_modify
  label: "xCommand Phonebook ContactMethod Modify"
  kind: action
  command: "xCommand Phonebook ContactMethod Modify"
  params: []

- id: x_command_phonebook_folder_add
  label: "xCommand Phonebook Folder Add"
  kind: action
  command: "xCommand Phonebook Folder Add"
  params: []

- id: x_command_phonebook_folder_delete
  label: "xCommand Phonebook Folder Delete"
  kind: action
  command: "xCommand Phonebook Folder Delete"
  params: []

- id: x_command_phonebook_folder_modify
  label: "xCommand Phonebook Folder Modify"
  kind: action
  command: "xCommand Phonebook Folder Modify"
  params: []

- id: x_command_phonebook_search
  label: "xCommand Phonebook Search"
  kind: action
  command: "xCommand Phonebook Search"
  params: []

- id: x_command_presentation_start
  label: "xCommand Presentation Start"
  kind: action
  command: "xCommand Presentation Start"
  params: []

- id: x_command_presentation_stop
  label: "xCommand Presentation Stop"
  kind: action
  command: "xCommand Presentation Stop"
  params: []

- id: x_command_provisioning_complete_upgrade
  label: "xCommand Provisioning CompleteUpgrade"
  kind: action
  command: "xCommand Provisioning CompleteUpgrade"
  params: []

- id: x_command_provisioning_postpone_upgrade
  label: "xCommand Provisioning PostponeUpgrade"
  kind: action
  command: "xCommand Provisioning PostponeUpgrade"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_login
  label: "xCommand Provisioning CUCM ExtensionMobility Login"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Login"
  params: []

- id: x_command_provisioning_room_type_activate
  label: "xCommand Provisioning RoomType Activate"
  kind: action
  command: "xCommand Provisioning RoomType Activate"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_logout
  label: "xCommand Provisioning CUCM ExtensionMobility Logout"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Logout"
  params: []

- id: x_command_provisioning_service_fetch
  label: "xCommand Provisioning Service Fetch"
  kind: action
  command: "xCommand Provisioning Service Fetch"
  params: []

- id: x_command_proximity_services_activate
  label: "xCommand Proximity Services Activate"
  kind: action
  command: "xCommand Proximity Services Activate"
  params: []

- id: x_command_room_cleanup_cancel
  label: "xCommand RoomCleanup Cancel"
  kind: action
  command: "xCommand RoomCleanup Cancel"
  params: []

- id: x_command_room_cleanup_run
  label: "xCommand RoomCleanup Run"
  kind: action
  command: "xCommand RoomCleanup Run"
  params: []

- id: x_command_proximity_services_deactivate
  label: "xCommand Proximity Services Deactivate"
  kind: action
  command: "xCommand Proximity Services Deactivate"
  params: []

- id: x_command_room_preset_store
  label: "xCommand RoomPreset Store"
  kind: action
  command: "xCommand RoomPreset Store"
  params: []

- id: x_command_room_preset_activate
  label: "xCommand RoomPreset Activate"
  kind: action
  command: "xCommand RoomPreset Activate"
  params: []

- id: x_command_room_preset_clear
  label: "xCommand RoomPreset Clear"
  kind: action
  command: "xCommand RoomPreset Clear"
  params: []

- id: x_command_security_certificates_ca_add
  label: "xCommand Security Certificates CA Add"
  kind: action
  command: "xCommand Security Certificates CA Add"
  params: []

- id: x_command_security_certificates_cucm_ctl_delete
  label: "xCommand Security Certificates CUCM CTL Delete"
  kind: action
  command: "xCommand Security Certificates CUCM CTL Delete"
  params: []

- id: x_command_security_certificates_cucm_ctl_show
  label: "xCommand Security Certificates CUCM CTL Show"
  kind: action
  command: "xCommand Security Certificates CUCM CTL Show"
  params: []

- id: x_command_security_certificates_ca_delete
  label: "xCommand Security Certificates CA Delete"
  kind: action
  command: "xCommand Security Certificates CA Delete"
  params: []

- id: x_command_security_certificates_ca_show
  label: "xCommand Security Certificates CA Show"
  kind: action
  command: "xCommand Security Certificates CA Show"
  params: []

- id: x_command_security_certificates_cucm_itl_show
  label: "xCommand Security Certificates CUCM ITL Show"
  kind: action
  command: "xCommand Security Certificates CUCM ITL Show"
  params: []

- id: x_command_security_certificates_cucm_mic_show
  label: "xCommand Security Certificates CUCM MIC Show"
  kind: action
  command: "xCommand Security Certificates CUCM MIC Show"
  params: []

- id: x_command_security_certificates_services_activate
  label: "xCommand Security Certificates Services Activate"
  kind: action
  command: "xCommand Security Certificates Services Activate"
  params: []

- id: x_command_security_certificates_services_add
  label: "xCommand Security Certificates Services Add"
  kind: action
  command: "xCommand Security Certificates Services Add"
  params: []

- id: x_command_security_certificates_services_deactivate
  label: "xCommand Security Certificates Services Deactivate"
  kind: action
  command: "xCommand Security Certificates Services Deactivate"
  params: []

- id: x_command_security_certificates_services_delete
  label: "xCommand Security Certificates Services Delete"
  kind: action
  command: "xCommand Security Certificates Services Delete"
  params: []

- id: x_command_security_certificates_services_show
  label: "xCommand Security Certificates Services Show"
  kind: action
  command: "xCommand Security Certificates Services Show"
  params: []

- id: x_command_security_certificates_third_party_disable
  label: "xCommand Security Certificates ThirdParty Disable"
  kind: action
  command: "xCommand Security Certificates ThirdParty Disable"
  params: []

- id: x_command_security_certificates_third_party_show
  label: "xCommand Security Certificates ThirdParty Show"
  kind: action
  command: "xCommand Security Certificates ThirdParty Show"
  params: []

- id: x_command_security_certificates_third_party_enable
  label: "xCommand Security Certificates ThirdParty Enable"
  kind: action
  command: "xCommand Security Certificates ThirdParty Enable"
  params: []

- id: x_command_security_certificates_third_party_list
  label: "xCommand Security Certificates ThirdParty List"
  kind: action
  command: "xCommand Security Certificates ThirdParty List"
  params: []

- id: x_command_security_certificates_webex_show
  label: "xCommand Security Certificates Webex Show"
  kind: action
  command: "xCommand Security Certificates Webex Show"
  params: []

- id: x_command_security_certificates_webex_identity_show
  label: "xCommand Security Certificates WebexIdentity Show"
  kind: action
  command: "xCommand Security Certificates WebexIdentity Show"
  params: []

- id: x_command_security_ciphers_list
  label: "xCommand Security Ciphers List"
  kind: action
  command: "xCommand Security Ciphers List"
  params: []

- id: x_command_security_client_secret_populate
  label: "xCommand Security ClientSecret Populate"
  kind: action
  command: "xCommand Security ClientSecret Populate"
  params: []

- id: x_command_security_persistency
  label: "xCommand Security Persistency"
  kind: action
  command: "xCommand Security Persistency"
  params: []

- id: x_command_security_session_get
  label: "xCommand Security Session Get"
  kind: action
  command: "xCommand Security Session Get"
  params: []

- id: x_command_security_session_list
  label: "xCommand Security Session List"
  kind: action
  command: "xCommand Security Session List"
  params: []

- id: x_command_security_session_terminate
  label: "xCommand Security Session Terminate"
  kind: action
  command: "xCommand Security Session Terminate"
  params: []

- id: x_command_standby_activate
  label: "xCommand Standby Activate"
  kind: action
  command: "xCommand Standby Activate"
  params: []

- id: x_command_standby_deactivate
  label: "xCommand Standby Deactivate"
  kind: action
  command: "xCommand Standby Deactivate"
  params: []

- id: x_command_standby_halfwake
  label: "xCommand Standby Halfwake"
  kind: action
  command: "xCommand Standby Halfwake"
  params: []

- id: x_command_standby_reset_halfwake_timer
  label: "xCommand Standby ResetHalfwakeTimer"
  kind: action
  command: "xCommand Standby ResetHalfwakeTimer"
  params: []

- id: x_command_system_unit_boot
  label: "xCommand SystemUnit Boot"
  kind: action
  command: "xCommand SystemUnit Boot"
  params: []

- id: x_command_standby_reset_timer
  label: "xCommand Standby ResetTimer"
  kind: action
  command: "xCommand Standby ResetTimer"
  params: []

- id: x_command_system_unit_developer_preview_activate
  label: "xCommand SystemUnit DeveloperPreview Activate"
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Activate"
  params: []

- id: x_command_system_unit_developer_preview_deactivate
  label: "xCommand SystemUnit DeveloperPreview Deactivate"
  kind: action
  command: "xCommand SystemUnit DeveloperPreview Deactivate"
  params: []

- id: x_command_system_unit_factory_reset
  label: "xCommand SystemUnit FactoryReset"
  kind: action
  command: "xCommand SystemUnit FactoryReset"
  params: []

- id: x_command_system_unit_first_time_wizard_stop
  label: "xCommand SystemUnit FirstTimeWizard Stop"
  kind: action
  command: "xCommand SystemUnit FirstTimeWizard Stop"
  params: []

- id: x_command_system_unit_notifications_remove_all
  label: "xCommand SystemUnit Notifications RemoveAll"
  kind: action
  command: "xCommand SystemUnit Notifications RemoveAll"
  params: []

- id: x_command_system_unit_option_key_add
  label: "xCommand SystemUnit OptionKey Add"
  kind: action
  command: "xCommand SystemUnit OptionKey Add"
  params: []

- id: x_command_system_unit_option_key_remove_all
  label: "xCommand SystemUnit OptionKey RemoveAll"
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll"
  params: []

- id: x_command_system_unit_product_platform_set
  label: "xCommand SystemUnit ProductPlatform Set"
  kind: action
  command: "xCommand SystemUnit ProductPlatform Set"
  params: []

- id: x_command_system_unit_option_key_list
  label: "xCommand SystemUnit OptionKey List"
  kind: action
  command: "xCommand SystemUnit OptionKey List"
  params: []

- id: x_command_system_unit_option_key_remove
  label: "xCommand SystemUnit OptionKey Remove"
  kind: action
  command: "xCommand SystemUnit OptionKey Remove"
  params: []

- id: x_command_system_unit_sign_in_banner_clear
  label: "xCommand SystemUnit SignInBanner Clear"
  kind: action
  command: "xCommand SystemUnit SignInBanner Clear"
  params: []

- id: x_command_system_unit_soft_reset
  label: "xCommand SystemUnit SoftReset"
  kind: action
  command: "xCommand SystemUnit SoftReset"
  params: []

- id: x_command_system_unit_sign_in_banner_get
  label: "xCommand SystemUnit SignInBanner Get"
  kind: action
  command: "xCommand SystemUnit SignInBanner Get"
  params: []

- id: x_command_system_unit_sign_in_banner_set
  label: "xCommand SystemUnit SignInBanner Set"
  kind: action
  command: "xCommand SystemUnit SignInBanner Set"
  params: []

- id: x_command_system_unit_software_upgrade
  label: "xCommand SystemUnit SoftwareUpgrade"
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade"
  params: []

- id: x_command_system_unit_welcome_banner_clear
  label: "xCommand SystemUnit WelcomeBanner Clear"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Clear"
  params: []

- id: x_command_system_unit_welcome_banner_get
  label: "xCommand SystemUnit WelcomeBanner Get"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Get"
  params: []

- id: x_command_system_unit_welcome_banner_set
  label: "xCommand SystemUnit WelcomeBanner Set"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Set"
  params: []

- id: x_command_time_date_time_get
  label: "xCommand Time DateTime Get"
  kind: action
  command: "xCommand Time DateTime Get"
  params: []

- id: x_command_time_date_time_set
  label: "xCommand Time DateTime Set"
  kind: action
  command: "xCommand Time DateTime Set"
  params: []

- id: x_command_user_interface_branding_fetch
  label: "xCommand UserInterface Branding Fetch"
  kind: action
  command: "xCommand UserInterface Branding Fetch"
  params: []

- id: x_command_user_interface_branding_clear
  label: "xCommand UserInterface Branding Clear"
  kind: action
  command: "xCommand UserInterface Branding Clear"
  params: []

- id: x_command_user_interface_branding_delete
  label: "xCommand UserInterface Branding Delete"
  kind: action
  command: "xCommand UserInterface Branding Delete"
  params: []

- id: x_command_user_interface_branding_get
  label: "xCommand UserInterface Branding Get"
  kind: action
  command: "xCommand UserInterface Branding Get"
  params: []

- id: x_command_user_interface_branding_updated
  label: "xCommand UserInterface Branding Updated"
  kind: action
  command: "xCommand UserInterface Branding Updated"
  params: []

- id: x_command_user_interface_branding_upload
  label: "xCommand UserInterface Branding Upload"
  kind: action
  command: "xCommand UserInterface Branding Upload"
  params: []

- id: x_command_user_interface_extensions_clear
  label: "xCommand UserInterface Extensions Clear"
  kind: action
  command: "xCommand UserInterface Extensions Clear"
  params: []

- id: x_command_user_interface_extensions_export
  label: "xCommand UserInterface Extensions Export"
  kind: action
  command: "xCommand UserInterface Extensions Export"
  params: []

- id: x_command_user_interface_extensions_icon_delete
  label: "xCommand UserInterface Extensions Icon Delete"
  kind: action
  command: "xCommand UserInterface Extensions Icon Delete"
  params: []

- id: x_command_user_interface_extensions_icon_download
  label: "xCommand UserInterface Extensions Icon Download"
  kind: action
  command: "xCommand UserInterface Extensions Icon Download"
  params: []

- id: x_command_user_interface_extensions_icon_delete_all
  label: "xCommand UserInterface Extensions Icon DeleteAll"
  kind: action
  command: "xCommand UserInterface Extensions Icon DeleteAll"
  params: []

- id: x_command_user_interface_extensions_icon_fetch
  label: "xCommand UserInterface Extensions Icon Fetch"
  kind: action
  command: "xCommand UserInterface Extensions Icon Fetch"
  params: []

- id: x_command_user_interface_extensions_icon_get
  label: "xCommand UserInterface Extensions Icon Get"
  kind: action
  command: "xCommand UserInterface Extensions Icon Get"
  params: []

- id: x_command_user_interface_extensions_icon_list
  label: "xCommand UserInterface Extensions Icon List"
  kind: action
  command: "xCommand UserInterface Extensions Icon List"
  params: []

- id: x_command_user_interface_extensions_list
  label: "xCommand UserInterface Extensions List"
  kind: action
  command: "xCommand UserInterface Extensions List"
  params: []

- id: x_command_user_interface_extensions_panel_clicked
  label: "xCommand UserInterface Extensions Panel Clicked"
  kind: action
  command: "xCommand UserInterface Extensions Panel Clicked"
  params: []

- id: x_command_user_interface_extensions_icon_upload
  label: "xCommand UserInterface Extensions Icon Upload"
  kind: action
  command: "xCommand UserInterface Extensions Icon Upload"
  params: []

- id: x_command_user_interface_extensions_panel_close
  label: "xCommand UserInterface Extensions Panel Close"
  kind: action
  command: "xCommand UserInterface Extensions Panel Close"
  params: []

- id: x_command_user_interface_extensions_panel_save
  label: "xCommand UserInterface Extensions Panel Save"
  kind: action
  command: "xCommand UserInterface Extensions Panel Save"
  params: []

- id: x_command_user_interface_extensions_panel_open
  label: "xCommand UserInterface Extensions Panel Open"
  kind: action
  command: "xCommand UserInterface Extensions Panel Open"
  params: []

- id: x_command_user_interface_extensions_panel_remove
  label: "xCommand UserInterface Extensions Panel Remove"
  kind: action
  command: "xCommand UserInterface Extensions Panel Remove"
  params: []

- id: x_command_user_interface_extensions_panel_update
  label: "xCommand UserInterface Extensions Panel Update"
  kind: action
  command: "xCommand UserInterface Extensions Panel Update"
  params: []

- id: x_command_user_interface_extensions_set
  label: "xCommand UserInterface Extensions Set"
  kind: action
  command: "xCommand UserInterface Extensions Set"
  params: []

- id: x_command_user_interface_extensions_web_app_save
  label: "xCommand UserInterface Extensions WebApp Save"
  kind: action
  command: "xCommand UserInterface Extensions WebApp Save"
  params: []

- id: x_command_user_interface_extensions_web_widget_remove
  label: "xCommand UserInterface Extensions WebWidget Remove"
  kind: action
  command: "xCommand UserInterface Extensions WebWidget Remove"
  params: []

- id: x_command_user_interface_extensions_web_widget_save
  label: "xCommand UserInterface Extensions WebWidget Save"
  kind: action
  command: "xCommand UserInterface Extensions WebWidget Save"
  params: []

- id: x_command_user_interface_extensions_widget_action
  label: "xCommand UserInterface Extensions Widget Action"
  kind: action
  command: "xCommand UserInterface Extensions Widget Action"
  params: []

- id: x_command_user_interface_extensions_widget_unset_value
  label: "xCommand UserInterface Extensions Widget UnsetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget UnsetValue"
  params: []

- id: x_command_user_interface_extensions_widget_set_value
  label: "xCommand UserInterface Extensions Widget SetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget SetValue"
  params: []

- id: x_command_user_interface_led_control_color_set
  label: "xCommand UserInterface LedControl Color Set"
  kind: action
  command: "xCommand UserInterface LedControl Color Set"
  params: []

- id: x_command_user_interface_message_alert_clear
  label: "xCommand UserInterface Message Alert Clear"
  kind: action
  command: "xCommand UserInterface Message Alert Clear"
  params: []

- id: x_command_user_interface_message_alert_display
  label: "xCommand UserInterface Message Alert Display"
  kind: action
  command: "xCommand UserInterface Message Alert Display"
  params: []

- id: x_command_user_interface_message_prompt_clear
  label: "xCommand UserInterface Message Prompt Clear"
  kind: action
  command: "xCommand UserInterface Message Prompt Clear"
  params: []

- id: x_command_user_interface_message_prompt_display
  label: "xCommand UserInterface Message Prompt Display"
  kind: action
  command: "xCommand UserInterface Message Prompt Display"
  params: []

- id: x_command_user_interface_message_prompt_response
  label: "xCommand UserInterface Message Prompt Response"
  kind: action
  command: "xCommand UserInterface Message Prompt Response"
  params: []

- id: x_command_user_interface_message_rating_clear
  label: "xCommand UserInterface Message Rating Clear"
  kind: action
  command: "xCommand UserInterface Message Rating Clear"
  params: []

- id: x_command_user_interface_message_rating_display
  label: "xCommand UserInterface Message Rating Display"
  kind: action
  command: "xCommand UserInterface Message Rating Display"
  params: []

- id: x_command_user_interface_message_text_input_display
  label: "xCommand UserInterface Message TextInput Display"
  kind: action
  command: "xCommand UserInterface Message TextInput Display"
  params: []

- id: x_command_user_interface_message_rating_response
  label: "xCommand UserInterface Message Rating Response"
  kind: action
  command: "xCommand UserInterface Message Rating Response"
  params: []

- id: x_command_user_interface_message_text_input_clear
  label: "xCommand UserInterface Message TextInput Clear"
  kind: action
  command: "xCommand UserInterface Message TextInput Clear"
  params: []

- id: x_command_user_interface_message_text_line_clear
  label: "xCommand UserInterface Message TextLine Clear"
  kind: action
  command: "xCommand UserInterface Message TextLine Clear"
  params: []

- id: x_command_user_interface_message_text_input_response
  label: "xCommand UserInterface Message TextInput Response"
  kind: action
  command: "xCommand UserInterface Message TextInput Response"
  params: []

- id: x_command_user_interface_message_text_line_display
  label: "xCommand UserInterface Message TextLine Display"
  kind: action
  command: "xCommand UserInterface Message TextLine Display"
  params: []

- id: x_command_user_interface_presentation_auto_share_show_alert
  label: "xCommand UserInterface Presentation AutoShare ShowAlert"
  kind: action
  command: "xCommand UserInterface Presentation AutoShare ShowAlert"
  params: []

- id: x_command_user_interface_presentation_external_source_add
  label: "xCommand UserInterface Presentation ExternalSource Add"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Add"
  params: []

- id: x_command_user_interface_presentation_external_source_list
  label: "xCommand UserInterface Presentation ExternalSource List"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource List"
  params: []

- id: x_command_user_interface_presentation_external_source_remove
  label: "xCommand UserInterface Presentation ExternalSource Remove"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Remove"
  params: []

- id: x_command_user_interface_presentation_external_source_remove_all
  label: "xCommand UserInterface Presentation ExternalSource RemoveAll"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource RemoveAll"
  params: []

- id: x_command_user_interface_presentation_external_source_select
  label: "xCommand UserInterface Presentation ExternalSource Select"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Select"
  params: []

- id: x_command_user_interface_presentation_external_source_state_set
  label: "xCommand UserInterface Presentation ExternalSource State Set"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource State Set"
  params: []

- id: x_command_user_interface_translation_override_clear
  label: "xCommand UserInterface Translation Override Clear"
  kind: action
  command: "xCommand UserInterface Translation Override Clear"
  params: []

- id: x_command_user_interface_translation_override_get
  label: "xCommand UserInterface Translation Override Get"
  kind: action
  command: "xCommand UserInterface Translation Override Get"
  params: []

- id: x_command_user_interface_translation_override_set
  label: "xCommand UserInterface Translation Override Set"
  kind: action
  command: "xCommand UserInterface Translation Override Set"
  params: []

- id: x_command_user_interface_wallpaper_bundle_clear
  label: "xCommand UserInterface WallpaperBundle Clear"
  kind: action
  command: "xCommand UserInterface WallpaperBundle Clear"
  params: []

- id: x_command_user_interface_wallpaper_bundle_list
  label: "xCommand UserInterface WallpaperBundle List"
  kind: action
  command: "xCommand UserInterface WallpaperBundle List"
  params: []

- id: x_command_user_interface_wallpaper_bundle_set
  label: "xCommand UserInterface WallpaperBundle Set"
  kind: action
  command: "xCommand UserInterface WallpaperBundle Set"
  params: []

- id: x_command_user_interface_web_view_clear
  label: "xCommand UserInterface WebView Clear"
  kind: action
  command: "xCommand UserInterface WebView Clear"
  params: []

- id: x_command_user_interface_web_view_display
  label: "xCommand UserInterface WebView Display"
  kind: action
  command: "xCommand UserInterface WebView Display"
  params: []

- id: x_command_user_management_remote_support_user_create
  label: "xCommand UserManagement RemoteSupportUser Create"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Create"
  params: []

- id: x_command_user_management_remote_support_user_get_state
  label: "xCommand UserManagement RemoteSupportUser GetState"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser GetState"
  params: []

- id: x_command_user_management_remote_support_user_delete
  label: "xCommand UserManagement RemoteSupportUser Delete"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Delete"
  params: []

- id: x_command_user_management_remote_support_user_disable_permanently
  label: "xCommand UserManagement RemoteSupportUser DisablePermanently"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser DisablePermanently"
  params: []

- id: x_command_user_management_user_add
  label: "xCommand UserManagement User Add"
  kind: action
  command: "xCommand UserManagement User Add"
  params: []

- id: x_command_user_management_user_delete
  label: "xCommand UserManagement User Delete"
  kind: action
  command: "xCommand UserManagement User Delete"
  params: []

- id: x_command_user_management_user_get
  label: "xCommand UserManagement User Get"
  kind: action
  command: "xCommand UserManagement User Get"
  params: []

- id: x_command_user_management_user_list
  label: "xCommand UserManagement User List"
  kind: action
  command: "xCommand UserManagement User List"
  params: []

- id: x_command_user_management_user_modify
  label: "xCommand UserManagement User Modify"
  kind: action
  command: "xCommand UserManagement User Modify"
  params: []

- id: x_command_user_management_user_passphrase_change
  label: "xCommand UserManagement User Passphrase Change"
  kind: action
  command: "xCommand UserManagement User Passphrase Change"
  params: []

- id: x_command_user_management_user_unblock
  label: "xCommand UserManagement User Unblock"
  kind: action
  command: "xCommand UserManagement User Unblock"
  params: []

- id: x_command_user_management_user_passphrase_set
  label: "xCommand UserManagement User Passphrase Set"
  kind: action
  command: "xCommand UserManagement User Passphrase Set"
  params: []

- id: x_command_user_presence_custom_status_set
  label: "xCommand UserPresence CustomStatus Set"
  kind: action
  command: "xCommand UserPresence CustomStatus Set"
  params: []

- id: x_command_user_presence_custom_status_clear
  label: "xCommand UserPresence CustomStatus Clear"
  kind: action
  command: "xCommand UserPresence CustomStatus Clear"
  params: []

- id: x_command_user_presence_custom_status_get_recents_list
  label: "xCommand UserPresence CustomStatus GetRecentsList"
  kind: action
  command: "xCommand UserPresence CustomStatus GetRecentsList"
  params: []

- id: x_command_video_cec_input_key_click
  label: "xCommand Video CEC Input KeyClick"
  kind: action
  command: "xCommand Video CEC Input KeyClick"
  params: []

- id: x_command_video_active_speaker_pip_set
  label: "xCommand Video ActiveSpeakerPIP Set"
  kind: action
  command: "xCommand Video ActiveSpeakerPIP Set"
  params: []

- id: x_command_video_cec_output_key_click
  label: "xCommand Video CEC Output KeyClick"
  kind: action
  command: "xCommand Video CEC Output KeyClick"
  params: []

- id: x_command_video_cec_output_send_active_source_request
  label: "xCommand Video CEC Output SendActiveSourceRequest"
  kind: action
  command: "xCommand Video CEC Output SendActiveSourceRequest"
  params: []

- id: x_command_video_cec_output_send_inactive_source_request
  label: "xCommand Video CEC Output SendInactiveSourceRequest"
  kind: action
  command: "xCommand Video CEC Output SendInactiveSourceRequest"
  params: []

- id: x_command_video_graphics_clear
  label: "xCommand Video Graphics Clear"
  kind: action
  command: "xCommand Video Graphics Clear"
  params: []

- id: x_command_video_graphics_text_display
  label: "xCommand Video Graphics Text Display"
  kind: action
  command: "xCommand Video Graphics Text Display"
  params: []

- id: x_command_video_input_main_video_mute
  label: "xCommand Video Input MainVideo Mute"
  kind: action
  command: "xCommand Video Input MainVideo Mute"
  params: []

- id: x_command_video_input_main_video_unmute
  label: "xCommand Video Input MainVideo Unmute"
  kind: action
  command: "xCommand Video Input MainVideo Unmute"
  params: []

- id: x_command_video_input_set_main_video_source
  label: "xCommand Video Input SetMainVideoSource"
  kind: action
  command: "xCommand Video Input SetMainVideoSource"
  params: []

- id: x_command_video_layout_layout_family_set
  label: "xCommand Video Layout LayoutFamily Set"
  kind: action
  command: "xCommand Video Layout LayoutFamily Set"
  params: []

- id: x_command_video_layout_hide_non_video_activate
  label: "xCommand Video Layout HideNonVideo Activate"
  kind: action
  command: "xCommand Video Layout HideNonVideo Activate"
  params: []

- id: x_command_video_layout_hide_non_video_deactivate
  label: "xCommand Video Layout HideNonVideo Deactivate"
  kind: action
  command: "xCommand Video Layout HideNonVideo Deactivate"
  params: []

- id: x_command_video_layout_set_layout
  label: "xCommand Video Layout SetLayout"
  kind: action
  command: "xCommand Video Layout SetLayout"
  params: []

- id: x_command_video_matrix_assign
  label: "xCommand Video Matrix Assign"
  kind: action
  command: "xCommand Video Matrix Assign"
  params: []

- id: x_command_video_matrix_reset
  label: "xCommand Video Matrix Reset"
  kind: action
  command: "xCommand Video Matrix Reset"
  params: []

- id: x_command_video_matrix_unassign
  label: "xCommand Video Matrix Unassign"
  kind: action
  command: "xCommand Video Matrix Unassign"
  params: []

- id: x_command_video_matrix_swap
  label: "xCommand Video Matrix Swap"
  kind: action
  command: "xCommand Video Matrix Swap"
  params: []

- id: x_command_video_output_hdmi_passthrough_start
  label: "xCommand Video Output HDMI Passthrough Start"
  kind: action
  command: "xCommand Video Output HDMI Passthrough Start"
  params: []

- id: x_command_video_output_hdmi_passthrough_stop
  label: "xCommand Video Output HDMI Passthrough Stop"
  kind: action
  command: "xCommand Video Output HDMI Passthrough Stop"
  params: []

- id: x_command_video_output_monitor_color_select
  label: "xCommand Video Output Monitor Color Select"
  kind: action
  command: "xCommand Video Output Monitor Color Select"
  params: []

- id: x_command_video_output_monitor_backlight_set
  label: "xCommand Video Output Monitor Backlight Set"
  kind: action
  command: "xCommand Video Output Monitor Backlight Set"
  params: []

- id: x_command_video_output_monitor_reset
  label: "xCommand Video Output Monitor Reset"
  kind: action
  command: "xCommand Video Output Monitor Reset"
  params: []

- id: x_command_video_presentation_pip_set
  label: "xCommand Video PresentationPIP Set"
  kind: action
  command: "xCommand Video PresentationPIP Set"
  params: []

- id: x_command_video_selfview_set
  label: "xCommand Video Selfview Set"
  kind: action
  command: "xCommand Video Selfview Set"
  params: []

- id: x_command_video_presentation_view_set
  label: "xCommand Video PresentationView Set"
  kind: action
  command: "xCommand Video PresentationView Set"
  params: []

- id: x_command_web_engine_delete_storage
  label: "xCommand WebEngine DeleteStorage"
  kind: action
  command: "xCommand WebEngine DeleteStorage"
  params: []

- id: x_command_web_engine_logging_set
  label: "xCommand WebEngine Logging Set"
  kind: action
  command: "xCommand WebEngine Logging Set"
  params: []

- id: x_command_web_engine_media_access_add
  label: "xCommand WebEngine MediaAccess Add"
  kind: action
  command: "xCommand WebEngine MediaAccess Add"
  params: []

- id: x_command_web_engine_media_access_remove
  label: "xCommand WebEngine MediaAccess Remove"
  kind: action
  command: "xCommand WebEngine MediaAccess Remove"
  params: []

- id: x_command_web_engine_media_access_remove_all
  label: "xCommand WebEngine MediaAccess RemoveAll"
  kind: action
  command: "xCommand WebEngine MediaAccess RemoveAll"
  params: []

- id: x_command_web_engine_media_access_list
  label: "xCommand WebEngine MediaAccess List"
  kind: action
  command: "xCommand WebEngine MediaAccess List"
  params: []

- id: x_command_webex_join
  label: "xCommand Webex Join"
  kind: action
  command: "xCommand Webex Join"
  params: []

- id: x_command_webex_hotdesking_set_support
  label: "xCommand Webex Hotdesking SetSupport"
  kind: action
  command: "xCommand Webex Hotdesking SetSupport"
  params: []

- id: x_command_webex_meetings_instant_meeting_start
  label: "xCommand Webex Meetings InstantMeeting Start"
  kind: action
  command: "xCommand Webex Meetings InstantMeeting Start"
  params: []

- id: x_command_webex_registration_logout
  label: "xCommand Webex Registration Logout"
  kind: action
  command: "xCommand Webex Registration Logout"
  params: []

- id: x_command_webex_registration_cancel
  label: "xCommand Webex Registration Cancel"
  kind: action
  command: "xCommand Webex Registration Cancel"
  params: []

- id: x_command_webex_registration_convert_to_cloud
  label: "xCommand Webex Registration ConvertToCloud"
  kind: action
  command: "xCommand Webex Registration ConvertToCloud"
  params: []

- id: x_command_webex_registration_start
  label: "xCommand Webex Registration Start"
  kind: action
  command: "xCommand Webex Registration Start"
  params: []

- id: x_command_web_rtc_join
  label: "xCommand WebRTC Join"
  kind: action
  command: "xCommand WebRTC Join"
  params: []

- id: x_command_web_rtc_provider_current_diagnostics_send
  label: "xCommand WebRTC Provider Current Diagnostics Send"
  kind: action
  command: "xCommand WebRTC Provider Current Diagnostics Send"
  params: []

- id: x_command_zoom_join
  label: "xCommand Zoom Join"
  kind: action
  command: "xCommand Zoom Join"
  params: []

- id: x_command_web_rtc_provider_google_meet_meeting_number_validate
  label: "xCommand WebRTC Provider GoogleMeet MeetingNumber Validate"
  kind: action
  command: "xCommand WebRTC Provider GoogleMeet MeetingNumber Validate"
  params: []
```

## Feedbacks
```yaml
- id: x_status_audio_devices_bluetooth_active_profile
  label: "xStatus Audio Devices Bluetooth ActiveProfile"
  kind: query
  query_command: "xStatus Audio Devices Bluetooth ActiveProfile"

- id: x_status_audio_devices_handset_usb_connection_status
  label: "xStatus Audio Devices HandsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB ConnectionStatus"

- id: x_status_audio_devices_handset_usb_cradle
  label: "xStatus Audio Devices HandsetUSB Cradle"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB Cradle"

- id: x_status_audio_devices_headset_analog_connection_status
  label: "xStatus Audio Devices HeadsetAnalog ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HeadsetAnalog ConnectionStatus"

- id: x_status_audio_devices_headset_usb_description
  label: "xStatus Audio Devices HeadsetUSB Description"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Description"

- id: x_status_audio_devices_headset_usb_manufacturer
  label: "xStatus Audio Devices HeadsetUSB Manufacturer"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Manufacturer"

- id: x_status_audio_devices_headset_usb_connection_status
  label: "xStatus Audio Devices HeadsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB ConnectionStatus"

- id: x_status_audio_input_connectors_ethernet_n_mute
  label: "xStatus Audio Input Connectors Ethernet [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] Mute"

- id: x_status_audio_input_connectors_ethernet_n_peripheral_id
  label: "xStatus Audio Input Connectors Ethernet [n] PeripheralId"
  kind: query
  query_command: "xStatus Audio Input Connectors Ethernet [n] PeripheralId"

- id: x_status_audio_input_connectors_microphone_n_connection_status
  label: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"

- id: x_status_audio_input_connectors_hdmi_n_mute
  label: "xStatus Audio Input Connectors HDMI [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors HDMI [n] Mute"

- id: x_status_audio_input_connectors_line_n_mute
  label: "xStatus Audio Input Connectors Line [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Line [n] Mute"

- id: x_status_audio_input_connectors_microphone_n_ec_reference_delay
  label: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"

- id: x_status_audio_input_connectors_microphone_n_mute
  label: "xStatus Audio Input Connectors Microphone [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] Mute"

- id: x_status_audio_input_local_input_n_channels
  label: "xStatus Audio Input LocalInput [n] Channels"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Channels"

- id: x_status_audio_input_connectors_usbc_n_mute
  label: "xStatus Audio Input Connectors USBC [n] Mute"
  kind: query
  query_command: "xStatus Audio Input Connectors USBC [n] Mute"

- id: x_status_audio_input_local_input_n_agc
  label: "xStatus Audio Input LocalInput [n] AGC"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] AGC"

- id: x_status_audio_input_local_input_n_connector_n
  label: "xStatus Audio Input LocalInput [n] Connector [n]"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Connector [n]"

- id: x_status_audio_input_local_input_n_direct
  label: "xStatus Audio Input LocalInput [n] Direct"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Direct"

- id: x_status_audio_input_local_input_n_mute
  label: "xStatus Audio Input LocalInput [n] Mute"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Mute"

- id: x_status_audio_input_local_input_n_name
  label: "xStatus Audio Input LocalInput [n] Name"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Name"

- id: x_status_audio_input_local_input_n_mixer_mode
  label: "xStatus Audio Input LocalInput [n] MixerMode"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] MixerMode"

- id: x_status_audio_input_remote_input_n_call_id
  label: "xStatus Audio Input RemoteInput [n] CallId"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] CallId"

- id: x_status_audio_microphones_music_mode
  label: "xStatus Audio Microphones MusicMode"
  kind: query
  query_command: "xStatus Audio Microphones MusicMode"

- id: x_status_audio_microphones_noise_removal
  label: "xStatus Audio Microphones NoiseRemoval"
  kind: query
  query_command: "xStatus Audio Microphones NoiseRemoval"

- id: x_status_audio_output_connectors_arc_n_delay_ms
  label: "xStatus Audio Output Connectors ARC [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] DelayMs"

- id: x_status_audio_microphones_mute
  label: "xStatus Audio Microphones Mute"
  kind: query
  query_command: "xStatus Audio Microphones Mute"

- id: x_status_audio_output_connectors_arc_n_mode
  label: "xStatus Audio Output Connectors ARC [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] Mode"

- id: x_status_audio_output_connectors_hdmi_n_delay_ms
  label: "xStatus Audio Output Connectors HDMI [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] DelayMs"

- id: x_status_audio_output_connectors_hdmi_n_mic_passthrough
  label: "xStatus Audio Output Connectors HDMI [n] MicPassthrough"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] MicPassthrough"

- id: x_status_audio_output_connectors_hdmi_n_mode
  label: "xStatus Audio Output Connectors HDMI [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] Mode"

- id: x_status_audio_output_connectors_internal_speaker_n_delay_ms
  label: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"

- id: x_status_audio_output_connectors_internal_speaker_n_mode
  label: "xStatus Audio Output Connectors InternalSpeaker [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors InternalSpeaker [n] Mode"

- id: x_status_audio_output_local_output_n_autoconnect_remote
  label: "xStatus Audio Output LocalOutput [n] AutoconnectRemote"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] AutoconnectRemote"

- id: x_status_audio_output_connectors_line_n_connection_status
  label: "xStatus Audio Output Connectors Line [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] ConnectionStatus"

- id: x_status_audio_output_local_output_n_channels
  label: "xStatus Audio Output LocalOutput [n] Channels"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Channels"

- id: x_status_audio_output_connectors_line_n_delay_ms
  label: "xStatus Audio Output Connectors Line [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] DelayMs"

- id: x_status_audio_output_local_output_n_connector_n
  label: "xStatus Audio Output LocalOutput [n] Connector [n]"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Connector [n]"

- id: x_status_audio_output_local_output_n_loudspeaker
  label: "xStatus Audio Output LocalOutput [n] Loudspeaker"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Loudspeaker"

- id: x_status_audio_output_local_output_n_input_n_gain
  label: "xStatus Audio Output LocalOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Input [n] Gain"

- id: x_status_audio_output_local_output_n_name
  label: "xStatus Audio Output LocalOutput [n] Name"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Name"

- id: x_status_audio_output_local_output_n_volume_controlled
  label: "xStatus Audio Output LocalOutput [n] VolumeControlled"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] VolumeControlled"

- id: x_status_audio_output_measured_hdmi_delay
  label: "xStatus Audio Output MeasuredHdmiDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiDelay"

- id: x_status_audio_output_reported_hdmi_cec_delay
  label: "xStatus Audio Output ReportedHdmiCecDelay"
  kind: query
  query_command: "xStatus Audio Output ReportedHdmiCecDelay"

- id: x_status_audio_output_measured_hdmi_arc_delay
  label: "xStatus Audio Output MeasuredHdmiArcDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiArcDelay"

- id: x_status_audio_output_remote_output_n_call_id
  label: "xStatus Audio Output RemoteOutput [n] CallId"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] CallId"

- id: x_status_audio_selected_device
  label: "xStatus Audio SelectedDevice"
  kind: query
  query_command: "xStatus Audio SelectedDevice"

- id: x_status_audio_output_remote_output_n_input_n_gain
  label: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"

- id: x_status_audio_ultrasound_volume
  label: "xStatus Audio Ultrasound Volume"
  kind: query
  query_command: "xStatus Audio Ultrasound Volume"

- id: x_status_audio_volume
  label: "xStatus Audio Volume"
  kind: query
  query_command: "xStatus Audio Volume"

- id: x_status_audio_volume_handset_usb
  label: "xStatus Audio VolumeHandsetUsb"
  kind: query
  query_command: "xStatus Audio VolumeHandsetUsb"

- id: x_status_audio_volume_headset_analog
  label: "xStatus Audio VolumeHeadsetAnalog"
  kind: query
  query_command: "xStatus Audio VolumeHeadsetAnalog"

- id: x_status_audio_volume_headset_usb
  label: "xStatus Audio VolumeHeadsetUsb"
  kind: query
  query_command: "xStatus Audio VolumeHeadsetUsb"

- id: x_status_audio_volume_internal
  label: "xStatus Audio VolumeInternal"
  kind: query
  query_command: "xStatus Audio VolumeInternal"

- id: x_status_audio_volume_headset_bluetooth
  label: "xStatus Audio VolumeHeadsetBluetooth"
  kind: query
  query_command: "xStatus Audio VolumeHeadsetBluetooth"

- id: x_status_audio_volume_mute
  label: "xStatus Audio VolumeMute"
  kind: query
  query_command: "xStatus Audio VolumeMute"

- id: x_status_bookings_availability_status
  label: "xStatus Bookings Availability Status"
  kind: query
  query_command: "xStatus Bookings Availability Status"

- id: x_status_bookings_current_id
  label: "xStatus Bookings Current Id"
  kind: query
  query_command: "xStatus Bookings Current Id"

- id: x_status_bookings_availability_time_stamp
  label: "xStatus Bookings Availability TimeStamp"
  kind: query
  query_command: "xStatus Bookings Availability TimeStamp"

- id: x_status_call_n_callback_number
  label: "xStatus Call [n] CallbackNumber"
  kind: query
  query_command: "xStatus Call [n] CallbackNumber"

- id: x_status_call_n_answer_state
  label: "xStatus Call [n] AnswerState"
  kind: query
  query_command: "xStatus Call [n] AnswerState"

- id: x_status_call_n_call_type
  label: "xStatus Call [n] CallType"
  kind: query
  query_command: "xStatus Call [n] CallType"

- id: x_status_call_n_attended_transfer_from
  label: "xStatus Call [n] AttendedTransferFrom"
  kind: query
  query_command: "xStatus Call [n] AttendedTransferFrom"

- id: x_status_call_n_device_type
  label: "xStatus Call [n] DeviceType"
  kind: query
  query_command: "xStatus Call [n] DeviceType"

- id: x_status_call_n_display_name
  label: "xStatus Call [n] DisplayName"
  kind: query
  query_command: "xStatus Call [n] DisplayName"

- id: x_status_call_n_duration
  label: "xStatus Call [n] Duration"
  kind: query
  query_command: "xStatus Call [n] Duration"

- id: x_status_call_n_direction
  label: "xStatus Call [n] Direction"
  kind: query
  query_command: "xStatus Call [n] Direction"

- id: x_status_call_n_encryption_type
  label: "xStatus Call [n] Encryption Type"
  kind: query
  query_command: "xStatus Call [n] Encryption Type"

- id: x_status_call_n_facility_service_id
  label: "xStatus Call [n] FacilityServiceId"
  kind: query
  query_command: "xStatus Call [n] FacilityServiceId"

- id: x_status_call_n_ice
  label: "xStatus Call [n] Ice"
  kind: query
  query_command: "xStatus Call [n] Ice"

- id: x_status_call_n_hold_reason
  label: "xStatus Call [n] HoldReason"
  kind: query
  query_command: "xStatus Call [n] HoldReason"

- id: x_status_call_n_placed_on_hold
  label: "xStatus Call [n] PlacedOnHold"
  kind: query
  query_command: "xStatus Call [n] PlacedOnHold"

- id: x_status_call_n_protocol
  label: "xStatus Call [n] Protocol"
  kind: query
  query_command: "xStatus Call [n] Protocol"

- id: x_status_call_n_receive_call_rate
  label: "xStatus Call [n] ReceiveCallRate"
  kind: query
  query_command: "xStatus Call [n] ReceiveCallRate"

- id: x_status_call_n_status
  label: "xStatus Call [n] Status"
  kind: query
  query_command: "xStatus Call [n] Status"

- id: x_status_call_n_transmit_call_rate
  label: "xStatus Call [n] TransmitCallRate"
  kind: query
  query_command: "xStatus Call [n] TransmitCallRate"

- id: x_status_call_n_remote_number
  label: "xStatus Call [n] RemoteNumber"
  kind: query
  query_command: "xStatus Call [n] RemoteNumber"

- id: x_status_cameras_camera_n_capabilities_options
  label: "xStatus Cameras Camera [n] Capabilities Options"
  kind: query
  query_command: "xStatus Cameras Camera [n] Capabilities Options"

- id: x_status_cameras_background_image
  label: "xStatus Cameras Background Image"
  kind: query
  query_command: "xStatus Cameras Background Image"

- id: x_status_cameras_camera_n_connected
  label: "xStatus Cameras Camera [n] Connected"
  kind: query
  query_command: "xStatus Cameras Camera [n] Connected"

- id: x_status_cameras_background_mode
  label: "xStatus Cameras Background Mode"
  kind: query
  query_command: "xStatus Cameras Background Mode"

- id: x_status_cameras_camera_n_detected_connector
  label: "xStatus Cameras Camera [n] DetectedConnector"
  kind: query
  query_command: "xStatus Cameras Camera [n] DetectedConnector"

- id: x_status_cameras_camera_n_flip
  label: "xStatus Cameras Camera [n] Flip"
  kind: query
  query_command: "xStatus Cameras Camera [n] Flip"

- id: x_status_cameras_camera_n_framerate
  label: "xStatus Cameras Camera [n] Framerate"
  kind: query
  query_command: "xStatus Cameras Camera [n] Framerate"

- id: x_status_cameras_camera_n_lighting_conditions
  label: "xStatus Cameras Camera [n] LightingConditions"
  kind: query
  query_command: "xStatus Cameras Camera [n] LightingConditions"

- id: x_status_cameras_camera_n_mac_address
  label: "xStatus Cameras Camera [n] MacAddress"
  kind: query
  query_command: "xStatus Cameras Camera [n] MacAddress"

- id: x_status_cameras_camera_n_hardware_id
  label: "xStatus Cameras Camera [n] HardwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] HardwareID"

- id: x_status_cameras_camera_n_manufacturer
  label: "xStatus Cameras Camera [n] Manufacturer"
  kind: query
  query_command: "xStatus Cameras Camera [n] Manufacturer"

- id: x_status_cameras_camera_n_model
  label: "xStatus Cameras Camera [n] Model"
  kind: query
  query_command: "xStatus Cameras Camera [n] Model"

- id: x_status_cameras_camera_n_position_pan
  label: "xStatus Cameras Camera [n] Position Pan"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Pan"

- id: x_status_cameras_camera_n_position_focus
  label: "xStatus Cameras Camera [n] Position Focus"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Focus"

- id: x_status_cameras_camera_n_position_roll
  label: "xStatus Cameras Camera [n] Position Roll"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Roll"

- id: x_status_cameras_camera_n_position_lens
  label: "xStatus Cameras Camera [n] Position Lens"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Lens"

- id: x_status_cameras_camera_n_position_tilt
  label: "xStatus Cameras Camera [n] Position Tilt"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Tilt"

- id: x_status_cameras_camera_n_position_zoom
  label: "xStatus Cameras Camera [n] Position Zoom"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Zoom"

- id: x_status_cameras_presenter_track_availability
  label: "xStatus Cameras PresenterTrack Availability"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Availability"

- id: x_status_cameras_camera_n_serial_number
  label: "xStatus Cameras Camera [n] SerialNumber"
  kind: query
  query_command: "xStatus Cameras Camera [n] SerialNumber"

- id: x_status_cameras_presenter_track_presenter_detected
  label: "xStatus Cameras PresenterTrack PresenterDetected"
  kind: query
  query_command: "xStatus Cameras PresenterTrack PresenterDetected"

- id: x_status_cameras_camera_n_software_id
  label: "xStatus Cameras Camera [n] SoftwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] SoftwareID"

- id: x_status_cameras_presenter_track_status
  label: "xStatus Cameras PresenterTrack Status"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Status"

- id: x_status_cameras_speaker_track_availability
  label: "xStatus Cameras SpeakerTrack Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Availability"

- id: x_status_cameras_speaker_track_background_mode
  label: "xStatus Cameras SpeakerTrack BackgroundMode"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack BackgroundMode"

- id: x_status_cameras_speaker_track_active_connector
  label: "xStatus Cameras SpeakerTrack ActiveConnector"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ActiveConnector"

- id: x_status_cameras_speaker_track_frames_availability
  label: "xStatus Cameras SpeakerTrack Frames Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Frames Availability"

- id: x_status_cameras_speaker_track_frames_status
  label: "xStatus Cameras SpeakerTrack Frames Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Frames Status"

- id: x_status_cameras_speaker_track_state
  label: "xStatus Cameras SpeakerTrack State"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack State"

- id: x_status_cameras_speaker_track_status
  label: "xStatus Cameras SpeakerTrack Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Status"

- id: x_status_cameras_speaker_track_view_limits_pan
  label: "xStatus Cameras SpeakerTrack ViewLimits Pan"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Pan"

- id: x_status_cameras_speaker_track_view_limits_status
  label: "xStatus Cameras SpeakerTrack ViewLimits Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Status"

- id: x_status_cameras_speaker_track_view_limits_tilt
  label: "xStatus Cameras SpeakerTrack ViewLimits Tilt"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Tilt"

- id: x_status_cameras_speaker_track_view_limits_zoom
  label: "xStatus Cameras SpeakerTrack ViewLimits Zoom"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ViewLimits Zoom"

- id: x_status_capabilities_conference_max_active_calls
  label: "xStatus Capabilities Conference MaxActiveCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxActiveCalls"

- id: x_status_capabilities_conference_max_video_calls
  label: "xStatus Capabilities Conference MaxVideoCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxVideoCalls"

- id: x_status_capabilities_conference_max_audio_calls
  label: "xStatus Capabilities Conference MaxAudioCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxAudioCalls"

- id: x_status_capabilities_conference_max_calls
  label: "xStatus Capabilities Conference MaxCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxCalls"

- id: x_status_conference_call_n_authentication_request
  label: "xStatus Conference Call [n] AuthenticationRequest"
  kind: query
  query_command: "xStatus Conference Call [n] AuthenticationRequest"

- id: x_status_conference_active_speaker_call_id
  label: "xStatus Conference ActiveSpeaker CallId"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker CallId"

- id: x_status_conference_call_n_booking_id
  label: "xStatus Conference Call [n] BookingId"
  kind: query
  query_command: "xStatus Conference Call [n] BookingId"

- id: x_status_conference_call_n_capabilities_caption
  label: "xStatus Conference Call [n] Capabilities Caption"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Caption"

- id: x_status_conference_call_n_capabilities_farend_message_mode
  label: "xStatus Conference Call [n] Capabilities FarendMessage Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FarendMessage Mode"

- id: x_status_conference_call_n_capabilities_fecc_mode
  label: "xStatus Conference Call [n] Capabilities FECC Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Mode"

- id: x_status_conference_call_n_capabilities_fecc_number_of_presets
  label: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"

- id: x_status_conference_call_n_capabilities_emergency_call_capability
  label: "xStatus Conference Call [n] Capabilities EmergencyCallCapability"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities EmergencyCallCapability"

- id: x_status_conference_call_n_capabilities_fecc_number_of_sources
  label: "xStatus Conference Call [n] Capabilities FECC NumberOfSources"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC NumberOfSources"

- id: x_status_conference_call_n_capabilities_fecc_source_n_name
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] Name"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] Name"

- id: x_status_conference_call_n_capabilities_fecc_source_n_options
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] Options"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] Options"

- id: x_status_conference_call_n_capabilities_fecc_source_n_source_id
  label: "xStatus Conference Call [n] Capabilities FECC Source [n] SourceId"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Source [n] SourceId"

- id: x_status_conference_call_n_capabilities_hold
  label: "xStatus Conference Call [n] Capabilities Hold"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Hold"

- id: x_status_conference_call_n_capabilities_ix_channel_status
  label: "xStatus Conference Call [n] Capabilities IxChannel Status"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities IxChannel Status"

- id: x_status_conference_call_n_capabilities_meeting_assistant_start
  label: "xStatus Conference Call [n] Capabilities MeetingAssistant Start"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MeetingAssistant Start"

- id: x_status_conference_call_n_capabilities_meeting_assistant_stop
  label: "xStatus Conference Call [n] Capabilities MeetingAssistant Stop"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities MeetingAssistant Stop"

- id: x_status_conference_call_n_capabilities_participant_add
  label: "xStatus Conference Call [n] Capabilities ParticipantAdd"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantAdd"

- id: x_status_conference_call_n_capabilities_participant_disconnect
  label: "xStatus Conference Call [n] Capabilities ParticipantDisconnect"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantDisconnect"

- id: x_status_conference_call_n_capabilities_participant_list
  label: "xStatus Conference Call [n] Capabilities ParticipantList"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantList"

- id: x_status_conference_call_n_capabilities_participant_mute
  label: "xStatus Conference Call [n] Capabilities ParticipantMute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities ParticipantMute"

- id: x_status_conference_call_n_capabilities_presentation
  label: "xStatus Conference Call [n] Capabilities Presentation"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Presentation"

- id: x_status_conference_call_n_capabilities_recording_start
  label: "xStatus Conference Call [n] Capabilities Recording Start"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Recording Start"

- id: x_status_conference_call_n_capabilities_self_mute
  label: "xStatus Conference Call [n] Capabilities SelfMute"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities SelfMute"

- id: x_status_conference_call_n_manufacturer
  label: "xStatus Conference Call [n] Manufacturer"
  kind: query
  query_command: "xStatus Conference Call [n] Manufacturer"

- id: x_status_conference_call_n_meeting_assistant_enabled
  label: "xStatus Conference Call [n] MeetingAssistantEnabled"
  kind: query
  query_command: "xStatus Conference Call [n] MeetingAssistantEnabled"

- id: x_status_conference_call_n_event_center_mode
  label: "xStatus Conference Call [n] EventCenter Mode"
  kind: query
  query_command: "xStatus Conference Call [n] EventCenter Mode"

- id: x_status_conference_call_n_meeting
  label: "xStatus Conference Call [n] Meeting"
  kind: query
  query_command: "xStatus Conference Call [n] Meeting"

- id: x_status_conference_call_n_microphones_muted
  label: "xStatus Conference Call [n] MicrophonesMuted"
  kind: query
  query_command: "xStatus Conference Call [n] MicrophonesMuted"

- id: x_status_conference_call_n_recording
  label: "xStatus Conference Call [n] Recording"
  kind: query
  query_command: "xStatus Conference Call [n] Recording"

- id: x_status_conference_call_n_proximity_call
  label: "xStatus Conference Call [n] ProximityCall"
  kind: query
  query_command: "xStatus Conference Call [n] ProximityCall"

- id: x_status_conference_call_n_simultaneous_interpretation_mixer_level
  label: "xStatus Conference Call [n] SimultaneousInterpretation MixerLevel"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation MixerLevel"

- id: x_status_conference_call_n_simultaneous_interpretation_selected_language
  label: "xStatus Conference Call [n] SimultaneousInterpretation SelectedLanguage"
  kind: query
  query_command: "xStatus Conference Call [n] SimultaneousInterpretation SelectedLanguage"

- id: x_status_conference_call_n_sip_session_id
  label: "xStatus Conference Call [n] Sip SessionId"
  kind: query
  query_command: "xStatus Conference Call [n] Sip SessionId"

- id: x_status_conference_call_n_software_id
  label: "xStatus Conference Call [n] SoftwareID"
  kind: query
  query_command: "xStatus Conference Call [n] SoftwareID"

- id: x_status_conference_call_n_session_type
  label: "xStatus Conference Call [n] SessionType"
  kind: query
  query_command: "xStatus Conference Call [n] SessionType"

- id: x_status_conference_call_n_streamed
  label: "xStatus Conference Call [n] Streamed"
  kind: query
  query_command: "xStatus Conference Call [n] Streamed"

- id: x_status_conference_call_n_transcoded
  label: "xStatus Conference Call [n] Transcoded"
  kind: query
  query_command: "xStatus Conference Call [n] Transcoded"

- id: x_status_conference_end_to_end_encryption_availability
  label: "xStatus Conference EndToEndEncryption Availability"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption Availability"

- id: x_status_conference_do_not_disturb
  label: "xStatus Conference DoNotDisturb"
  kind: query
  query_command: "xStatus Conference DoNotDisturb"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_fingerprint
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Fingerprint"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Fingerprint"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_not_after
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotAfter"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotAfter"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_primary_name
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PrimaryName"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PrimaryName"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_not_before
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotBefore"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] NotBefore"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_public_key_algorithm
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_serial_number
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SerialNumber"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SerialNumber"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_signature_algorithm
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_subject_n_name
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Subject [n] Name"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Subject [n] Name"

- id: x_status_conference_end_to_end_encryption_external_identity_certificate_chain_certificate_n_validity
  label: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Validity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity CertificateChain Certificate [n] Validity"

- id: x_status_conference_end_to_end_encryption_external_identity_identity
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Identity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Identity"

- id: x_status_conference_end_to_end_encryption_external_identity_status
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Status"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Status"

- id: x_status_conference_end_to_end_encryption_external_identity_verification
  label: "xStatus Conference EndToEndEncryption ExternalIdentity Verification"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption ExternalIdentity Verification"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_fingerprint
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Fingerprint"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Fingerprint"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_not_after
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotAfter"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotAfter"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_primary_name
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PrimaryName"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PrimaryName"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_not_before
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotBefore"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] NotBefore"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_public_key_algorithm
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] PublicKeyAlgorithm"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_serial_number
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SerialNumber"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SerialNumber"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_signature_algorithm
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] SignatureAlgorithm"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_subject_n_name
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Subject [n] Name"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Subject [n] Name"

- id: x_status_conference_end_to_end_encryption_internal_identity_certificate_chain_certificate_n_validity
  label: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Validity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity CertificateChain Certificate [n] Validity"

- id: x_status_conference_end_to_end_encryption_internal_identity_identity
  label: "xStatus Conference EndToEndEncryption InternalIdentity Identity"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Identity"

- id: x_status_conference_end_to_end_encryption_internal_identity_verification
  label: "xStatus Conference EndToEndEncryption InternalIdentity Verification"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Verification"

- id: x_status_conference_hide_non_video_active
  label: "xStatus Conference HideNonVideo Active"
  kind: query
  query_command: "xStatus Conference HideNonVideo Active"

- id: x_status_conference_end_to_end_encryption_internal_identity_status
  label: "xStatus Conference EndToEndEncryption InternalIdentity Status"
  kind: query
  query_command: "xStatus Conference EndToEndEncryption InternalIdentity Status"

- id: x_status_conference_hide_non_video_available
  label: "xStatus Conference HideNonVideo Available"
  kind: query
  query_command: "xStatus Conference HideNonVideo Available"

- id: x_status_conference_meeting_chat_notifications_mode
  label: "xStatus Conference MeetingChatNotifications Mode"
  kind: query
  query_command: "xStatus Conference MeetingChatNotifications Mode"

- id: x_status_conference_line_n_mode
  label: "xStatus Conference Line [n] Mode"
  kind: query
  query_command: "xStatus Conference Line [n] Mode"

- id: x_status_conference_multipoint_mode
  label: "xStatus Conference Multipoint Mode"
  kind: query
  query_command: "xStatus Conference Multipoint Mode"

- id: x_status_conference_people_focus_available
  label: "xStatus Conference PeopleFocus Available"
  kind: query
  query_command: "xStatus Conference PeopleFocus Available"

- id: x_status_conference_presentation_call_id
  label: "xStatus Conference Presentation CallId"
  kind: query
  query_command: "xStatus Conference Presentation CallId"

- id: x_status_conference_people_focus_active
  label: "xStatus Conference PeopleFocus Active"
  kind: query
  query_command: "xStatus Conference PeopleFocus Active"

- id: x_status_conference_presentation_local_instance_n_direct_share
  label: "xStatus Conference Presentation LocalInstance [n] DirectShare"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] DirectShare"

- id: x_status_conference_presentation_local_instance_n_source
  label: "xStatus Conference Presentation LocalInstance [n] Source"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] Source"

- id: x_status_conference_presentation_local_instance_n_sending_mode
  label: "xStatus Conference Presentation LocalInstance [n] SendingMode"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] SendingMode"

- id: x_status_conference_presentation_mode
  label: "xStatus Conference Presentation Mode"
  kind: query
  query_command: "xStatus Conference Presentation Mode"

- id: x_status_conference_selected_call_protocol
  label: "xStatus Conference SelectedCallProtocol"
  kind: query
  query_command: "xStatus Conference SelectedCallProtocol"

- id: x_status_conference_speaker_lock_call_id
  label: "xStatus Conference SpeakerLock CallId"
  kind: query
  query_command: "xStatus Conference SpeakerLock CallId"

- id: x_status_diagnostics_message_n_description
  label: "xStatus Diagnostics Message [n] Description"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Description"

- id: x_status_conference_speaker_lock_mode
  label: "xStatus Conference SpeakerLock Mode"
  kind: query
  query_command: "xStatus Conference SpeakerLock Mode"

- id: x_status_diagnostics_message_n_level
  label: "xStatus Diagnostics Message [n] Level"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Level"

- id: x_status_diagnostics_message_n_references
  label: "xStatus Diagnostics Message [n] References"
  kind: query
  query_command: "xStatus Diagnostics Message [n] References"

- id: x_status_diagnostics_message_n_type
  label: "xStatus Diagnostics Message [n] Type"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Type"

- id: x_status_gpio_pin_n_state
  label: "xStatus GPIO Pin [n] State"
  kind: query
  query_command: "xStatus GPIO Pin [n] State"

- id: x_status_h323_gatekeeper_status
  label: "xStatus H323 Gatekeeper Status"
  kind: query
  query_command: "xStatus H323 Gatekeeper Status"

- id: x_status_h323_gatekeeper_address
  label: "xStatus H323 Gatekeeper Address"
  kind: query
  query_command: "xStatus H323 Gatekeeper Address"

- id: x_status_h323_mode_reason
  label: "xStatus H323 Mode Reason"
  kind: query
  query_command: "xStatus H323 Mode Reason"

- id: x_status_h323_gatekeeper_port
  label: "xStatus H323 Gatekeeper Port"
  kind: query
  query_command: "xStatus H323 Gatekeeper Port"

- id: x_status_h323_gatekeeper_reason
  label: "xStatus H323 Gatekeeper Reason"
  kind: query
  query_command: "xStatus H323 Gatekeeper Reason"

- id: x_status_h323_mode_status
  label: "xStatus H323 Mode Status"
  kind: query
  query_command: "xStatus H323 Mode Status"

- id: x_status_http_feedback_n_expression_n
  label: "xStatus HttpFeedback [n] Expression [n]"
  kind: query
  query_command: "xStatus HttpFeedback [n] Expression [n]"

- id: x_status_http_feedback_n_format
  label: "xStatus HttpFeedback [n] Format"
  kind: query
  query_command: "xStatus HttpFeedback [n] Format"

- id: x_status_http_feedback_n_status
  label: "xStatus HttpFeedback [n] Status"
  kind: query
  query_command: "xStatus HttpFeedback [n] Status"

- id: x_status_http_feedback_n_url
  label: "xStatus HttpFeedback [n] URL"
  kind: query
  query_command: "xStatus HttpFeedback [n] URL"

- id: x_status_media_channels_call_n_channel_n_audio_channel_role
  label: "xStatus MediaChannels Call [n] Channel [n] Audio ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio ChannelRole"

- id: x_status_media_channels_call_n_channel_n_audio_channels
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"

- id: x_status_media_channels_call_n_channel_n_audio_mute
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Mute"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Mute"

- id: x_status_media_channels_call_n_channel_n_audio_protocol
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_call_n_channel_n_direction
  label: "xStatus MediaChannels Call [n] Channel [n] Direction"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Direction"

- id: x_status_media_channels_call_n_channel_n_encryption
  label: "xStatus MediaChannels Call [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Encryption"

- id: x_status_media_channels_call_n_channel_n_net_stat_bytes
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Bytes"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Bytes"

- id: x_status_media_channels_call_n_channel_n_net_stat_channel_rate
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat ChannelRate"

- id: x_status_media_channels_call_n_channel_n_net_stat_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Jitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Jitter"

- id: x_status_media_channels_call_n_channel_n_netstat_end_to_end_delay
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat EndToEndDelay"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat EndToEndDelay"

- id: x_status_media_channels_call_n_channel_n_net_stat_last_interval_lost
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat LastIntervalLost"

- id: x_status_media_channels_call_n_channel_n_net_stat_last_interval_received
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat LastIntervalReceived"

- id: x_status_media_channels_call_n_channel_n_net_stat_loss
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Loss"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Loss"

- id: x_status_media_channels_call_n_channel_n_netstat_round_trip_time
  label: "xStatus MediaChannels Call [n] Channel [n] Netstat RoundTripTime"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Netstat RoundTripTime"

- id: x_status_media_channels_call_n_channel_n_net_stat_max_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat MaxJitter"

- id: x_status_media_channels_call_n_channel_n_participant_id
  label: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"

- id: x_status_media_channels_call_n_channel_n_net_stat_packets
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Packets"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Packets"

- id: x_status_media_channels_call_n_channel_n_type
  label: "xStatus MediaChannels Call [n] Channel [n] Type"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Type"

- id: x_status_media_channels_call_n_channel_n_video_channel_role
  label: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"

- id: x_status_media_channels_call_n_channel_n_video_concealment_type
  label: "xStatus MediaChannels Call [n] Channel [n] Video ConcealmentType"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ConcealmentType"

- id: x_status_media_channels_call_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_call_n_channel_n_video_intra_frames
  label: "xStatus MediaChannels Call [n] Channel [n] Video intraFrames"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video intraFrames"

- id: x_status_media_channels_call_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"

- id: x_status_media_channels_call_n_channel_n_video_protocol
  label: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"

- id: x_status_media_channels_call_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_direct_share_n_channel_n_audio_channels
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Channels"

- id: x_status_media_channels_direct_share_n_channel_n_audio_protocol
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Audio Protocol"

- id: x_status_media_channels_direct_share_n_channel_n_encryption
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Encryption"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Encryption"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_jitter
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Jitter"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Jitter"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_bytes
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Bytes"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Bytes"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_last_interval_lost
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalLost"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalLost"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_channel_rate
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat ChannelRate"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_last_interval_received
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalReceived"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat LastIntervalReceived"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_max_jitter
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat MaxJitter"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_packets
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Packets"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Packets"

- id: x_status_media_channels_direct_share_n_channel_n_netstat_loss
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Loss"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Netstat Loss"

- id: x_status_media_channels_direct_share_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_direct_share_n_channel_n_video_protocol
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video Protocol"

- id: x_status_media_channels_direct_share_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_direct_share_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels DirectShare [n] Channel [n] Video ResolutionX"

- id: x_status_network_n_cdp_duplex
  label: "xStatus Network [n] CDP Duplex"
  kind: query
  query_command: "xStatus Network [n] CDP Duplex"

- id: x_status_network_n_cdp_address
  label: "xStatus Network [n] CDP Address"
  kind: query
  query_command: "xStatus Network [n] CDP Address"

- id: x_status_network_n_cdp_platform
  label: "xStatus Network [n] CDP Platform"
  kind: query
  query_command: "xStatus Network [n] CDP Platform"

- id: x_status_network_n_cdp_capabilities
  label: "xStatus Network [n] CDP Capabilities"
  kind: query
  query_command: "xStatus Network [n] CDP Capabilities"

- id: x_status_network_n_cdp_device_id
  label: "xStatus Network [n] CDP DeviceId"
  kind: query
  query_command: "xStatus Network [n] CDP DeviceId"

- id: x_status_network_n_cdp_port_id
  label: "xStatus Network [n] CDP PortID"
  kind: query
  query_command: "xStatus Network [n] CDP PortID"

- id: x_status_network_n_cdp_primary_mgmt_address
  label: "xStatus Network [n] CDP PrimaryMgmtAddress"
  kind: query
  query_command: "xStatus Network [n] CDP PrimaryMgmtAddress"

- id: x_status_network_n_cdp_sys_name
  label: "xStatus Network [n] CDP SysName"
  kind: query
  query_command: "xStatus Network [n] CDP SysName"

- id: x_status_network_n_cdp_version
  label: "xStatus Network [n] CDP Version"
  kind: query
  query_command: "xStatus Network [n] CDP Version"

- id: x_status_network_n_cdp_vo_ipappliance_vlan_id
  label: "xStatus Network [n] CDP VoIPApplianceVlanID"
  kind: query
  query_command: "xStatus Network [n] CDP VoIPApplianceVlanID"

- id: x_status_network_n_cdp_sys_object_id
  label: "xStatus Network [n] CDP SysObjectID"
  kind: query
  query_command: "xStatus Network [n] CDP SysObjectID"

- id: x_status_network_n_cdp_vtpmgmt_domain
  label: "xStatus Network [n] CDP VTPMgmtDomain"
  kind: query
  query_command: "xStatus Network [n] CDP VTPMgmtDomain"

- id: x_status_network_n_dns_domain_name
  label: "xStatus Network [n] DNS Domain Name"
  kind: query
  query_command: "xStatus Network [n] DNS Domain Name"

- id: x_status_network_n_dns_server_n_address
  label: "xStatus Network [n] DNS Server [n] Address"
  kind: query
  query_command: "xStatus Network [n] DNS Server [n] Address"

- id: x_status_network_n_ethernet_mac_address
  label: "xStatus Network [n] Ethernet MacAddress"
  kind: query
  query_command: "xStatus Network [n] Ethernet MacAddress"

- id: x_status_network_n_ethernet_speed
  label: "xStatus Network [n] Ethernet Speed"
  kind: query
  query_command: "xStatus Network [n] Ethernet Speed"

- id: x_status_network_n_ipv4_address
  label: "xStatus Network [n] IPv4 Address"
  kind: query
  query_command: "xStatus Network [n] IPv4 Address"

- id: x_status_network_n_ipv4_gateway
  label: "xStatus Network [n] IPv4 Gateway"
  kind: query
  query_command: "xStatus Network [n] IPv4 Gateway"

- id: x_status_network_n_ipv4_subnet_mask
  label: "xStatus Network [n] IPv4 SubnetMask"
  kind: query
  query_command: "xStatus Network [n] IPv4 SubnetMask"

- id: x_status_network_n_ipv6_address
  label: "xStatus Network [n] IPv6 Address"
  kind: query
  query_command: "xStatus Network [n] IPv6 Address"

- id: x_status_network_n_ipv6_gateway
  label: "xStatus Network [n] IPv6 Gateway"
  kind: query
  query_command: "xStatus Network [n] IPv6 Gateway"

- id: x_status_network_n_ipv6_link_local_address
  label: "xStatus Network [n] IPv6 LinkLocalAddress"
  kind: query
  query_command: "xStatus Network [n] IPv6 LinkLocalAddress"

- id: x_status_network_n_vlan_voice_vlan_id
  label: "xStatus Network [n] VLAN Voice VlanId"
  kind: query
  query_command: "xStatus Network [n] VLAN Voice VlanId"

- id: x_status_network_n_wifi_bssid
  label: "xStatus Network [n] Wifi BSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi BSSID"

- id: x_status_network_n_wifi_channel
  label: "xStatus Network [n] Wifi Channel"
  kind: query
  query_command: "xStatus Network [n] Wifi Channel"

- id: x_status_network_n_wifi_clmversion
  label: "xStatus Network [n] Wifi CLMVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi CLMVersion"

- id: x_status_network_n_wifi_connectivity
  label: "xStatus Network [n] Wifi Connectivity"
  kind: query
  query_command: "xStatus Network [n] Wifi Connectivity"

- id: x_status_network_n_wifi_frequency
  label: "xStatus Network [n] Wifi Frequency"
  kind: query
  query_command: "xStatus Network [n] Wifi Frequency"

- id: x_status_network_n_wifi_fwversion
  label: "xStatus Network [n] Wifi FWVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi FWVersion"

- id: x_status_network_n_wifi_interface_enabled
  label: "xStatus Network [n] Wifi InterfaceEnabled"
  kind: query
  query_command: "xStatus Network [n] Wifi InterfaceEnabled"

- id: x_status_network_n_wifi_interface_reason
  label: "xStatus Network [n] Wifi InterfaceReason"
  kind: query
  query_command: "xStatus Network [n] Wifi InterfaceReason"

- id: x_status_network_n_wifi_key_mgmt
  label: "xStatus Network [n] Wifi KeyMgmt"
  kind: query
  query_command: "xStatus Network [n] Wifi KeyMgmt"

- id: x_status_network_n_wifi_mac_address
  label: "xStatus Network [n] Wifi MacAddress"
  kind: query
  query_command: "xStatus Network [n] Wifi MacAddress"

- id: x_status_network_n_wifi_noise
  label: "xStatus Network [n] Wifi Noise"
  kind: query
  query_command: "xStatus Network [n] Wifi Noise"

- id: x_status_network_n_wifi_phase2_method
  label: "xStatus Network [n] Wifi Phase2Method"
  kind: query
  query_command: "xStatus Network [n] Wifi Phase2Method"

- id: x_status_network_n_wifi_raw_ssid
  label: "xStatus Network [n] Wifi RawSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi RawSSID"

- id: x_status_network_n_wifi_reason
  label: "xStatus Network [n] Wifi Reason"
  kind: query
  query_command: "xStatus Network [n] Wifi Reason"

- id: x_status_network_n_wifi_scan_result_n_auth_type
  label: "xStatus Network [n] Wifi ScanResult [n] AuthType"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] AuthType"

- id: x_status_network_n_wifi_region
  label: "xStatus Network [n] Wifi Region"
  kind: query
  query_command: "xStatus Network [n] Wifi Region"

- id: x_status_network_n_wifi_rssi
  label: "xStatus Network [n] Wifi RSSI"
  kind: query
  query_command: "xStatus Network [n] Wifi RSSI"

- id: x_status_network_n_wifi_scan_result_n_raw_ssid
  label: "xStatus Network [n] Wifi ScanResult [n] RawSSID"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] RawSSID"

- id: x_status_network_n_wifi_scan_result_n_signal_level
  label: "xStatus Network [n] Wifi ScanResult [n] SignalLevel"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] SignalLevel"

- id: x_status_network_n_wifi_scan_result_n_ssid
  label: "xStatus Network [n] Wifi ScanResult [n] SSID"
  kind: query
  query_command: "xStatus Network [n] Wifi ScanResult [n] SSID"

- id: x_status_network_n_wifi_ssid
  label: "xStatus Network [n] Wifi SSID"
  kind: query
  query_command: "xStatus Network [n] Wifi SSID"

- id: x_status_network_n_wifi_status
  label: "xStatus Network [n] Wifi Status"
  kind: query
  query_command: "xStatus Network [n] Wifi Status"

- id: x_status_network_n_wifi_snr
  label: "xStatus Network [n] Wifi SNR"
  kind: query
  query_command: "xStatus Network [n] Wifi SNR"

- id: x_status_network_n_wifi_speed
  label: "xStatus Network [n] Wifi Speed"
  kind: query
  query_command: "xStatus Network [n] Wifi Speed"

- id: x_status_network_n_wifi_swversion
  label: "xStatus Network [n] Wifi SWVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi SWVersion"

- id: x_status_network_n_wifi_tools_version
  label: "xStatus Network [n] Wifi ToolsVersion"
  kind: query
  query_command: "xStatus Network [n] Wifi ToolsVersion"

- id: x_status_network_n_wifi_type
  label: "xStatus Network [n] Wifi Type"
  kind: query
  query_command: "xStatus Network [n] Wifi Type"

- id: x_status_network_services_ntp_current_address
  label: "xStatus NetworkServices NTP CurrentAddress"
  kind: query
  query_command: "xStatus NetworkServices NTP CurrentAddress"

- id: x_status_network_services_ntp_server_n_address
  label: "xStatus NetworkServices NTP Server [n] Address"
  kind: query
  query_command: "xStatus NetworkServices NTP Server [n] Address"

- id: x_status_network_services_ntp_status
  label: "xStatus NetworkServices NTP Status"
  kind: query
  query_command: "xStatus NetworkServices NTP Status"

- id: x_status_network_services_upn_p_status
  label: "xStatus NetworkServices UPnP Status"
  kind: query
  query_command: "xStatus NetworkServices UPnP Status"

- id: x_status_peripherals_connected_device_n_dram
  label: "xStatus Peripherals ConnectedDevice [n] DRAM"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] DRAM"

- id: x_status_peripherals_connected_device_n_hardware_info
  label: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"

- id: x_status_peripherals_connected_device_n_id
  label: "xStatus Peripherals ConnectedDevice [n] ID"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] ID"

- id: x_status_peripherals_connected_device_n_location
  label: "xStatus Peripherals ConnectedDevice [n] Location"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Location"

- id: x_status_peripherals_connected_device_n_network_address
  label: "xStatus Peripherals ConnectedDevice [n] NetworkAddress"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] NetworkAddress"

- id: x_status_peripherals_connected_device_n_room_analytics_air_quality_index
  label: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AirQuality Index"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AirQuality Index"

- id: x_status_peripherals_connected_device_n_name
  label: "xStatus Peripherals ConnectedDevice [n] Name"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Name"

- id: x_status_peripherals_connected_device_n_room_analytics_ambient_temperature
  label: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AmbientTemperature"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics AmbientTemperature"

- id: x_status_peripherals_connected_device_n_serial_number
  label: "xStatus Peripherals ConnectedDevice [n] SerialNumber"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] SerialNumber"

- id: x_status_peripherals_connected_device_n_room_analytics_relative_humidity
  label: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics RelativeHumidity"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] RoomAnalytics RelativeHumidity"

- id: x_status_peripherals_connected_device_n_software_info
  label: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"

- id: x_status_peripherals_connected_device_n_status
  label: "xStatus Peripherals ConnectedDevice [n] Status"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Status"

- id: x_status_peripherals_connected_device_n_type
  label: "xStatus Peripherals ConnectedDevice [n] Type"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Type"

- id: x_status_peripherals_connected_device_n_upgrade_status
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"

- id: x_status_peripherals_connected_device_n_upgrade_failure_reason
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"

- id: x_status_peripherals_connected_device_n_upgrade_url
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"

- id: x_status_peripherals_pin_pairing_pin_visible_on_screen
  label: "xStatus Peripherals PinPairing PinVisibleOnScreen"
  kind: query
  query_command: "xStatus Peripherals PinPairing PinVisibleOnScreen"

- id: x_status_peripherals_pin_pairing_retries_remaining
  label: "xStatus Peripherals PinPairing RetriesRemaining"
  kind: query
  query_command: "xStatus Peripherals PinPairing RetriesRemaining"

- id: x_status_provisioning_cucm_customization_checksum
  label: "xStatus Provisioning CUCM Customization Checksum"
  kind: query
  query_command: "xStatus Provisioning CUCM Customization Checksum"

- id: x_status_peripherals_pin_pairing_time_remaining
  label: "xStatus Peripherals PinPairing TimeRemaining"
  kind: query
  query_command: "xStatus Peripherals PinPairing TimeRemaining"

- id: x_status_peripherals_stylus_n_presence
  label: "xStatus Peripherals Stylus [n] Presence"
  kind: query
  query_command: "xStatus Peripherals Stylus [n] Presence"

- id: x_status_provisioning_cucm_extension_mobility_enabled
  label: "xStatus Provisioning CUCM ExtensionMobility Enabled"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility Enabled"

- id: x_status_provisioning_cucm_extension_mobility_last_logged_in_user_id
  label: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"

- id: x_status_provisioning_room_type
  label: "xStatus Provisioning RoomType"
  kind: query
  query_command: "xStatus Provisioning RoomType"

- id: x_status_provisioning_cucm_extension_mobility_logged_in
  label: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"

- id: x_status_provisioning_server
  label: "xStatus Provisioning Server"
  kind: query
  query_command: "xStatus Provisioning Server"

- id: x_status_provisioning_reason
  label: "xStatus Provisioning Reason"
  kind: query
  query_command: "xStatus Provisioning Reason"

- id: x_status_provisioning_software_current_completed_at
  label: "xStatus Provisioning Software Current CompletedAt"
  kind: query
  query_command: "xStatus Provisioning Software Current CompletedAt"

- id: x_status_provisioning_software_current_url
  label: "xStatus Provisioning Software Current URL"
  kind: query
  query_command: "xStatus Provisioning Software Current URL"

- id: x_status_provisioning_software_current_version_id
  label: "xStatus Provisioning Software Current VersionId"
  kind: query
  query_command: "xStatus Provisioning Software Current VersionId"

- id: x_status_provisioning_software_upgrade_status_message
  label: "xStatus Provisioning Software UpgradeStatus Message"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Message"

- id: x_status_provisioning_software_upgrade_status_phase
  label: "xStatus Provisioning Software UpgradeStatus Phase"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Phase"

- id: x_status_provisioning_software_upgrade_status_last_change
  label: "xStatus Provisioning Software UpgradeStatus LastChange"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus LastChange"

- id: x_status_provisioning_software_upgrade_status_session_id
  label: "xStatus Provisioning Software UpgradeStatus SessionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus SessionId"

- id: x_status_provisioning_software_upgrade_status_status
  label: "xStatus Provisioning Software UpgradeStatus Status"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Status"

- id: x_status_provisioning_software_upgrade_status_urgency
  label: "xStatus Provisioning Software UpgradeStatus Urgency"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Urgency"

- id: x_status_provisioning_software_upgrade_status_url
  label: "xStatus Provisioning Software UpgradeStatus URL"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus URL"

- id: x_status_provisioning_software_upgrade_status_version_id
  label: "xStatus Provisioning Software UpgradeStatus VersionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus VersionId"

- id: x_status_provisioning_status
  label: "xStatus Provisioning Status"
  kind: query
  query_command: "xStatus Provisioning Status"

- id: x_status_provisioning_webex_calling_status
  label: "xStatus Provisioning WebexCalling Status"
  kind: query
  query_command: "xStatus Provisioning WebexCalling Status"

- id: x_status_proximity_services_availability
  label: "xStatus Proximity Services Availability"
  kind: query
  query_command: "xStatus Proximity Services Availability"

- id: x_status_room_analytics_ambient_noise_level_a
  label: "xStatus RoomAnalytics AmbientNoise Level A"
  kind: query
  query_command: "xStatus RoomAnalytics AmbientNoise Level A"

- id: x_status_room_analytics_ambient_temperature
  label: "xStatus RoomAnalytics AmbientTemperature"
  kind: query
  query_command: "xStatus RoomAnalytics AmbientTemperature"

- id: x_status_room_analytics_engagement_close_proximity
  label: "xStatus RoomAnalytics Engagement CloseProximity"
  kind: query
  query_command: "xStatus RoomAnalytics Engagement CloseProximity"

- id: x_status_room_analytics_people_count_current
  label: "xStatus RoomAnalytics PeopleCount Current"
  kind: query
  query_command: "xStatus RoomAnalytics PeopleCount Current"

- id: x_status_room_analytics_people_count_capacity
  label: "xStatus RoomAnalytics PeopleCount Capacity"
  kind: query
  query_command: "xStatus RoomAnalytics PeopleCount Capacity"

- id: x_status_room_analytics_people_presence
  label: "xStatus RoomAnalytics PeoplePresence"
  kind: query
  query_command: "xStatus RoomAnalytics PeoplePresence"

- id: x_status_room_analytics_reverberation_time_last_run
  label: "xStatus RoomAnalytics ReverberationTime LastRun"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime LastRun"

- id: x_status_room_analytics_reverberation_time_middle_rt60
  label: "xStatus RoomAnalytics ReverberationTime Middle RT60"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Middle RT60"

- id: x_status_room_analytics_relative_humidity
  label: "xStatus RoomAnalytics RelativeHumidity"
  kind: query
  query_command: "xStatus RoomAnalytics RelativeHumidity"

- id: x_status_room_analytics_reverberation_time_octaves_n_center_frequency
  label: "xStatus RoomAnalytics ReverberationTime Octaves [n] CenterFrequency"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Octaves [n] CenterFrequency"

- id: x_status_room_analytics_sound_level_a
  label: "xStatus RoomAnalytics Sound Level A"
  kind: query
  query_command: "xStatus RoomAnalytics Sound Level A"

- id: x_status_room_analytics_t3_alarm_detected
  label: "xStatus RoomAnalytics T3Alarm Detected"
  kind: query
  query_command: "xStatus RoomAnalytics T3Alarm Detected"

- id: x_status_room_analytics_reverberation_time_octaves_n_rt60
  label: "xStatus RoomAnalytics ReverberationTime Octaves [n] RT60"
  kind: query
  query_command: "xStatus RoomAnalytics ReverberationTime Octaves [n] RT60"

- id: x_status_room_analytics_ultrasound_presence
  label: "xStatus RoomAnalytics UltrasoundPresence"
  kind: query
  query_command: "xStatus RoomAnalytics UltrasoundPresence"

- id: x_status_room_preset_n_defined
  label: "xStatus RoomPreset [n] Defined"
  kind: query
  query_command: "xStatus RoomPreset [n] Defined"

- id: x_status_room_preset_n_description
  label: "xStatus RoomPreset [n] Description"
  kind: query
  query_command: "xStatus RoomPreset [n] Description"

- id: x_status_room_preset_n_type
  label: "xStatus RoomPreset [n] Type"
  kind: query
  query_command: "xStatus RoomPreset [n] Type"

- id: x_status_security_persistency_call_history
  label: "xStatus Security Persistency CallHistory"
  kind: query
  query_command: "xStatus Security Persistency CallHistory"

- id: x_status_security_persistency_dhcp
  label: "xStatus Security Persistency DHCP"
  kind: query
  query_command: "xStatus Security Persistency DHCP"

- id: x_status_security_persistency_configurations
  label: "xStatus Security Persistency Configurations"
  kind: query
  query_command: "xStatus Security Persistency Configurations"

- id: x_status_security_persistency_internal_logging
  label: "xStatus Security Persistency InternalLogging"
  kind: query
  query_command: "xStatus Security Persistency InternalLogging"

- id: x_status_security_persistency_local_phonebook
  label: "xStatus Security Persistency LocalPhonebook"
  kind: query
  query_command: "xStatus Security Persistency LocalPhonebook"

- id: x_status_sip_alternate_uri_alias_n_uri
  label: "xStatus SIP AlternateURI Alias [n] URI"
  kind: query
  query_command: "xStatus SIP AlternateURI Alias [n] URI"

- id: x_status_sip_alternate_uri_primary_uri
  label: "xStatus SIP AlternateURI Primary URI"
  kind: query
  query_command: "xStatus SIP AlternateURI Primary URI"

- id: x_status_sip_authentication
  label: "xStatus SIP Authentication"
  kind: query
  query_command: "xStatus SIP Authentication"

- id: x_status_sip_call_forward_display_name
  label: "xStatus SIP CallForward DisplayName"
  kind: query
  query_command: "xStatus SIP CallForward DisplayName"

- id: x_status_sip_call_forward_mode
  label: "xStatus SIP CallForward Mode"
  kind: query
  query_command: "xStatus SIP CallForward Mode"

- id: x_status_sip_call_forward_uri
  label: "xStatus SIP CallForward URI"
  kind: query
  query_command: "xStatus SIP CallForward URI"

- id: x_status_sip_mailbox_messages_waiting
  label: "xStatus SIP Mailbox MessagesWaiting"
  kind: query
  query_command: "xStatus SIP Mailbox MessagesWaiting"

- id: x_status_sip_mailbox_uri
  label: "xStatus SIP Mailbox URI"
  kind: query
  query_command: "xStatus SIP Mailbox URI"

- id: x_status_sip_proxy_n_address
  label: "xStatus SIP Proxy [n] Address"
  kind: query
  query_command: "xStatus SIP Proxy [n] Address"

- id: x_status_sip_proxy_n_status
  label: "xStatus SIP Proxy [n] Status"
  kind: query
  query_command: "xStatus SIP Proxy [n] Status"

- id: x_status_sip_registration_n_authentication
  label: "xStatus SIP Registration [n] Authentication"
  kind: query
  query_command: "xStatus SIP Registration [n] Authentication"

- id: x_status_sip_registration_n_reason
  label: "xStatus SIP Registration [n] Reason"
  kind: query
  query_command: "xStatus SIP Registration [n] Reason"

- id: x_status_sip_registration_n_status
  label: "xStatus SIP Registration [n] Status"
  kind: query
  query_command: "xStatus SIP Registration [n] Status"

- id: x_status_sip_secure
  label: "xStatus SIP Secure"
  kind: query
  query_command: "xStatus SIP Secure"

- id: x_status_sip_verified
  label: "xStatus SIP Verified"
  kind: query
  query_command: "xStatus SIP Verified"

- id: x_status_sip_registration_n_uri
  label: "xStatus SIP Registration [n] URI"
  kind: query
  query_command: "xStatus SIP Registration [n] URI"

- id: x_status_standby_level
  label: "xStatus Standby Level"
  kind: query
  query_command: "xStatus Standby Level"

- id: x_status_system_unit_broadcast_name
  label: "xStatus SystemUnit BroadcastName"
  kind: query
  query_command: "xStatus SystemUnit BroadcastName"

- id: x_status_standby_state
  label: "xStatus Standby State"
  kind: query
  query_command: "xStatus Standby State"

- id: x_status_system_unit_extensions_microsoft_in_call
  label: "xStatus SystemUnit Extensions Microsoft InCall"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft InCall"

- id: x_status_system_unit_extensions_microsoft_supported
  label: "xStatus SystemUnit Extensions Microsoft Supported"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Supported"

- id: x_status_system_unit_extensions_microsoft_version_oemagent
  label: "xStatus SystemUnit Extensions Microsoft Version OEMAgent"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Version OEMAgent"

- id: x_status_system_unit_extensions_microsoft_version_teams_admin_agent
  label: "xStatus SystemUnit Extensions Microsoft Version TeamsAdminAgent"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Version TeamsAdminAgent"

- id: x_status_system_unit_extensions_microsoft_version_android
  label: "xStatus SystemUnit Extensions Microsoft Version Android"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Version Android"

- id: x_status_system_unit_extensions_microsoft_version_teams_app
  label: "xStatus SystemUnit Extensions Microsoft Version TeamsApp"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Version TeamsApp"

- id: x_status_system_unit_extensions_microsoft_version_company_portal_app
  label: "xStatus SystemUnit Extensions Microsoft Version CompanyPortalApp"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft Version CompanyPortalApp"

- id: x_status_system_unit_extensions_microsoft_version_code_company_portal_app
  label: "xStatus SystemUnit Extensions Microsoft VersionCode CompanyPortalApp"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft VersionCode CompanyPortalApp"

- id: x_status_system_unit_extensions_microsoft_version_code_teams_app
  label: "xStatus SystemUnit Extensions Microsoft VersionCode TeamsApp"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft VersionCode TeamsApp"

- id: x_status_system_unit_developer_preview_mode
  label: "xStatus SystemUnit DeveloperPreview Mode"
  kind: query
  query_command: "xStatus SystemUnit DeveloperPreview Mode"

- id: x_status_system_unit_extensions_microsoft_version_code_oemagent
  label: "xStatus SystemUnit Extensions Microsoft VersionCode OEMAgent"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft VersionCode OEMAgent"

- id: x_status_system_unit_extensions_microsoft_version_code_teams_admin_agent
  label: "xStatus SystemUnit Extensions Microsoft VersionCode TeamsAdminAgent"
  kind: query
  query_command: "xStatus SystemUnit Extensions Microsoft VersionCode TeamsAdminAgent"

- id: x_status_system_unit_hardware_dram
  label: "xStatus SystemUnit Hardware DRAM"
  kind: query
  query_command: "xStatus SystemUnit Hardware DRAM"

- id: x_status_system_unit_hardware_has_wifi
  label: "xStatus SystemUnit Hardware HasWifi"
  kind: query
  query_command: "xStatus SystemUnit Hardware HasWifi"

- id: x_status_system_unit_hardware_module_device_id
  label: "xStatus SystemUnit Hardware Module DeviceId"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module DeviceId"

- id: x_status_system_unit_hardware_main_board_revision
  label: "xStatus SystemUnit Hardware MainBoard Revision"
  kind: query
  query_command: "xStatus SystemUnit Hardware MainBoard Revision"

- id: x_status_system_unit_hardware_module_compatibility_level
  label: "xStatus SystemUnit Hardware Module CompatibilityLevel"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module CompatibilityLevel"

- id: x_status_system_unit_hardware_module_serial_number
  label: "xStatus SystemUnit Hardware Module SerialNumber"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module SerialNumber"

- id: x_status_system_unit_hardware_monitoring_fan_n_status
  label: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"
  kind: query
  query_command: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"

- id: x_status_system_unit_hardware_monitoring_temperature_status
  label: "xStatus SystemUnit Hardware Monitoring Temperature Status"
  kind: query
  query_command: "xStatus SystemUnit Hardware Monitoring Temperature Status"

- id: x_status_system_unit_hardware_udi
  label: "xStatus SystemUnit Hardware UDI"
  kind: query
  query_command: "xStatus SystemUnit Hardware UDI"

- id: x_status_system_unit_hardware_usbc_n_connected
  label: "xStatus SystemUnit Hardware USBC [n] Connected"
  kind: query
  query_command: "xStatus SystemUnit Hardware USBC [n] Connected"

- id: x_status_system_unit_notifications_notification_n_text
  label: "xStatus SystemUnit Notifications Notification [n] Text"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Text"

- id: x_status_system_unit_notifications_notification_n_type
  label: "xStatus SystemUnit Notifications Notification [n] Type"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Type"

- id: x_status_system_unit_product_id
  label: "xStatus SystemUnit ProductId"
  kind: query
  query_command: "xStatus SystemUnit ProductId"

- id: x_status_system_unit_product_platform
  label: "xStatus SystemUnit ProductPlatform"
  kind: query
  query_command: "xStatus SystemUnit ProductPlatform"

- id: x_status_system_unit_product_type
  label: "xStatus SystemUnit ProductType"
  kind: query
  query_command: "xStatus SystemUnit ProductType"

- id: x_status_system_unit_software_option_keys_avintegrator
  label: "xStatus SystemUnit Software OptionKeys AVIntegrator"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys AVIntegrator"

- id: x_status_system_unit_software_display_name
  label: "xStatus SystemUnit Software DisplayName"
  kind: query
  query_command: "xStatus SystemUnit Software DisplayName"

- id: x_status_system_unit_software_name
  label: "xStatus SystemUnit Software Name"
  kind: query
  query_command: "xStatus SystemUnit Software Name"

- id: x_status_system_unit_software_option_keys_developer_preview
  label: "xStatus SystemUnit Software OptionKeys DeveloperPreview"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys DeveloperPreview"

- id: x_status_system_unit_software_option_keys_encryption
  label: "xStatus SystemUnit Software OptionKeys Encryption"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys Encryption"

- id: x_status_system_unit_software_release_date
  label: "xStatus SystemUnit Software ReleaseDate"
  kind: query
  query_command: "xStatus SystemUnit Software ReleaseDate"

- id: x_status_system_unit_software_option_keys_multi_site
  label: "xStatus SystemUnit Software OptionKeys MultiSite"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys MultiSite"

- id: x_status_system_unit_software_version
  label: "xStatus SystemUnit Software Version"
  kind: query
  query_command: "xStatus SystemUnit Software Version"

- id: x_status_system_unit_state_camera_lid
  label: "xStatus SystemUnit State CameraLid"
  kind: query
  query_command: "xStatus SystemUnit State CameraLid"

- id: x_status_system_unit_software_option_keys_remote_monitoring
  label: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"

- id: x_status_system_unit_state_number_of_active_calls
  label: "xStatus SystemUnit State NumberOfActiveCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfActiveCalls"

- id: x_status_system_unit_state_number_of_in_progress_calls
  label: "xStatus SystemUnit State NumberOfInProgressCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfInProgressCalls"

- id: x_status_system_unit_state_subsystem_application
  label: "xStatus SystemUnit State Subsystem Application"
  kind: query
  query_command: "xStatus SystemUnit State Subsystem Application"

- id: x_status_system_unit_state_system
  label: "xStatus SystemUnit State System"
  kind: query
  query_command: "xStatus SystemUnit State System"

- id: x_status_system_unit_state_number_of_suspended_calls
  label: "xStatus SystemUnit State NumberOfSuspendedCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfSuspendedCalls"

- id: x_status_system_unit_uptime
  label: "xStatus SystemUnit Uptime"
  kind: query
  query_command: "xStatus SystemUnit Uptime"

- id: x_status_time_system_time
  label: "xStatus Time SystemTime"
  kind: query
  query_command: "xStatus Time SystemTime"

- id: x_status_user_interface_branding_custom_id_halfwake_background
  label: "xStatus UserInterface Branding CustomId HalfwakeBackground"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId HalfwakeBackground"

- id: x_status_user_interface_branding_custom_id_background
  label: "xStatus UserInterface Branding CustomId Background"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId Background"

- id: x_status_user_interface_branding_custom_id_branding
  label: "xStatus UserInterface Branding CustomId Branding"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId Branding"

- id: x_status_user_interface_branding_custom_id_halfwake_branding
  label: "xStatus UserInterface Branding CustomId HalfwakeBranding"
  kind: query
  query_command: "xStatus UserInterface Branding CustomId HalfwakeBranding"

- id: x_status_user_interface_contact_info_contact_method_n_number
  label: "xStatus UserInterface ContactInfo ContactMethod [n] Number"
  kind: query
  query_command: "xStatus UserInterface ContactInfo ContactMethod [n] Number"

- id: x_status_user_interface_extensions_widget_n_value
  label: "xStatus UserInterface Extensions Widget [n] Value"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] Value"

- id: x_status_user_interface_contact_info_name
  label: "xStatus UserInterface ContactInfo Name"
  kind: query
  query_command: "xStatus UserInterface ContactInfo Name"

- id: x_status_user_interface_extensions_widget_n_widget_id
  label: "xStatus UserInterface Extensions Widget [n] WidgetId"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] WidgetId"

- id: x_status_user_interface_features_call_breakouts
  label: "xStatus UserInterface Features Call Breakouts"
  kind: query
  query_command: "xStatus UserInterface Features Call Breakouts"

- id: x_status_user_interface_features_call_end
  label: "xStatus UserInterface Features Call End"
  kind: query
  query_command: "xStatus UserInterface Features Call End"

- id: x_status_user_interface_features_call_camera_controls
  label: "xStatus UserInterface Features Call CameraControls"
  kind: query
  query_command: "xStatus UserInterface Features Call CameraControls"

- id: x_status_user_interface_features_call_hdmi_passthrough
  label: "xStatus UserInterface Features Call HdmiPassthrough"
  kind: query
  query_command: "xStatus UserInterface Features Call HdmiPassthrough"

- id: x_status_user_interface_features_call_join_google_meet
  label: "xStatus UserInterface Features Call JoinGoogleMeet"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinGoogleMeet"

- id: x_status_user_interface_features_call_join_zoom
  label: "xStatus UserInterface Features Call JoinZoom"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinZoom"

- id: x_status_user_interface_features_call_join_webex
  label: "xStatus UserInterface Features Call JoinWebex"
  kind: query
  query_command: "xStatus UserInterface Features Call JoinWebex"

- id: x_status_user_interface_features_call_keypad
  label: "xStatus UserInterface Features Call Keypad"
  kind: query
  query_command: "xStatus UserInterface Features Call Keypad"

- id: x_status_user_interface_features_call_layout_controls
  label: "xStatus UserInterface Features Call LayoutControls"
  kind: query
  query_command: "xStatus UserInterface Features Call LayoutControls"

- id: x_status_user_interface_features_call_mid_call_controls
  label: "xStatus UserInterface Features Call MidCallControls"
  kind: query
  query_command: "xStatus UserInterface Features Call MidCallControls"

- id: x_status_user_interface_features_call_music_mode
  label: "xStatus UserInterface Features Call MusicMode"
  kind: query
  query_command: "xStatus UserInterface Features Call MusicMode"

- id: x_status_user_interface_features_call_participant_list
  label: "xStatus UserInterface Features Call ParticipantList"
  kind: query
  query_command: "xStatus UserInterface Features Call ParticipantList"

- id: x_status_user_interface_features_call_selfview_controls
  label: "xStatus UserInterface Features Call SelfviewControls"
  kind: query
  query_command: "xStatus UserInterface Features Call SelfviewControls"

- id: x_status_user_interface_features_call_start
  label: "xStatus UserInterface Features Call Start"
  kind: query
  query_command: "xStatus UserInterface Features Call Start"

- id: x_status_user_interface_features_call_video_mute
  label: "xStatus UserInterface Features Call VideoMute"
  kind: query
  query_command: "xStatus UserInterface Features Call VideoMute"

- id: x_status_user_interface_features_call_webcam
  label: "xStatus UserInterface Features Call Webcam"
  kind: query
  query_command: "xStatus UserInterface Features Call Webcam"

- id: x_status_user_interface_features_files_start
  label: "xStatus UserInterface Features Files Start"
  kind: query
  query_command: "xStatus UserInterface Features Files Start"

- id: x_status_user_interface_features_share_start
  label: "xStatus UserInterface Features Share Start"
  kind: query
  query_command: "xStatus UserInterface Features Share Start"

- id: x_status_user_interface_features_whiteboard_start
  label: "xStatus UserInterface Features Whiteboard Start"
  kind: query
  query_command: "xStatus UserInterface Features Whiteboard Start"

- id: x_status_user_interface_led_control_color
  label: "xStatus UserInterface LedControl Color"
  kind: query
  query_command: "xStatus UserInterface LedControl Color"

- id: x_status_user_interface_osd_output
  label: "xStatus UserInterface OSD Output"
  kind: query
  query_command: "xStatus UserInterface OSD Output"

- id: x_status_user_interface_translation_override_checksum
  label: "xStatus UserInterface Translation Override Checksum"
  kind: query
  query_command: "xStatus UserInterface Translation Override Checksum"

- id: x_status_user_interface_settings_menu_visibility
  label: "xStatus UserInterface SettingsMenu Visibility"
  kind: query
  query_command: "xStatus UserInterface SettingsMenu Visibility"

- id: x_status_user_interface_web_view_n_status
  label: "xStatus UserInterface WebView [n] Status"
  kind: query
  query_command: "xStatus UserInterface WebView [n] Status"

- id: x_status_user_interface_web_view_n_type
  label: "xStatus UserInterface WebView [n] Type"
  kind: query
  query_command: "xStatus UserInterface WebView [n] Type"

- id: x_status_webex_services_user_presence_custom_status
  label: "xStatus Webex Services UserPresence CustomStatus"
  kind: query
  query_command: "xStatus Webex Services UserPresence CustomStatus"

- id: x_status_user_interface_web_view_n_url
  label: "xStatus UserInterface WebView [n] URL"
  kind: query
  query_command: "xStatus UserInterface WebView [n] URL"

- id: x_status_webex_services_user_presence_status
  label: "xStatus Webex Services UserPresence Status"
  kind: query
  query_command: "xStatus Webex Services UserPresence Status"

- id: x_status_video_input_air_play_status
  label: "xStatus Video Input AirPlay Status"
  kind: query
  query_command: "xStatus Video Input AirPlay Status"

- id: x_status_video_active_speaker_pipposition
  label: "xStatus Video ActiveSpeaker PIPPosition"
  kind: query
  query_command: "xStatus Video ActiveSpeaker PIPPosition"

- id: x_status_video_input_air_play_activity
  label: "xStatus Video Input AirPlay Activity"
  kind: query
  query_command: "xStatus Video Input AirPlay Activity"

- id: x_status_video_input_connector_n_connected
  label: "xStatus Video Input Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Input Connector [n] Connected"

- id: x_status_video_input_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_input_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_input_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_input_connector_n_connected_device_cec_n_vendor_id
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"

- id: x_status_video_input_connector_n_connected_device_cec_n_name
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"

- id: x_status_video_input_connector_n_signal_state
  label: "xStatus Video Input Connector [n] SignalState"
  kind: query
  query_command: "xStatus Video Input Connector [n] SignalState"

- id: x_status_video_input_connector_n_type
  label: "xStatus Video Input Connector [n] Type"
  kind: query
  query_command: "xStatus Video Input Connector [n] Type"

- id: x_status_video_input_direct_share_n_peer_address
  label: "xStatus Video Input DirectShare [n] Peer Address"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Peer Address"

- id: x_status_video_input_connector_n_source_id
  label: "xStatus Video Input Connector [n] SourceId"
  kind: query
  query_command: "xStatus Video Input Connector [n] SourceId"

- id: x_status_video_input_direct_share_n_peer_peripheral_id
  label: "xStatus Video Input DirectShare [n] Peer PeripheralID"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Peer PeripheralID"

- id: x_status_video_input_direct_share_n_type
  label: "xStatus Video Input DirectShare [n] Type"
  kind: query
  query_command: "xStatus Video Input DirectShare [n] Type"

- id: x_status_video_input_main_video_source
  label: "xStatus Video Input MainVideoSource"
  kind: query
  query_command: "xStatus Video Input MainVideoSource"

- id: x_status_video_input_main_video_mute
  label: "xStatus Video Input MainVideoMute"
  kind: query
  query_command: "xStatus Video Input MainVideoMute"

- id: x_status_video_input_miracast_channel
  label: "xStatus Video Input Miracast Channel"
  kind: query
  query_command: "xStatus Video Input Miracast Channel"

- id: x_status_video_input_miracast_pin_attempts_left
  label: "xStatus Video Input Miracast PinAttemptsLeft"
  kind: query
  query_command: "xStatus Video Input Miracast PinAttemptsLeft"

- id: x_status_video_input_miracast_status
  label: "xStatus Video Input Miracast Status"
  kind: query
  query_command: "xStatus Video Input Miracast Status"

- id: x_status_video_input_source_n_connector_id
  label: "xStatus Video Input Source [n] ConnectorId"
  kind: query
  query_command: "xStatus Video Input Source [n] ConnectorId"

- id: x_status_video_input_source_n_format_status
  label: "xStatus Video Input Source [n] FormatStatus"
  kind: query
  query_command: "xStatus Video Input Source [n] FormatStatus"

- id: x_status_video_input_source_n_media_channel_id
  label: "xStatus Video Input Source [n] MediaChannelId"
  kind: query
  query_command: "xStatus Video Input Source [n] MediaChannelId"

- id: x_status_video_input_source_n_resolution_width
  label: "xStatus Video Input Source [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Width"

- id: x_status_video_layout_current_layouts_active_layout
  label: "xStatus Video Layout CurrentLayouts ActiveLayout"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts ActiveLayout"

- id: x_status_video_input_source_n_resolution_height
  label: "xStatus Video Input Source [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Height"

- id: x_status_video_input_source_n_resolution_refresh_rate
  label: "xStatus Video Input Source [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution RefreshRate"

- id: x_status_video_layout_current_layouts_available_layouts_n_layout_name
  label: "xStatus Video Layout CurrentLayouts AvailableLayouts [n] LayoutName"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts AvailableLayouts [n] LayoutName"

- id: x_status_video_layout_layout_family_local
  label: "xStatus Video Layout LayoutFamily Local"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Local"

- id: x_status_video_layout_layout_family_remote
  label: "xStatus Video Layout LayoutFamily Remote"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Remote"

- id: x_status_video_layout_current_layouts_default_layout
  label: "xStatus Video Layout CurrentLayouts DefaultLayout"
  kind: query
  query_command: "xStatus Video Layout CurrentLayouts DefaultLayout"

- id: x_status_video_monitors
  label: "xStatus Video Monitors"
  kind: query
  query_command: "xStatus Video Monitors"

- id: x_status_video_output_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_output_connector_n_connected
  label: "xStatus Video Output Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Output Connector [n] Connected"

- id: x_status_video_output_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_output_connector_n_connected_device_cec_n_name
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] Name"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] Name"

- id: x_status_video_output_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_output_connector_n_connected_device_name
  label: "xStatus Video Output Connector [n] ConnectedDevice Name"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice Name"

- id: x_status_video_output_connector_n_connected_device_preferred_format
  label: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"

- id: x_status_video_output_connector_n_connected_device_screen_size
  label: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"

- id: x_status_video_output_connector_n_connected_device_cec_n_vendor_id
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId"

- id: x_status_video_output_connector_n_monitor_role
  label: "xStatus Video Output Connector [n] MonitorRole"
  kind: query
  query_command: "xStatus Video Output Connector [n] MonitorRole"

- id: x_status_video_output_connector_n_hdcp_state
  label: "xStatus Video Output Connector [n] HDCP State"
  kind: query
  query_command: "xStatus Video Output Connector [n] HDCP State"

- id: x_status_video_output_connector_n_resolution_height
  label: "xStatus Video Output Connector [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Height"

- id: x_status_video_output_connector_n_resolution_refresh_rate
  label: "xStatus Video Output Connector [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution RefreshRate"

- id: x_status_video_output_hdmi_passthrough_status
  label: "xStatus Video Output HDMI Passthrough Status"
  kind: query
  query_command: "xStatus Video Output HDMI Passthrough Status"

- id: x_status_video_output_connector_n_resolution_width
  label: "xStatus Video Output Connector [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Width"

- id: x_status_video_output_connector_n_type
  label: "xStatus Video Output Connector [n] Type"
  kind: query
  query_command: "xStatus Video Output Connector [n] Type"

- id: x_status_video_output_monitor_n_backlight
  label: "xStatus Video Output Monitor [n] Backlight"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Backlight"

- id: x_status_video_output_monitor_n_calibrated
  label: "xStatus Video Output Monitor [n] Calibrated"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Calibrated"

- id: x_status_video_output_monitor_n_color_temperature_selected
  label: "xStatus Video Output Monitor [n] ColorTemperature Selected"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Selected"

- id: x_status_video_output_monitor_n_firmware_version
  label: "xStatus Video Output Monitor [n] FirmwareVersion"
  kind: query
  query_command: "xStatus Video Output Monitor [n] FirmwareVersion"

- id: x_status_video_output_monitor_n_ip_address
  label: "xStatus Video Output Monitor [n] IpAddress"
  kind: query
  query_command: "xStatus Video Output Monitor [n] IpAddress"

- id: x_status_video_output_monitor_n_manufacturer
  label: "xStatus Video Output Monitor [n] Manufacturer"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Manufacturer"

- id: x_status_video_output_monitor_n_configured
  label: "xStatus Video Output Monitor [n] Configured"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Configured"

- id: x_status_video_output_monitor_n_mdc_id
  label: "xStatus Video Output Monitor [n] MDC Id"
  kind: query
  query_command: "xStatus Video Output Monitor [n] MDC Id"

- id: x_status_video_output_monitor_n_mdc_port
  label: "xStatus Video Output Monitor [n] MDC Port"
  kind: query
  query_command: "xStatus Video Output Monitor [n] MDC Port"

- id: x_status_video_output_monitor_n_model_name
  label: "xStatus Video Output Monitor [n] ModelName"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ModelName"

- id: x_status_video_output_monitor_n_position
  label: "xStatus Video Output Monitor [n] Position"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Position"

- id: x_status_video_output_monitor_n_serial_number
  label: "xStatus Video Output Monitor [n] SerialNumber"
  kind: query
  query_command: "xStatus Video Output Monitor [n] SerialNumber"

- id: x_status_video_output_monitor_n_temperature
  label: "xStatus Video Output Monitor [n] Temperature"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Temperature"

- id: x_status_video_output_webcam_mode
  label: "xStatus Video Output Webcam Mode"
  kind: query
  query_command: "xStatus Video Output Webcam Mode"

- id: x_status_video_output_webcam_status
  label: "xStatus Video Output Webcam Status"
  kind: query
  query_command: "xStatus Video Output Webcam Status"

- id: x_status_video_presentation_pipposition
  label: "xStatus Video Presentation PIPPosition"
  kind: query
  query_command: "xStatus Video Presentation PIPPosition"

- id: x_status_video_selfview_fullscreen_mode
  label: "xStatus Video Selfview FullscreenMode"
  kind: query
  query_command: "xStatus Video Selfview FullscreenMode"

- id: x_status_video_selfview_pipposition
  label: "xStatus Video Selfview PIPPosition"
  kind: query
  query_command: "xStatus Video Selfview PIPPosition"

- id: x_status_video_selfview_mode
  label: "xStatus Video Selfview Mode"
  kind: query
  query_command: "xStatus Video Selfview Mode"

- id: x_status_video_selfview_on_monitor_role
  label: "xStatus Video Selfview OnMonitorRole"
  kind: query
  query_command: "xStatus Video Selfview OnMonitorRole"

- id: x_status_web_engine_features_signage
  label: "xStatus WebEngine Features Signage"
  kind: query
  query_command: "xStatus WebEngine Features Signage"

- id: x_status_web_engine_features_web_rtc
  label: "xStatus WebEngine Features WebRTC"
  kind: query
  query_command: "xStatus WebEngine Features WebRTC"

- id: x_status_web_engine_features_web_engine
  label: "xStatus WebEngine Features WebEngine"
  kind: query
  query_command: "xStatus WebEngine Features WebEngine"

- id: x_status_web_engine_log_level
  label: "xStatus WebEngine LogLevel"
  kind: query
  query_command: "xStatus WebEngine LogLevel"

- id: x_status_web_engine_log_level_verbosity
  label: "xStatus WebEngine LogLevelVerbosity"
  kind: query
  query_command: "xStatus WebEngine LogLevelVerbosity"

- id: x_status_webex_meetings_instant_meeting_availability
  label: "xStatus Webex Meetings InstantMeeting Availability"
  kind: query
  query_command: "xStatus Webex Meetings InstantMeeting Availability"

- id: x_status_webex_developer_id
  label: "xStatus Webex DeveloperId"
  kind: query
  query_command: "xStatus Webex DeveloperId"

- id: x_status_webex_device_personalization_hotdesking_session_status
  label: "xStatus Webex DevicePersonalization Hotdesking SessionStatus"
  kind: query
  query_command: "xStatus Webex DevicePersonalization Hotdesking SessionStatus"

- id: x_status_webex_meetings_join_protocol
  label: "xStatus Webex Meetings JoinProtocol"
  kind: query
  query_command: "xStatus Webex Meetings JoinProtocol"

- id: x_status_webex_services_proximity_guest_token
  label: "xStatus Webex Services Proximity GuestToken"
  kind: query
  query_command: "xStatus Webex Services Proximity GuestToken"

- id: x_status_web_rtc_provider_google_meet_availability
  label: "xStatus WebRTC Provider GoogleMeet Availability"
  kind: query
  query_command: "xStatus WebRTC Provider GoogleMeet Availability"

- id: x_status_webex_status
  label: "xStatus Webex Status"
  kind: query
  query_command: "xStatus Webex Status"

- id: x_status_web_rtc_provider_microsoft_teams_availability
  label: "xStatus WebRTC Provider MicrosoftTeams Availability"
  kind: query
  query_command: "xStatus WebRTC Provider MicrosoftTeams Availability"
```

## Variables
```yaml
# UNRESOLVED: The source models settable parameters as xConfiguration entries
# (persistent device settings) and xCommand parameters rather than as a
# separate variables list. These are represented in the merged Actions catalogue.
```

## Events
```yaml
# The source documents an xEvent feedback mechanism and gives examples of
# unsolicited notifications the device emits:
#   - OutgoingCallIndication  (*e OutgoingCallIndication CallId: x)
#   - CallSuccessful          (*e CallSuccessful CallId: x Protocol: ... )
#   - CallDisconnect          (*e CallDisconnect CallId: x CauseValue: ... )
#   - FeccActionInd           (*e FeccActionInd Id: ... Pan: ... Tilt: ...)
#   - TString / SString       (far-end TString/SString messages)
# Full event enumeration is handled by the deterministic pre-pass.
# UNRESOLVED: complete event catalogue not authored in this prose pass.
```

## Macros
```yaml
# UNRESOLVED: the source describes an xCommand Macros subsystem (macro
# save/activate/runtime start) but does not document specific multi-step macro
# sequences to populate here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: the source does not document explicit safety interlocks, power-on
# sequencing, or operator-confirmation procedures. Factory reset / software
# upgrade commands exist (xCommand SystemUnit FactoryReset, SoftwareUpgrade)
# but carry no documented confirmation interlock in this document.
```

## Notes
- **API groups:** The xAPI has four hierarchical groups — `xCommand` (execute actions), `xConfiguration` (persistent settings), `xStatus` (current state), and `xEvent` (available feedback events). All commands are case-insensitive.
- **Output modes:** Sessions support Terminal (line-based, default), XML, and JSON output modes, set per-session via `xPreferences outputmode <terminal|xml|json>`.
- **Multiline commands:** Some commands (UI extensions, branding images, macros, certificates) accept a multiline payload terminated by a line containing only `.`. Maximum payload is 8 MB.
- **Feedback mechanism:** Register XPath expressions via `xFeedback register <path>` (serial/SSH) or `xCommand HttpFeedback Register` (HTTP webhooks, up to 4 slots × 15 expressions). Feedback is per-session; re-register after reconnecting. The source strongly warns against registering `/Status` wholesale (risk of flooding the control application).
- **Synchronous matching:** Commands support a `resultId` tag for matching asynchronous responses to requests across all command types.
- **Quoting:** Values containing spaces must be quoted (e.g. `xCommand dial number: "my number"`).
- **Best practice:** Avoid OSD remote-control emulation (`xCommand UserInterface OSD Key Click/Press`); use direct commands for backwards compatibility. Always use complete command paths, not search shortcuts (`xconf vid`), in integrations.
- **HTTP session hygiene:** Sessions are limited; explicitly close via `POST /xmlapi/session/end` when done (see `xConfiguration Security Session InactivityTimeout`).
- **Internal peripheral network:** Non-main Ethernet ports form a private network; packets do not traverse between LAN and peripheral ports. Cisco peripherals use 169.254.1.41–200 (DHCP); non-Cisco peripherals use 169.254.1.30 (DHCP) or 169.254.1.225–254 (static).
- **Serial caveats:** Serial API access is unavailable for Room 55 Dual and Room 70. A new baud rate takes effect only after a device reboot. A dedicated maintenance (micro USB) port always uses the default baud rate.

<!-- UNRESOLVED: SSH listen port not explicitly stated in source (do not assume 22). -->
<!-- UNRESOLVED: Firmware/software compatibility ranges not stated beyond the source's "RoomOS 11.5.2" banner; Cisco notes command return values may change between releases and are not documented. -->
<!-- UNRESOLVED: Per-model connector counts, PoE port counts, and hardware specs vary and are not enumerated as control-protocol data here. -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-115/api-reference-guide-roomos-115.pdf
retrieved_at: 2026-05-27T04:34:59.643Z
last_checked_at: 2026-06-25T08:52:53.790Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T08:52:53.790Z
matched_actions: 1475
action_count: 1475
confidence: medium
summary: "deterministic presence proof: 1475/1475 payloads verbatim in source; stratified Sonnet sample corroborated (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Specific product-variant hardware capabilities (port counts, connector types) vary across the covered models; this spec documents the common API surface."
- "The source models settable parameters as xConfiguration entries"
- "complete event catalogue not authored in this prose pass."
- "the source describes an xCommand Macros subsystem (macro"
- "the source does not document explicit safety interlocks, power-on"
- "SSH listen port not explicitly stated in source (do not assume 22)."
- "Firmware/software compatibility ranges not stated beyond the source's \"RoomOS 11.5.2\" banner; Cisco notes command return values may change between releases and are not documented."
- "Per-model connector counts, PoE port counts, and hardware specs vary and are not enumerated as control-protocol data here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
