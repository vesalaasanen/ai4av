---
spec_id: admin/cisco-c-series-tc73
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco TelePresence SX80 (TC7.3) Control Spec"
manufacturer: Cisco
model_family: "Cisco TelePresence SX80"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Cisco TelePresence SX80"
  firmware: "\"TC7.3\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - developer.cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/codec-c-series/tc7/user-guide/profile-series-codec-c-series-qs-c20-sx20-qs-mx-series-touch-user-guide-tc73.pdf
  - https://developer.cisco.com/
  - https://developer.webex.com/docs/api/v1/xapi
retrieved_at: 2026-05-12T22:18:22.523Z
last_checked_at: 2026-06-25T08:54:47.648Z
generated_at: 2026-06-25T08:54:47.648Z
firmware_coverage: "\"TC7.3\""
protocol_coverage: []
known_gaps:
  - "source targets SX80 only; C-series / TC73-specific differences not documented. Firmware build range, hardware variants, and exact product SKU mapping not stated."
  - "TCP port numbers for Telnet/SSH are not stated in the source."
  - "transport port numbers not stated in source"
  - "flow control not stated in source"
  - "none beyond the configuration actions already enumerated."
  - "complete xEvent catalogue not transcribed in source examples; run `xEvent ??` on device for full list."
  - "none documented."
  - "source describes no explicit confirmation/interlock procedures for destructive ops"
  - "no formal interlock or power-sequencing procedures stated in source."
  - "firmware/build version compatibility range (only \"TC7.3\" stated); exact TCP ports for Telnet/SSH/HTTP/HTTPS; serial flow control; full xEvent catalogue; C-series vs SX80 model deltas; binary/byte-level encoding (n/a — API is text/XML); authentication token formats per transport."
verification:
  verdict: verified
  checked_at: 2026-06-25T08:54:47.648Z
  matched_actions: 857
  action_count: 857
  confidence: medium
  summary: "deterministic presence proof: 857/857 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Cisco TelePresence SX80 (TC7.3) Control Spec

## Summary
Application Programmer Interface (API) reference for the Cisco TelePresence SX80 codec running TC7.3 software (October 2015). The API is a hierarchical, line-oriented command set (prefixes `xCommand`, `xConfiguration`, `xStatus`, `xEvent`) accessible over RS-232/serial, Telnet/SSH (TCP), and HTTP/HTTPS. The same API surface is exposed in terminal (line) mode and XML mode. This spec is filed under the entity "C Series TC73" but the source document explicitly covers the SX80 product; model coverage is UNRESOLVED for any C-series-specific deltas.

<!-- UNRESOLVED: source targets SX80 only; C-series / TC73-specific differences not documented. Firmware build range, hardware variants, and exact product SKU mapping not stated. -->

## Transport
```yaml
# Source documents four access methods: RS-232/serial, Telnet (TCP), SSH (TCP),
# and HTTP/HTTPS. Same API structure across all methods.
protocols:
  - serial
  - tcp
  - http
addressing:
  # UNRESOLVED: TCP port numbers for Telnet/SSH are not stated in the source.
  # Do not assume 23/22. HTTP/HTTPS ports likewise not stated (do not assume 80/443).
  port: null  # UNRESOLVED: transport port numbers not stated in source
  base_url: "http://<ip-address>/putxml"  # HTTP POST endpoint for commands/configs; <ip-address> = codec host
  # Other documented HTTP URLs: /getxml?location=<path>, /status.xml,
  # /configuration.xml, /command.xml, /valuespace.xml, /formputxml?xmldoc=<xml>
serial:
  baud_rate: 115200  # default per source; configurable: 9600/19200/38400/57600/115200
  data_bits: 8       # source: standard 9-pin serial cable <115200, N, 8, 1>
  parity: none       # source: N (none)
  stop_bits: 1       # source: 1
  flow_control: null # UNRESOLVED: flow control not stated in source
auth:
  type: password  # inferred: source describes admin password (xCommand SystemUnit AdminPassword Set)
                  # and SerialPort LoginRequired <Off/On> (on by default). Exact scheme varies per
                  # transport (serial login prompt, SSH, HTTP) and is operator-configurable.
```

**Connection notes from source:**
- **RS-232/serial:** standard 9-pin cable to the codec COM port; `<115200, N, 8, 1>`. Login prompting is on by default (configurable). Baud-rate and login-required changes need a codec reboot.
- **Telnet:** disabled by default; enable via `xConfiguration NetworkServices Telnet Mode: On` (no reboot, delayed take-effect).
- **SSH:** enabled by default; disable-able.
- **HTTP/HTTPS:** enable/disable via `xConfiguration NetworkServices HTTP Mode` / `HTTPS Mode` (reboot required). `Content-Type: text/xml` required on POSTs.
- **Ethernet port:** a non-Cisco controller can connect directly to network port 2 or 3 (link-local IP `169.254.1.1` for SSH). Only one non-Cisco device at a time.
- **Output modes:** terminal (line-based, default) or XML (`xPreferences outputmode xml`).

## Traits
```yaml
# All inferred from documented command/status examples in source.
- powerable   # inferred: xCommand Boot, xCommand Standby Activate/Deactivate present
- queryable   # inferred: xStatus hierarchy and query examples present
- routable    # inferred: xCommand Video Matrix Assign/Swap, Audio LocalOutput/RemoteOutput connect/disconnect present
- levelable   # inferred: xCommand Audio Volume Set/Increase/Decrease, input/output gain controls present
```

## Actions
```yaml
- id: x_configuration_audio_input_hdmi_1_3_mode
  label: "xConfiguration Audio Input HDMI [1..3] Mode"
  kind: action
  command: "xConfiguration Audio Input HDMI [1..3] Mode"
  params: []

- id: x_configuration_audio_input_hdmi_1_3_level
  label: "xConfiguration Audio Input HDMI [1..3] Level"
  kind: action
  command: "xConfiguration Audio Input HDMI [1..3] Level"
  params: []

- id: x_configuration_audio_input_hdmi_1_3_video_association_video_input_source
  label: "xConfiguration Audio Input HDMI [1..3] VideoAssociation VideoInputSource"
  kind: action
  command: "xConfiguration Audio Input HDMI [1..3] VideoAssociation VideoInputSource"
  params: []

- id: x_configuration_audio_input_hdmi_1_3_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input HDMI [1..3] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input HDMI [1..3] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_line_1_4_equalizer_id
  label: "xConfiguration Audio Input Line [1..4] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] Equalizer ID"
  params: []

- id: x_configuration_audio_input_line_1_4_equalizer_mode
  label: "xConfiguration Audio Input Line [1..4] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_line_1_4_video_association_video_input_source
  label: "xConfiguration Audio Input Line [1..4] VideoAssociation VideoInputSource"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] VideoAssociation VideoInputSource"
  params: []

- id: x_configuration_audio_input_line_1_4_level
  label: "xConfiguration Audio Input Line [1..4] Level"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] Level"
  params: []

- id: x_configuration_audio_input_line_1_4_mode
  label: "xConfiguration Audio Input Line [1..4] Mode"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] Mode"
  params: []

- id: x_configuration_audio_input_line_1_4_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input Line [1..4] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_line_1_4_channel
  label: "xConfiguration Audio Input Line [1..4] Channel"
  kind: action
  command: "xConfiguration Audio Input Line [1..4] Channel"
  params: []

- id: x_configuration_audio_input_microphone_1_8_echo_control_mode
  label: "xConfiguration Audio Input Microphone [1..8] EchoControl Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] EchoControl Mode"
  params: []

- id: x_configuration_audio_input_microphone_1_8_echo_control_noise_reduction
  label: "xConfiguration Audio Input Microphone [1..8] EchoControl NoiseReduction"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] EchoControl NoiseReduction"
  params: []

- id: x_configuration_audio_input_microphone_1_8_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input Microphone [1..8] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_microphone_1_8_video_association_video_input_source
  label: "xConfiguration Audio Input Microphone [1..8] VideoAssociation VideoInputSource"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] VideoAssociation VideoInputSource"
  params: []

- id: x_configuration_audio_input_microphone_1_8_echo_control_dereverberation
  label: "xConfiguration Audio Input Microphone [1..8] EchoControl Dereverberation"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] EchoControl Dereverberation"
  params: []

- id: x_configuration_audio_input_microphone_1_8_level
  label: "xConfiguration Audio Input Microphone [1..8] Level"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] Level"
  params: []

- id: x_configuration_audio_input_microphone_1_8_equalizer_id
  label: "xConfiguration Audio Input Microphone [1..8] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] Equalizer ID"
  params: []

- id: x_configuration_audio_input_microphone_1_8_equalizer_mode
  label: "xConfiguration Audio Input Microphone [1..8] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_microphone_1_8_mode
  label: "xConfiguration Audio Input Microphone [1..8] Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] Mode"
  params: []

- id: x_configuration_audio_input_microphone_1_8_type
  label: "xConfiguration Audio Input Microphone [1..8] Type"
  kind: action
  command: "xConfiguration Audio Input Microphone [1..8] Type"
  params: []

- id: x_configuration_audio_output_line_1_6_equalizer_id
  label: "xConfiguration Audio Output Line [1..6] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Output Line [1..6] Equalizer ID"
  params: []

- id: x_configuration_audio_output_line_1_6_equalizer_mode
  label: "xConfiguration Audio Output Line [1..6] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Output Line [1..6] Equalizer Mode"
  params: []

- id: x_configuration_audio_output_hdmi_1_2_level
  label: "xConfiguration Audio Output HDMI [1..2] Level"
  kind: action
  command: "xConfiguration Audio Output HDMI [1..2] Level"
  params: []

- id: x_configuration_audio_output_line_1_6_level
  label: "xConfiguration Audio Output Line [1..6] Level"
  kind: action
  command: "xConfiguration Audio Output Line [1..6] Level"
  params: []

- id: x_configuration_audio_output_hdmi_1_2_mode
  label: "xConfiguration Audio Output HDMI [1..2] Mode"
  kind: action
  command: "xConfiguration Audio Output HDMI [1..2] Mode"
  params: []

- id: x_configuration_audio_output_line_1_6_channel
  label: "xConfiguration Audio Output Line [1..6] Channel"
  kind: action
  command: "xConfiguration Audio Output Line [1..6] Channel"
  params: []

- id: x_configuration_audio_output_line_1_6_mode
  label: "xConfiguration Audio Output Line [1..6] Mode"
  kind: action
  command: "xConfiguration Audio Output Line [1..6] Mode"
  params: []

- id: x_configuration_audio_microphones_mute_enabled
  label: "xConfiguration Audio Microphones Mute Enabled"
  kind: action
  command: "xConfiguration Audio Microphones Mute Enabled"
  params: []

- id: x_configuration_audio_sounds_and_alerts_key_tones_mode
  label: "xConfiguration Audio SoundsAndAlerts KeyTones Mode"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts KeyTones Mode"
  params: []

- id: x_configuration_audio_sounds_and_alerts_ring_volume
  label: "xConfiguration Audio SoundsAndAlerts RingVolume"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingVolume"
  params: []

- id: x_configuration_audio_default_volume
  label: "xConfiguration Audio DefaultVolume"
  kind: action
  command: "xConfiguration Audio DefaultVolume"
  params: []

- id: x_configuration_audio_sounds_and_alerts_ring_tone
  label: "xConfiguration Audio SoundsAndAlerts RingTone"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingTone"
  params: []

- id: x_configuration_cameras_power_line_frequency
  label: "xConfiguration Cameras PowerLine Frequency"
  kind: action
  command: "xConfiguration Cameras PowerLine Frequency"
  params: []

- id: x_configuration_cameras_speaker_track_mode
  label: "xConfiguration Cameras SpeakerTrack Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Mode"
  params: []

- id: x_configuration_cameras_preset_trigger_autofocus
  label: "xConfiguration Cameras Preset TriggerAutofocus"
  kind: action
  command: "xConfiguration Cameras Preset TriggerAutofocus"
  params: []

- id: x_configuration_cameras_speaker_track_tracking_mode
  label: "xConfiguration Cameras SpeakerTrack TrackingMode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack TrackingMode"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_mode
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
  params: []

- id: x_configuration_cameras_speaker_track_whiteboard_mode
  label: "xConfiguration Cameras SpeakerTrack Whiteboard Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack Whiteboard Mode"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_camera_left
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraLeft"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraLeft"
  params: []

- id: x_configuration_cameras_speaker_track_connector_detection_camera_right
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraRight"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection CameraRight"
  params: []

- id: x_configuration_cameras_camera_1_7_assigned_serial_number
  label: "xConfiguration Cameras Camera [1..7] AssignedSerialNumber"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] AssignedSerialNumber"
  params: []

- id: x_configuration_cameras_camera_1_7_backlight
  label: "xConfiguration Cameras Camera [1..7] Backlight"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Backlight"
  params: []

- id: x_configuration_cameras_camera_1_7_brightness_mode
  label: "xConfiguration Cameras Camera [1..7] Brightness Mode"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Brightness Mode"
  params: []

- id: x_configuration_cameras_camera_1_7_brightness_level
  label: "xConfiguration Cameras Camera [1..7] Brightness Level"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Brightness Level"
  params: []

- id: x_configuration_cameras_camera_1_7_flip
  label: "xConfiguration Cameras Camera [1..7] Flip"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Flip"
  params: []

- id: x_configuration_cameras_camera_1_7_focus_mode
  label: "xConfiguration Cameras Camera [1..7] Focus Mode"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Focus Mode"
  params: []

- id: x_configuration_cameras_camera_1_7_gamma_mode
  label: "xConfiguration Cameras Camera [1..7] Gamma Mode"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Gamma Mode"
  params: []

- id: x_configuration_cameras_camera_1_7_gamma_level
  label: "xConfiguration Cameras Camera [1..7] Gamma Level"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Gamma Level"
  params: []

- id: x_configuration_cameras_camera_1_7_whitebalance_mode
  label: "xConfiguration Cameras Camera [1..7] Whitebalance Mode"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Whitebalance Mode"
  params: []

- id: x_configuration_cameras_camera_1_7_ir_sensor
  label: "xConfiguration Cameras Camera [1..7] IrSensor"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] IrSensor"
  params: []

- id: x_configuration_cameras_camera_1_7_mirror
  label: "xConfiguration Cameras Camera [1..7] Mirror"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Mirror"
  params: []

- id: x_configuration_cameras_camera_1_7_whitebalance_level
  label: "xConfiguration Cameras Camera [1..7] Whitebalance Level"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] Whitebalance Level"
  params: []

- id: x_configuration_cameras_camera_1_7_dhcp
  label: "xConfiguration Cameras Camera [1..7] DHCP"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] DHCP"
  params: []

- id: x_configuration_cameras_camera_1_7_motor_move_detection
  label: "xConfiguration Cameras Camera [1..7] MotorMoveDetection"
  kind: action
  command: "xConfiguration Cameras Camera [1..7] MotorMoveDetection"
  params: []

- id: x_configuration_conference_1_1_active_control_mode
  label: "xConfiguration Conference [1..1] ActiveControl Mode"
  kind: action
  command: "xConfiguration Conference [1..1] ActiveControl Mode"
  params: []

- id: x_configuration_conference_1_1_auto_answer_mute
  label: "xConfiguration Conference [1..1] AutoAnswer Mute"
  kind: action
  command: "xConfiguration Conference [1..1] AutoAnswer Mute"
  params: []

- id: x_configuration_conference_1_1_auto_answer_delay
  label: "xConfiguration Conference [1..1] AutoAnswer Delay"
  kind: action
  command: "xConfiguration Conference [1..1] AutoAnswer Delay"
  params: []

- id: x_configuration_conference_1_1_call_protocol_ipstack
  label: "xConfiguration Conference [1..1] CallProtocolIPStack"
  kind: action
  command: "xConfiguration Conference [1..1] CallProtocolIPStack"
  params: []

- id: x_configuration_conference_1_1_mic_unmute_on_disconnect_mode
  label: "xConfiguration Conference [1..1] MicUnmuteOnDisconnect Mode"
  kind: action
  command: "xConfiguration Conference [1..1] MicUnmuteOnDisconnect Mode"
  params: []

- id: x_configuration_conference_1_1_auto_answer_mode
  label: "xConfiguration Conference [1..1] AutoAnswer Mode"
  kind: action
  command: "xConfiguration Conference [1..1] AutoAnswer Mode"
  params: []

- id: x_configuration_conference_1_1_do_not_disturb_default_timeout
  label: "xConfiguration Conference [1..1] DoNotDisturb DefaultTimeout"
  kind: action
  command: "xConfiguration Conference [1..1] DoNotDisturb DefaultTimeout"
  params: []

- id: x_configuration_conference_1_1_far_end_control_mode
  label: "xConfiguration Conference [1..1] FarEndControl Mode"
  kind: action
  command: "xConfiguration Conference [1..1] FarEndControl Mode"
  params: []

- id: x_configuration_conference_1_1_far_end_control_signal_capability
  label: "xConfiguration Conference [1..1] FarEndControl SignalCapability"
  kind: action
  command: "xConfiguration Conference [1..1] FarEndControl SignalCapability"
  params: []

- id: x_configuration_conference_1_1_default_call_protocol
  label: "xConfiguration Conference [1..1] DefaultCall Protocol"
  kind: action
  command: "xConfiguration Conference [1..1] DefaultCall Protocol"
  params: []

- id: x_configuration_conference_1_1_default_call_rate
  label: "xConfiguration Conference [1..1] DefaultCall Rate"
  kind: action
  command: "xConfiguration Conference [1..1] DefaultCall Rate"
  params: []

- id: x_configuration_conference_1_1_encryption_mode
  label: "xConfiguration Conference [1..1] Encryption Mode"
  kind: action
  command: "xConfiguration Conference [1..1] Encryption Mode"
  params: []

- id: x_configuration_conference_1_1_max_transmit_call_rate
  label: "xConfiguration Conference [1..1] MaxTransmitCallRate"
  kind: action
  command: "xConfiguration Conference [1..1] MaxTransmitCallRate"
  params: []

- id: x_configuration_conference_1_1_max_receive_call_rate
  label: "xConfiguration Conference [1..1] MaxReceiveCallRate"
  kind: action
  command: "xConfiguration Conference [1..1] MaxReceiveCallRate"
  params: []

- id: x_configuration_conference_1_1_video_bandwidth_mode
  label: "xConfiguration Conference [1..1] VideoBandwidth Mode"
  kind: action
  command: "xConfiguration Conference [1..1] VideoBandwidth Mode"
  params: []

- id: x_configuration_conference_1_1_max_total_transmit_call_rate
  label: "xConfiguration Conference [1..1] MaxTotalTransmitCallRate"
  kind: action
  command: "xConfiguration Conference [1..1] MaxTotalTransmitCallRate"
  params: []

- id: x_configuration_conference_1_1_video_bandwidth_main_channel_weight
  label: "xConfiguration Conference [1..1] VideoBandwidth MainChannel Weight"
  kind: action
  command: "xConfiguration Conference [1..1] VideoBandwidth MainChannel Weight"
  params: []

- id: x_configuration_conference_1_1_max_total_receive_call_rate
  label: "xConfiguration Conference [1..1] MaxTotalReceiveCallRate"
  kind: action
  command: "xConfiguration Conference [1..1] MaxTotalReceiveCallRate"
  params: []

- id: x_configuration_conference_1_1_video_bandwidth_presentation_channel_weight
  label: "xConfiguration Conference [1..1] VideoBandwidth PresentationChannel Weight"
  kind: action
  command: "xConfiguration Conference [1..1] VideoBandwidth PresentationChannel Weight"
  params: []

- id: x_configuration_conference_1_1_presentation_relay_quality
  label: "xConfiguration Conference [1..1] Presentation RelayQuality"
  kind: action
  command: "xConfiguration Conference [1..1] Presentation RelayQuality"
  params: []

- id: x_configuration_conference_1_1_multipoint_mode
  label: "xConfiguration Conference [1..1] Multipoint Mode"
  kind: action
  command: "xConfiguration Conference [1..1] Multipoint Mode"
  params: []

- id: x_configuration_conference_1_1_presentation_on_placed_on_hold
  label: "xConfiguration Conference [1..1] Presentation OnPlacedOnHold"
  kind: action
  command: "xConfiguration Conference [1..1] Presentation OnPlacedOnHold"
  params: []

- id: x_configuration_conference_1_1_incoming_multisite_call_mode
  label: "xConfiguration Conference [1..1] IncomingMultisiteCall Mode"
  kind: action
  command: "xConfiguration Conference [1..1] IncomingMultisiteCall Mode"
  params: []

- id: x_configuration_facility_service_service_1_5_type
  label: "xConfiguration FacilityService Service [1..5] Type"
  kind: action
  command: "xConfiguration FacilityService Service [1..5] Type"
  params: []

- id: x_configuration_facility_service_service_1_5_number
  label: "xConfiguration FacilityService Service [1..5] Number"
  kind: action
  command: "xConfiguration FacilityService Service [1..5] Number"
  params: []

- id: x_configuration_facility_service_service_1_5_call_type
  label: "xConfiguration FacilityService Service [1..5] CallType"
  kind: action
  command: "xConfiguration FacilityService Service [1..5] CallType"
  params: []

- id: x_configuration_facility_service_service_1_5_name
  label: "xConfiguration FacilityService Service [1..5] Name"
  kind: action
  command: "xConfiguration FacilityService Service [1..5] Name"
  params: []

- id: x_configuration_gpio_pin_1_4_mode
  label: "xConfiguration GPIO Pin [1..4] Mode"
  kind: action
  command: "xConfiguration GPIO Pin [1..4] Mode"
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

- id: x_configuration_h323_profile_1_1_authentication_mode
  label: "xConfiguration H323 Profile [1..1] Authentication Mode"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Authentication Mode"
  params: []

- id: x_configuration_h323_profile_1_1_call_setup_mode
  label: "xConfiguration H323 Profile [1..1] CallSetup Mode"
  kind: action
  command: "xConfiguration H323 Profile [1..1] CallSetup Mode"
  params: []

- id: x_configuration_h323_profile_1_1_authentication_login_name
  label: "xConfiguration H323 Profile [1..1] Authentication LoginName"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Authentication LoginName"
  params: []

- id: x_configuration_h323_profile_1_1_encryption_key_size
  label: "xConfiguration H323 Profile [1..1] Encryption KeySize"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Encryption KeySize"
  params: []

- id: x_configuration_h323_profile_1_1_authentication_password
  label: "xConfiguration H323 Profile [1..1] Authentication Password"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Authentication Password"
  params: []

- id: x_configuration_h323_profile_1_1_gatekeeper_discovery
  label: "xConfiguration H323 Profile [1..1] Gatekeeper Discovery"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Gatekeeper Discovery"
  params: []

- id: x_configuration_h323_profile_1_1_gatekeeper_address
  label: "xConfiguration H323 Profile [1..1] Gatekeeper Address"
  kind: action
  command: "xConfiguration H323 Profile [1..1] Gatekeeper Address"
  params: []

- id: x_configuration_h323_profile_1_1_h323_alias_e164
  label: "xConfiguration H323 Profile [1..1] H323Alias E164"
  kind: action
  command: "xConfiguration H323 Profile [1..1] H323Alias E164"
  params: []

- id: x_configuration_h323_profile_1_1_port_allocation
  label: "xConfiguration H323 Profile [1..1] PortAllocation"
  kind: action
  command: "xConfiguration H323 Profile [1..1] PortAllocation"
  params: []

- id: x_configuration_h323_profile_1_1_h323_alias_id
  label: "xConfiguration H323 Profile [1..1] H323Alias ID"
  kind: action
  command: "xConfiguration H323 Profile [1..1] H323Alias ID"
  params: []

- id: x_configuration_logging_mode
  label: "xConfiguration Logging Mode"
  kind: action
  command: "xConfiguration Logging Mode"
  params: []

- id: x_configuration_network_1_1_ipstack
  label: "xConfiguration Network [1..1] IPStack"
  kind: action
  command: "xConfiguration Network [1..1] IPStack"
  params: []

- id: x_configuration_network_1_1_ipv4_assignment
  label: "xConfiguration Network [1..1] IPv4 Assignment"
  kind: action
  command: "xConfiguration Network [1..1] IPv4 Assignment"
  params: []

- id: x_configuration_network_1_1_ipv4_address
  label: "xConfiguration Network [1..1] IPv4 Address"
  kind: action
  command: "xConfiguration Network [1..1] IPv4 Address"
  params: []

- id: x_configuration_network_1_1_ipv4_gateway
  label: "xConfiguration Network [1..1] IPv4 Gateway"
  kind: action
  command: "xConfiguration Network [1..1] IPv4 Gateway"
  params: []

- id: x_configuration_network_1_1_ipv6_address
  label: "xConfiguration Network [1..1] IPv6 Address"
  kind: action
  command: "xConfiguration Network [1..1] IPv6 Address"
  params: []

- id: x_configuration_network_1_1_ipv4_subnet_mask
  label: "xConfiguration Network [1..1] IPv4 SubnetMask"
  kind: action
  command: "xConfiguration Network [1..1] IPv4 SubnetMask"
  params: []

- id: x_configuration_network_1_1_ipv6_gateway
  label: "xConfiguration Network [1..1] IPv6 Gateway"
  kind: action
  command: "xConfiguration Network [1..1] IPv6 Gateway"
  params: []

- id: x_configuration_network_1_1_ipv6_assignment
  label: "xConfiguration Network [1..1] IPv6 Assignment"
  kind: action
  command: "xConfiguration Network [1..1] IPv6 Assignment"
  params: []

- id: x_configuration_network_1_1_ipv6_dhcpoptions
  label: "xConfiguration Network [1..1] IPv6 DHCPOptions"
  kind: action
  command: "xConfiguration Network [1..1] IPv6 DHCPOptions"
  params: []

- id: x_configuration_network_1_1_dhcp_request_tftpserver_address
  label: "xConfiguration Network [1..1] DHCP RequestTFTPServerAddress"
  kind: action
  command: "xConfiguration Network [1..1] DHCP RequestTFTPServerAddress"
  params: []

- id: x_configuration_network_1_1_dns_domain_name
  label: "xConfiguration Network [1..1] DNS Domain Name"
  kind: action
  command: "xConfiguration Network [1..1] DNS Domain Name"
  params: []

- id: x_configuration_network_1_1_qo_s_mode
  label: "xConfiguration Network [1..1] QoS Mode"
  kind: action
  command: "xConfiguration Network [1..1] QoS Mode"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_audio
  label: "xConfiguration Network [1..1] QoS Diffserv Audio"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv Audio"
  params: []

- id: x_configuration_network_1_1_dns_server_1_3_address
  label: "xConfiguration Network [1..1] DNS Server [1..3] Address"
  kind: action
  command: "xConfiguration Network [1..1] DNS Server [1..3] Address"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_video
  label: "xConfiguration Network [1..1] QoS Diffserv Video"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv Video"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_signalling
  label: "xConfiguration Network [1..1] QoS Diffserv Signalling"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv Signalling"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_data
  label: "xConfiguration Network [1..1] QoS Diffserv Data"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv Data"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_icmpv6
  label: "xConfiguration Network [1..1] QoS Diffserv ICMPv6"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv ICMPv6"
  params: []

- id: x_configuration_network_1_1_qo_s_diffserv_ntp
  label: "xConfiguration Network [1..1] QoS Diffserv NTP"
  kind: action
  command: "xConfiguration Network [1..1] QoS Diffserv NTP"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_mode
  label: "xConfiguration Network [1..1] IEEE8021X Mode"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Mode"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_use_client_certificate
  label: "xConfiguration Network [1..1] IEEE8021X UseClientCertificate"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X UseClientCertificate"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_identity
  label: "xConfiguration Network [1..1] IEEE8021X Identity"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Identity"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_password
  label: "xConfiguration Network [1..1] IEEE8021X Password"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Password"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_tls_verify
  label: "xConfiguration Network [1..1] IEEE8021X TlsVerify"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X TlsVerify"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_anonymous_identity
  label: "xConfiguration Network [1..1] IEEE8021X AnonymousIdentity"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X AnonymousIdentity"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_eap_md5
  label: "xConfiguration Network [1..1] IEEE8021X Eap Md5"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Eap Md5"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_eap_peap
  label: "xConfiguration Network [1..1] IEEE8021X Eap Peap"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Eap Peap"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_eap_ttls
  label: "xConfiguration Network [1..1] IEEE8021X Eap Ttls"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Eap Ttls"
  params: []

- id: x_configuration_network_1_1_mtu
  label: "xConfiguration Network [1..1] MTU"
  kind: action
  command: "xConfiguration Network [1..1] MTU"
  params: []

- id: x_configuration_network_1_1_ieee8021_x_eap_tls
  label: "xConfiguration Network [1..1] IEEE8021X Eap Tls"
  kind: action
  command: "xConfiguration Network [1..1] IEEE8021X Eap Tls"
  params: []

- id: x_configuration_network_1_1_speed
  label: "xConfiguration Network [1..1] Speed"
  kind: action
  command: "xConfiguration Network [1..1] Speed"
  params: []

- id: x_configuration_network_1_1_traffic_control_mode
  label: "xConfiguration Network [1..1] TrafficControl Mode"
  kind: action
  command: "xConfiguration Network [1..1] TrafficControl Mode"
  params: []

- id: x_configuration_network_1_1_vlan_voice_vlan_id
  label: "xConfiguration Network [1..1] VLAN Voice VlanId"
  kind: action
  command: "xConfiguration Network [1..1] VLAN Voice VlanId"
  params: []

- id: x_configuration_network_1_1_remote_access_allow
  label: "xConfiguration Network [1..1] RemoteAccess Allow"
  kind: action
  command: "xConfiguration Network [1..1] RemoteAccess Allow"
  params: []

- id: x_configuration_network_1_1_vlan_voice_mode
  label: "xConfiguration Network [1..1] VLAN Voice Mode"
  kind: action
  command: "xConfiguration Network [1..1] VLAN Voice Mode"
  params: []

- id: x_configuration_network_services_cdp_mode
  label: "xConfiguration NetworkServices CDP Mode"
  kind: action
  command: "xConfiguration NetworkServices CDP Mode"
  params: []

- id: x_configuration_network_services_sip_mode
  label: "xConfiguration NetworkServices SIP Mode"
  kind: action
  command: "xConfiguration NetworkServices SIP Mode"
  params: []

- id: x_configuration_network_services_telnet_mode
  label: "xConfiguration NetworkServices Telnet Mode"
  kind: action
  command: "xConfiguration NetworkServices Telnet Mode"
  params: []

- id: x_configuration_network_services_h323_mode
  label: "xConfiguration NetworkServices H323 Mode"
  kind: action
  command: "xConfiguration NetworkServices H323 Mode"
  params: []

- id: x_configuration_network_services_welcome_text
  label: "xConfiguration NetworkServices WelcomeText"
  kind: action
  command: "xConfiguration NetworkServices WelcomeText"
  params: []

- id: x_configuration_network_services_http_mode
  label: "xConfiguration NetworkServices HTTP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Mode"
  params: []

- id: x_configuration_network_services_xmlapi_mode
  label: "xConfiguration NetworkServices XMLAPI Mode"
  kind: action
  command: "xConfiguration NetworkServices XMLAPI Mode"
  params: []

- id: x_configuration_network_services_multi_way_address
  label: "xConfiguration NetworkServices MultiWay Address"
  kind: action
  command: "xConfiguration NetworkServices MultiWay Address"
  params: []

- id: x_configuration_network_services_https_verify_server_certificate
  label: "xConfiguration NetworkServices HTTPS VerifyServerCertificate"
  kind: action
  command: "xConfiguration NetworkServices HTTPS VerifyServerCertificate"
  params: []

- id: x_configuration_network_services_https_verify_client_certificate
  label: "xConfiguration NetworkServices HTTPS VerifyClientCertificate"
  kind: action
  command: "xConfiguration NetworkServices HTTPS VerifyClientCertificate"
  params: []

- id: x_configuration_network_services_multi_way_protocol
  label: "xConfiguration NetworkServices MultiWay Protocol"
  kind: action
  command: "xConfiguration NetworkServices MultiWay Protocol"
  params: []

- id: x_configuration_network_services_https_mode
  label: "xConfiguration NetworkServices HTTPS Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTPS Mode"
  params: []

- id: x_configuration_network_services_https_ocsp_mode
  label: "xConfiguration NetworkServices HTTPS OCSP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTPS OCSP Mode"
  params: []

- id: x_configuration_network_services_https_ocsp_url
  label: "xConfiguration NetworkServices HTTPS OCSP URL"
  kind: action
  command: "xConfiguration NetworkServices HTTPS OCSP URL"
  params: []

- id: x_configuration_network_services_ntp_address
  label: "xConfiguration NetworkServices NTP Address"
  kind: action
  command: "xConfiguration NetworkServices NTP Address"
  params: []

- id: x_configuration_network_services_medianet_metadata
  label: "xConfiguration NetworkServices Medianet Metadata"
  kind: action
  command: "xConfiguration NetworkServices Medianet Metadata"
  params: []

- id: x_configuration_network_services_snmp_mode
  label: "xConfiguration NetworkServices SNMP Mode"
  kind: action
  command: "xConfiguration NetworkServices SNMP Mode"
  params: []

- id: x_configuration_network_services_ntp_mode
  label: "xConfiguration NetworkServices NTP Mode"
  kind: action
  command: "xConfiguration NetworkServices NTP Mode"
  params: []

- id: x_configuration_network_services_snmp_host_1_3_address
  label: "xConfiguration NetworkServices SNMP Host [1..3] Address"
  kind: action
  command: "xConfiguration NetworkServices SNMP Host [1..3] Address"
  params: []

- id: x_configuration_network_services_snmp_community_name
  label: "xConfiguration NetworkServices SNMP CommunityName"
  kind: action
  command: "xConfiguration NetworkServices SNMP CommunityName"
  params: []

- id: x_configuration_network_services_ssh_allow_public_key
  label: "xConfiguration NetworkServices SSH AllowPublicKey"
  kind: action
  command: "xConfiguration NetworkServices SSH AllowPublicKey"
  params: []

- id: x_configuration_network_services_snmp_system_contact
  label: "xConfiguration NetworkServices SNMP SystemContact"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemContact"
  params: []

- id: x_configuration_network_services_ctms_mode
  label: "xConfiguration NetworkServices CTMS Mode"
  kind: action
  command: "xConfiguration NetworkServices CTMS Mode"
  params: []

- id: x_configuration_network_services_snmp_system_location
  label: "xConfiguration NetworkServices SNMP SystemLocation"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemLocation"
  params: []

- id: x_configuration_network_services_ssh_mode
  label: "xConfiguration NetworkServices SSH Mode"
  kind: action
  command: "xConfiguration NetworkServices SSH Mode"
  params: []

- id: x_configuration_network_services_ctms_encryption
  label: "xConfiguration NetworkServices CTMS Encryption"
  kind: action
  command: "xConfiguration NetworkServices CTMS Encryption"
  params: []

- id: x_configuration_network_services_upn_p_mode
  label: "xConfiguration NetworkServices UPnP Mode"
  kind: action
  command: "xConfiguration NetworkServices UPnP Mode"
  params: []

- id: x_configuration_peripherals_pairing_cisco_touch_panels_remote_pairing
  label: "xConfiguration Peripherals Pairing CiscoTouchPanels RemotePairing"
  kind: action
  command: "xConfiguration Peripherals Pairing CiscoTouchPanels RemotePairing"
  params: []

- id: x_configuration_network_services_upn_p_timeout
  label: "xConfiguration NetworkServices UPnP Timeout"
  kind: action
  command: "xConfiguration NetworkServices UPnP Timeout"
  params: []

- id: x_configuration_peripherals_profile_touch_panels
  label: "xConfiguration Peripherals Profile TouchPanels"
  kind: action
  command: "xConfiguration Peripherals Profile TouchPanels"
  params: []

- id: x_configuration_phonebook_server_1_1_id
  label: "xConfiguration Phonebook Server [1..1] ID"
  kind: action
  command: "xConfiguration Phonebook Server [1..1] ID"
  params: []

- id: x_configuration_phonebook_server_1_1_type
  label: "xConfiguration Phonebook Server [1..1] Type"
  kind: action
  command: "xConfiguration Phonebook Server [1..1] Type"
  params: []

- id: x_configuration_provisioning_connectivity
  label: "xConfiguration Provisioning Connectivity"
  kind: action
  command: "xConfiguration Provisioning Connectivity"
  params: []

- id: x_configuration_provisioning_mode
  label: "xConfiguration Provisioning Mode"
  kind: action
  command: "xConfiguration Provisioning Mode"
  params: []

- id: x_configuration_phonebook_server_1_1_url
  label: "xConfiguration Phonebook Server [1..1] URL"
  kind: action
  command: "xConfiguration Phonebook Server [1..1] URL"
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

- id: x_configuration_provisioning_external_manager_address
  label: "xConfiguration Provisioning ExternalManager Address"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Address"
  params: []

- id: x_configuration_provisioning_http_method
  label: "xConfiguration Provisioning HttpMethod"
  kind: action
  command: "xConfiguration Provisioning HttpMethod"
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

- id: x_configuration_provisioning_external_manager_path
  label: "xConfiguration Provisioning ExternalManager Path"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Path"
  params: []

- id: x_configuration_rtp_ports_range_start
  label: "xConfiguration RTP Ports Range Start"
  kind: action
  command: "xConfiguration RTP Ports Range Start"
  params: []

- id: x_configuration_provisioning_external_manager_domain
  label: "xConfiguration Provisioning ExternalManager Domain"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Domain"
  params: []

- id: x_configuration_rtp_ports_range_stop
  label: "xConfiguration RTP Ports Range Stop"
  kind: action
  command: "xConfiguration RTP Ports Range Stop"
  params: []

- id: x_configuration_security_audit_logging_mode
  label: "xConfiguration Security Audit Logging Mode"
  kind: action
  command: "xConfiguration Security Audit Logging Mode"
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

- id: x_configuration_security_audit_on_error_action
  label: "xConfiguration Security Audit OnError Action"
  kind: action
  command: "xConfiguration Security Audit OnError Action"
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

- id: x_configuration_security_session_inactivity_timeout
  label: "xConfiguration Security Session InactivityTimeout"
  kind: action
  command: "xConfiguration Security Session InactivityTimeout"
  params: []

- id: x_configuration_serial_port_baud_rate
  label: "xConfiguration SerialPort BaudRate"
  kind: action
  command: "xConfiguration SerialPort BaudRate"
  params: []

- id: x_configuration_serial_port_login_required
  label: "xConfiguration SerialPort LoginRequired"
  kind: action
  command: "xConfiguration SerialPort LoginRequired"
  params: []

- id: x_configuration_sip_anat
  label: "xConfiguration SIP ANAT"
  kind: action
  command: "xConfiguration SIP ANAT"
  params: []

- id: x_configuration_sip_preferred_ipsignaling
  label: "xConfiguration SIP PreferredIPSignaling"
  kind: action
  command: "xConfiguration SIP PreferredIPSignaling"
  params: []

- id: x_configuration_sip_ocsp_mode
  label: "xConfiguration SIP OCSP Mode"
  kind: action
  command: "xConfiguration SIP OCSP Mode"
  params: []

- id: x_configuration_sip_authenticate_transferror
  label: "xConfiguration SIP AuthenticateTransferror"
  kind: action
  command: "xConfiguration SIP AuthenticateTransferror"
  params: []

- id: x_configuration_sip_ocsp_default_responder
  label: "xConfiguration SIP OCSP DefaultResponder"
  kind: action
  command: "xConfiguration SIP OCSP DefaultResponder"
  params: []

- id: x_configuration_sip_listen_port
  label: "xConfiguration SIP ListenPort"
  kind: action
  command: "xConfiguration SIP ListenPort"
  params: []

- id: x_configuration_sip_preferred_ipmedia
  label: "xConfiguration SIP PreferredIPMedia"
  kind: action
  command: "xConfiguration SIP PreferredIPMedia"
  params: []

- id: x_configuration_sip_profile_1_1_ice_mode
  label: "xConfiguration SIP Profile [1..1] Ice Mode"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Ice Mode"
  params: []

- id: x_configuration_sip_profile_1_1_ice_default_candidate
  label: "xConfiguration SIP Profile [1..1] Ice DefaultCandidate"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Ice DefaultCandidate"
  params: []

- id: x_configuration_sip_profile_1_1_turn_server
  label: "xConfiguration SIP Profile [1..1] Turn Server"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn Server"
  params: []

- id: x_configuration_sip_profile_1_1_turn_user_name
  label: "xConfiguration SIP Profile [1..1] Turn UserName"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn UserName"
  params: []

- id: x_configuration_sip_profile_1_1_turn_discover_mode
  label: "xConfiguration SIP Profile [1..1] Turn DiscoverMode"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn DiscoverMode"
  params: []

- id: x_configuration_sip_profile_1_1_turn_password
  label: "xConfiguration SIP Profile [1..1] Turn Password"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn Password"
  params: []

- id: x_configuration_sip_profile_1_1_turn_bandwidth_probe
  label: "xConfiguration SIP Profile [1..1] Turn BandwidthProbe"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn BandwidthProbe"
  params: []

- id: x_configuration_sip_profile_1_1_turn_drop_rflx
  label: "xConfiguration SIP Profile [1..1] Turn DropRflx"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Turn DropRflx"
  params: []

- id: x_configuration_sip_profile_1_1_uri
  label: "xConfiguration SIP Profile [1..1] URI"
  kind: action
  command: "xConfiguration SIP Profile [1..1] URI"
  params: []

- id: x_configuration_sip_profile_1_1_display_name
  label: "xConfiguration SIP Profile [1..1] DisplayName"
  kind: action
  command: "xConfiguration SIP Profile [1..1] DisplayName"
  params: []

- id: x_configuration_sip_profile_1_1_tls_verify
  label: "xConfiguration SIP Profile [1..1] TlsVerify"
  kind: action
  command: "xConfiguration SIP Profile [1..1] TlsVerify"
  params: []

- id: x_configuration_sip_profile_1_1_authentication_1_1_login_name
  label: "xConfiguration SIP Profile [1..1] Authentication [1..1] LoginName"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Authentication [1..1] LoginName"
  params: []

- id: x_configuration_sip_profile_1_1_outbound
  label: "xConfiguration SIP Profile [1..1] Outbound"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Outbound"
  params: []

- id: x_configuration_sip_profile_1_1_authentication_1_1_password
  label: "xConfiguration SIP Profile [1..1] Authentication [1..1] Password"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Authentication [1..1] Password"
  params: []

- id: x_configuration_sip_profile_1_1_proxy_1_4_address
  label: "xConfiguration SIP Profile [1..1] Proxy [1..4] Address"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Proxy [1..4] Address"
  params: []

- id: x_configuration_sip_profile_1_1_default_transport
  label: "xConfiguration SIP Profile [1..1] DefaultTransport"
  kind: action
  command: "xConfiguration SIP Profile [1..1] DefaultTransport"
  params: []

- id: x_configuration_sip_profile_1_1_proxy_1_4_discovery
  label: "xConfiguration SIP Profile [1..1] Proxy [1..4] Discovery"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Proxy [1..4] Discovery"
  params: []

- id: x_configuration_sip_profile_1_1_type
  label: "xConfiguration SIP Profile [1..1] Type"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Type"
  params: []

- id: x_configuration_sip_profile_1_1_line
  label: "xConfiguration SIP Profile [1..1] Line"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Line"
  params: []

- id: x_configuration_sip_profile_1_1_mailbox
  label: "xConfiguration SIP Profile [1..1] Mailbox"
  kind: action
  command: "xConfiguration SIP Profile [1..1] Mailbox"
  params: []

- id: x_configuration_standby_control
  label: "xConfiguration Standby Control"
  kind: action
  command: "xConfiguration Standby Control"
  params: []

- id: x_configuration_standby_standby_action
  label: "xConfiguration Standby StandbyAction"
  kind: action
  command: "xConfiguration Standby StandbyAction"
  params: []

- id: x_configuration_standby_wakeup_action
  label: "xConfiguration Standby WakeupAction"
  kind: action
  command: "xConfiguration Standby WakeupAction"
  params: []

- id: x_configuration_standby_delay
  label: "xConfiguration Standby Delay"
  kind: action
  command: "xConfiguration Standby Delay"
  params: []

- id: x_configuration_standby_boot_action
  label: "xConfiguration Standby BootAction"
  kind: action
  command: "xConfiguration Standby BootAction"
  params: []

- id: x_configuration_system_unit_name
  label: "xConfiguration SystemUnit Name"
  kind: action
  command: "xConfiguration SystemUnit Name"
  params: []

- id: x_configuration_system_unit_contact_info_type
  label: "xConfiguration SystemUnit ContactInfo Type"
  kind: action
  command: "xConfiguration SystemUnit ContactInfo Type"
  params: []

- id: x_configuration_system_unit_menu_language
  label: "xConfiguration SystemUnit MenuLanguage"
  kind: action
  command: "xConfiguration SystemUnit MenuLanguage"
  params: []

- id: x_configuration_system_unit_call_logging_mode
  label: "xConfiguration SystemUnit CallLogging Mode"
  kind: action
  command: "xConfiguration SystemUnit CallLogging Mode"
  params: []

- id: x_configuration_system_unit_ir_sensor
  label: "xConfiguration SystemUnit IrSensor"
  kind: action
  command: "xConfiguration SystemUnit IrSensor"
  params: []

- id: x_configuration_time_time_format
  label: "xConfiguration Time TimeFormat"
  kind: action
  command: "xConfiguration Time TimeFormat"
  params: []

- id: x_configuration_time_olson_zone
  label: "xConfiguration Time OlsonZone"
  kind: action
  command: "xConfiguration Time OlsonZone"
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

- id: x_configuration_user_interface_language
  label: "xConfiguration UserInterface Language"
  kind: action
  command: "xConfiguration UserInterface Language"
  params: []

- id: x_configuration_user_interface_osd_language_selection
  label: "xConfiguration UserInterface OSD LanguageSelection"
  kind: action
  command: "xConfiguration UserInterface OSD LanguageSelection"
  params: []

- id: x_configuration_user_interface_osd_login_required
  label: "xConfiguration UserInterface OSD LoginRequired"
  kind: action
  command: "xConfiguration UserInterface OSD LoginRequired"
  params: []

- id: x_configuration_user_interface_osd_encryption_indicator
  label: "xConfiguration UserInterface OSD EncryptionIndicator"
  kind: action
  command: "xConfiguration UserInterface OSD EncryptionIndicator"
  params: []

- id: x_configuration_user_interface_osd_output
  label: "xConfiguration UserInterface OSD Output"
  kind: action
  command: "xConfiguration UserInterface OSD Output"
  params: []

- id: x_configuration_user_interface_wallpaper
  label: "xConfiguration UserInterface Wallpaper"
  kind: action
  command: "xConfiguration UserInterface Wallpaper"
  params: []

- id: x_configuration_user_interface_touch_panel_default_panel
  label: "xConfiguration UserInterface TouchPanel DefaultPanel"
  kind: action
  command: "xConfiguration UserInterface TouchPanel DefaultPanel"
  params: []

- id: x_configuration_video_allow_web_snapshots
  label: "xConfiguration Video AllowWebSnapshots"
  kind: action
  command: "xConfiguration Video AllowWebSnapshots"
  params: []

- id: x_configuration_user_interface_user_preferences
  label: "xConfiguration UserInterface UserPreferences"
  kind: action
  command: "xConfiguration UserInterface UserPreferences"
  params: []

- id: x_configuration_video_cam_ctrl_pip_call_setup_mode
  label: "xConfiguration Video CamCtrlPip CallSetup Mode"
  kind: action
  command: "xConfiguration Video CamCtrlPip CallSetup Mode"
  params: []

- id: x_configuration_video_cam_ctrl_pip_call_setup_duration
  label: "xConfiguration Video CamCtrlPip CallSetup Duration"
  kind: action
  command: "xConfiguration Video CamCtrlPip CallSetup Duration"
  params: []

- id: x_configuration_video_default_presentation_source
  label: "xConfiguration Video DefaultPresentationSource"
  kind: action
  command: "xConfiguration Video DefaultPresentationSource"
  params: []

- id: x_configuration_video_input_connector_1_5_name
  label: "xConfiguration Video Input Connector [1..5] Name"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] Name"
  params: []

- id: x_configuration_video_input_connector_1_5_camera_control_mode
  label: "xConfiguration Video Input Connector [1..5] CameraControl Mode"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] CameraControl Mode"
  params: []

- id: x_configuration_video_input_connector_1_5_input_source_type
  label: "xConfiguration Video Input Connector [1..5] InputSourceType"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] InputSourceType"
  params: []

- id: x_configuration_video_input_connector_1_5_camera_control_camera_id
  label: "xConfiguration Video Input Connector [1..5] CameraControl CameraId"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] CameraControl CameraId"
  params: []

- id: x_configuration_video_input_connector_1_5_quality
  label: "xConfiguration Video Input Connector [1..5] Quality"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] Quality"
  params: []

- id: x_configuration_video_input_connector_1_5_visibility
  label: "xConfiguration Video Input Connector [1..5] Visibility"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] Visibility"
  params: []

- id: x_configuration_video_input_connector_1_5_optimal_definition_profile
  label: "xConfiguration Video Input Connector [1..5] OptimalDefinition Profile"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] OptimalDefinition Profile"
  params: []

- id: x_configuration_video_input_connector_1_5_optimal_definition_threshold60fps
  label: "xConfiguration Video Input Connector [1..5] OptimalDefinition Threshold60fps"
  kind: action
  command: "xConfiguration Video Input Connector [1..5] OptimalDefinition Threshold60fps"
  params: []

- id: x_configuration_video_input_connector_1_4_presentation_selection
  label: "xConfiguration Video Input Connector [1..4] PresentationSelection"
  kind: action
  command: "xConfiguration Video Input Connector [1..4] PresentationSelection"
  params: []

- id: x_configuration_video_input_connector_1_4_rgbquantization_range
  label: "xConfiguration Video Input Connector [1..4] RGBQuantizationRange"
  kind: action
  command: "xConfiguration Video Input Connector [1..4] RGBQuantizationRange"
  params: []

- id: x_configuration_video_input_connector_5_signal_type
  label: "xConfiguration Video Input Connector [5] SignalType"
  kind: action
  command: "xConfiguration Video Input Connector [5] SignalType"
  params: []

- id: x_configuration_video_layout_disable_disconnected_local_outputs
  label: "xConfiguration Video Layout DisableDisconnectedLocalOutputs"
  kind: action
  command: "xConfiguration Video Layout DisableDisconnectedLocalOutputs"
  params: []

- id: x_configuration_video_input_connector_4_dvi_type
  label: "xConfiguration Video Input Connector [4] DviType"
  kind: action
  command: "xConfiguration Video Input Connector [4] DviType"
  params: []

- id: x_configuration_video_layout_local_layout_family
  label: "xConfiguration Video Layout LocalLayoutFamily"
  kind: action
  command: "xConfiguration Video Layout LocalLayoutFamily"
  params: []

- id: x_configuration_video_layout_presentation_default_view
  label: "xConfiguration Video Layout PresentationDefault View"
  kind: action
  command: "xConfiguration Video Layout PresentationDefault View"
  params: []

- id: x_configuration_video_layout_scaling
  label: "xConfiguration Video Layout Scaling"
  kind: action
  command: "xConfiguration Video Layout Scaling"
  params: []

- id: x_configuration_video_layout_remote_layout_family
  label: "xConfiguration Video Layout RemoteLayoutFamily"
  kind: action
  command: "xConfiguration Video Layout RemoteLayoutFamily"
  params: []

- id: x_configuration_video_layout_scale_to_frame
  label: "xConfiguration Video Layout ScaleToFrame"
  kind: action
  command: "xConfiguration Video Layout ScaleToFrame"
  params: []

- id: x_configuration_video_layout_scale_to_frame_threshold
  label: "xConfiguration Video Layout ScaleToFrameThreshold"
  kind: action
  command: "xConfiguration Video Layout ScaleToFrameThreshold"
  params: []

- id: x_configuration_video_pip_active_speaker_default_value_position
  label: "xConfiguration Video PIP ActiveSpeaker DefaultValue Position"
  kind: action
  command: "xConfiguration Video PIP ActiveSpeaker DefaultValue Position"
  params: []

- id: x_configuration_video_selfview_default_mode
  label: "xConfiguration Video SelfviewDefault Mode"
  kind: action
  command: "xConfiguration Video SelfviewDefault Mode"
  params: []

- id: x_configuration_video_selfview_default_fullscreen_mode
  label: "xConfiguration Video SelfviewDefault FullscreenMode"
  kind: action
  command: "xConfiguration Video SelfviewDefault FullscreenMode"
  params: []

- id: x_configuration_video_pip_presentation_default_value_position
  label: "xConfiguration Video PIP Presentation DefaultValue Position"
  kind: action
  command: "xConfiguration Video PIP Presentation DefaultValue Position"
  params: []

- id: x_configuration_video_selfview_default_pipposition
  label: "xConfiguration Video SelfviewDefault PIPPosition"
  kind: action
  command: "xConfiguration Video SelfviewDefault PIPPosition"
  params: []

- id: x_configuration_video_selfview_default_on_monitor_role
  label: "xConfiguration Video SelfviewDefault OnMonitorRole"
  kind: action
  command: "xConfiguration Video SelfviewDefault OnMonitorRole"
  params: []

- id: x_configuration_video_monitors
  label: "xConfiguration Video Monitors"
  kind: action
  command: "xConfiguration Video Monitors"
  params: []

- id: x_configuration_video_osd_language_selection
  label: "xConfiguration Video OSD LanguageSelection"
  kind: action
  command: "xConfiguration Video OSD LanguageSelection"
  params: []

- id: x_configuration_video_osd_encryption_indicator
  label: "xConfiguration Video OSD EncryptionIndicator"
  kind: action
  command: "xConfiguration Video OSD EncryptionIndicator"
  params: []

- id: x_configuration_video_osd_output
  label: "xConfiguration Video OSD Output"
  kind: action
  command: "xConfiguration Video OSD Output"
  params: []

- id: x_configuration_video_osd_login_required
  label: "xConfiguration Video OSD LoginRequired"
  kind: action
  command: "xConfiguration Video OSD LoginRequired"
  params: []

- id: x_configuration_video_output_connector_1_2_cec_mode
  label: "xConfiguration Video Output Connector [1..2] CEC Mode"
  kind: action
  command: "xConfiguration Video Output Connector [1..2] CEC Mode"
  params: []

- id: x_configuration_video_output_connector_1_3_location_horizontal_offset
  label: "xConfiguration Video Output Connector [1..3] Location HorizontalOffset"
  kind: action
  command: "xConfiguration Video Output Connector [1..3] Location HorizontalOffset"
  params: []

- id: x_configuration_video_output_connector_1_3_location_vertical_offset
  label: "xConfiguration Video Output Connector [1..3] Location VerticalOffset"
  kind: action
  command: "xConfiguration Video Output Connector [1..3] Location VerticalOffset"
  params: []

- id: x_configuration_video_output_connector_1_3_rgbquantizaton_range
  label: "xConfiguration Video Output Connector [1..3] RGBQuantizatonRange"
  kind: action
  command: "xConfiguration Video Output Connector [1..3] RGBQuantizatonRange"
  params: []

- id: x_configuration_video_output_connector_1_3_resolution
  label: "xConfiguration Video Output Connector [1..3] Resolution"
  kind: action
  command: "xConfiguration Video Output Connector [1..3] Resolution"
  params: []

- id: x_configuration_video_output_connector_1_3_monitor_role
  label: "xConfiguration Video Output Connector [1..3] MonitorRole"
  kind: action
  command: "xConfiguration Video Output Connector [1..3] MonitorRole"
  params: []

- id: x_configuration_video_wall_paper
  label: "xConfiguration Video WallPaper"
  kind: action
  command: "xConfiguration Video WallPaper"
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

- id: x_command_audio_local_input_remove_connector
  label: "xCommand Audio LocalInput RemoveConnector"
  kind: action
  command: "xCommand Audio LocalInput RemoveConnector"
  params: []

- id: x_command_audio_local_input_remove
  label: "xCommand Audio LocalInput Remove"
  kind: action
  command: "xCommand Audio LocalInput Remove"
  params: []

- id: x_command_audio_local_input_update
  label: "xCommand Audio LocalInput Update"
  kind: action
  command: "xCommand Audio LocalInput Update"
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

- id: x_command_audio_local_output_disconnect_input
  label: "xCommand Audio LocalOutput DisconnectInput"
  kind: action
  command: "xCommand Audio LocalOutput DisconnectInput"
  params: []

- id: x_command_audio_local_output_connect_input
  label: "xCommand Audio LocalOutput ConnectInput"
  kind: action
  command: "xCommand Audio LocalOutput ConnectInput"
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

- id: x_command_audio_remote_output_connect_input
  label: "xCommand Audio RemoteOutput ConnectInput"
  kind: action
  command: "xCommand Audio RemoteOutput ConnectInput"
  params: []

- id: x_command_audio_microphones_mute
  label: "xCommand Audio Microphones Mute"
  kind: action
  command: "xCommand Audio Microphones Mute"
  params: []

- id: x_command_audio_microphones_unmute
  label: "xCommand Audio Microphones Unmute"
  kind: action
  command: "xCommand Audio Microphones Unmute"
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

- id: x_command_audio_sound_stop
  label: "xCommand Audio Sound Stop"
  kind: action
  command: "xCommand Audio Sound Stop"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_list
  label: "xCommand Audio SoundsAndAlerts Ringtone List"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
  params: []

- id: x_command_audio_setup_clear
  label: "xCommand Audio Setup Clear"
  kind: action
  command: "xCommand Audio Setup Clear"
  params: []

- id: x_command_audio_sound_play
  label: "xCommand Audio Sound Play"
  kind: action
  command: "xCommand Audio Sound Play"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_play
  label: "xCommand Audio SoundsAndAlerts Ringtone Play"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Play"
  params: []

- id: x_command_audio_volume_decrease
  label: "xCommand Audio Volume Decrease"
  kind: action
  command: "xCommand Audio Volume Decrease"
  params: []

- id: x_command_audio_volume_set_to_default
  label: "xCommand Audio Volume SetToDefault"
  kind: action
  command: "xCommand Audio Volume SetToDefault"
  params: []

- id: x_command_audio_volume_un_mute
  label: "xCommand Audio Volume UnMute"
  kind: action
  command: "xCommand Audio Volume UnMute"
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

- id: x_command_audio_vumeter_start
  label: "xCommand Audio VUMeter Start"
  kind: action
  command: "xCommand Audio VUMeter Start"
  params: []

- id: x_command_audio_volume_set
  label: "xCommand Audio Volume Set"
  kind: action
  command: "xCommand Audio Volume Set"
  params: []

- id: x_command_audio_vumeter_stop
  label: "xCommand Audio VUMeter Stop"
  kind: action
  command: "xCommand Audio VUMeter Stop"
  params: []

- id: x_command_bookings_clear
  label: "xCommand Bookings Clear"
  kind: action
  command: "xCommand Bookings Clear"
  params: []

- id: x_command_audio_vumeter_stop_all
  label: "xCommand Audio VUMeter StopAll"
  kind: action
  command: "xCommand Audio VUMeter StopAll"
  params: []

- id: x_command_bookings_list
  label: "xCommand Bookings List"
  kind: action
  command: "xCommand Bookings List"
  params: []

- id: x_command_boot
  label: "xCommand Boot"
  kind: action
  command: "xCommand Boot"
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

- id: x_command_call_disconnect_all
  label: "xCommand Call DisconnectAll"
  kind: action
  command: "xCommand Call DisconnectAll"
  params: []

- id: x_command_call_hold
  label: "xCommand Call Hold"
  kind: action
  command: "xCommand Call Hold"
  params: []

- id: x_command_call_reject
  label: "xCommand Call Reject"
  kind: action
  command: "xCommand Call Reject"
  params: []

- id: x_command_call_hold_all
  label: "xCommand Call HoldAll"
  kind: action
  command: "xCommand Call HoldAll"
  params: []

- id: x_command_call_resume
  label: "xCommand Call Resume"
  kind: action
  command: "xCommand Call Resume"
  params: []

- id: x_command_call_ignore
  label: "xCommand Call Ignore"
  kind: action
  command: "xCommand Call Ignore"
  params: []

- id: x_command_call_join
  label: "xCommand Call Join"
  kind: action
  command: "xCommand Call Join"
  params: []

- id: x_command_call_unattended_transfer
  label: "xCommand Call UnattendedTransfer"
  kind: action
  command: "xCommand Call UnattendedTransfer"
  params: []

- id: x_command_call_history_acknowledge_all_missed_calls
  label: "xCommand CallHistory AcknowledgeAllMissedCalls"
  kind: action
  command: "xCommand CallHistory AcknowledgeAllMissedCalls"
  params: []

- id: x_command_call_history_delete_entry
  label: "xCommand CallHistory DeleteEntry"
  kind: action
  command: "xCommand CallHistory DeleteEntry"
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

- id: x_command_call_history_recents
  label: "xCommand CallHistory Recents"
  kind: action
  command: "xCommand CallHistory Recents"
  params: []

- id: x_command_cam_ctrl_pip
  label: "xCommand CamCtrlPip"
  kind: action
  command: "xCommand CamCtrlPip"
  params: []

- id: x_command_camera_pan_tilt_reset
  label: "xCommand Camera PanTiltReset"
  kind: action
  command: "xCommand Camera PanTiltReset"
  params: []

- id: x_command_camera_position_activate_from_preset
  label: "xCommand Camera PositionActivateFromPreset"
  kind: action
  command: "xCommand Camera PositionActivateFromPreset"
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

- id: x_command_camera_preset_snapshot_store
  label: "xCommand Camera Preset Snapshot Store"
  kind: action
  command: "xCommand Camera Preset Snapshot Store"
  params: []

- id: x_command_camera_preset_snapshot_get
  label: "xCommand Camera Preset Snapshot Get"
  kind: action
  command: "xCommand Camera Preset Snapshot Get"
  params: []

- id: x_command_camera_preset_snapshot_remove
  label: "xCommand Camera Preset Snapshot Remove"
  kind: action
  command: "xCommand Camera Preset Snapshot Remove"
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

- id: x_command_camera_reconfigure_camera_chain
  label: "xCommand Camera ReconfigureCameraChain"
  kind: action
  command: "xCommand Camera ReconfigureCameraChain"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_activate_position
  label: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard ActivatePosition"
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

- id: x_command_conference_active_speaker_reset
  label: "xCommand Conference ActiveSpeaker Reset"
  kind: action
  command: "xCommand Conference ActiveSpeaker Reset"
  params: []

- id: x_command_conference_active_speaker_set
  label: "xCommand Conference ActiveSpeaker Set"
  kind: action
  command: "xCommand Conference ActiveSpeaker Set"
  params: []

- id: x_command_cameras_speaker_track_whiteboard_store_position
  label: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
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

- id: x_command_dial
  label: "xCommand Dial"
  kind: action
  command: "xCommand Dial"
  params: []

- id: x_command_dtmfsend
  label: "xCommand DTMFSend"
  kind: action
  command: "xCommand DTMFSend"
  params: []

- id: x_command_facility_service_dial
  label: "xCommand FacilityService Dial"
  kind: action
  command: "xCommand FacilityService Dial"
  params: []

- id: x_command_far_end_control_preset_activate
  label: "xCommand FarEndControl Preset Activate"
  kind: action
  command: "xCommand FarEndControl Preset Activate"
  params: []

- id: x_command_far_end_control_camera_move
  label: "xCommand FarEndControl Camera Move"
  kind: action
  command: "xCommand FarEndControl Camera Move"
  params: []

- id: x_command_far_end_control_camera_stop
  label: "xCommand FarEndControl Camera Stop"
  kind: action
  command: "xCommand FarEndControl Camera Stop"
  params: []

- id: x_command_far_end_control_preset_store
  label: "xCommand FarEndControl Preset Store"
  kind: action
  command: "xCommand FarEndControl Preset Store"
  params: []

- id: x_command_far_end_control_source_select
  label: "xCommand FarEndControl Source Select"
  kind: action
  command: "xCommand FarEndControl Source Select"
  params: []

- id: x_command_gpio_manual_state_set
  label: "xCommand GPIO ManualState Set"
  kind: action
  command: "xCommand GPIO ManualState Set"
  params: []

- id: x_command_http_feedback_deregister
  label: "xCommand HttpFeedback Deregister"
  kind: action
  command: "xCommand HttpFeedback Deregister"
  params: []

- id: x_command_key_click
  label: "xCommand Key Click"
  kind: action
  command: "xCommand Key Click"
  params: []

- id: x_command_key_release
  label: "xCommand Key Release"
  kind: action
  command: "xCommand Key Release"
  params: []

- id: x_command_http_feedback_register
  label: "xCommand HttpFeedback Register"
  kind: action
  command: "xCommand HttpFeedback Register"
  params: []

- id: x_command_logging_extended_logging_start
  label: "xCommand Logging ExtendedLogging Start"
  kind: action
  command: "xCommand Logging ExtendedLogging Start"
  params: []

- id: x_command_message_alert_clear
  label: "xCommand Message Alert Clear"
  kind: action
  command: "xCommand Message Alert Clear"
  params: []

- id: x_command_logging_extended_logging_stop
  label: "xCommand Logging ExtendedLogging Stop"
  kind: action
  command: "xCommand Logging ExtendedLogging Stop"
  params: []

- id: x_command_message_alert_display
  label: "xCommand Message Alert Display"
  kind: action
  command: "xCommand Message Alert Display"
  params: []

- id: x_command_message_echo
  label: "xCommand Message Echo"
  kind: action
  command: "xCommand Message Echo"
  params: []

- id: x_command_message_prompt_clear
  label: "xCommand Message Prompt Clear"
  kind: action
  command: "xCommand Message Prompt Clear"
  params: []

- id: x_command_message_farend_message
  label: "xCommand Message FarendMessage"
  kind: action
  command: "xCommand Message FarendMessage"
  params: []

- id: x_command_message_prompt_display
  label: "xCommand Message Prompt Display"
  kind: action
  command: "xCommand Message Prompt Display"
  params: []

- id: x_command_message_prompt_response
  label: "xCommand Message Prompt Response"
  kind: action
  command: "xCommand Message Prompt Response"
  params: []

- id: x_command_message_text_line_display
  label: "xCommand Message TextLine Display"
  kind: action
  command: "xCommand Message TextLine Display"
  params: []

- id: x_command_message_text_line_clear
  label: "xCommand Message TextLine Clear"
  kind: action
  command: "xCommand Message TextLine Clear"
  params: []

- id: x_command_peripherals_connect
  label: "xCommand Peripherals Connect"
  kind: action
  command: "xCommand Peripherals Connect"
  params: []

- id: x_command_peripherals_list
  label: "xCommand Peripherals List"
  kind: action
  command: "xCommand Peripherals List"
  params: []

- id: x_command_peripherals_manual_upgrade
  label: "xCommand Peripherals ManualUpgrade"
  kind: action
  command: "xCommand Peripherals ManualUpgrade"
  params: []

- id: x_command_peripherals_heart_beat
  label: "xCommand Peripherals HeartBeat"
  kind: action
  command: "xCommand Peripherals HeartBeat"
  params: []

- id: x_command_peripherals_pairing_device_discovery_start
  label: "xCommand Peripherals Pairing DeviceDiscovery Start"
  kind: action
  command: "xCommand Peripherals Pairing DeviceDiscovery Start"
  params: []

- id: x_command_peripherals_pairing_purge
  label: "xCommand Peripherals Pairing Purge"
  kind: action
  command: "xCommand Peripherals Pairing Purge"
  params: []

- id: x_command_peripherals_pairing_pair
  label: "xCommand Peripherals Pairing Pair"
  kind: action
  command: "xCommand Peripherals Pairing Pair"
  params: []

- id: x_command_peripherals_pairing_unpair
  label: "xCommand Peripherals Pairing Unpair"
  kind: action
  command: "xCommand Peripherals Pairing Unpair"
  params: []

- id: x_command_phonebook_contact_delete
  label: "xCommand Phonebook Contact Delete"
  kind: action
  command: "xCommand Phonebook Contact Delete"
  params: []

- id: x_command_phonebook_contact_add
  label: "xCommand Phonebook Contact Add"
  kind: action
  command: "xCommand Phonebook Contact Add"
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

- id: x_command_preset_store
  label: "xCommand Preset Store"
  kind: action
  command: "xCommand Preset Store"
  params: []

- id: x_command_preset_activate
  label: "xCommand Preset Activate"
  kind: action
  command: "xCommand Preset Activate"
  params: []

- id: x_command_preset_clear
  label: "xCommand Preset Clear"
  kind: action
  command: "xCommand Preset Clear"
  params: []

- id: x_command_provisioning_cucm_capf_operation_start
  label: "xCommand Provisioning CUCM CAPF OperationStart"
  kind: action
  command: "xCommand Provisioning CUCM CAPF OperationStart"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_login
  label: "xCommand Provisioning CUCM ExtensionMobility Login"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Login"
  params: []

- id: x_command_provisioning_cucm_extension_mobility_logout
  label: "xCommand Provisioning CUCM ExtensionMobility Logout"
  kind: action
  command: "xCommand Provisioning CUCM ExtensionMobility Logout"
  params: []

- id: x_command_provisioning_cucm_ctl_delete
  label: "xCommand Provisioning CUCM CTL Delete"
  kind: action
  command: "xCommand Provisioning CUCM CTL Delete"
  params: []

- id: x_command_provisioning_cucm_ctl_show
  label: "xCommand Provisioning CUCM CTL Show"
  kind: action
  command: "xCommand Provisioning CUCM CTL Show"
  params: []

- id: x_command_provisioning_cucm_itl_show
  label: "xCommand Provisioning CUCM ITL Show"
  kind: action
  command: "xCommand Provisioning CUCM ITL Show"
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

- id: x_command_security_fipsmode_activate
  label: "xCommand Security FIPSMode Activate"
  kind: action
  command: "xCommand Security FIPSMode Activate"
  params: []

- id: x_command_provisioning_start_upgrade
  label: "xCommand Provisioning StartUpgrade"
  kind: action
  command: "xCommand Provisioning StartUpgrade"
  params: []

- id: x_command_security_persistency
  label: "xCommand Security Persistency"
  kind: action
  command: "xCommand Security Persistency"
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

- id: x_command_standby_reset_timer
  label: "xCommand Standby ResetTimer"
  kind: action
  command: "xCommand Standby ResetTimer"
  params: []

- id: x_command_system_unit_admin_password_set
  label: "xCommand SystemUnit AdminPassword Set"
  kind: action
  command: "xCommand SystemUnit AdminPassword Set"
  params: []

- id: x_command_system_unit_configuration_profile_remove
  label: "xCommand SystemUnit ConfigurationProfile Remove"
  kind: action
  command: "xCommand SystemUnit ConfigurationProfile Remove"
  params: []

- id: x_command_system_unit_configuration_profile_cancel_change
  label: "xCommand SystemUnit ConfigurationProfile CancelChange"
  kind: action
  command: "xCommand SystemUnit ConfigurationProfile CancelChange"
  params: []

- id: x_command_system_unit_configuration_profile_save_current_configuration_as
  label: "xCommand SystemUnit ConfigurationProfile SaveCurrentConfigurationAs"
  kind: action
  command: "xCommand SystemUnit ConfigurationProfile SaveCurrentConfigurationAs"
  params: []

- id: x_command_system_unit_configuration_profile_change
  label: "xCommand SystemUnit ConfigurationProfile Change"
  kind: action
  command: "xCommand SystemUnit ConfigurationProfile Change"
  params: []

- id: x_command_system_unit_date_time_get
  label: "xCommand SystemUnit DateTime Get"
  kind: action
  command: "xCommand SystemUnit DateTime Get"
  params: []

- id: x_command_system_unit_configuration_profile_list
  label: "xCommand SystemUnit ConfigurationProfile List"
  kind: action
  command: "xCommand SystemUnit ConfigurationProfile List"
  params: []

- id: x_command_system_unit_date_time_set
  label: "xCommand SystemUnit DateTime Set"
  kind: action
  command: "xCommand SystemUnit DateTime Set"
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

- id: x_command_system_unit_diagnostics_run
  label: "xCommand SystemUnit Diagnostics Run"
  kind: action
  command: "xCommand SystemUnit Diagnostics Run"
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

- id: x_command_system_unit_factory_reset
  label: "xCommand SystemUnit FactoryReset"
  kind: action
  command: "xCommand SystemUnit FactoryReset"
  params: []

- id: x_command_system_unit_option_key_remove_all
  label: "xCommand SystemUnit OptionKey RemoveAll"
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll"
  params: []

- id: x_command_system_unit_software_upgrade
  label: "xCommand SystemUnit SoftwareUpgrade"
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade"
  params: []

- id: x_command_user_interface_osd_close
  label: "xCommand UserInterface OSD Close"
  kind: action
  command: "xCommand UserInterface OSD Close"
  params: []

- id: x_command_user_interface_screen_shot_get
  label: "xCommand UserInterface ScreenShot Get"
  kind: action
  command: "xCommand UserInterface ScreenShot Get"
  params: []

- id: x_command_user_interface_screen_shot_list
  label: "xCommand UserInterface ScreenShot List"
  kind: action
  command: "xCommand UserInterface ScreenShot List"
  params: []

- id: x_command_user_interface_screen_shot_remove
  label: "xCommand UserInterface ScreenShot Remove"
  kind: action
  command: "xCommand UserInterface ScreenShot Remove"
  params: []

- id: x_command_user_interface_screen_shot_request
  label: "xCommand UserInterface ScreenShot Request"
  kind: action
  command: "xCommand UserInterface ScreenShot Request"
  params: []

- id: x_command_user_management_remote_support_user_create
  label: "xCommand UserManagement RemoteSupportUser Create"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Create"
  params: []

- id: x_command_user_interface_screen_shot_store
  label: "xCommand UserInterface ScreenShot Store"
  kind: action
  command: "xCommand UserInterface ScreenShot Store"
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

- id: x_command_user_management_remote_support_user_get_state
  label: "xCommand UserManagement RemoteSupportUser GetState"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser GetState"
  params: []

- id: x_command_video_auto_presentation_start_disable
  label: "xCommand Video AutoPresentationStart Disable"
  kind: action
  command: "xCommand Video AutoPresentationStart Disable"
  params: []

- id: x_command_video_auto_presentation_start_enable
  label: "xCommand Video AutoPresentationStart Enable"
  kind: action
  command: "xCommand Video AutoPresentationStart Enable"
  params: []

- id: x_command_video_input_set_main_video_source
  label: "xCommand Video Input SetMainVideoSource"
  kind: action
  command: "xCommand Video Input SetMainVideoSource"
  params: []

- id: x_command_video_input_source_set_active_connector
  label: "xCommand Video Input Source SetActiveConnector"
  kind: action
  command: "xCommand Video Input Source SetActiveConnector"
  params: []

- id: x_command_video_layout_assign
  label: "xCommand Video Layout Assign"
  kind: action
  command: "xCommand Video Layout Assign"
  params: []

- id: x_command_video_layout_add
  label: "xCommand Video Layout Add"
  kind: action
  command: "xCommand Video Layout Add"
  params: []

- id: x_command_video_layout_assign_call
  label: "xCommand Video Layout AssignCall"
  kind: action
  command: "xCommand Video Layout AssignCall"
  params: []

- id: x_command_video_layout_assign_local_output
  label: "xCommand Video Layout AssignLocalOutput"
  kind: action
  command: "xCommand Video Layout AssignLocalOutput"
  params: []

- id: x_command_video_layout_assign_presentation
  label: "xCommand Video Layout AssignPresentation"
  kind: action
  command: "xCommand Video Layout AssignPresentation"
  params: []

- id: x_command_video_layout_frame_add
  label: "xCommand Video Layout Frame Add"
  kind: action
  command: "xCommand Video Layout Frame Add"
  params: []

- id: x_command_video_layout_frame_remove
  label: "xCommand Video Layout Frame Remove"
  kind: action
  command: "xCommand Video Layout Frame Remove"
  params: []

- id: x_command_video_layout_frame_list
  label: "xCommand Video Layout Frame List"
  kind: action
  command: "xCommand Video Layout Frame List"
  params: []

- id: x_command_video_layout_frame_update
  label: "xCommand Video Layout Frame Update"
  kind: action
  command: "xCommand Video Layout Frame Update"
  params: []

- id: x_command_video_layout_list
  label: "xCommand Video Layout List"
  kind: action
  command: "xCommand Video Layout List"
  params: []

- id: x_command_video_layout_load_db
  label: "xCommand Video Layout LoadDb"
  kind: action
  command: "xCommand Video Layout LoadDb"
  params: []

- id: x_command_video_layout_reset
  label: "xCommand Video Layout Reset"
  kind: action
  command: "xCommand Video Layout Reset"
  params: []

- id: x_command_video_layout_set_presentation_view
  label: "xCommand Video Layout SetPresentationView"
  kind: action
  command: "xCommand Video Layout SetPresentationView"
  params: []

- id: x_command_video_layout_remove
  label: "xCommand Video Layout Remove"
  kind: action
  command: "xCommand Video Layout Remove"
  params: []

- id: x_command_video_layout_un_assign
  label: "xCommand Video Layout UnAssign"
  kind: action
  command: "xCommand Video Layout UnAssign"
  params: []

- id: x_command_video_layout_remove_all
  label: "xCommand Video Layout RemoveAll"
  kind: action
  command: "xCommand Video Layout RemoveAll"
  params: []

- id: x_command_video_layout_un_assign_call
  label: "xCommand Video Layout UnAssignCall"
  kind: action
  command: "xCommand Video Layout UnAssignCall"
  params: []

- id: x_command_video_matrix_assign
  label: "xCommand Video Matrix Assign"
  kind: action
  command: "xCommand Video Matrix Assign"
  params: []

- id: x_command_video_layout_un_assign_local_output
  label: "xCommand Video Layout UnAssignLocalOutput"
  kind: action
  command: "xCommand Video Layout UnAssignLocalOutput"
  params: []

- id: x_command_video_layout_un_assign_presentation
  label: "xCommand Video Layout UnAssignPresentation"
  kind: action
  command: "xCommand Video Layout UnAssignPresentation"
  params: []

- id: x_command_video_matrix_reset
  label: "xCommand Video Matrix Reset"
  kind: action
  command: "xCommand Video Matrix Reset"
  params: []

- id: x_command_video_matrix_swap
  label: "xCommand Video Matrix Swap"
  kind: action
  command: "xCommand Video Matrix Swap"
  params: []

- id: x_command_video_pip_active_speaker_set
  label: "xCommand Video PIP ActiveSpeaker Set"
  kind: action
  command: "xCommand Video PIP ActiveSpeaker Set"
  params: []

- id: x_command_video_matrix_unassign
  label: "xCommand Video Matrix Unassign"
  kind: action
  command: "xCommand Video Matrix Unassign"
  params: []

- id: x_command_video_osd_close
  label: "xCommand Video OSD Close"
  kind: action
  command: "xCommand Video OSD Close"
  params: []

- id: x_command_video_pip_presentation_set
  label: "xCommand Video PIP Presentation Set"
  kind: action
  command: "xCommand Video PIP Presentation Set"
  params: []

- id: x_command_video_picture_layout_set
  label: "xCommand Video PictureLayoutSet"
  kind: action
  command: "xCommand Video PictureLayoutSet"
  params: []

- id: x_command_video_selfview_set
  label: "xCommand Video Selfview Set"
  kind: action
  command: "xCommand Video Selfview Set"
  params: []

- id: x_command_video_preview_filmstrip_set
  label: "xCommand Video PreviewFilmstrip Set"
  kind: action
  command: "xCommand Video PreviewFilmstrip Set"
  params: []
```

## Feedbacks
```yaml
- id: x_status_audio_input_local_input_n_name
  label: "xStatus Audio Input LocalInput [n] Name"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Name"

- id: x_status_audio
  label: "xStatus Audio"
  kind: query
  query_command: "xStatus Audio"

- id: x_status_audio_microphones_mute
  label: "xStatus Audio Microphones Mute"
  kind: query
  query_command: "xStatus Audio Microphones Mute"

- id: x_status_audio_volume
  label: "xStatus Audio Volume"
  kind: query
  query_command: "xStatus Audio Volume"

- id: x_status_audio_input_local_input_n_mixer_mode
  label: "xStatus Audio Input LocalInput [n] MixerMode"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] MixerMode"

- id: x_status_audio_input_local_input_n_mute
  label: "xStatus Audio Input LocalInput [n] Mute"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Mute"

- id: x_status_audio_volume_mute
  label: "xStatus Audio VolumeMute"
  kind: query
  query_command: "xStatus Audio VolumeMute"

- id: x_status_audio_input_local_input_n_channels
  label: "xStatus Audio Input LocalInput [n] Channels"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Channels"

- id: x_status_audio_input_local_input_n_agc
  label: "xStatus Audio Input LocalInput [n] AGC"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] AGC"

- id: x_status_audio_input_remote_input_n_call_id
  label: "xStatus Audio Input RemoteInput [n] CallId"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] CallId"

- id: x_status_audio_input_connectors_microphone_n_ec_reference_delay
  label: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"

- id: x_status_audio_output_local_output_n_name
  label: "xStatus Audio Output LocalOutput [n] Name"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Name"

- id: x_status_audio_input_local_input_n_connector
  label: "xStatus Audio Input LocalInput [n] Connector"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Connector"

- id: x_status_audio_output_local_output_n_loudspeaker
  label: "xStatus Audio Output LocalOutput [n] Loudspeaker"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Loudspeaker"

- id: x_status_audio_output_local_output_n_input_n_gain
  label: "xStatus Audio Output LocalOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Input [n] Gain"

- id: x_status_audio_output_local_output_n_channels
  label: "xStatus Audio Output LocalOutput [n] Channels"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Channels"

- id: x_status_audio_output_local_output_n_volume_controlled
  label: "xStatus Audio Output LocalOutput [n] VolumeControlled"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] VolumeControlled"

- id: x_status_audio_output_local_output_n_connector
  label: "xStatus Audio Output LocalOutput [n] Connector"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Connector"

- id: x_status_audio_output_remote_output_n_call_id
  label: "xStatus Audio Output RemoteOutput [n] CallId"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] CallId"

- id: x_status_audio_output_remote_output_n_input_n_gain
  label: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"
  kind: query
  query_command: "xStatus Audio Output RemoteOutput [n] Input [n] Gain"

- id: x_status_call
  label: "xStatus Call"
  kind: query
  query_command: "xStatus Call"

- id: x_status_call_n_status
  label: "xStatus Call [n] Status"
  kind: query
  query_command: "xStatus Call [n] Status"

- id: x_status_call_n_direction
  label: "xStatus Call [n] Direction"
  kind: query
  query_command: "xStatus Call [n] Direction"

- id: x_status_call_n_protocol
  label: "xStatus Call [n] Protocol"
  kind: query
  query_command: "xStatus Call [n] Protocol"

- id: x_status_call_n_call_type
  label: "xStatus Call [n] CallType"
  kind: query
  query_command: "xStatus Call [n] CallType"

- id: x_status_call_n_display_name
  label: "xStatus Call [n] DisplayName"
  kind: query
  query_command: "xStatus Call [n] DisplayName"

- id: x_status_call_n_remote_number
  label: "xStatus Call [n] RemoteNumber"
  kind: query
  query_command: "xStatus Call [n] RemoteNumber"

- id: x_status_call_n_transmit_call_rate
  label: "xStatus Call [n] TransmitCallRate"
  kind: query
  query_command: "xStatus Call [n] TransmitCallRate"

- id: x_status_call_n_callback_number
  label: "xStatus Call [n] CallbackNumber"
  kind: query
  query_command: "xStatus Call [n] CallbackNumber"

- id: x_status_call_n_receive_call_rate
  label: "xStatus Call [n] ReceiveCallRate"
  kind: query
  query_command: "xStatus Call [n] ReceiveCallRate"

- id: x_status_call_n_facility_service_id
  label: "xStatus Call [n] FacilityServiceId"
  kind: query
  query_command: "xStatus Call [n] FacilityServiceId"

- id: x_status_call_n_duration
  label: "xStatus Call [n] Duration"
  kind: query
  query_command: "xStatus Call [n] Duration"

- id: x_status_call_n_encryption_type
  label: "xStatus Call [n] Encryption Type"
  kind: query
  query_command: "xStatus Call [n] Encryption Type"

- id: x_status_call_n_security_status
  label: "xStatus Call [n] SecurityStatus"
  kind: query
  query_command: "xStatus Call [n] SecurityStatus"

- id: x_status_call_n_answer_state
  label: "xStatus Call [n] AnswerState"
  kind: query
  query_command: "xStatus Call [n] AnswerState"

- id: x_status_call_n_placed_on_hold
  label: "xStatus Call [n] PlacedOnHold"
  kind: query
  query_command: "xStatus Call [n] PlacedOnHold"

- id: x_status_call_n_modify_state
  label: "xStatus Call [n] ModifyState"
  kind: query
  query_command: "xStatus Call [n] ModifyState"

- id: x_status_call_n_device_type
  label: "xStatus Call [n] DeviceType"
  kind: query
  query_command: "xStatus Call [n] DeviceType"

- id: x_status_camera
  label: "xStatus Camera"
  kind: query
  query_command: "xStatus Camera"

- id: x_status_camera_n_connected
  label: "xStatus Camera [n] Connected"
  kind: query
  query_command: "xStatus Camera [n] Connected"

- id: x_status_call_n_attended_transfer_from
  label: "xStatus Call [n] AttendedTransferFrom"
  kind: query
  query_command: "xStatus Call [n] AttendedTransferFrom"

- id: x_status_camera_n_hardware_id
  label: "xStatus Camera [n] HardwareID"
  kind: query
  query_command: "xStatus Camera [n] HardwareID"

- id: x_status_camera_n_manufacturer
  label: "xStatus Camera [n] Manufacturer"
  kind: query
  query_command: "xStatus Camera [n] Manufacturer"

- id: x_status_camera_n_model
  label: "xStatus Camera [n] Model"
  kind: query
  query_command: "xStatus Camera [n] Model"

- id: x_status_camera_n_software_id
  label: "xStatus Camera [n] SoftwareID"
  kind: query
  query_command: "xStatus Camera [n] SoftwareID"

- id: x_status_camera_n_mac_address
  label: "xStatus Camera [n] MacAddress"
  kind: query
  query_command: "xStatus Camera [n] MacAddress"

- id: x_status_camera_n_position_pan
  label: "xStatus Camera [n] Position Pan"
  kind: query
  query_command: "xStatus Camera [n] Position Pan"

- id: x_status_camera_n_serial_number
  label: "xStatus Camera [n] SerialNumber"
  kind: query
  query_command: "xStatus Camera [n] SerialNumber"

- id: x_status_camera_n_position_tilt
  label: "xStatus Camera [n] Position Tilt"
  kind: query
  query_command: "xStatus Camera [n] Position Tilt"

- id: x_status_camera_n_ip_address
  label: "xStatus Camera [n] IpAddress"
  kind: query
  query_command: "xStatus Camera [n] IpAddress"

- id: x_status_camera_n_position_zoom
  label: "xStatus Camera [n] Position Zoom"
  kind: query
  query_command: "xStatus Camera [n] Position Zoom"

- id: x_status_camera_n_upgrade_status
  label: "xStatus Camera [n] UpgradeStatus"
  kind: query
  query_command: "xStatus Camera [n] UpgradeStatus"

- id: x_status_camera_n_position_focus
  label: "xStatus Camera [n] Position Focus"
  kind: query
  query_command: "xStatus Camera [n] Position Focus"

- id: x_status_camera_n_download_progress
  label: "xStatus Camera [n] DownloadProgress"
  kind: query
  query_command: "xStatus Camera [n] DownloadProgress"

- id: x_status_camera_n_capabilities_options
  label: "xStatus Camera [n] Capabilities Options"
  kind: query
  query_command: "xStatus Camera [n] Capabilities Options"

- id: x_status_camera_n_flip
  label: "xStatus Camera [n] Flip"
  kind: query
  query_command: "xStatus Camera [n] Flip"

- id: x_status_cameras_speaker_track_status
  label: "xStatus Cameras SpeakerTrack Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Status"

- id: x_status_cameras_speaker_track_availability
  label: "xStatus Cameras SpeakerTrack Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Availability"

- id: x_status_cameras_speaker_track_whiteboard_n_camera_n_defined
  label: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Defined"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Defined"

- id: x_status_cameras_speaker_track_left_camera_video_input_connector
  label: "xStatus Cameras SpeakerTrack LeftCamera VideoInputConnector"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack LeftCamera VideoInputConnector"

- id: x_status_cameras_speaker_track_whiteboard_n_camera_n_pan
  label: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Pan"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Pan"

- id: x_status_cameras_speaker_track_right_camera_video_input_connector
  label: "xStatus Cameras SpeakerTrack RightCamera VideoInputConnector"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack RightCamera VideoInputConnector"

- id: x_status_cameras_speaker_track_whiteboard_n_camera_n_tilt
  label: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Tilt"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Tilt"

- id: x_status_conference
  label: "xStatus Conference"
  kind: query
  query_command: "xStatus Conference"

- id: x_status_conference_presentation_mode
  label: "xStatus Conference Presentation Mode"
  kind: query
  query_command: "xStatus Conference Presentation Mode"

- id: x_status_cameras_speaker_track_whiteboard_n_camera_n_zoom
  label: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Zoom"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Whiteboard [n] Camera [n] Zoom"

- id: x_status_conference_presentation_protocol
  label: "xStatus Conference Presentation Protocol"
  kind: query
  query_command: "xStatus Conference Presentation Protocol"

- id: x_status_cameras_speaker_track_whiteboard_n_distance
  label: "xStatus Cameras SpeakerTrack Whiteboard [n] Distance"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Whiteboard [n] Distance"

- id: x_status_conference_presentation_resolution_height
  label: "xStatus Conference Presentation Resolution Height"
  kind: query
  query_command: "xStatus Conference Presentation Resolution Height"

- id: x_status_conference_presentation_resolution_width
  label: "xStatus Conference Presentation Resolution Width"
  kind: query
  query_command: "xStatus Conference Presentation Resolution Width"

- id: x_status_conference_presentation_last_local_source
  label: "xStatus Conference Presentation LastLocalSource"
  kind: query
  query_command: "xStatus Conference Presentation LastLocalSource"

- id: x_status_conference_presentation_site_id
  label: "xStatus Conference Presentation SiteId"
  kind: query
  query_command: "xStatus Conference Presentation SiteId"

- id: x_status_conference_presentation_instance_n_local_sending_mode
  label: "xStatus Conference Presentation Instance [n] LocalSendingMode"
  kind: query
  query_command: "xStatus Conference Presentation Instance [n] LocalSendingMode"

- id: x_status_conference_presentation_local_source
  label: "xStatus Conference Presentation LocalSource"
  kind: query
  query_command: "xStatus Conference Presentation LocalSource"

- id: x_status_conference_presentation_instance_n_local_source
  label: "xStatus Conference Presentation Instance [n] LocalSource"
  kind: query
  query_command: "xStatus Conference Presentation Instance [n] LocalSource"

- id: x_status_conference_presentation_local_sending_mode
  label: "xStatus Conference Presentation LocalSendingMode"
  kind: query
  query_command: "xStatus Conference Presentation LocalSendingMode"

- id: x_status_conference_site_n_capabilities_fecc_number_of_presets
  label: "xStatus Conference Site [n] Capabilities FECC NumberOfPresets"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC NumberOfPresets"

- id: x_status_conference_site_n_capabilities_fecc_source_n_options
  label: "xStatus Conference Site [n] Capabilities FECC Source [n] Options"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC Source [n] Options"

- id: x_status_conference_site_n_capabilities_fecc_number_of_sources
  label: "xStatus Conference Site [n] Capabilities FECC NumberOfSources"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC NumberOfSources"

- id: x_status_conference_site_n_capabilities_fecc_mode
  label: "xStatus Conference Site [n] Capabilities FECC Mode"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC Mode"

- id: x_status_conference_site_n_capabilities_fecc_source_n_source_id
  label: "xStatus Conference Site [n] Capabilities FECC Source [n] SourceId"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC Source [n] SourceId"

- id: x_status_conference_site_n_capabilities_presentation
  label: "xStatus Conference Site [n] Capabilities Presentation"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities Presentation"

- id: x_status_conference_site_n_capabilities_fecc_source_n_name
  label: "xStatus Conference Site [n] Capabilities FECC Source [n] Name"
  kind: query
  query_command: "xStatus Conference Site [n] Capabilities FECC Source [n] Name"

- id: x_status_conference_site_n_microphones_muted
  label: "xStatus Conference Site [n] MicrophonesMuted"
  kind: query
  query_command: "xStatus Conference Site [n] MicrophonesMuted"

- id: x_status_conference_site_n_black_screen_cause
  label: "xStatus Conference Site [n] BlackScreenCause"
  kind: query
  query_command: "xStatus Conference Site [n] BlackScreenCause"

- id: x_status_conference_site_n_manufacturer
  label: "xStatus Conference Site [n] Manufacturer"
  kind: query
  query_command: "xStatus Conference Site [n] Manufacturer"

- id: x_status_conference_site_n_software_id
  label: "xStatus Conference Site [n] SoftwareID"
  kind: query
  query_command: "xStatus Conference Site [n] SoftwareID"

- id: x_status_conference_site_n_conference_extended
  label: "xStatus Conference Site [n] ConferenceExtended"
  kind: query
  query_command: "xStatus Conference Site [n] ConferenceExtended"

- id: x_status_conference_site_n_booking_id
  label: "xStatus Conference Site [n] BookingId"
  kind: query
  query_command: "xStatus Conference Site [n] BookingId"

- id: x_status_conference_site_n_attended_transfer
  label: "xStatus Conference Site [n] AttendedTransfer"
  kind: query
  query_command: "xStatus Conference Site [n] AttendedTransfer"

- id: x_status_conference_site_n_appearance
  label: "xStatus Conference Site [n] Appearance"
  kind: query
  query_command: "xStatus Conference Site [n] Appearance"

- id: x_status_conference_site_n_security_status
  label: "xStatus Conference Site [n] SecurityStatus"
  kind: query
  query_command: "xStatus Conference Site [n] SecurityStatus"

- id: x_status_conference_site_n_gci
  label: "xStatus Conference Site [n] GCI"
  kind: query
  query_command: "xStatus Conference Site [n] GCI"

- id: x_status_conference_site_n_unattended_transfer
  label: "xStatus Conference Site [n] UnattendedTransfer"
  kind: query
  query_command: "xStatus Conference Site [n] UnattendedTransfer"

- id: x_status_conference_site_n_cal_text
  label: "xStatus Conference Site [n] CalText"
  kind: query
  query_command: "xStatus Conference Site [n] CalText"

- id: x_status_conference_site_n_hold
  label: "xStatus Conference Site [n] Hold"
  kind: query
  query_command: "xStatus Conference Site [n] Hold"

- id: x_status_conference_line_n_appearance_uri
  label: "xStatus Conference Line [n] Appearance URI"
  kind: query
  query_command: "xStatus Conference Line [n] Appearance URI"

- id: x_status_conference_site_n_preserved
  label: "xStatus Conference Site [n] Preserved"
  kind: query
  query_command: "xStatus Conference Site [n] Preserved"

- id: x_status_conference_line_n_appearance_gci
  label: "xStatus Conference Line [n] Appearance GCI"
  kind: query
  query_command: "xStatus Conference Line [n] Appearance GCI"

- id: x_status_conference_line_n_mode
  label: "xStatus Conference Line [n] Mode"
  kind: query
  query_command: "xStatus Conference Line [n] Mode"

- id: x_status_conference_multipoint_mode
  label: "xStatus Conference Multipoint Mode"
  kind: query
  query_command: "xStatus Conference Multipoint Mode"

- id: x_status_conference_line_n_appearance_status
  label: "xStatus Conference Line [n] Appearance Status"
  kind: query
  query_command: "xStatus Conference Line [n] Appearance Status"

- id: x_status_conference_do_not_disturb
  label: "xStatus Conference DoNotDisturb"
  kind: query
  query_command: "xStatus Conference DoNotDisturb"

- id: x_status_conference_selected_call_protocol
  label: "xStatus Conference SelectedCallProtocol"
  kind: query
  query_command: "xStatus Conference SelectedCallProtocol"

- id: x_status_conference_active_speaker_mode
  label: "xStatus Conference ActiveSpeaker Mode"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker Mode"

- id: x_status_conference_active_speaker_site_id
  label: "xStatus Conference ActiveSpeaker SiteId"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker SiteId"

- id: x_status_conference_active_speaker_manual_site_id
  label: "xStatus Conference ActiveSpeaker Manual SiteId"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker Manual SiteId"

- id: x_status_diagnostics
  label: "xStatus Diagnostics"
  kind: query
  query_command: "xStatus Diagnostics"

- id: x_status_gpio_pin_1_4_state
  label: "xStatus GPIO Pin [1..4] State"
  kind: query
  query_command: "xStatus GPIO Pin [1..4] State"

- id: x_status_h320_gateway_mode
  label: "xStatus H320 Gateway Mode"
  kind: query
  query_command: "xStatus H320 Gateway Mode"

- id: x_status_h320
  label: "xStatus H320"
  kind: query
  query_command: "xStatus H320"

- id: x_status_h320_gateway_status
  label: "xStatus H320 Gateway Status"
  kind: query
  query_command: "xStatus H320 Gateway Status"

- id: x_status_h320_gateway_reason
  label: "xStatus H320 Gateway Reason"
  kind: query
  query_command: "xStatus H320 Gateway Reason"

- id: x_status_h320_gateway_address
  label: "xStatus H320 Gateway Address"
  kind: query
  query_command: "xStatus H320 Gateway Address"

- id: x_status_h320_gateway_id
  label: "xStatus H320 Gateway Id"
  kind: query
  query_command: "xStatus H320 Gateway Id"

- id: x_status_h320_gateway_number
  label: "xStatus H320 Gateway Number"
  kind: query
  query_command: "xStatus H320 Gateway Number"

- id: x_status_h323_gatekeeper_reason
  label: "xStatus H323 Gatekeeper Reason"
  kind: query
  query_command: "xStatus H323 Gatekeeper Reason"

- id: x_status_h323
  label: "xStatus H323"
  kind: query
  query_command: "xStatus H323"

- id: x_status_h323_gatekeeper_status
  label: "xStatus H323 Gatekeeper Status"
  kind: query
  query_command: "xStatus H323 Gatekeeper Status"

- id: x_status_h323_mode_status
  label: "xStatus H323 Mode Status"
  kind: query
  query_command: "xStatus H323 Mode Status"

- id: x_status_h323_gatekeeper_address
  label: "xStatus H323 Gatekeeper Address"
  kind: query
  query_command: "xStatus H323 Gatekeeper Address"

- id: x_status_h323_gatekeeper_port
  label: "xStatus H323 Gatekeeper Port"
  kind: query
  query_command: "xStatus H323 Gatekeeper Port"

- id: x_status_http_feedback
  label: "xStatus HttpFeedback"
  kind: query
  query_command: "xStatus HttpFeedback"

- id: x_status_http_feedback_1_4_url
  label: "xStatus HttpFeedback [1..4] URL"
  kind: query
  query_command: "xStatus HttpFeedback [1..4] URL"

- id: x_status_ice_configured
  label: "xStatus ICE Configured"
  kind: query
  query_command: "xStatus ICE Configured"

- id: x_status_ice_defaultcandidate
  label: "xStatus ICE Defaultcandidate"
  kind: query
  query_command: "xStatus ICE Defaultcandidate"

- id: x_status_http_feedback_1_4_expression_1_15
  label: "xStatus HttpFeedback [1..4] Expression [1..15]"
  kind: query
  query_command: "xStatus HttpFeedback [1..4] Expression [1..15]"

- id: x_status_ice_turn_ip
  label: "xStatus ICE Turn IP"
  kind: query
  query_command: "xStatus ICE Turn IP"

- id: x_status_ice_turn_hostname
  label: "xStatus ICE Turn Hostname"
  kind: query
  query_command: "xStatus ICE Turn Hostname"

- id: x_status_ice_call_result
  label: "xStatus ICE Call Result"
  kind: query
  query_command: "xStatus ICE Call Result"

- id: x_status_ice_turn_username
  label: "xStatus ICE Turn Username"
  kind: query
  query_command: "xStatus ICE Turn Username"

- id: x_status_ice_call_local_candidate
  label: "xStatus ICE Call Local Candidate"
  kind: query
  query_command: "xStatus ICE Call Local Candidate"

- id: x_status_ice_turn_transport
  label: "xStatus ICE Turn Transport"
  kind: query
  query_command: "xStatus ICE Turn Transport"

- id: x_status_ice_call_local_ip
  label: "xStatus ICE Call Local IP"
  kind: query
  query_command: "xStatus ICE Call Local IP"

- id: x_status_ice_call_remote_candidate
  label: "xStatus ICE Call Remote Candidate"
  kind: query
  query_command: "xStatus ICE Call Remote Candidate"

- id: x_status_ice_turn_bandwidth
  label: "xStatus ICE Turn Bandwidth"
  kind: query
  query_command: "xStatus ICE Turn Bandwidth"

- id: x_status_ice_call_remote_ip
  label: "xStatus ICE Call Remote IP"
  kind: query
  query_command: "xStatus ICE Call Remote IP"

- id: x_status_ice_turn_discovermode
  label: "xStatus ICE Turn Discovermode"
  kind: query
  query_command: "xStatus ICE Turn Discovermode"

- id: x_status_logging_extended_logging_mode
  label: "xStatus Logging ExtendedLogging Mode"
  kind: query
  query_command: "xStatus Logging ExtendedLogging Mode"

- id: x_status_media_channels
  label: "xStatus MediaChannels"
  kind: query
  query_command: "xStatus MediaChannels"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_encryption_status
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Encryption Status"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Encryption Status"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_audio_protocol
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Protocol"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_audio_mute
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Mute"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Mute"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_audio_channels
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Audio Channels"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rtp_remote_ip_address
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTP Remote IpAddress"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rtcp_local_ip_address
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Local IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Local IpAddress"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rctp_remote_port
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RCTP Remote Port"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RCTP Remote Port"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rtcp_remote_ip_address
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Remote IpAddress"

- id: x_status_media_channels_call_n_incoming_video_channel_n_video_protocol
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video Protocol"

- id: x_status_media_channels_call_n_incoming_video_channel_n_video_resolution_y
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video ResolutionY"

- id: x_status_media_channels_call_n_incoming_video_channel_n_video_frame_rate
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Video FrameRate"

- id: x_status_media_channels_call_n_incoming_video_channel_n_transport_rtp_remote_ip_address
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Remote IpAddress"

- id: x_status_media_channels_call_n_incoming_video_channel_n_transport_rtcp_remote_ip_address
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTCP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTCP Remote IpAddress"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_encryption_status
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Encryption Status"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Encryption Status"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_audio_protocol
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Audio Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Audio Protocol"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_audio_channels
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Audio Channels"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtp_local_port
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Local Port"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Local Port"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtp_remote_ip_address
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote IpAddress"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtp_remote_port
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote Port"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote Port"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtcp_remote_ip_address
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTCP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTCP Remote IpAddress"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rctp_remote_port
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RCTP Remote Port"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RCTP Remote Port"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_channel_role
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] ChannelRole"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_video_resolution_x
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video ResolutionX"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_video_protocol
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video Protocol"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_video_resolution_y
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video ResolutionY"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_video_frame_rate
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Video FrameRate"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rtp_remote_ip_address
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTP Remote IpAddress"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rtcp_remote_ip_address
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Remote IpAddress"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Remote IpAddress"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rctp_remote_port
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RCTP Remote Port"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RCTP Remote Port"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rtp_local_protocol
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTP Local Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTP Local Protocol"

- id: x_status_media_channels_call_n_incoming_audio_channel_n_transport_rtcp_local_protocol
  label: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Local Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingAudioChannel [n] Transport RTCP Local Protocol"

- id: x_status_media_channels_call_n_incoming_video_channel_n_transport_rtcp_remote_protocol
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTCP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTCP Remote Protocol"

- id: x_status_media_channels_call_n_incoming_video_channel_n_transport_rtp_remote_protocol
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Remote Protocol"

- id: x_status_media_channels_call_n_incoming_video_channel_n_transport_rtp_local_protocol
  label: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Local Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] IncomingVideoChannel [n] Transport RTP Local Protocol"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtcp_remote_protocol
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTCP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTCP Remote Protocol"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtp_remote_protocol
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Remote Protocol"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rtcp_local_protocol
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Local Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Local Protocol"

- id: x_status_media_channels_call_n_outgoing_audio_channel_n_transport_rtp_local_protocol
  label: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Local Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingAudioChannel [n] Transport RTP Local Protocol"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rtcp_remote_protocol
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTCP Remote Protocol"

- id: x_status_media_channels_call_n_outgoing_video_channel_n_transport_rtp_remote_protocol
  label: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTP Remote Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] OutgoingVideoChannel [n] Transport RTP Remote Protocol"

- id: x_status_network_1_ipv4_subnet_mask
  label: "xStatus Network 1 IPv4 SubnetMask"
  kind: query
  query_command: "xStatus Network 1 IPv4 SubnetMask"

- id: x_status_network
  label: "xStatus Network"
  kind: query
  query_command: "xStatus Network"

- id: x_status_network_1_ethernet_mac_address
  label: "xStatus Network 1 Ethernet MacAddress"
  kind: query
  query_command: "xStatus Network 1 Ethernet MacAddress"

- id: x_status_network_1_ipv4_gateway
  label: "xStatus Network 1 IPv4 Gateway"
  kind: query
  query_command: "xStatus Network 1 IPv4 Gateway"

- id: x_status_network_1_ethernet_speed
  label: "xStatus Network 1 Ethernet Speed"
  kind: query
  query_command: "xStatus Network 1 Ethernet Speed"

- id: x_status_network_1_ipv4_dhcp_tftp_server_address
  label: "xStatus Network 1 IPv4 DHCP TftpServerAddress"
  kind: query
  query_command: "xStatus Network 1 IPv4 DHCP TftpServerAddress"

- id: x_status_network_1_ipv4_address
  label: "xStatus Network 1 IPv4 Address"
  kind: query
  query_command: "xStatus Network 1 IPv4 Address"

- id: x_status_network_1_ipv4_dhcp_tms_server
  label: "xStatus Network 1 IPv4 DHCP TmsServer"
  kind: query
  query_command: "xStatus Network 1 IPv4 DHCP TmsServer"

- id: x_status_network_1_ipv4_dhcp_tftp_server
  label: "xStatus Network 1 IPv4 DHCP TftpServer"
  kind: query
  query_command: "xStatus Network 1 IPv4 DHCP TftpServer"

- id: x_status_network_1_ipv4_dhcp_provisioning_server
  label: "xStatus Network 1 IPv4 DHCP ProvisioningServer"
  kind: query
  query_command: "xStatus Network 1 IPv4 DHCP ProvisioningServer"

- id: x_status_network_1_ipv6_address
  label: "xStatus Network 1 IPv6 Address"
  kind: query
  query_command: "xStatus Network 1 IPv6 Address"

- id: x_status_network_1_ipv4_dhcp_provisioning_domain
  label: "xStatus Network 1 IPv4 DHCP ProvisioningDomain"
  kind: query
  query_command: "xStatus Network 1 IPv4 DHCP ProvisioningDomain"

- id: x_status_network_1_ipv6_gateway
  label: "xStatus Network 1 IPv6 Gateway"
  kind: query
  query_command: "xStatus Network 1 IPv6 Gateway"

- id: x_status_network_1_vlan_voice_vlan_id
  label: "xStatus Network 1 VLAN Voice VlanId"
  kind: query
  query_command: "xStatus Network 1 VLAN Voice VlanId"

- id: x_status_network_1_cdp_capabilities
  label: "xStatus Network 1 CDP Capabilities"
  kind: query
  query_command: "xStatus Network 1 CDP Capabilities"

- id: x_status_network_1_cdp_platform
  label: "xStatus Network 1 CDP Platform"
  kind: query
  query_command: "xStatus Network 1 CDP Platform"

- id: x_status_network_1_cdp_device_id
  label: "xStatus Network 1 CDP DeviceId"
  kind: query
  query_command: "xStatus Network 1 CDP DeviceId"

- id: x_status_network_1_cdp_version
  label: "xStatus Network 1 CDP Version"
  kind: query
  query_command: "xStatus Network 1 CDP Version"

- id: x_status_network_1_cdp_port_id
  label: "xStatus Network 1 CDP PortID"
  kind: query
  query_command: "xStatus Network 1 CDP PortID"

- id: x_status_network_1_cdp_duplex
  label: "xStatus Network 1 CDP Duplex"
  kind: query
  query_command: "xStatus Network 1 CDP Duplex"

- id: x_status_network_1_cdp_primary_mgmt_address
  label: "xStatus Network 1 CDP PrimaryMgmtAddress"
  kind: query
  query_command: "xStatus Network 1 CDP PrimaryMgmtAddress"

- id: x_status_network_1_cdp_vtpmgmt_domain
  label: "xStatus Network 1 CDP VTPMgmtDomain"
  kind: query
  query_command: "xStatus Network 1 CDP VTPMgmtDomain"

- id: x_status_network_1_cdp_sys_name
  label: "xStatus Network 1 CDP SysName"
  kind: query
  query_command: "xStatus Network 1 CDP SysName"

- id: x_status_network_1_cdp_address
  label: "xStatus Network 1 CDP Address"
  kind: query
  query_command: "xStatus Network 1 CDP Address"

- id: x_status_network_1_cdp_sys_object_id
  label: "xStatus Network 1 CDP SysObjectID"
  kind: query
  query_command: "xStatus Network 1 CDP SysObjectID"

- id: x_status_network_1_cdp_vo_ipappliance_vlan_id
  label: "xStatus Network 1 CDP VoIPApplianceVlanID"
  kind: query
  query_command: "xStatus Network 1 CDP VoIPApplianceVlanID"

- id: x_status_network_services
  label: "xStatus NetworkServices"
  kind: query
  query_command: "xStatus NetworkServices"

- id: x_status_network_services_ntp_address
  label: "xStatus NetworkServices NTP Address"
  kind: query
  query_command: "xStatus NetworkServices NTP Address"

- id: x_status_network_services_ntp_current_address
  label: "xStatus NetworkServices NTP CurrentAddress"
  kind: query
  query_command: "xStatus NetworkServices NTP CurrentAddress"

- id: x_status_network_1_dns_server_n_address
  label: "xStatus Network 1 DNS Server [n] Address"
  kind: query
  query_command: "xStatus Network 1 DNS Server [n] Address"

- id: x_status_network_services_ntp_status
  label: "xStatus NetworkServices NTP Status"
  kind: query
  query_command: "xStatus NetworkServices NTP Status"

- id: x_status_peripherals_connected_device_n_hardware_info
  label: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] HardwareInfo"

- id: x_status_peripherals_connected_device_n_software_info
  label: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] SoftwareInfo"

- id: x_status_peripherals_connected_device_n_id
  label: "xStatus Peripherals ConnectedDevice [n] ID"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] ID"

- id: x_status_peripherals_connected_device_n_status
  label: "xStatus Peripherals ConnectedDevice [n] Status"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Status"

- id: x_status_peripherals_connected_device_n_name
  label: "xStatus Peripherals ConnectedDevice [n] Name"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Name"

- id: x_status_peripherals_connected_device_n_type
  label: "xStatus Peripherals ConnectedDevice [n] Type"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Type"

- id: x_status_peripherals_connected_device_n_upgrade_status
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"

- id: x_status_preset
  label: "xStatus Preset"
  kind: query
  query_command: "xStatus Preset"

- id: x_status_preset_1_15_defined
  label: "xStatus Preset [1..15] Defined"
  kind: query
  query_command: "xStatus Preset [1..15] Defined"

- id: x_status_preset_1_15_type
  label: "xStatus Preset [1..15] Type"
  kind: query
  query_command: "xStatus Preset [1..15] Type"

- id: x_status_preset_1_15_description
  label: "xStatus Preset [1..15] Description"
  kind: query
  query_command: "xStatus Preset [1..15] Description"

- id: x_status_provisioning
  label: "xStatus Provisioning"
  kind: query
  query_command: "xStatus Provisioning"

- id: x_status_provisioning_status
  label: "xStatus Provisioning Status"
  kind: query
  query_command: "xStatus Provisioning Status"

- id: x_status_provisioning_server
  label: "xStatus Provisioning Server"
  kind: query
  query_command: "xStatus Provisioning Server"

- id: x_status_provisioning_next_retry
  label: "xStatus Provisioning NextRetry"
  kind: query
  query_command: "xStatus Provisioning NextRetry"

- id: x_status_provisioning_software_previous_upgrade_changed
  label: "xStatus Provisioning Software PreviousUpgrade Changed"
  kind: query
  query_command: "xStatus Provisioning Software PreviousUpgrade Changed"

- id: x_status_provisioning_reason
  label: "xStatus Provisioning Reason"
  kind: query
  query_command: "xStatus Provisioning Reason"

- id: x_status_provisioning_software_previous_upgrade_status
  label: "xStatus Provisioning Software PreviousUpgrade Status"
  kind: query
  query_command: "xStatus Provisioning Software PreviousUpgrade Status"

- id: x_status_provisioning_software_previous_upgrade_message
  label: "xStatus Provisioning Software PreviousUpgrade Message"
  kind: query
  query_command: "xStatus Provisioning Software PreviousUpgrade Message"

- id: x_status_provisioning_software_upgrade_status_last_change
  label: "xStatus Provisioning Software UpgradeStatus LastChange"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus LastChange"

- id: x_status_provisioning_software_previous_upgrade_version_id
  label: "xStatus Provisioning Software PreviousUpgrade VersionId"
  kind: query
  query_command: "xStatus Provisioning Software PreviousUpgrade VersionId"

- id: x_status_provisioning_software_upgrade_status_status
  label: "xStatus Provisioning Software UpgradeStatus Status"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Status"

- id: x_status_provisioning_software_previous_upgrade_url
  label: "xStatus Provisioning Software PreviousUpgrade URL"
  kind: query
  query_command: "xStatus Provisioning Software PreviousUpgrade URL"

- id: x_status_provisioning_software_upgrade_status_phase
  label: "xStatus Provisioning Software UpgradeStatus Phase"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Phase"

- id: x_status_provisioning_software_upgrade_status_session_id
  label: "xStatus Provisioning Software UpgradeStatus SessionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus SessionId"

- id: x_status_provisioning_software_upgrade_status_message
  label: "xStatus Provisioning Software UpgradeStatus Message"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Message"

- id: x_status_provisioning_software_upgrade_status_seconds_until_upgrade
  label: "xStatus Provisioning Software UpgradeStatus SecondsUntilUpgrade"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus SecondsUntilUpgrade"

- id: x_status_provisioning_software_upgrade_status_version_id
  label: "xStatus Provisioning Software UpgradeStatus VersionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus VersionId"

- id: x_status_provisioning_software_current_version_id
  label: "xStatus Provisioning Software Current VersionId"
  kind: query
  query_command: "xStatus Provisioning Software Current VersionId"

- id: x_status_provisioning_software_upgrade_status_url
  label: "xStatus Provisioning Software UpgradeStatus URL"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus URL"

- id: x_status_provisioning_software_current_url
  label: "xStatus Provisioning Software Current URL"
  kind: query
  query_command: "xStatus Provisioning Software Current URL"

- id: x_status_provisioning_software_current_completed_at
  label: "xStatus Provisioning Software Current CompletedAt"
  kind: query
  query_command: "xStatus Provisioning Software Current CompletedAt"

- id: x_status_provisioning_cucm_capf_server_port
  label: "xStatus Provisioning CUCM CAPF ServerPort"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF ServerPort"

- id: x_status_provisioning_cucm_capf_mode
  label: "xStatus Provisioning CUCM CAPF Mode"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF Mode"

- id: x_status_provisioning_cucm_capf_lsc
  label: "xStatus Provisioning CUCM CAPF LSC"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF LSC"

- id: x_status_provisioning_cucm_capf_operation_state
  label: "xStatus Provisioning CUCM CAPF OperationState"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF OperationState"

- id: x_status_provisioning_cucm_capf_server_name
  label: "xStatus Provisioning CUCM CAPF ServerName"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF ServerName"

- id: x_status_provisioning_cucm_capf_operation_result
  label: "xStatus Provisioning CUCM CAPF OperationResult"
  kind: query
  query_command: "xStatus Provisioning CUCM CAPF OperationResult"

- id: x_status_provisioning_cucm_provision_security
  label: "xStatus Provisioning CUCM ProvisionSecurity"
  kind: query
  query_command: "xStatus Provisioning CUCM ProvisionSecurity"

- id: x_status_provisioning_cucm_user_id
  label: "xStatus Provisioning CUCM UserId"
  kind: query
  query_command: "xStatus Provisioning CUCM UserId"

- id: x_status_provisioning_cucm_ctl_state
  label: "xStatus Provisioning CUCM CTL State"
  kind: query
  query_command: "xStatus Provisioning CUCM CTL State"

- id: x_status_provisioning_cucm_itl_state
  label: "xStatus Provisioning CUCM ITL State"
  kind: query
  query_command: "xStatus Provisioning CUCM ITL State"

- id: x_status_provisioning_cucm_tvs_proxy_n_server
  label: "xStatus Provisioning CUCM TVS Proxy [n] Server"
  kind: query
  query_command: "xStatus Provisioning CUCM TVS Proxy [n] Server"

- id: x_status_provisioning_cucm_extension_mobility_enabled
  label: "xStatus Provisioning CUCM ExtensionMobility Enabled"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility Enabled"

- id: x_status_provisioning_cucm_tvs_proxy_n_ipv6_address
  label: "xStatus Provisioning CUCM TVS Proxy [n] IPv6Address"
  kind: query
  query_command: "xStatus Provisioning CUCM TVS Proxy [n] IPv6Address"

- id: x_status_provisioning_cucm_extension_mobility_logged_in
  label: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"

- id: x_status_provisioning_cucm_tvs_proxy_n_port
  label: "xStatus Provisioning CUCM TVS Proxy [n] Port"
  kind: query
  query_command: "xStatus Provisioning CUCM TVS Proxy [n] Port"

- id: x_status_provisioning_cucm_extension_mobility_last_logged_in_user_id
  label: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"

- id: x_status_provisioning_cucm_tvs_proxy_n_priority
  label: "xStatus Provisioning CUCM TVS Proxy [n] Priority"
  kind: query
  query_command: "xStatus Provisioning CUCM TVS Proxy [n] Priority"

- id: x_status_provisioning_cucm_phonebook_url
  label: "xStatus Provisioning CUCM Phonebook URL"
  kind: query
  query_command: "xStatus Provisioning CUCM Phonebook URL"

- id: x_status_security
  label: "xStatus Security"
  kind: query
  query_command: "xStatus Security"

- id: x_status_security_fips_mode
  label: "xStatus Security FIPS Mode"
  kind: query
  query_command: "xStatus Security FIPS Mode"

- id: x_status_security_persistency_configurations
  label: "xStatus Security Persistency Configurations"
  kind: query
  query_command: "xStatus Security Persistency Configurations"

- id: x_status_security_persistency_call_history
  label: "xStatus Security Persistency CallHistory"
  kind: query
  query_command: "xStatus Security Persistency CallHistory"

- id: x_status_security_persistency_internal_logging
  label: "xStatus Security Persistency InternalLogging"
  kind: query
  query_command: "xStatus Security Persistency InternalLogging"

- id: x_status_security_audit_server_port
  label: "xStatus Security Audit Server Port"
  kind: query
  query_command: "xStatus Security Audit Server Port"

- id: x_status_security_persistency_local_phonebook
  label: "xStatus Security Persistency LocalPhonebook"
  kind: query
  query_command: "xStatus Security Persistency LocalPhonebook"

- id: x_status_security_persistency_dhcp
  label: "xStatus Security Persistency DHCP"
  kind: query
  query_command: "xStatus Security Persistency DHCP"

- id: x_status_sip_profile_1_secure
  label: "xStatus SIP Profile 1 Secure"
  kind: query
  query_command: "xStatus SIP Profile 1 Secure"

- id: x_status_sip
  label: "xStatus SIP"
  kind: query
  query_command: "xStatus SIP"

- id: x_status_sip_profile_1_proxy_1_status
  label: "xStatus SIP Profile 1 Proxy [1] Status"
  kind: query
  query_command: "xStatus SIP Profile 1 Proxy [1] Status"

- id: x_status_sip_profile_1_verified
  label: "xStatus SIP Profile 1 Verified"
  kind: query
  query_command: "xStatus SIP Profile 1 Verified"

- id: x_status_sip_profile_1_proxy_1_address
  label: "xStatus SIP Profile 1 Proxy [1] Address"
  kind: query
  query_command: "xStatus SIP Profile 1 Proxy [1] Address"

- id: x_status_sip_profile_1_authentication
  label: "xStatus SIP Profile 1 Authentication"
  kind: query
  query_command: "xStatus SIP Profile 1 Authentication"

- id: x_status_sip_profile_1_mailbox_messages_waiting
  label: "xStatus SIP Profile 1 Mailbox MessagesWaiting"
  kind: query
  query_command: "xStatus SIP Profile 1 Mailbox MessagesWaiting"

- id: x_status_sip_profile_1_registration_n_status
  label: "xStatus SIP Profile 1 Registration [n] Status"
  kind: query
  query_command: "xStatus SIP Profile 1 Registration [n] Status"

- id: x_status_sip_profile_1_call_forward_mode
  label: "xStatus SIP Profile 1 CallForward Mode"
  kind: query
  query_command: "xStatus SIP Profile 1 CallForward Mode"

- id: x_status_sip_profile_1_registration_n_reason
  label: "xStatus SIP Profile 1 Registration [n] Reason"
  kind: query
  query_command: "xStatus SIP Profile 1 Registration [n] Reason"

- id: x_status_sip_profile_1_call_forward_uri
  label: "xStatus SIP Profile 1 CallForward URI"
  kind: query
  query_command: "xStatus SIP Profile 1 CallForward URI"

- id: x_status_sip_profile_1_registration_n_uri
  label: "xStatus SIP Profile 1 Registration [n] URI"
  kind: query
  query_command: "xStatus SIP Profile 1 Registration [n] URI"

- id: x_status_sip_profile_1_call_forward_display_name
  label: "xStatus SIP Profile 1 CallForward DisplayName"
  kind: query
  query_command: "xStatus SIP Profile 1 CallForward DisplayName"

- id: x_status_sip_profile_1_directory_uri_primary_uri
  label: "xStatus SIP Profile 1 DirectoryURI Primary URI"
  kind: query
  query_command: "xStatus SIP Profile 1 DirectoryURI Primary URI"

- id: x_status_standby_active
  label: "xStatus Standby Active"
  kind: query
  query_command: "xStatus Standby Active"

- id: x_status_system_unit
  label: "xStatus SystemUnit"
  kind: query
  query_command: "xStatus SystemUnit"

- id: x_status_system_unit_product_type
  label: "xStatus SystemUnit ProductType"
  kind: query
  query_command: "xStatus SystemUnit ProductType"

- id: x_status_system_unit_uptime
  label: "xStatus SystemUnit Uptime"
  kind: query
  query_command: "xStatus SystemUnit Uptime"

- id: x_status_system_unit_software_application
  label: "xStatus SystemUnit Software Application"
  kind: query
  query_command: "xStatus SystemUnit Software Application"

- id: x_status_system_unit_product_id
  label: "xStatus SystemUnit ProductId"
  kind: query
  query_command: "xStatus SystemUnit ProductId"

- id: x_status_system_unit_software_version
  label: "xStatus SystemUnit Software Version"
  kind: query
  query_command: "xStatus SystemUnit Software Version"

- id: x_status_system_unit_product_platform
  label: "xStatus SystemUnit ProductPlatform"
  kind: query
  query_command: "xStatus SystemUnit ProductPlatform"

- id: x_status_system_unit_software_name
  label: "xStatus SystemUnit Software Name"
  kind: query
  query_command: "xStatus SystemUnit Software Name"

- id: x_status_system_unit_software_release_date
  label: "xStatus SystemUnit Software ReleaseDate"
  kind: query
  query_command: "xStatus SystemUnit Software ReleaseDate"

- id: x_status_system_unit_software_max_video_calls
  label: "xStatus SystemUnit Software MaxVideoCalls"
  kind: query
  query_command: "xStatus SystemUnit Software MaxVideoCalls"

- id: x_status_system_unit_software_max_audio_calls
  label: "xStatus SystemUnit Software MaxAudioCalls"
  kind: query
  query_command: "xStatus SystemUnit Software MaxAudioCalls"

- id: x_status_system_unit_software_option_keys_premium_resolution
  label: "xStatus SystemUnit Software OptionKeys PremiumResolution"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys PremiumResolution"

- id: x_status_system_unit_software_option_keys_encryption
  label: "xStatus SystemUnit Software OptionKeys Encryption"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys Encryption"

- id: x_status_system_unit_software_option_keys_remote_monitoring
  label: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"

- id: x_status_system_unit_software_option_keys_multi_site
  label: "xStatus SystemUnit Software OptionKeys MultiSite"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys MultiSite"

- id: x_status_system_unit_hardware_module_serial_number
  label: "xStatus SystemUnit Hardware Module SerialNumber"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module SerialNumber"

- id: x_status_system_unit_hardware_module_compatibility_level
  label: "xStatus SystemUnit Hardware Module CompatibilityLevel"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module CompatibilityLevel"

- id: x_status_system_unit_hardware_monitoring_software
  label: "xStatus SystemUnit Hardware MonitoringSoftware"
  kind: query
  query_command: "xStatus SystemUnit Hardware MonitoringSoftware"

- id: x_status_system_unit_hardware_temperature
  label: "xStatus SystemUnit Hardware Temperature"
  kind: query
  query_command: "xStatus SystemUnit Hardware Temperature"

- id: x_status_system_unit_hardware_main_board_serial_number
  label: "xStatus SystemUnit Hardware MainBoard SerialNumber"
  kind: query
  query_command: "xStatus SystemUnit Hardware MainBoard SerialNumber"

- id: x_status_system_unit_hardware_temperature_threshold
  label: "xStatus SystemUnit Hardware TemperatureThreshold"
  kind: query
  query_command: "xStatus SystemUnit Hardware TemperatureThreshold"

- id: x_status_system_unit_hardware_main_board_identifier
  label: "xStatus SystemUnit Hardware MainBoard Identifier"
  kind: query
  query_command: "xStatus SystemUnit Hardware MainBoard Identifier"

- id: x_status_system_unit_hardware_udi
  label: "xStatus SystemUnit Hardware UDI"
  kind: query
  query_command: "xStatus SystemUnit Hardware UDI"

- id: x_status_system_unit_state_max_number_of_active_calls
  label: "xStatus SystemUnit State MaxNumberOfActiveCalls"
  kind: query
  query_command: "xStatus SystemUnit State MaxNumberOfActiveCalls"

- id: x_status_system_unit_state_system
  label: "xStatus SystemUnit State System"
  kind: query
  query_command: "xStatus SystemUnit State System"

- id: x_status_system_unit_state_number_of_active_calls
  label: "xStatus SystemUnit State NumberOfActiveCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfActiveCalls"

- id: x_status_system_unit_state_number_of_suspended_calls
  label: "xStatus SystemUnit State NumberOfSuspendedCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfSuspendedCalls"

- id: x_status_system_unit_state_max_number_of_calls
  label: "xStatus SystemUnit State MaxNumberOfCalls"
  kind: query
  query_command: "xStatus SystemUnit State MaxNumberOfCalls"

- id: x_status_system_unit_state_number_of_in_progress_calls
  label: "xStatus SystemUnit State NumberOfInProgressCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfInProgressCalls"

- id: x_status_system_unit_state_subsystem_application
  label: "xStatus SystemUnit State Subsystem Application"
  kind: query
  query_command: "xStatus SystemUnit State Subsystem Application"

- id: x_status_system_unit_notifications_notification_n_type
  label: "xStatus SystemUnit Notifications Notification [n] Type"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Type"

- id: x_status_system_unit_contact_info
  label: "xStatus SystemUnit ContactInfo"
  kind: query
  query_command: "xStatus SystemUnit ContactInfo"

- id: x_status_system_unit_contact_name
  label: "xStatus SystemUnit ContactName"
  kind: query
  query_command: "xStatus SystemUnit ContactName"

- id: x_status_system_unit_notifications_notification_n_text
  label: "xStatus SystemUnit Notifications Notification [n] Text"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Text"

- id: x_status_system_unit_diagnostics_last_run
  label: "xStatus SystemUnit Diagnostics LastRun"
  kind: query
  query_command: "xStatus SystemUnit Diagnostics LastRun"

- id: x_status_system_unit_diagnostics_message_n_level
  label: "xStatus SystemUnit Diagnostics Message [n] Level"
  kind: query
  query_command: "xStatus SystemUnit Diagnostics Message [n] Level"

- id: x_status_system_unit_diagnostics_message_n_type
  label: "xStatus SystemUnit Diagnostics Message [n] Type"
  kind: query
  query_command: "xStatus SystemUnit Diagnostics Message [n] Type"

- id: x_status_system_unit_diagnostics_message_n_description
  label: "xStatus SystemUnit Diagnostics Message [n] Description"
  kind: query
  query_command: "xStatus SystemUnit Diagnostics Message [n] Description"

- id: x_status_system_unit_diagnostics_message_n_references
  label: "xStatus SystemUnit Diagnostics Message [n] References"
  kind: query
  query_command: "xStatus SystemUnit Diagnostics Message [n] References"

- id: x_status_time
  label: "xStatus Time"
  kind: query
  query_command: "xStatus Time"

- id: x_status_user_interface_osd_output
  label: "xStatus UserInterface OSD Output"
  kind: query
  query_command: "xStatus UserInterface OSD Output"

- id: x_status_time_zone_olson
  label: "xStatus Time ZoneOlson"
  kind: query
  query_command: "xStatus Time ZoneOlson"

- id: x_status_time_system_time
  label: "xStatus Time SystemTime"
  kind: query
  query_command: "xStatus Time SystemTime"

- id: x_status_user_interface_osd_mode
  label: "xStatus UserInterface OSD Mode"
  kind: query
  query_command: "xStatus UserInterface OSD Mode"

- id: x_status_video_input_connector_n_signal_state
  label: "xStatus Video Input Connector [n] SignalState"
  kind: query
  query_command: "xStatus Video Input Connector [n] SignalState"

- id: x_status_video_input
  label: "xStatus Video Input"
  kind: query
  query_command: "xStatus Video Input"

- id: x_status_video_monitors
  label: "xStatus Video Monitors"
  kind: query
  query_command: "xStatus Video Monitors"

- id: x_status_video_input_connector_n_source_id
  label: "xStatus Video Input Connector [n] SourceId"
  kind: query
  query_command: "xStatus Video Input Connector [n] SourceId"

- id: x_status_video_input_connector_n_connected
  label: "xStatus Video Input Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Input Connector [n] Connected"

- id: x_status_video_input_connector_n_type
  label: "xStatus Video Input Connector [n] Type"
  kind: query
  query_command: "xStatus Video Input Connector [n] Type"

- id: x_status_video_input_last_connected_source
  label: "xStatus Video Input LastConnectedSource"
  kind: query
  query_command: "xStatus Video Input LastConnectedSource"

- id: x_status_video_input_source_n_resolution_width
  label: "xStatus Video Input Source [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Width"

- id: x_status_video_input_main_video_source
  label: "xStatus Video Input MainVideoSource"
  kind: query
  query_command: "xStatus Video Input MainVideoSource"

- id: x_status_video_input_source_n_resolution_refresh_rate
  label: "xStatus Video Input Source [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution RefreshRate"

- id: x_status_video_input_source_n_resolution_format_type
  label: "xStatus Video Input Source [n] Resolution FormatType"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution FormatType"

- id: x_status_video_input_source_n_connector_id
  label: "xStatus Video Input Source [n] ConnectorId"
  kind: query
  query_command: "xStatus Video Input Source [n] ConnectorId"

- id: x_status_video_input_source_n_resolution_height
  label: "xStatus Video Input Source [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Height"

- id: x_status_video_input_source_n_resolution_format_status
  label: "xStatus Video Input Source [n] Resolution FormatStatus"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution FormatStatus"

- id: x_status_video_input_source_n_media_channel_id
  label: "xStatus Video Input Source [n] MediaChannelId"
  kind: query
  query_command: "xStatus Video Input Source [n] MediaChannelId"

- id: x_status_video_output_connector_n_monitor_role
  label: "xStatus Video Output Connector [n] MonitorRole"
  kind: query
  query_command: "xStatus Video Output Connector [n] MonitorRole"

- id: x_status_video_output
  label: "xStatus Video Output"
  kind: query
  query_command: "xStatus Video Output"

- id: x_status_video_output_connector_n_connected
  label: "xStatus Video Output Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Output Connector [n] Connected"

- id: x_status_video_output_connector_n_resolution_height
  label: "xStatus Video Output Connector [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Height"

- id: x_status_video_output_connector_n_resolution_width
  label: "xStatus Video Output Connector [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Width"

- id: x_status_video_output_connector_n_resolution_refresh_rate
  label: "xStatus Video Output Connector [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution RefreshRate"

- id: x_status_video_output_dvi_connected_device_preferred_format
  label: "xStatus Video Output DVI ConnectedDevice PreferredFormat"
  kind: query
  query_command: "xStatus Video Output DVI ConnectedDevice PreferredFormat"

- id: x_status_video_output_connector_n_type
  label: "xStatus Video Output Connector [n] Type"
  kind: query
  query_command: "xStatus Video Output Connector [n] Type"

- id: x_status_video_output_dvi_connected_device_name
  label: "xStatus Video Output DVI ConnectedDevice Name"
  kind: query
  query_command: "xStatus Video Output DVI ConnectedDevice Name"

- id: x_status_video_output_hdmi_connected_device_name
  label: "xStatus Video Output HDMI ConnectedDevice Name"
  kind: query
  query_command: "xStatus Video Output HDMI ConnectedDevice Name"

- id: x_status_video_output_hdmi_connected_device_preferred_format
  label: "xStatus Video Output HDMI ConnectedDevice PreferredFormat"
  kind: query
  query_command: "xStatus Video Output HDMI ConnectedDevice PreferredFormat"

- id: x_status_video_output_hdmi_connected_device_cec_device_type
  label: "xStatus Video Output HDMI ConnectedDevice CEC DeviceType"
  kind: query
  query_command: "xStatus Video Output HDMI ConnectedDevice CEC DeviceType"

- id: x_status_video_layout
  label: "xStatus Video Layout"
  kind: query
  query_command: "xStatus Video Layout"

- id: x_status_video_layout_mode
  label: "xStatus Video Layout Mode"
  kind: query
  query_command: "xStatus Video Layout Mode"

- id: x_status_video_output_hdmi_connected_device_cec_power_control
  label: "xStatus Video Output HDMI ConnectedDevice CEC PowerControl"
  kind: query
  query_command: "xStatus Video Output HDMI ConnectedDevice CEC PowerControl"

- id: x_status_video_layout_presentation_view
  label: "xStatus Video Layout PresentationView"
  kind: query
  query_command: "xStatus Video Layout PresentationView"

- id: x_status_video_layout_site_n_output_n_family_name
  label: "xStatus Video Layout Site [n] Output [n] FamilyName"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] FamilyName"

- id: x_status_video_output_hdmi_connected_device_cec_power_status
  label: "xStatus Video Output HDMI ConnectedDevice CEC PowerStatus"
  kind: query
  query_command: "xStatus Video Output HDMI ConnectedDevice CEC PowerStatus"

- id: x_status_video_layout_site_n_output_n_full_family_name
  label: "xStatus Video Layout Site [n] Output [n] FullFamilyName"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] FullFamilyName"

- id: x_status_video_layout_site_n_output_n_frame_n_position_y
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] PositionY"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] PositionY"

- id: x_status_video_layout_site_n_output_n_frame_n_width
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] Width"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] Width"

- id: x_status_video_layout_site_n_output_n_graphic_name
  label: "xStatus Video Layout Site [n] Output [n] GraphicName"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] GraphicName"

- id: x_status_video_layout_site_n_output_n_frame_n_height
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] Height"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] Height"

- id: x_status_video_layout_site_n_output_n_frame_n_position_x
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] PositionX"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] PositionX"

- id: x_status_video_layout_site_n_output_n_frame_n_media_channel_id
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] MediaChannelId"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] MediaChannelId"

- id: x_status_video_layout_site_n_output_n_frame_n_input_number
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] InputNumber"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] InputNumber"

- id: x_status_video_layout_site_n_output_n_frame_n_filename
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] Filename"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] Filename"

- id: x_status_video_layout_site_n_output_n_frame_n_video_source_type
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceType"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceType"

- id: x_status_video_layout_site_n_output_n_frame_n_video_source_id
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceId"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceId"

- id: x_status_video_layout_site_n_output_n_frame_n_video_source_content
  label: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceContent"
  kind: query
  query_command: "xStatus Video Layout Site [n] Output [n] Frame [n] VideoSourceContent"

- id: x_status_video_layout_prediction_site_n_status_index_family_n_hidden
  label: "xStatus Video Layout Prediction Site [n] StatusIndex Family [n] Hidden"
  kind: query
  query_command: "xStatus Video Layout Prediction Site [n] StatusIndex Family [n] Hidden"

- id: x_status_video_selfview_on_monitor_role
  label: "xStatus Video Selfview OnMonitorRole"
  kind: query
  query_command: "xStatus Video Selfview OnMonitorRole"

- id: x_status_video_selfview_mode
  label: "xStatus Video Selfview Mode"
  kind: query
  query_command: "xStatus Video Selfview Mode"

- id: x_status_video_pip_active_speaker_position
  label: "xStatus Video PIP ActiveSpeaker Position"
  kind: query
  query_command: "xStatus Video PIP ActiveSpeaker Position"

- id: x_status_video_selfview_fullscreen_mode
  label: "xStatus Video Selfview FullscreenMode"
  kind: query
  query_command: "xStatus Video Selfview FullscreenMode"

- id: x_status_video_pip_presentation_position
  label: "xStatus Video PIP Presentation Position"
  kind: query
  query_command: "xStatus Video PIP Presentation Position"

- id: x_status_video_selfview_pipposition
  label: "xStatus Video Selfview PIPPosition"
  kind: query
  query_command: "xStatus Video Selfview PIPPosition"

- id: x_status_video_osd_output
  label: "xStatus Video OSD Output"
  kind: query
  query_command: "xStatus Video OSD Output"

- id: x_status_video_osd_mode
  label: "xStatus Video OSD Mode"
  kind: query
  query_command: "xStatus Video OSD Mode"
```

## Variables
```yaml
# All settable system parameters are exposed as xConfiguration entries and are
# therefore represented in the Actions catalogue (see Actions). No additional
# free-standing variables documented.
# UNRESOLVED: none beyond the configuration actions already enumerated.
```

## Events
```yaml
# Unsolicited notifications emitted by the codec (xEvent hierarchy). Source shows
# examples only; the full event set is enumerated by `xEvent ??` on-device and is
# not fully transcribed in this draft.
- id: outgoing_call_indication
  label: Outgoing Call Indication
  description: Emitted when an outgoing call is about to be dialed; carries the assigned CallId.
  payload_example: "*e OutgoingCallIndication CallId: x"

- id: call_successful
  label: Call Successful
  description: Emitted when a call connects (all channels up).
  payload_example: >-
    *e CallSuccessful CallId: 132 Protocol: "h223" Direction: "outgoing"
    CallRate: 768 RemoteURI: "h223:integratorHQ@company.com"
    EncryptionIn: "Off" EncryptionOut: "Off"

- id: call_disconnect
  label: Call Disconnect
  description: Emitted when a call is disconnected; carries CallId and cause.
  payload_example: >-
    *e CallDisconnect CallId: x CauseValue: 0 CauseString: ""
    CauseType: LocalDisconnect OrigCallDirection: "outgoing"

- id: fecc_action_indication
  label: FECC Action Request
  description: Emitted when far end sends Far-End Camera Control (FECC) commands.
  payload_example: >-
    *e FeccActionInd Id: 132 Req: 1 Pan: 1 PanRight: 1 Tilt: 0 TiltUp: 0
    Zoom: 0 ZoomIn: 0 Focus: 0 FocusIn: 0 Timeout: 300 VideoSrc: 0 m: 0

- id: tstring_received
  label: TString Message Received
  description: Emitted when far end sends a TString message.
  payload_example: "*e TString CallId: 132 Message: \"ee\""

- id: sstring_received
  label: SString Message Received
  description: Emitted when far end sends an SString message.
  payload_example: "*e SString String: \"ee\" Id: 132"
# UNRESOLVED: complete xEvent catalogue not transcribed in source examples; run `xEvent ??` on device for full list.
```

## Macros
```yaml
# No multi-step command sequences are documented as macros in the source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source describes no explicit confirmation/interlock procedures for destructive ops
                               # (factory reset, software upgrade, option-key removal) - treat as unsafe-by-default.
interlocks: []
privacy:
  # From source (TC7.3.3+): the Remote Monitoring option key enables monitoring
  # of camera/screen with NO on-device indicator or warning to room users.
  # Snapshots likewise log the requesting IP but only notify when feature enabled.
  - "Remote Monitoring (option key) shows no local indicator that the room is being observed - operators must give users adequate notice."
  - "Web-interface call-control snapshots require the Remote Monitoring option key (TC7.3.3+)."
# UNRESOLVED: no formal interlock or power-sequencing procedures stated in source.
```

## Notes
- **Case sensitivity:** all commands are case-insensitive (`XCOMMAND DIAL`, `xcommand dial`, `xCommand Dial` all valid).
- **Value types:** integer ranges `<x..y>`; literal sets `<X/Y/Z>`; strings `<S: min, max>`. Values containing spaces must be quoted.
- **Command arguments:** key:value pairs separated by `:`; `(r)` marks a required argument.
- **Hierarchy:** four groups — Commands (`xCommand`), Configurations (`xConfiguration`), Status (`xStatus`), Events (`xEvent`). Hierarchically organized.
- **HTTP POST:** body must carry `Content-Type: text/xml`; `Connection: close` used in examples. POST to `/putxml`.
- **HTTP GET shortcut:** `/formputxml?xmldoc=<xml>` for browser testing.
- **Feedback subscriptions (terminal):** per-session only; re-register after reconnect; max 38 expressions. Never register `/Status` wholesale (codec can flood feedback, causing sluggish/unpredictable behavior).
- **Search shortcuts** (`xconfiguration //out//hdmi`) are for inspection only — not for production apps (ambiguity risk across firmware).
- **Serial recommendation:** keep 115200 (codec emits heavy feedback).
- **Reboot required for:** SerialPort baud/login changes, HTTP/HTTPS Mode changes.
- **No reboot required for:** Telnet Mode change (delayed take-effect).
- **Deprecated config:** `xConfiguration Video Wallpaper` is marked DEPRECATED.

<!-- UNRESOLVED: firmware/build version compatibility range (only "TC7.3" stated); exact TCP ports for Telnet/SSH/HTTP/HTTPS; serial flow control; full xEvent catalogue; C-series vs SX80 model deltas; binary/byte-level encoding (n/a — API is text/XML); authentication token formats per transport. -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - developer.cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/codec-c-series/tc7/user-guide/profile-series-codec-c-series-qs-c20-sx20-qs-mx-series-touch-user-guide-tc73.pdf
  - https://developer.cisco.com/
  - https://developer.webex.com/docs/api/v1/xapi
retrieved_at: 2026-05-12T22:18:22.523Z
last_checked_at: 2026-06-25T08:54:47.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T08:54:47.648Z
matched_actions: 857
action_count: 857
confidence: medium
summary: "deterministic presence proof: 857/857 payloads verbatim in source; stratified Sonnet sample corroborated (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source targets SX80 only; C-series / TC73-specific differences not documented. Firmware build range, hardware variants, and exact product SKU mapping not stated."
- "TCP port numbers for Telnet/SSH are not stated in the source."
- "transport port numbers not stated in source"
- "flow control not stated in source"
- "none beyond the configuration actions already enumerated."
- "complete xEvent catalogue not transcribed in source examples; run `xEvent ??` on device for full list."
- "none documented."
- "source describes no explicit confirmation/interlock procedures for destructive ops"
- "no formal interlock or power-sequencing procedures stated in source."
- "firmware/build version compatibility range (only \"TC7.3\" stated); exact TCP ports for Telnet/SSH/HTTP/HTTPS; serial flow control; full xEvent catalogue; C-series vs SX80 model deltas; binary/byte-level encoding (n/a — API is text/XML); authentication token formats per transport."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
