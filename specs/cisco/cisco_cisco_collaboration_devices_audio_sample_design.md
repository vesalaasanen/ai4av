---
spec_id: admin/cisco-collaboration-devices-audio-sample-design
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Collaboration Devices Audio Sample Design Control Spec"
manufacturer: Cisco
model_family: "Cisco Collaboration Devices (CE Software API)"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Cisco Collaboration Devices (CE Software API)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce95/collaboration-endpoint-software-api-reference-guide-ce95.pdf
retrieved_at: 2026-06-25T08:09:41.677Z
last_checked_at: 2026-06-25T08:55:05.807Z
generated_at: 2026-06-25T08:55:05.807Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product models covered by this family spec not bounded; doc spans DX70/DX80/MX700/MX800/SX20/SX80/Room 55/Room 55 Dual/Room 70/Room 70 G2/Codec Plus/Codec Pro. Firmware version compatibility range not stated (doc is CE9.5 reference). PoE port counts and which products carry serial ports vary by hardware."
  - "port numbers not stated in source"
  - "flow control not stated in source"
  - "complete xEvent row list not machine-extracted; only examples shown"
  - "no vendor-prescribed macro sequences to author."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "SSH/Telnet/HTTP/HTTPS port numbers not stated in source."
  - "firmware/CE software version compatibility range not bounded (doc dated CE9.5, OCTOBER 2018)."
  - "exact product model list for this family entity not bounded; serial port availability varies (absent on DX70, DX80, Room 55 Dual, Room 70)."
  - "serial flow control not stated."
  - "complete xEvent row catalogue not machine-extracted."
  - "command return-value interactions with 3rd-party systems are release-dependent and explicitly undocumented per source (line 19)."
verification:
  verdict: verified
  checked_at: 2026-06-25T08:55:05.807Z
  matched_actions: 823
  action_count: 823
  confidence: medium
  summary: "deterministic presence proof: 823/823 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Cisco Collaboration Devices Audio Sample Design Control Spec

## Summary
Cisco codec (Collaboration Endpoint / CE software) API for DX, MX, SX, and Room series video collaboration devices. The API exposes Commands (`xCommand`), Configurations (`xConfiguration`), Status (`xStatus`), and Events (`xEvent`) organized hierarchically. Accessible over SSH, Telnet, HTTP/HTTPS, and RS-232 serial; all four surfaces present the same API (terminal, XML, or JSON output modes).

<!-- UNRESOLVED: exact product models covered by this family spec not bounded; doc spans DX70/DX80/MX700/MX800/SX20/SX80/Room 55/Room 55 Dual/Room 70/Room 70 G2/Codec Plus/Codec Pro. Firmware version compatibility range not stated (doc is CE9.5 reference). PoE port counts and which products carry serial ports vary by hardware. -->

## Transport
```yaml
protocols:
  - tcp        # SSH (default On) and Telnet (default Off) per source
  - http       # HTTP/HTTPS XMLAPI
  - serial     # RS-232 / COM or USB serial
addressing:
  # HTTP XMLAPI URL patterns stated verbatim in source:
  base_url: "http://<ip-address>"  # template; IP supplied at deploy time
  # SSH/Telnet/HTTP/HTTPS port numbers NOT stated in source
  port: null  # UNRESOLVED: port numbers not stated in source
http:
  endpoints:
    - method: GET
      path: "/status.xml"
      description: Complete status document
    - method: GET
      path: "/configuration.xml"
      description: Complete configuration document
    - method: GET
      path: "/command.xml"
      description: Complete command document
    - method: GET
      path: "/valuespace.xml"
      description: Complete valuespace document
    - method: GET
      path: "/getxml?location=<path>"
      description: Retrieve document based on an XPath path
    - method: POST
      path: "/putxml"
      description: Configurations and commands in HTTP body (Content-Type: text/xml)
    - method: POST
      path: "/xmlapi/session/begin"
      description: Open session-authenticated session (Basic Auth); returns SessionId cookie
    - method: POST
      path: "/xmlapi/session/end"
      description: Close session-authenticated session (SessionId cookie)
  content_type: "text/xml"
serial:
  baud_rate: 115200        # default; 38400 on SX20 per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null       # UNRESOLVED: flow control not stated in source
  boot_baud_rate: 38400    # used during initial boot sequence regardless of configured rate
auth:
  type: credentials        # inferred: source describes password/login procedures on all transports
  notes: >
    HTTP XMLAPI requires HTTP Basic Access Authentication as a user with ADMIN role
    (401 challenge on unauthenticated requests); session-auth alternative via
    /xmlapi/session/begin returns a SessionId cookie. Serial: password prompting ON
    by default, toggle via xConfiguration SerialPort LoginRequired. SSH/Telnet: admin
    user with mandatory password. Default admin user ships with no password set;
    setting one is mandatory to restrict config access.
```

## Traits
```yaml
# Inferred from command catalogue present in source:
- powerable     # inferred: xCommand Standby Activate/Deactivate, SystemUnit Boot/SoftReset/FactoryReset
- routable      # inferred: xCommand Video Matrix Assign/Swap/Unassign, Audio Local Output Connect/Disconnect Input
- queryable     # inferred: xStatus hierarchy + query-style xCommand? variants
- levelable     # inferred: Audio Volume/Input/Output Level, monitor brightness/contrast/backlight set commands
```

## Actions
```yaml
- id: x_configuration_audio_input_arc_n_mode
  label: "xConfiguration Audio Input ARC [n] Mode"
  kind: action
  command: "xConfiguration Audio Input ARC [n] Mode"
  params: []

- id: x_configuration_audio_default_volume
  label: "xConfiguration Audio DefaultVolume"
  kind: action
  command: "xConfiguration Audio DefaultVolume"
  params: []

- id: x_configuration_audio_input_hdmi_n_level
  label: "xConfiguration Audio Input HDMI [n] Level"
  kind: action
  command: "xConfiguration Audio Input HDMI [n] Level"
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

- id: x_configuration_audio_input_line_n_equalizer_id
  label: "xConfiguration Audio Input Line [n] Equalizer ID"
  kind: action
  command: "xConfiguration Audio Input Line [n] Equalizer ID"
  params: []

- id: x_configuration_audio_input_line_n_equalizer_mode
  label: "xConfiguration Audio Input Line [n] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Line [n] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_line_n_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input Line [n] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input Line [n] VideoAssociation MuteOnInactiveVideo"
  params: []

- id: x_configuration_audio_input_line_n_video_association_video_input_source
  label: "xConfiguration Audio Input Line [n] VideoAssociation VideoInputSource"
  kind: action
  command: "xConfiguration Audio Input Line [n] VideoAssociation VideoInputSource"
  params: []

- id: x_configuration_audio_input_line_n_channel
  label: "xConfiguration Audio Input Line [n] Channel"
  kind: action
  command: "xConfiguration Audio Input Line [n] Channel"
  params: []

- id: x_configuration_audio_input_line_n_level
  label: "xConfiguration Audio Input Line [n] Level"
  kind: action
  command: "xConfiguration Audio Input Line [n] Level"
  params: []

- id: x_configuration_audio_input_line_n_mode
  label: "xConfiguration Audio Input Line [n] Mode"
  kind: action
  command: "xConfiguration Audio Input Line [n] Mode"
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

- id: x_configuration_audio_input_microphone_n_level
  label: "xConfiguration Audio Input Microphone [n] Level"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Level"
  params: []

- id: x_configuration_audio_input_microphone_n_equalizer_mode
  label: "xConfiguration Audio Input Microphone [n] Equalizer Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Equalizer Mode"
  params: []

- id: x_configuration_audio_input_microphone_n_mode
  label: "xConfiguration Audio Input Microphone [n] Mode"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Mode"
  params: []

- id: x_configuration_audio_input_microphone_n_type
  label: "xConfiguration Audio Input Microphone [n] Type"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] Type"
  params: []

- id: x_configuration_audio_input_microphone_n_phantom_power
  label: "xConfiguration Audio Input Microphone [n] PhantomPower"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] PhantomPower"
  params: []

- id: x_configuration_audio_input_microphone_n_video_association_mute_on_inactive_video
  label: "xConfiguration Audio Input Microphone [n] VideoAssociation MuteOnInactiveVideo"
  kind: action
  command: "xConfiguration Audio Input Microphone [n] VideoAssociation MuteOnInactiveVideo"
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

- id: x_configuration_audio_key_click_detector_attenuate
  label: "xConfiguration Audio KeyClickDetector Attenuate"
  kind: action
  command: "xConfiguration Audio KeyClickDetector Attenuate"
  params: []

- id: x_configuration_audio_key_click_detector_enabled
  label: "xConfiguration Audio KeyClickDetector Enabled"
  kind: action
  command: "xConfiguration Audio KeyClickDetector Enabled"
  params: []

- id: x_configuration_audio_microphones_mute_enabled
  label: "xConfiguration Audio Microphones Mute Enabled"
  kind: action
  command: "xConfiguration Audio Microphones Mute Enabled"
  params: []

- id: x_configuration_audio_microphone_reinforcement_input_microphone_n_mode
  label: "xConfiguration Audio MicrophoneReinforcement Input Microphone [n] Mode"
  kind: action
  command: "xConfiguration Audio MicrophoneReinforcement Input Microphone [n] Mode"
  params: []

- id: x_configuration_audio_microphone_reinforcement_output_line_n_mode
  label: "xConfiguration Audio MicrophoneReinforcement Output Line [n] Mode"
  kind: action
  command: "xConfiguration Audio MicrophoneReinforcement Output Line [n] Mode"
  params: []

- id: x_configuration_audio_microphone_reinforcement_gain
  label: "xConfiguration Audio MicrophoneReinforcement Gain"
  kind: action
  command: "xConfiguration Audio MicrophoneReinforcement Gain"
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

- id: x_configuration_audio_sounds_and_alerts_ring_tone
  label: "xConfiguration Audio SoundsAndAlerts RingTone"
  kind: action
  command: "xConfiguration Audio SoundsAndAlerts RingTone"
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

- id: x_configuration_cameras_camera_n_assigned_serial_number
  label: "xConfiguration Cameras Camera [n] AssignedSerialNumber"
  kind: action
  command: "xConfiguration Cameras Camera [n] AssignedSerialNumber"
  params: []

- id: x_configuration_cameras_camera_n_backlight_default_mode
  label: "xConfiguration Cameras Camera [n] Backlight DefaultMode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Backlight DefaultMode"
  params: []

- id: x_configuration_cameras_camera_n_brightness_mode
  label: "xConfiguration Cameras Camera [n] Brightness Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Brightness Mode"
  params: []

- id: x_configuration_cameras_camera_n_brightness_default_level
  label: "xConfiguration Cameras Camera [n] Brightness DefaultLevel"
  kind: action
  command: "xConfiguration Cameras Camera [n] Brightness DefaultLevel"
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

- id: x_configuration_cameras_camera_n_gamma_mode
  label: "xConfiguration Cameras Camera [n] Gamma Mode"
  kind: action
  command: "xConfiguration Cameras Camera [n] Gamma Mode"
  params: []

- id: x_configuration_cameras_camera_n_gamma_level
  label: "xConfiguration Cameras Camera [n] Gamma Level"
  kind: action
  command: "xConfiguration Cameras Camera [n] Gamma Level"
  params: []

- id: x_configuration_cameras_camera_n_mirror
  label: "xConfiguration Cameras Camera [n] Mirror"
  kind: action
  command: "xConfiguration Cameras Camera [n] Mirror"
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

- id: x_configuration_cameras_camera_framerate
  label: "xConfiguration Cameras Camera Framerate"
  kind: action
  command: "xConfiguration Cameras Camera Framerate"
  params: []

- id: x_configuration_cameras_preset_trigger_autofocus
  label: "xConfiguration Cameras Preset TriggerAutofocus"
  kind: action
  command: "xConfiguration Cameras Preset TriggerAutofocus"
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

- id: x_configuration_cameras_speaker_track_connector_detection_mode
  label: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
  kind: action
  command: "xConfiguration Cameras SpeakerTrack ConnectorDetection Mode"
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

- id: x_configuration_conference_default_call_protocol
  label: "xConfiguration Conference DefaultCall Protocol"
  kind: action
  command: "xConfiguration Conference DefaultCall Protocol"
  params: []

- id: x_configuration_conference_auto_answer_delay
  label: "xConfiguration Conference AutoAnswer Delay"
  kind: action
  command: "xConfiguration Conference AutoAnswer Delay"
  params: []

- id: x_configuration_conference_default_call_rate
  label: "xConfiguration Conference DefaultCall Rate"
  kind: action
  command: "xConfiguration Conference DefaultCall Rate"
  params: []

- id: x_configuration_conference_encryption_mode
  label: "xConfiguration Conference Encryption Mode"
  kind: action
  command: "xConfiguration Conference Encryption Mode"
  params: []

- id: x_configuration_conference_do_not_disturb_default_timeout
  label: "xConfiguration Conference DoNotDisturb DefaultTimeout"
  kind: action
  command: "xConfiguration Conference DoNotDisturb DefaultTimeout"
  params: []

- id: x_configuration_conference_far_end_control_mode
  label: "xConfiguration Conference FarEndControl Mode"
  kind: action
  command: "xConfiguration Conference FarEndControl Mode"
  params: []

- id: x_configuration_conference_max_receive_call_rate
  label: "xConfiguration Conference MaxReceiveCallRate"
  kind: action
  command: "xConfiguration Conference MaxReceiveCallRate"
  params: []

- id: x_configuration_conference_far_end_message_mode
  label: "xConfiguration Conference FarEndMessage Mode"
  kind: action
  command: "xConfiguration Conference FarEndMessage Mode"
  params: []

- id: x_configuration_conference_max_transmit_call_rate
  label: "xConfiguration Conference MaxTransmitCallRate"
  kind: action
  command: "xConfiguration Conference MaxTransmitCallRate"
  params: []

- id: x_configuration_conference_max_total_receive_call_rate
  label: "xConfiguration Conference MaxTotalReceiveCallRate"
  kind: action
  command: "xConfiguration Conference MaxTotalReceiveCallRate"
  params: []

- id: x_configuration_conference_max_total_transmit_call_rate
  label: "xConfiguration Conference MaxTotalTransmitCallRate"
  kind: action
  command: "xConfiguration Conference MaxTotalTransmitCallRate"
  params: []

- id: x_configuration_conference_multi_stream_mode
  label: "xConfiguration Conference MultiStream Mode"
  kind: action
  command: "xConfiguration Conference MultiStream Mode"
  params: []

- id: x_configuration_gpio_pin_n_mode
  label: "xConfiguration GPIO Pin [n] Mode"
  kind: action
  command: "xConfiguration GPIO Pin [n] Mode"
  params: []

- id: x_configuration_h323_authentication_login_name
  label: "xConfiguration H323 Authentication LoginName"
  kind: action
  command: "xConfiguration H323 Authentication LoginName"
  params: []

- id: x_configuration_h323_authentication_mode
  label: "xConfiguration H323 Authentication Mode"
  kind: action
  command: "xConfiguration H323 Authentication Mode"
  params: []

- id: x_configuration_h323_authentication_password
  label: "xConfiguration H323 Authentication Password"
  kind: action
  command: "xConfiguration H323 Authentication Password"
  params: []

- id: x_configuration_h323_call_setup_mode
  label: "xConfiguration H323 CallSetup Mode"
  kind: action
  command: "xConfiguration H323 CallSetup Mode"
  params: []

- id: x_configuration_h323_gatekeeper_address
  label: "xConfiguration H323 Gatekeeper Address"
  kind: action
  command: "xConfiguration H323 Gatekeeper Address"
  params: []

- id: x_configuration_h323_h323_alias_e164
  label: "xConfiguration H323 H323Alias E164"
  kind: action
  command: "xConfiguration H323 H323Alias E164"
  params: []

- id: x_configuration_h323_encryption_key_size
  label: "xConfiguration H323 Encryption KeySize"
  kind: action
  command: "xConfiguration H323 Encryption KeySize"
  params: []

- id: x_configuration_h323_h323_alias_id
  label: "xConfiguration H323 H323Alias ID"
  kind: action
  command: "xConfiguration H323 H323Alias ID"
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

- id: x_configuration_macros_mode
  label: "xConfiguration Macros Mode"
  kind: action
  command: "xConfiguration Macros Mode"
  params: []

- id: x_configuration_macros_auto_start
  label: "xConfiguration Macros AutoStart"
  kind: action
  command: "xConfiguration Macros AutoStart"
  params: []

- id: x_configuration_network_n_dns_dnssec_mode
  label: "xConfiguration Network [n] DNS DNSSEC Mode"
  kind: action
  command: "xConfiguration Network [n] DNS DNSSEC Mode"
  params: []

- id: x_configuration_network_n_dns_domain_name
  label: "xConfiguration Network [n] DNS Domain Name"
  kind: action
  command: "xConfiguration Network [n] DNS Domain Name"
  params: []

- id: x_configuration_network_n_dns_server_m_address
  label: "xConfiguration Network [n] DNS Server [m] Address"
  kind: action
  command: "xConfiguration Network [n] DNS Server [m] Address"
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

- id: x_configuration_network_n_ieee8021_x_anonymous_identity
  label: "xConfiguration Network [n] IEEE8021X AnonymousIdentity"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X AnonymousIdentity"
  params: []

- id: x_configuration_network_n_ieee8021_x_eap_md5
  label: "xConfiguration Network [n] IEEE8021X Eap Md5"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Md5"
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

- id: x_configuration_network_n_ieee8021_x_eap_peap
  label: "xConfiguration Network [n] IEEE8021X Eap Peap"
  kind: action
  command: "xConfiguration Network [n] IEEE8021X Eap Peap"
  params: []

- id: x_configuration_network_n_ipstack
  label: "xConfiguration Network [n] IPStack"
  kind: action
  command: "xConfiguration Network [n] IPStack"
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

- id: x_configuration_network_n_vlan_voice_vlan_id
  label: "xConfiguration Network [n] VLAN Voice VlanId"
  kind: action
  command: "xConfiguration Network [n] VLAN Voice VlanId"
  params: []

- id: x_configuration_network_port_n_mode
  label: "xConfiguration NetworkPort [n] Mode"
  kind: action
  command: "xConfiguration NetworkPort [n] Mode"
  params: []

- id: x_configuration_network_services_http_mode
  label: "xConfiguration NetworkServices HTTP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Mode"
  params: []

- id: x_configuration_network_services_cdp_mode
  label: "xConfiguration NetworkServices CDP Mode"
  kind: action
  command: "xConfiguration NetworkServices CDP Mode"
  params: []

- id: x_configuration_network_services_h323_mode
  label: "xConfiguration NetworkServices H323 Mode"
  kind: action
  command: "xConfiguration NetworkServices H323 Mode"
  params: []

- id: x_configuration_network_services_http_proxy_login_name
  label: "xConfiguration NetworkServices HTTP Proxy LoginName"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy LoginName"
  params: []

- id: x_configuration_network_services_http_proxy_mode
  label: "xConfiguration NetworkServices HTTP Proxy Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Mode"
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

- id: x_configuration_network_services_http_proxy_pacurl
  label: "xConfiguration NetworkServices HTTP Proxy PACUrl"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy PACUrl"
  params: []

- id: x_configuration_network_services_https_strict_transport_security
  label: "xConfiguration NetworkServices HTTPS StrictTransportSecurity"
  kind: action
  command: "xConfiguration NetworkServices HTTPS StrictTransportSecurity"
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

- id: x_configuration_network_services_ntp_mode
  label: "xConfiguration NetworkServices NTP Mode"
  kind: action
  command: "xConfiguration NetworkServices NTP Mode"
  params: []

- id: x_configuration_network_services_ntp_server_n_address
  label: "xConfiguration NetworkServices NTP Server [n] Address"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] Address"
  params: []

- id: x_configuration_network_services_sip_mode
  label: "xConfiguration NetworkServices SIP Mode"
  kind: action
  command: "xConfiguration NetworkServices SIP Mode"
  params: []

- id: x_configuration_network_services_snmp_mode
  label: "xConfiguration NetworkServices SNMP Mode"
  kind: action
  command: "xConfiguration NetworkServices SNMP Mode"
  params: []

- id: x_configuration_network_services_snmp_host_n_address
  label: "xConfiguration NetworkServices SNMP Host [n] Address"
  kind: action
  command: "xConfiguration NetworkServices SNMP Host [n] Address"
  params: []

- id: x_configuration_network_services_snmp_community_name
  label: "xConfiguration NetworkServices SNMP CommunityName"
  kind: action
  command: "xConfiguration NetworkServices SNMP CommunityName"
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

- id: x_configuration_network_services_snmp_system_contact
  label: "xConfiguration NetworkServices SNMP SystemContact"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemContact"
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

- id: x_configuration_network_services_telnet_mode
  label: "xConfiguration NetworkServices Telnet Mode"
  kind: action
  command: "xConfiguration NetworkServices Telnet Mode"
  params: []

- id: x_configuration_network_services_welcome_text
  label: "xConfiguration NetworkServices WelcomeText"
  kind: action
  command: "xConfiguration NetworkServices WelcomeText"
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

- id: x_configuration_provisioning_external_manager_address
  label: "xConfiguration Provisioning ExternalManager Address"
  kind: action
  command: "xConfiguration Provisioning ExternalManager Address"
  params: []

- id: x_configuration_provisioning_connectivity
  label: "xConfiguration Provisioning Connectivity"
  kind: action
  command: "xConfiguration Provisioning Connectivity"
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

- id: x_configuration_proximity_services_call_control
  label: "xConfiguration Proximity Services CallControl"
  kind: action
  command: "xConfiguration Proximity Services CallControl"
  params: []

- id: x_configuration_proximity_mode
  label: "xConfiguration Proximity Mode"
  kind: action
  command: "xConfiguration Proximity Mode"
  params: []

- id: x_configuration_proximity_services_content_share_from_clients
  label: "xConfiguration Proximity Services ContentShare FromClients"
  kind: action
  command: "xConfiguration Proximity Services ContentShare FromClients"
  params: []

- id: x_configuration_proximity_services_content_share_to_clients
  label: "xConfiguration Proximity Services ContentShare ToClients"
  kind: action
  command: "xConfiguration Proximity Services ContentShare ToClients"
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

- id: x_configuration_serial_port_mode
  label: "xConfiguration SerialPort Mode"
  kind: action
  command: "xConfiguration SerialPort Mode"
  params: []

- id: x_configuration_serial_port_baud_rate
  label: "xConfiguration SerialPort BaudRate"
  kind: action
  command: "xConfiguration SerialPort BaudRate"
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

- id: x_configuration_sip_ice_default_candidate
  label: "xConfiguration SIP Ice DefaultCandidate"
  kind: action
  command: "xConfiguration SIP Ice DefaultCandidate"
  params: []

- id: x_configuration_sip_display_name
  label: "xConfiguration SIP DisplayName"
  kind: action
  command: "xConfiguration SIP DisplayName"
  params: []

- id: x_configuration_sip_ice_mode
  label: "xConfiguration SIP Ice Mode"
  kind: action
  command: "xConfiguration SIP Ice Mode"
  params: []

- id: x_configuration_sip_listen_port
  label: "xConfiguration SIP ListenPort"
  kind: action
  command: "xConfiguration SIP ListenPort"
  params: []

- id: x_configuration_sip_turn_server
  label: "xConfiguration SIP Turn Server"
  kind: action
  command: "xConfiguration SIP Turn Server"
  params: []

- id: x_configuration_sip_proxy_n_address
  label: "xConfiguration SIP Proxy [n] Address"
  kind: action
  command: "xConfiguration SIP Proxy [n] Address"
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

- id: x_configuration_standby_boot_action
  label: "xConfiguration Standby BootAction"
  kind: action
  command: "xConfiguration Standby BootAction"
  params: []

- id: x_configuration_sip_uri
  label: "xConfiguration SIP URI"
  kind: action
  command: "xConfiguration SIP URI"
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

- id: x_configuration_standby_delay
  label: "xConfiguration Standby Delay"
  kind: action
  command: "xConfiguration Standby Delay"
  params: []

- id: x_configuration_standby_wakeup_action
  label: "xConfiguration Standby WakeupAction"
  kind: action
  command: "xConfiguration Standby WakeupAction"
  params: []

- id: x_configuration_standby_wakeup_on_motion_detection
  label: "xConfiguration Standby WakeupOnMotionDetection"
  kind: action
  command: "xConfiguration Standby WakeupOnMotionDetection"
  params: []

- id: x_configuration_standby_power_save
  label: "xConfiguration Standby PowerSave"
  kind: action
  command: "xConfiguration Standby PowerSave"
  params: []

- id: x_configuration_system_unit_crash_reporting_url
  label: "xConfiguration SystemUnit CrashReporting Url"
  kind: action
  command: "xConfiguration SystemUnit CrashReporting Url"
  params: []

- id: x_configuration_system_unit_name
  label: "xConfiguration SystemUnit Name"
  kind: action
  command: "xConfiguration SystemUnit Name"
  params: []

- id: x_configuration_system_unit_crash_reporting_mode
  label: "xConfiguration SystemUnit CrashReporting Mode"
  kind: action
  command: "xConfiguration SystemUnit CrashReporting Mode"
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

- id: x_configuration_time_date_format
  label: "xConfiguration Time DateFormat"
  kind: action
  command: "xConfiguration Time DateFormat"
  params: []

- id: x_configuration_time_work_day_start
  label: "xConfiguration Time WorkDay Start"
  kind: action
  command: "xConfiguration Time WorkDay Start"
  params: []

- id: x_configuration_time_work_day_end
  label: "xConfiguration Time WorkDay End"
  kind: action
  command: "xConfiguration Time WorkDay End"
  params: []

- id: x_configuration_time_work_week_first_day_of_week
  label: "xConfiguration Time WorkWeek FirstDayOfWeek"
  kind: action
  command: "xConfiguration Time WorkWeek FirstDayOfWeek"
  params: []

- id: x_configuration_time_work_week_last_day_of_week
  label: "xConfiguration Time WorkWeek LastDayOfWeek"
  kind: action
  command: "xConfiguration Time WorkWeek LastDayOfWeek"
  params: []

- id: x_configuration_user_interface_contact_info_type
  label: "xConfiguration UserInterface ContactInfo Type"
  kind: action
  command: "xConfiguration UserInterface ContactInfo Type"
  params: []

- id: x_configuration_user_interface_accessibility_incoming_call_notification
  label: "xConfiguration UserInterface Accessibility IncomingCallNotification"
  kind: action
  command: "xConfiguration UserInterface Accessibility IncomingCallNotification"
  params: []

- id: x_configuration_user_interface_custom_message
  label: "xConfiguration UserInterface CustomMessage"
  kind: action
  command: "xConfiguration UserInterface CustomMessage"
  params: []

- id: x_configuration_user_interface_language
  label: "xConfiguration UserInterface Language"
  kind: action
  command: "xConfiguration UserInterface Language"
  params: []

- id: x_configuration_user_interface_key_tones_mode
  label: "xConfiguration UserInterface KeyTones Mode"
  kind: action
  command: "xConfiguration UserInterface KeyTones Mode"
  params: []

- id: x_configuration_user_interface_osd_halfwake_message
  label: "xConfiguration UserInterface OSD HalfwakeMessage"
  kind: action
  command: "xConfiguration UserInterface OSD HalfwakeMessage"
  params: []

- id: x_configuration_user_interface_osd_output
  label: "xConfiguration UserInterface OSD Output"
  kind: action
  command: "xConfiguration UserInterface OSD Output"
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

- id: x_configuration_user_management_ldap_admin_filter
  label: "xConfiguration UserManagement LDAP Admin Filter"
  kind: action
  command: "xConfiguration UserManagement LDAP Admin Filter"
  params: []

- id: x_configuration_user_management_ldap_admin_group
  label: "xConfiguration UserManagement LDAP Admin Group"
  kind: action
  command: "xConfiguration UserManagement LDAP Admin Group"
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

- id: x_configuration_user_management_ldap_encryption
  label: "xConfiguration UserManagement LDAP Encryption"
  kind: action
  command: "xConfiguration UserManagement LDAP Encryption"
  params: []

- id: x_configuration_user_management_ldap_minimum_tlsversion
  label: "xConfiguration UserManagement LDAP MinimumTLSVersion"
  kind: action
  command: "xConfiguration UserManagement LDAP MinimumTLSVersion"
  params: []

- id: x_configuration_user_management_ldap_mode
  label: "xConfiguration UserManagement LDAP Mode"
  kind: action
  command: "xConfiguration UserManagement LDAP Mode"
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

- id: x_configuration_video_input_connector_n_camera_control_camera_id
  label: "xConfiguration Video Input Connector [n] CameraControl CameraId"
  kind: action
  command: "xConfiguration Video Input Connector [n] CameraControl CameraId"
  params: []

- id: x_configuration_video_default_main_source
  label: "xConfiguration Video DefaultMainSource"
  kind: action
  command: "xConfiguration Video DefaultMainSource"
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

- id: x_configuration_video_input_connector_n_dvi_type
  label: "xConfiguration Video Input Connector [n] DviType"
  kind: action
  command: "xConfiguration Video Input Connector [n] DviType"
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

- id: x_configuration_video_input_connector_n_visibility
  label: "xConfiguration Video Input Connector [n] Visibility"
  kind: action
  command: "xConfiguration Video Input Connector [n] Visibility"
  params: []

- id: x_configuration_video_monitors
  label: "xConfiguration Video Monitors"
  kind: action
  command: "xConfiguration Video Monitors"
  params: []

- id: x_configuration_video_output_connector_n_cec_mode
  label: "xConfiguration Video Output Connector [n] CEC Mode"
  kind: action
  command: "xConfiguration Video Output Connector [n] CEC Mode"
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

- id: x_configuration_video_presentation_default_source
  label: "xConfiguration Video Presentation DefaultSource"
  kind: action
  command: "xConfiguration Video Presentation DefaultSource"
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

- id: x_configuration_video_selfview_mirrored
  label: "xConfiguration Video Selfview Mirrored"
  kind: action
  command: "xConfiguration Video Selfview Mirrored"
  params: []

- id: x_configuration_video_selfview_on_call_duration
  label: "xConfiguration Video Selfview OnCall Duration"
  kind: action
  command: "xConfiguration Video Selfview OnCall Duration"
  params: []

- id: x_configuration_video_selfview_on_call_mode
  label: "xConfiguration Video Selfview OnCall Mode"
  kind: action
  command: "xConfiguration Video Selfview OnCall Mode"
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

- id: x_command_audio_sounds_and_alerts_ringtone_stop
  label: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone Stop"
  params: []

- id: x_command_audio_sounds_and_alerts_ringtone_list
  label: "xCommand Audio SoundsAndAlerts Ringtone List"
  kind: action
  command: "xCommand Audio SoundsAndAlerts Ringtone List"
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

- id: x_command_audio_vu_meter_stop_all
  label: "xCommand Audio VuMeter StopAll"
  kind: action
  command: "xCommand Audio VuMeter StopAll"
  params: []

- id: x_command_bookings_clear
  label: "xCommand Bookings Clear"
  kind: action
  command: "xCommand Bookings Clear"
  params: []

- id: x_command_bookings_get
  label: "xCommand Bookings Get"
  kind: action
  command: "xCommand Bookings Get"
  params: []

- id: x_command_bookings_list
  label: "xCommand Bookings List"
  kind: action
  command: "xCommand Bookings List"
  params: []

- id: x_command_bookings_notification_snooze
  label: "xCommand Bookings NotificationSnooze"
  kind: action
  command: "xCommand Bookings NotificationSnooze"
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

- id: x_command_call_far_end_control_room_preset_activate
  label: "xCommand Call FarEndControl RoomPreset Activate"
  kind: action
  command: "xCommand Call FarEndControl RoomPreset Activate"
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

- id: x_command_call_far_end_message_sstring_send
  label: "xCommand Call FarEndMessage SStringSend"
  kind: action
  command: "xCommand Call FarEndMessage SStringSend"
  params: []

- id: x_command_call_far_end_message_tstring_send
  label: "xCommand Call FarEndMessage TStringSend"
  kind: action
  command: "xCommand Call FarEndMessage TStringSend"
  params: []

- id: x_command_call_forward
  label: "xCommand Call Forward"
  kind: action
  command: "xCommand Call Forward"
  params: []

- id: x_command_call_ignore
  label: "xCommand Call Ignore"
  kind: action
  command: "xCommand Call Ignore"
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

- id: x_command_call_unattended_transfer
  label: "xCommand Call UnattendedTransfer"
  kind: action
  command: "xCommand Call UnattendedTransfer"
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

- id: x_command_call_history_delete_all
  label: "xCommand CallHistory DeleteAll"
  kind: action
  command: "xCommand CallHistory DeleteAll"
  params: []

- id: x_command_call_history_acknowledge_missed_call
  label: "xCommand CallHistory AcknowledgeMissedCall"
  kind: action
  command: "xCommand CallHistory AcknowledgeMissedCall"
  params: []

- id: x_command_call_history_delete_entry
  label: "xCommand CallHistory DeleteEntry"
  kind: action
  command: "xCommand CallHistory DeleteEntry"
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

- id: x_command_cameras_auto_focus_diagnostics_start
  label: "xCommand Cameras AutoFocus Diagnostics Start"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Start"
  params: []

- id: x_command_cameras_auto_focus_diagnostics_stop
  label: "xCommand Cameras AutoFocus Diagnostics Stop"
  kind: action
  command: "xCommand Cameras AutoFocus Diagnostics Stop"
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

- id: x_command_cameras_speaker_track_deactivate
  label: "xCommand Cameras SpeakerTrack Deactivate"
  kind: action
  command: "xCommand Cameras SpeakerTrack Deactivate"
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

- id: x_command_cameras_speaker_track_diagnostics_stop
  label: "xCommand Cameras SpeakerTrack Diagnostics Stop"
  kind: action
  command: "xCommand Cameras SpeakerTrack Diagnostics Stop"
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

- id: x_command_cameras_speaker_track_whiteboard_store_position
  label: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  kind: action
  command: "xCommand Cameras SpeakerTrack Whiteboard StorePosition"
  params: []

- id: x_command_conference_speaker_lock_set
  label: "xCommand Conference SpeakerLock Set"
  kind: action
  command: "xCommand Conference SpeakerLock Set"
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

- id: x_command_conference_speaker_lock_release
  label: "xCommand Conference SpeakerLock Release"
  kind: action
  command: "xCommand Conference SpeakerLock Release"
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

- id: x_command_http_feedback_register
  label: "xCommand HttpFeedback Register"
  kind: action
  command: "xCommand HttpFeedback Register"
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

- id: x_command_macros_log_clear
  label: "xCommand Macros Log Clear"
  kind: action
  command: "xCommand Macros Log Clear"
  params: []

- id: x_command_macros_macro_activate
  label: "xCommand Macros Macro Activate"
  kind: action
  command: "xCommand Macros Macro Activate"
  params: []

- id: x_command_macros_log_get
  label: "xCommand Macros Log Get"
  kind: action
  command: "xCommand Macros Log Get"
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

- id: x_command_macros_macro_remove
  label: "xCommand Macros Macro Remove"
  kind: action
  command: "xCommand Macros Macro Remove"
  params: []

- id: x_command_macros_macro_roles_set
  label: "xCommand Macros Macro Roles Set"
  kind: action
  command: "xCommand Macros Macro Roles Set"
  params: []

- id: x_command_macros_macro_save
  label: "xCommand Macros Macro Save"
  kind: action
  command: "xCommand Macros Macro Save"
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

- id: x_command_message_send
  label: "xCommand Message Send"
  kind: action
  command: "xCommand Message Send"
  params: []

- id: x_command_macros_runtime_status
  label: "xCommand Macros Runtime Status"
  kind: action
  command: "xCommand Macros Runtime Status"
  params: []

- id: x_command_macros_runtime_stop
  label: "xCommand Macros Runtime Stop"
  kind: action
  command: "xCommand Macros Runtime Stop"
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

- id: x_command_peripherals_pairing_device_discovery_start
  label: "xCommand Peripherals Pairing DeviceDiscovery Start"
  kind: action
  command: "xCommand Peripherals Pairing DeviceDiscovery Start"
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

- id: x_command_peripherals_purge
  label: "xCommand Peripherals Purge"
  kind: action
  command: "xCommand Peripherals Purge"
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

- id: x_command_phonebook_contact_delete
  label: "xCommand Phonebook Contact Delete"
  kind: action
  command: "xCommand Phonebook Contact Delete"
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

- id: x_command_room_preset_activate
  label: "xCommand RoomPreset Activate"
  kind: action
  command: "xCommand RoomPreset Activate"
  params: []

- id: x_command_proximity_services_deactivate
  label: "xCommand Proximity Services Deactivate"
  kind: action
  command: "xCommand Proximity Services Deactivate"
  params: []

- id: x_command_room_preset_clear
  label: "xCommand RoomPreset Clear"
  kind: action
  command: "xCommand RoomPreset Clear"
  params: []

- id: x_command_room_preset_store
  label: "xCommand RoomPreset Store"
  kind: action
  command: "xCommand RoomPreset Store"
  params: []

- id: x_command_security_certificates_ca_add
  label: "xCommand Security Certificates CA Add"
  kind: action
  command: "xCommand Security Certificates CA Add"
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

- id: x_command_security_certificates_services_add
  label: "xCommand Security Certificates Services Add"
  kind: action
  command: "xCommand Security Certificates Services Add"
  params: []

- id: x_command_security_certificates_services_activate
  label: "xCommand Security Certificates Services Activate"
  kind: action
  command: "xCommand Security Certificates Services Activate"
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

- id: x_command_security_fipsmode_activate
  label: "xCommand Security FIPSMode Activate"
  kind: action
  command: "xCommand Security FIPSMode Activate"
  params: []

- id: x_command_security_certificates_services_show
  label: "xCommand Security Certificates Services Show"
  kind: action
  command: "xCommand Security Certificates Services Show"
  params: []

- id: x_command_security_persistency
  label: "xCommand Security Persistency"
  kind: action
  command: "xCommand Security Persistency"
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

- id: x_command_standby_reset_halfwake_timer
  label: "xCommand Standby ResetHalfwakeTimer"
  kind: action
  command: "xCommand Standby ResetHalfwakeTimer"
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

- id: x_command_standby_reset_timer
  label: "xCommand Standby ResetTimer"
  kind: action
  command: "xCommand Standby ResetTimer"
  params: []

- id: x_command_system_unit_factory_reset
  label: "xCommand SystemUnit FactoryReset"
  kind: action
  command: "xCommand SystemUnit FactoryReset"
  params: []

- id: x_command_system_unit_boot
  label: "xCommand SystemUnit Boot"
  kind: action
  command: "xCommand SystemUnit Boot"
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

- id: x_command_system_unit_first_time_wizard_stop
  label: "xCommand SystemUnit FirstTimeWizard Stop"
  kind: action
  command: "xCommand SystemUnit FirstTimeWizard Stop"
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

- id: x_command_system_unit_product_platform_set
  label: "xCommand SystemUnit ProductPlatform Set"
  kind: action
  command: "xCommand SystemUnit ProductPlatform Set"
  params: []

- id: x_command_system_unit_option_key_remove_all
  label: "xCommand SystemUnit OptionKey RemoveAll"
  kind: action
  command: "xCommand SystemUnit OptionKey RemoveAll"
  params: []

- id: x_command_system_unit_sign_in_banner_clear
  label: "xCommand SystemUnit SignInBanner Clear"
  kind: action
  command: "xCommand SystemUnit SignInBanner Clear"
  params: []

- id: x_command_system_unit_sign_in_banner_get
  label: "xCommand SystemUnit SignInBanner Get"
  kind: action
  command: "xCommand SystemUnit SignInBanner Get"
  params: []

- id: x_command_system_unit_software_upgrade
  label: "xCommand SystemUnit SoftwareUpgrade"
  kind: action
  command: "xCommand SystemUnit SoftwareUpgrade"
  params: []

- id: x_command_system_unit_sign_in_banner_set
  label: "xCommand SystemUnit SignInBanner Set"
  kind: action
  command: "xCommand SystemUnit SignInBanner Set"
  params: []

- id: x_command_system_unit_welcome_banner_clear
  label: "xCommand SystemUnit WelcomeBanner Clear"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Clear"
  params: []

- id: x_command_system_unit_soft_reset
  label: "xCommand SystemUnit SoftReset"
  kind: action
  command: "xCommand SystemUnit SoftReset"
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

- id: x_command_user_interface_branding_clear
  label: "xCommand UserInterface Branding Clear"
  kind: action
  command: "xCommand UserInterface Branding Clear"
  params: []

- id: x_command_user_interface_branding_get
  label: "xCommand UserInterface Branding Get"
  kind: action
  command: "xCommand UserInterface Branding Get"
  params: []

- id: x_command_user_interface_branding_delete
  label: "xCommand UserInterface Branding Delete"
  kind: action
  command: "xCommand UserInterface Branding Delete"
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

- id: x_command_user_interface_extensions_panel_clicked
  label: "xCommand UserInterface Extensions Panel Clicked"
  kind: action
  command: "xCommand UserInterface Extensions Panel Clicked"
  params: []

- id: x_command_user_interface_extensions_clear
  label: "xCommand UserInterface Extensions Clear"
  kind: action
  command: "xCommand UserInterface Extensions Clear"
  params: []

- id: x_command_user_interface_extensions_panel_close
  label: "xCommand UserInterface Extensions Panel Close"
  kind: action
  command: "xCommand UserInterface Extensions Panel Close"
  params: []

- id: x_command_user_interface_extensions_list
  label: "xCommand UserInterface Extensions List"
  kind: action
  command: "xCommand UserInterface Extensions List"
  params: []

- id: x_command_user_interface_extensions_panel_remove
  label: "xCommand UserInterface Extensions Panel Remove"
  kind: action
  command: "xCommand UserInterface Extensions Panel Remove"
  params: []

- id: x_command_user_interface_extensions_panel_save
  label: "xCommand UserInterface Extensions Panel Save"
  kind: action
  command: "xCommand UserInterface Extensions Panel Save"
  params: []

- id: x_command_user_interface_extensions_widget_action
  label: "xCommand UserInterface Extensions Widget Action"
  kind: action
  command: "xCommand UserInterface Extensions Widget Action"
  params: []

- id: x_command_user_interface_extensions_set
  label: "xCommand UserInterface Extensions Set"
  kind: action
  command: "xCommand UserInterface Extensions Set"
  params: []

- id: x_command_user_interface_extensions_widget_set_value
  label: "xCommand UserInterface Extensions Widget SetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget SetValue"
  params: []

- id: x_command_user_interface_message_alert_clear
  label: "xCommand UserInterface Message Alert Clear"
  kind: action
  command: "xCommand UserInterface Message Alert Clear"
  params: []

- id: x_command_user_interface_extensions_widget_unset_value
  label: "xCommand UserInterface Extensions Widget UnsetValue"
  kind: action
  command: "xCommand UserInterface Extensions Widget UnsetValue"
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

- id: x_command_user_interface_message_text_input_display
  label: "xCommand UserInterface Message TextInput Display"
  kind: action
  command: "xCommand UserInterface Message TextInput Display"
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

- id: x_command_user_interface_osd_key_click
  label: "xCommand UserInterface OSD Key Click"
  kind: action
  command: "xCommand UserInterface OSD Key Click"
  params: []

- id: x_command_user_interface_osd_key_press
  label: "xCommand UserInterface OSD Key Press"
  kind: action
  command: "xCommand UserInterface OSD Key Press"
  params: []

- id: x_command_user_interface_osd_key_release
  label: "xCommand UserInterface OSD Key Release"
  kind: action
  command: "xCommand UserInterface OSD Key Release"
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

- id: x_command_user_interface_presentation_external_source_select
  label: "xCommand UserInterface Presentation ExternalSource Select"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource Select"
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

- id: x_command_user_interface_presentation_external_source_state_set
  label: "xCommand UserInterface Presentation ExternalSource State Set"
  kind: action
  command: "xCommand UserInterface Presentation ExternalSource State Set"
  params: []

- id: x_command_user_management_remote_support_user_create
  label: "xCommand UserManagement RemoteSupportUser Create"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser Create"
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

- id: x_command_user_management_remote_support_user_get_state
  label: "xCommand UserManagement RemoteSupportUser GetState"
  kind: action
  command: "xCommand UserManagement RemoteSupportUser GetState"
  params: []

- id: x_command_user_management_user_get
  label: "xCommand UserManagement User Get"
  kind: action
  command: "xCommand UserManagement User Get"
  params: []

- id: x_command_user_management_user_delete
  label: "xCommand UserManagement User Delete"
  kind: action
  command: "xCommand UserManagement User Delete"
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

- id: x_command_user_management_user_passphrase_set
  label: "xCommand UserManagement User Passphrase Set"
  kind: action
  command: "xCommand UserManagement User Passphrase Set"
  params: []

- id: x_command_video_active_speaker_pip_set
  label: "xCommand Video ActiveSpeakerPIP Set"
  kind: action
  command: "xCommand Video ActiveSpeakerPIP Set"
  params: []

- id: x_command_user_management_user_unblock
  label: "xCommand UserManagement User Unblock"
  kind: action
  command: "xCommand UserManagement User Unblock"
  params: []

- id: x_command_video_cec_input_key_click
  label: "xCommand Video CEC Input KeyClick"
  kind: action
  command: "xCommand Video CEC Input KeyClick"
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

- id: x_command_video_layout_layout_family_set
  label: "xCommand Video Layout LayoutFamily Set"
  kind: action
  command: "xCommand Video Layout LayoutFamily Set"
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

- id: x_command_video_matrix_swap
  label: "xCommand Video Matrix Swap"
  kind: action
  command: "xCommand Video Matrix Swap"
  params: []

- id: x_command_video_matrix_unassign
  label: "xCommand Video Matrix Unassign"
  kind: action
  command: "xCommand Video Matrix Unassign"
  params: []

- id: x_command_video_output_monitor_backlight_set
  label: "xCommand Video Output Monitor Backlight Set"
  kind: action
  command: "xCommand Video Output Monitor Backlight Set"
  params: []

- id: x_command_video_output_monitor_brightness_set
  label: "xCommand Video Output Monitor Brightness Set"
  kind: action
  command: "xCommand Video Output Monitor Brightness Set"
  params: []

- id: x_command_video_output_monitor_color_blue_set
  label: "xCommand Video Output Monitor Color Blue Set"
  kind: action
  command: "xCommand Video Output Monitor Color Blue Set"
  params: []

- id: x_command_video_output_monitor_color_green_set
  label: "xCommand Video Output Monitor Color Green Set"
  kind: action
  command: "xCommand Video Output Monitor Color Green Set"
  params: []

- id: x_command_video_output_monitor_color_red_set
  label: "xCommand Video Output Monitor Color Red Set"
  kind: action
  command: "xCommand Video Output Monitor Color Red Set"
  params: []

- id: x_command_video_output_monitor_color_select
  label: "xCommand Video Output Monitor Color Select"
  kind: action
  command: "xCommand Video Output Monitor Color Select"
  params: []

- id: x_command_video_output_monitor_contrast_set
  label: "xCommand Video Output Monitor Contrast Set"
  kind: action
  command: "xCommand Video Output Monitor Contrast Set"
  params: []

- id: x_command_video_output_monitor_csc_select
  label: "xCommand Video Output Monitor CSC Select"
  kind: action
  command: "xCommand Video Output Monitor CSC Select"
  params: []

- id: x_command_video_output_monitor_gamma_set
  label: "xCommand Video Output Monitor Gamma Set"
  kind: action
  command: "xCommand Video Output Monitor Gamma Set"
  params: []

- id: x_command_video_output_monitor_reset
  label: "xCommand Video Output Monitor Reset"
  kind: action
  command: "xCommand Video Output Monitor Reset"
  params: []

- id: x_command_video_output_monitor_sharpness_set
  label: "xCommand Video Output Monitor Sharpness Set"
  kind: action
  command: "xCommand Video Output Monitor Sharpness Set"
  params: []

- id: x_command_video_presentation_view_set
  label: "xCommand Video PresentationView Set"
  kind: action
  command: "xCommand Video PresentationView Set"
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
```

## Feedbacks
```yaml
- id: x_status_audio_devices_handset_usb_connection_status
  label: "xStatus Audio Devices HandsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB ConnectionStatus"

- id: x_status_audio_devices_headset_analog_connection_status
  label: "xStatus Audio Devices HeadsetAnalog Connection Status"
  kind: query
  query_command: "xStatus Audio Devices HeadsetAnalog Connection Status"

- id: x_status_audio_devices_handset_usb_cradle
  label: "xStatus Audio Devices HandsetUSB Cradle"
  kind: query
  query_command: "xStatus Audio Devices HandsetUSB Cradle"

- id: x_status_audio_devices_headset_analog_has_microphone
  label: "xStatus Audio Devices HeadsetAnalog HasMicrophone"
  kind: query
  query_command: "xStatus Audio Devices HeadsetAnalog HasMicrophone"

- id: x_status_audio_devices_headset_usb_connection_status
  label: "xStatus Audio Devices HeadsetUSB ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB ConnectionStatus"

- id: x_status_audio_devices_headset_usb_description
  label: "xStatus Audio Devices HeadsetUSB Description"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Description"

- id: x_status_audio_devices_headset_usb_manufacturer
  label: "xStatus Audio Devices HeadsetUSB Manufacturer"
  kind: query
  query_command: "xStatus Audio Devices HeadsetUSB Manufacturer"

- id: x_status_audio_input_connectors_arc_n_ec_reference_delay
  label: "xStatus Audio Input Connectors ARC [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors ARC [n] EcReferenceDelay"

- id: x_status_audio_input_connectors_hdmi_n_ec_reference_delay
  label: "xStatus Audio Input Connectors HDMI [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors HDMI [n] EcReferenceDelay"

- id: x_status_audio_input_connectors_microphone_n_connection_status
  label: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] ConnectionStatus"

- id: x_status_audio_input_connectors_microphone_n_ec_reference_delay
  label: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"
  kind: query
  query_command: "xStatus Audio Input Connectors Microphone [n] EcReferenceDelay"

- id: x_status_audio_input_key_click_attenuate
  label: "xStatus Audio Input KeyClick Attenuate"
  kind: query
  query_command: "xStatus Audio Input KeyClick Attenuate"

- id: x_status_audio_input_key_click_detected
  label: "xStatus Audio Input KeyClick Detected"
  kind: query
  query_command: "xStatus Audio Input KeyClick Detected"

- id: x_status_audio_input_local_input_n_agc
  label: "xStatus Audio Input LocalInput [n] AGC"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] AGC"

- id: x_status_audio_input_local_input_n_channels
  label: "xStatus Audio Input LocalInput [n] Channels"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Channels"

- id: x_status_audio_input_key_click_enabled
  label: "xStatus Audio Input KeyClick Enabled"
  kind: query
  query_command: "xStatus Audio Input KeyClick Enabled"

- id: x_status_audio_input_local_input_n_connector
  label: "xStatus Audio Input LocalInput [n] Connector"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Connector"

- id: x_status_audio_input_local_input_n_direct
  label: "xStatus Audio Input LocalInput [n] Direct"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Direct"

- id: x_status_audio_input_local_input_n_mixer_mode
  label: "xStatus Audio Input LocalInput [n] MixerMode"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] MixerMode"

- id: x_status_audio_input_local_input_n_mute
  label: "xStatus Audio Input LocalInput [n] Mute"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Mute"

- id: x_status_audio_input_local_input_n_name
  label: "xStatus Audio Input LocalInput [n] Name"
  kind: query
  query_command: "xStatus Audio Input LocalInput [n] Name"

- id: x_status_audio_microphones_mute
  label: "xStatus Audio Microphones Mute"
  kind: query
  query_command: "xStatus Audio Microphones Mute"

- id: x_status_audio_input_remote_input_n_call_id
  label: "xStatus Audio Input RemoteInput [n] CallId"
  kind: query
  query_command: "xStatus Audio Input RemoteInput [n] CallId"

- id: x_status_audio_output_connectors_arc_n_delay_ms
  label: "xStatus Audio Output Connectors ARC [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] DelayMs"

- id: x_status_audio_output_connectors_hdmi_n_delay_ms
  label: "xStatus Audio Output Connectors HDMI [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] DelayMs"

- id: x_status_audio_output_connectors_hdmi_n_mode
  label: "xStatus Audio Output Connectors HDMI [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] Mode"

- id: x_status_audio_output_connectors_internal_speaker_n_delay_ms
  label: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors InternalSpeaker [n] DelayMs"

- id: x_status_audio_output_connectors_arc_n_mode
  label: "xStatus Audio Output Connectors ARC [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] Mode"

- id: x_status_audio_output_connectors_internal_speaker_n_mode
  label: "xStatus Audio Output Connectors InternalSpeaker [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors InternalSpeaker [n] Mode"

- id: x_status_audio_output_connectors_line_n_connection_status
  label: "xStatus Audio Output Connectors Line [n] ConnectionStatus"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] ConnectionStatus"

- id: x_status_audio_output_connectors_line_n_delay_ms
  label: "xStatus Audio Output Connectors Line [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors Line [n] DelayMs"

- id: x_status_audio_output_local_output_n_channels
  label: "xStatus Audio Output LocalOutput [n] Channels"
  kind: query
  query_command: "xStatus Audio Output LocalOutput [n] Channels"

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

- id: x_status_audio_output_measured_hdmi_arc_delay
  label: "xStatus Audio Output MeasuredHdmiArcDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiArcDelay"

- id: x_status_audio_output_measured_hdmi_delay
  label: "xStatus Audio Output MeasuredHdmiDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiDelay"

- id: x_status_audio_output_measured_hdmi_cec_delay
  label: "xStatus Audio Output MeasuredHdmiCecDelay"
  kind: query
  query_command: "xStatus Audio Output MeasuredHdmiCecDelay"

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

- id: x_status_audio_volume_mute
  label: "xStatus Audio VolumeMute"
  kind: query
  query_command: "xStatus Audio VolumeMute"

- id: x_status_bookings_current_id
  label: "xStatus Bookings Current Id"
  kind: query
  query_command: "xStatus Bookings Current Id"

- id: x_status_call_n_callback_number
  label: "xStatus Call [n] CallbackNumber"
  kind: query
  query_command: "xStatus Call [n] CallbackNumber"

- id: x_status_call_n_answer_state
  label: "xStatus Call [n] AnswerState"
  kind: query
  query_command: "xStatus Call [n] AnswerState"

- id: x_status_call_n_attended_transfer_from
  label: "xStatus Call [n] AttendedTransferFrom"
  kind: query
  query_command: "xStatus Call [n] AttendedTransferFrom"

- id: x_status_call_n_call_type
  label: "xStatus Call [n] CallType"
  kind: query
  query_command: "xStatus Call [n] CallType"

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

- id: x_status_call_n_hold_reason
  label: "xStatus Call [n] HoldReason"
  kind: query
  query_command: "xStatus Call [n] HoldReason"

- id: x_status_call_n_facility_service_id
  label: "xStatus Call [n] FacilityServiceId"
  kind: query
  query_command: "xStatus Call [n] FacilityServiceId"

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

- id: x_status_call_n_remote_number
  label: "xStatus Call [n] RemoteNumber"
  kind: query
  query_command: "xStatus Call [n] RemoteNumber"

- id: x_status_call_n_status
  label: "xStatus Call [n] Status"
  kind: query
  query_command: "xStatus Call [n] Status"

- id: x_status_call_n_transmit_call_rate
  label: "xStatus Call [n] TransmitCallRate"
  kind: query
  query_command: "xStatus Call [n] TransmitCallRate"

- id: x_status_cameras_camera_n_capabilities_options
  label: "xStatus Cameras Camera [n] Capabilities Options"
  kind: query
  query_command: "xStatus Cameras Camera [n] Capabilities Options"

- id: x_status_cameras_camera_n_connected
  label: "xStatus Cameras Camera [n] Connected"
  kind: query
  query_command: "xStatus Cameras Camera [n] Connected"

- id: x_status_cameras_camera_n_detected_connector
  label: "xStatus Cameras Camera [n] DetectedConnector"
  kind: query
  query_command: "xStatus Cameras Camera [n] DetectedConnector"

- id: x_status_cameras_camera_n_hardware_id
  label: "xStatus Cameras Camera [n] HardwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] HardwareID"

- id: x_status_cameras_camera_n_flip
  label: "xStatus Cameras Camera [n] Flip"
  kind: query
  query_command: "xStatus Cameras Camera [n] Flip"

- id: x_status_cameras_camera_n_lighting_conditions
  label: "xStatus Cameras Camera [n] LightingConditions"
  kind: query
  query_command: "xStatus Cameras Camera [n] LightingConditions"

- id: x_status_cameras_camera_n_framerate
  label: "xStatus Cameras Camera [n] Framerate"
  kind: query
  query_command: "xStatus Cameras Camera [n] Framerate"

- id: x_status_cameras_camera_n_mac_address
  label: "xStatus Cameras Camera [n] MacAddress"
  kind: query
  query_command: "xStatus Cameras Camera [n] MacAddress"

- id: x_status_cameras_camera_n_model
  label: "xStatus Cameras Camera [n] Model"
  kind: query
  query_command: "xStatus Cameras Camera [n] Model"

- id: x_status_cameras_camera_n_position_focus
  label: "xStatus Cameras Camera [n] Position Focus"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Focus"

- id: x_status_cameras_camera_n_manufacturer
  label: "xStatus Cameras Camera [n] Manufacturer"
  kind: query
  query_command: "xStatus Cameras Camera [n] Manufacturer"

- id: x_status_cameras_camera_n_position_lens
  label: "xStatus Cameras Camera [n] Position Lens"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Lens"

- id: x_status_cameras_camera_n_position_tilt
  label: "xStatus Cameras Camera [n] Position Tilt"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Tilt"

- id: x_status_cameras_camera_n_position_pan
  label: "xStatus Cameras Camera [n] Position Pan"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Pan"

- id: x_status_cameras_camera_n_position_zoom
  label: "xStatus Cameras Camera [n] Position Zoom"
  kind: query
  query_command: "xStatus Cameras Camera [n] Position Zoom"

- id: x_status_cameras_camera_n_serial_number
  label: "xStatus Cameras Camera [n] SerialNumber"
  kind: query
  query_command: "xStatus Cameras Camera [n] SerialNumber"

- id: x_status_cameras_presenter_track_availability
  label: "xStatus Cameras PresenterTrack Availability"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Availability"

- id: x_status_cameras_camera_n_software_id
  label: "xStatus Cameras Camera [n] SoftwareID"
  kind: query
  query_command: "xStatus Cameras Camera [n] SoftwareID"

- id: x_status_cameras_presenter_track_presenter_detected
  label: "xStatus Cameras PresenterTrack PresenterDetected"
  kind: query
  query_command: "xStatus Cameras PresenterTrack PresenterDetected"

- id: x_status_cameras_presenter_track_status
  label: "xStatus Cameras PresenterTrack Status"
  kind: query
  query_command: "xStatus Cameras PresenterTrack Status"

- id: x_status_cameras_speaker_track_availability
  label: "xStatus Cameras SpeakerTrack Availability"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Availability"

- id: x_status_cameras_speaker_track_active_connector
  label: "xStatus Cameras SpeakerTrack ActiveConnector"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack ActiveConnector"

- id: x_status_cameras_speaker_track_status
  label: "xStatus Cameras SpeakerTrack Status"
  kind: query
  query_command: "xStatus Cameras SpeakerTrack Status"

- id: x_status_capabilities_conference_max_active_calls
  label: "xStatus Capabilities Conference MaxActiveCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxActiveCalls"

- id: x_status_capabilities_conference_max_calls
  label: "xStatus Capabilities Conference MaxCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxCalls"

- id: x_status_capabilities_conference_max_audio_calls
  label: "xStatus Capabilities Conference MaxAudioCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxAudioCalls"

- id: x_status_capabilities_conference_max_video_calls
  label: "xStatus Capabilities Conference MaxVideoCalls"
  kind: query
  query_command: "xStatus Capabilities Conference MaxVideoCalls"

- id: x_status_conference_active_speaker_call_id
  label: "xStatus Conference ActiveSpeaker CallId"
  kind: query
  query_command: "xStatus Conference ActiveSpeaker CallId"

- id: x_status_conference_call_n_capabilities_farend_message_mode
  label: "xStatus Conference Call [n] Capabilities FarendMessage Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FarendMessage Mode"

- id: x_status_conference_call_n_booking_id
  label: "xStatus Conference Call [n] BookingId"
  kind: query
  query_command: "xStatus Conference Call [n] BookingId"

- id: x_status_conference_call_n_capabilities_fecc_mode
  label: "xStatus Conference Call [n] Capabilities FECC Mode"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC Mode"

- id: x_status_conference_call_n_capabilities_fecc_number_of_presets
  label: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities FECC NumberOfPresets"

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

- id: x_status_conference_call_n_capabilities_presentation
  label: "xStatus Conference Call [n] Capabilities Presentation"
  kind: query
  query_command: "xStatus Conference Call [n] Capabilities Presentation"

- id: x_status_conference_call_n_manufacturer
  label: "xStatus Conference Call [n] Manufacturer"
  kind: query
  query_command: "xStatus Conference Call [n] Manufacturer"

- id: x_status_conference_call_n_microphones_muted
  label: "xStatus Conference Call [n] MicrophonesMuted"
  kind: query
  query_command: "xStatus Conference Call [n] MicrophonesMuted"

- id: x_status_conference_call_n_software_id
  label: "xStatus Conference Call [n] SoftwareID"
  kind: query
  query_command: "xStatus Conference Call [n] SoftwareID"

- id: x_status_conference_do_not_disturb
  label: "xStatus Conference DoNotDisturb"
  kind: query
  query_command: "xStatus Conference DoNotDisturb"

- id: x_status_conference_line_n_mode
  label: "xStatus Conference Line [n] Mode"
  kind: query
  query_command: "xStatus Conference Line [n] Mode"

- id: x_status_conference_multipoint_mode
  label: "xStatus Conference Multipoint Mode"
  kind: query
  query_command: "xStatus Conference Multipoint Mode"

- id: x_status_conference_presentation_call_id
  label: "xStatus Conference Presentation CallId"
  kind: query
  query_command: "xStatus Conference Presentation CallId"

- id: x_status_conference_presentation_local_instance_n_sending_mode
  label: "xStatus Conference Presentation LocalInstance [n] SendingMode"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] SendingMode"

- id: x_status_conference_presentation_local_instance_n_source
  label: "xStatus Conference Presentation LocalInstance [n] Source"
  kind: query
  query_command: "xStatus Conference Presentation LocalInstance [n] Source"

- id: x_status_conference_speaker_lock_call_id
  label: "xStatus Conference SpeakerLock CallId"
  kind: query
  query_command: "xStatus Conference SpeakerLock CallId"

- id: x_status_conference_speaker_lock_mode
  label: "xStatus Conference SpeakerLock Mode"
  kind: query
  query_command: "xStatus Conference SpeakerLock Mode"

- id: x_status_conference_presentation_mode
  label: "xStatus Conference Presentation Mode"
  kind: query
  query_command: "xStatus Conference Presentation Mode"

- id: x_status_diagnostics_message_n_description
  label: "xStatus Diagnostics Message [n] Description"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Description"

- id: x_status_diagnostics_message_n_references
  label: "xStatus Diagnostics Message [n] References"
  kind: query
  query_command: "xStatus Diagnostics Message [n] References"

- id: x_status_diagnostics_message_n_level
  label: "xStatus Diagnostics Message [n] Level"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Level"

- id: x_status_diagnostics_message_n_type
  label: "xStatus Diagnostics Message [n] Type"
  kind: query
  query_command: "xStatus Diagnostics Message [n] Type"

- id: x_status_gpio_pin_n_state
  label: "xStatus GPIO Pin [n] State"
  kind: query
  query_command: "xStatus GPIO Pin [n] State"

- id: x_status_h323_gatekeeper_reason
  label: "xStatus H323 Gatekeeper Reason"
  kind: query
  query_command: "xStatus H323 Gatekeeper Reason"

- id: x_status_h323_gatekeeper_address
  label: "xStatus H323 Gatekeeper Address"
  kind: query
  query_command: "xStatus H323 Gatekeeper Address"

- id: x_status_h323_gatekeeper_port
  label: "xStatus H323 Gatekeeper Port"
  kind: query
  query_command: "xStatus H323 Gatekeeper Port"

- id: x_status_h323_gatekeeper_status
  label: "xStatus H323 Gatekeeper Status"
  kind: query
  query_command: "xStatus H323 Gatekeeper Status"

- id: x_status_h323_mode_reason
  label: "xStatus H323 Mode Reason"
  kind: query
  query_command: "xStatus H323 Mode Reason"

- id: x_status_http_feedback_n_expression_n
  label: "xStatus HttpFeedback [n] Expression [n]"
  kind: query
  query_command: "xStatus HttpFeedback [n] Expression [n]"

- id: x_status_http_feedback_n_format
  label: "xStatus HttpFeedback [n] Format"
  kind: query
  query_command: "xStatus HttpFeedback [n] Format"

- id: x_status_h323_mode_status
  label: "xStatus H323 Mode Status"
  kind: query
  query_command: "xStatus H323 Mode Status"

- id: x_status_http_feedback_n_status
  label: "xStatus HttpFeedback [n] Status"
  kind: query
  query_command: "xStatus HttpFeedback [n] Status"

- id: x_status_media_channels_call_n_channel_n_audio_channels
  label: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Audio Channels"

- id: x_status_http_feedback_n_url
  label: "xStatus HttpFeedback [n] URL"
  kind: query
  query_command: "xStatus HttpFeedback [n] URL"

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

- id: x_status_media_channels_call_n_channel_n_net_stat_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Jitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Jitter"

- id: x_status_media_channels_call_n_channel_n_net_stat_channel_rate
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat ChannelRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat ChannelRate"

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

- id: x_status_media_channels_call_n_channel_n_net_stat_max_jitter
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat MaxJitter"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat MaxJitter"

- id: x_status_media_channels_call_n_channel_n_net_stat_packets
  label: "xStatus MediaChannels Call [n] Channel [n] NetStat Packets"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] NetStat Packets"

- id: x_status_media_channels_call_n_channel_n_participant_id
  label: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] ParticipantId"

- id: x_status_media_channels_call_n_channel_n_type
  label: "xStatus MediaChannels Call [n] Channel [n] Type"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Type"

- id: x_status_media_channels_call_n_channel_n_video_channel_role
  label: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ChannelRole"

- id: x_status_media_channels_call_n_channel_n_video_frame_rate
  label: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video FrameRate"

- id: x_status_media_channels_call_n_channel_n_video_protocol
  label: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video Protocol"

- id: x_status_media_channels_call_n_channel_n_video_resolution_y
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionY"

- id: x_status_media_channels_call_n_channel_n_video_resolution_x
  label: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"
  kind: query
  query_command: "xStatus MediaChannels Call [n] Channel [n] Video ResolutionX"

- id: x_status_network_n_cdp_device_id
  label: "xStatus Network [n] CDP DeviceId"
  kind: query
  query_command: "xStatus Network [n] CDP DeviceId"

- id: x_status_network_n_cdp_address
  label: "xStatus Network [n] CDP Address"
  kind: query
  query_command: "xStatus Network [n] CDP Address"

- id: x_status_network_n_cdp_duplex
  label: "xStatus Network [n] CDP Duplex"
  kind: query
  query_command: "xStatus Network [n] CDP Duplex"

- id: x_status_network_n_cdp_capabilities
  label: "xStatus Network [n] CDP Capabilities"
  kind: query
  query_command: "xStatus Network [n] CDP Capabilities"

- id: x_status_network_n_cdp_platform
  label: "xStatus Network [n] CDP Platform"
  kind: query
  query_command: "xStatus Network [n] CDP Platform"

- id: x_status_network_n_cdp_primary_mgmt_address
  label: "xStatus Network [n] CDP PrimaryMgmtAddress"
  kind: query
  query_command: "xStatus Network [n] CDP PrimaryMgmtAddress"

- id: x_status_network_n_cdp_port_id
  label: "xStatus Network [n] CDP PortID"
  kind: query
  query_command: "xStatus Network [n] CDP PortID"

- id: x_status_network_n_cdp_sys_name
  label: "xStatus Network [n] CDP SysName"
  kind: query
  query_command: "xStatus Network [n] CDP SysName"

- id: x_status_network_n_cdp_sys_object_id
  label: "xStatus Network [n] CDP SysObjectID"
  kind: query
  query_command: "xStatus Network [n] CDP SysObjectID"

- id: x_status_network_n_cdp_vo_ipappliance_vlan_id
  label: "xStatus Network [n] CDP VoIPApplianceVlanID"
  kind: query
  query_command: "xStatus Network [n] CDP VoIPApplianceVlanID"

- id: x_status_network_n_cdp_version
  label: "xStatus Network [n] CDP Version"
  kind: query
  query_command: "xStatus Network [n] CDP Version"

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

- id: x_status_network_n_vlan_voice_vlan_id
  label: "xStatus Network [n] VLAN Voice VlanId"
  kind: query
  query_command: "xStatus Network [n] VLAN Voice VlanId"

- id: x_status_network_n_ipv6_link_local_address
  label: "xStatus Network [n] IPv6 LinkLocalAddress"
  kind: query
  query_command: "xStatus Network [n] IPv6 LinkLocalAddress"

- id: x_status_network_services_ntp_current_address
  label: "xStatus NetworkServices NTP CurrentAddress"
  kind: query
  query_command: "xStatus NetworkServices NTP CurrentAddress"

- id: x_status_network_services_ntp_status
  label: "xStatus NetworkServices NTP Status"
  kind: query
  query_command: "xStatus NetworkServices NTP Status"

- id: x_status_network_services_ntp_server_n_address
  label: "xStatus NetworkServices NTP Server [n] Address"
  kind: query
  query_command: "xStatus NetworkServices NTP Server [n] Address"

- id: x_status_peripherals_connected_device_n_name
  label: "xStatus Peripherals ConnectedDevice [n] Name"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Name"

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

- id: x_status_peripherals_connected_device_n_upgrade_failure_reason
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeFailureReason"

- id: x_status_peripherals_connected_device_n_type
  label: "xStatus Peripherals ConnectedDevice [n] Type"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] Type"

- id: x_status_peripherals_connected_device_n_upgrade_status
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeStatus"

- id: x_status_peripherals_connected_device_n_upgrade_url
  label: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"
  kind: query
  query_command: "xStatus Peripherals ConnectedDevice [n] UpgradeURL"

- id: x_status_provisioning_cucm_extension_mobility_enabled
  label: "xStatus Provisioning CUCM ExtensionMobility Enabled"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility Enabled"

- id: x_status_provisioning_cucm_extension_mobility_last_logged_in_user_id
  label: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LastLoggedInUserId"

- id: x_status_provisioning_cucm_extension_mobility_logged_in
  label: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"
  kind: query
  query_command: "xStatus Provisioning CUCM ExtensionMobility LoggedIn"

- id: x_status_provisioning_room_type
  label: "xStatus Provisioning RoomType"
  kind: query
  query_command: "xStatus Provisioning RoomType"

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

- id: x_status_provisioning_software_upgrade_status_last_change
  label: "xStatus Provisioning Software UpgradeStatus LastChange"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus LastChange"

- id: x_status_provisioning_software_upgrade_status_message
  label: "xStatus Provisioning Software UpgradeStatus Message"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Message"

- id: x_status_provisioning_software_upgrade_status_phase
  label: "xStatus Provisioning Software UpgradeStatus Phase"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Phase"

- id: x_status_provisioning_software_upgrade_status_session_id
  label: "xStatus Provisioning Software UpgradeStatus SessionId"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus SessionId"

- id: x_status_provisioning_software_upgrade_status_urgency
  label: "xStatus Provisioning Software UpgradeStatus Urgency"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Urgency"

- id: x_status_provisioning_software_upgrade_status_status
  label: "xStatus Provisioning Software UpgradeStatus Status"
  kind: query
  query_command: "xStatus Provisioning Software UpgradeStatus Status"

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

- id: x_status_proximity_services_availability
  label: "xStatus Proximity Services Availability"
  kind: query
  query_command: "xStatus Proximity Services Availability"

- id: x_status_room_analytics_people_count_current
  label: "xStatus RoomAnalytics PeopleCount Current"
  kind: query
  query_command: "xStatus RoomAnalytics PeopleCount Current"

- id: x_status_room_preset
  label: "xStatus RoomPreset"
  kind: query
  query_command: "xStatus RoomPreset"

- id: x_status_room_preset_n_defined
  label: "xStatus RoomPreset [n] Defined"
  kind: query
  query_command: "xStatus RoomPreset [n] Defined"

- id: x_status_room_analytics_people_presence
  label: "xStatus RoomAnalytics PeoplePresence"
  kind: query
  query_command: "xStatus RoomAnalytics PeoplePresence"

- id: x_status_room_preset_n_description
  label: "xStatus RoomPreset [n] Description"
  kind: query
  query_command: "xStatus RoomPreset [n] Description"

- id: x_status_room_preset_n_type
  label: "xStatus RoomPreset [n] Type"
  kind: query
  query_command: "xStatus RoomPreset [n] Type"

- id: x_status_security_fips_mode
  label: "xStatus Security FIPS Mode"
  kind: query
  query_command: "xStatus Security FIPS Mode"

- id: x_status_security_persistency_call_history
  label: "xStatus Security Persistency CallHistory"
  kind: query
  query_command: "xStatus Security Persistency CallHistory"

- id: x_status_security_persistency_configurations
  label: "xStatus Security Persistency Configurations"
  kind: query
  query_command: "xStatus Security Persistency Configurations"

- id: x_status_security_persistency_dhcp
  label: "xStatus Security Persistency DHCP"
  kind: query
  query_command: "xStatus Security Persistency DHCP"

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

- id: x_status_sip_authentication
  label: "xStatus SIP Authentication"
  kind: query
  query_command: "xStatus SIP Authentication"

- id: x_status_sip_alternate_uri_primary_n_uri
  label: "xStatus SIP AlternateURI Primary [n] URI"
  kind: query
  query_command: "xStatus SIP AlternateURI Primary [n] URI"

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

- id: x_status_sip_registration_n_authentication
  label: "xStatus SIP Registration [n] Authentication"
  kind: query
  query_command: "xStatus SIP Registration [n] Authentication"

- id: x_status_sip_proxy_n_status
  label: "xStatus SIP Proxy [n] Status"
  kind: query
  query_command: "xStatus SIP Proxy [n] Status"

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

- id: x_status_standby_power_save_state
  label: "xStatus Standby PowerSave State"
  kind: query
  query_command: "xStatus Standby PowerSave State"

- id: x_status_system_unit_hardware_module_compatibility_level
  label: "xStatus SystemUnit Hardware Module CompatibilityLevel"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module CompatibilityLevel"

- id: x_status_standby_state
  label: "xStatus Standby State"
  kind: query
  query_command: "xStatus Standby State"

- id: x_status_system_unit_hardware_module_serial_number
  label: "xStatus SystemUnit Hardware Module SerialNumber"
  kind: query
  query_command: "xStatus SystemUnit Hardware Module SerialNumber"

- id: x_status_system_unit_hardware_monitoring_fan_n_status
  label: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"
  kind: query
  query_command: "xStatus SystemUnit Hardware Monitoring Fan [n] Status"

- id: x_status_system_unit_hardware_temperature_threshold
  label: "xStatus SystemUnit Hardware TemperatureThreshold"
  kind: query
  query_command: "xStatus SystemUnit Hardware TemperatureThreshold"

- id: x_status_system_unit_hardware_temperature
  label: "xStatus SystemUnit Hardware Temperature"
  kind: query
  query_command: "xStatus SystemUnit Hardware Temperature"

- id: x_status_system_unit_notifications_notification_n_text
  label: "xStatus SystemUnit Notifications Notification [n] Text"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Text"

- id: x_status_system_unit_notifications_notification_n_type
  label: "xStatus SystemUnit Notifications Notification [n] Type"
  kind: query
  query_command: "xStatus SystemUnit Notifications Notification [n] Type"

- id: x_status_system_unit_product_platform
  label: "xStatus SystemUnit ProductPlatform"
  kind: query
  query_command: "xStatus SystemUnit ProductPlatform"

- id: x_status_system_unit_product_type
  label: "xStatus SystemUnit ProductType"
  kind: query
  query_command: "xStatus SystemUnit ProductType"

- id: x_status_system_unit_product_id
  label: "xStatus SystemUnit ProductId"
  kind: query
  query_command: "xStatus SystemUnit ProductId"

- id: x_status_system_unit_software_display_name
  label: "xStatus SystemUnit Software DisplayName"
  kind: query
  query_command: "xStatus SystemUnit Software DisplayName"

- id: x_status_system_unit_software_option_keys_encryption
  label: "xStatus SystemUnit Software OptionKeys Encryption"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys Encryption"

- id: x_status_system_unit_software_name
  label: "xStatus SystemUnit Software Name"
  kind: query
  query_command: "xStatus SystemUnit Software Name"

- id: x_status_system_unit_software_option_keys_multi_site
  label: "xStatus SystemUnit Software OptionKeys MultiSite"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys MultiSite"

- id: x_status_system_unit_software_option_keys_remote_monitoring
  label: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"
  kind: query
  query_command: "xStatus SystemUnit Software OptionKeys RemoteMonitoring"

- id: x_status_system_unit_software_version
  label: "xStatus SystemUnit Software Version"
  kind: query
  query_command: "xStatus SystemUnit Software Version"

- id: x_status_system_unit_state_number_of_active_calls
  label: "xStatus SystemUnit State NumberOfActiveCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfActiveCalls"

- id: x_status_system_unit_software_release_date
  label: "xStatus SystemUnit Software ReleaseDate"
  kind: query
  query_command: "xStatus SystemUnit Software ReleaseDate"

- id: x_status_system_unit_state_number_of_in_progress_calls
  label: "xStatus SystemUnit State NumberOfInProgressCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfInProgressCalls"

- id: x_status_system_unit_uptime
  label: "xStatus SystemUnit Uptime"
  kind: query
  query_command: "xStatus SystemUnit Uptime"

- id: x_status_system_unit_state_number_of_suspended_calls
  label: "xStatus SystemUnit State NumberOfSuspendedCalls"
  kind: query
  query_command: "xStatus SystemUnit State NumberOfSuspendedCalls"

- id: x_status_time_system_time
  label: "xStatus Time SystemTime"
  kind: query
  query_command: "xStatus Time SystemTime"

- id: x_status_user_interface_contact_info_contact_method_n_number
  label: "xStatus UserInterface ContactInfo ContactMethod [n] Number"
  kind: query
  query_command: "xStatus UserInterface ContactInfo ContactMethod [n] Number"

- id: x_status_user_interface_contact_info_name
  label: "xStatus UserInterface ContactInfo Name"
  kind: query
  query_command: "xStatus UserInterface ContactInfo Name"

- id: x_status_user_interface_extensions_widget_n_value
  label: "xStatus UserInterface Extensions Widget [n] Value"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] Value"

- id: x_status_user_interface_extensions_widget_n_widget_id
  label: "xStatus UserInterface Extensions Widget [n] WidgetId"
  kind: query
  query_command: "xStatus UserInterface Extensions Widget [n] WidgetId"

- id: x_status_video_active_speaker_pipposition
  label: "xStatus Video ActiveSpeaker PIPPosition"
  kind: query
  query_command: "xStatus Video ActiveSpeaker PIPPosition"

- id: x_status_video_input_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_input_connector_n_connected
  label: "xStatus Video Input Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Input Connector [n] Connected"

- id: x_status_video_input_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_input_connector_n_connected_device_cec_n_name
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] Name"

- id: x_status_video_input_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_input_connector_n_connected_device_cec_n_vendor_id
  label: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"
  kind: query
  query_command: "xStatus Video Input Connector [n] ConnectedDevice CEC [n] VendorId"

- id: x_status_video_input_connector_n_signal_state
  label: "xStatus Video Input Connector [n] SignalState"
  kind: query
  query_command: "xStatus Video Input Connector [n] SignalState"

- id: x_status_video_input_connector_n_source_id
  label: "xStatus Video Input Connector [n] SourceId"
  kind: query
  query_command: "xStatus Video Input Connector [n] SourceId"

- id: x_status_video_input_connector_n_type
  label: "xStatus Video Input Connector [n] Type"
  kind: query
  query_command: "xStatus Video Input Connector [n] Type"

- id: x_status_video_input_main_video_source
  label: "xStatus Video Input MainVideoSource"
  kind: query
  query_command: "xStatus Video Input MainVideoSource"

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

- id: x_status_video_input_source_n_format_type
  label: "xStatus Video Input Source [n] FormatType"
  kind: query
  query_command: "xStatus Video Input Source [n] FormatType"

- id: x_status_video_input_source_n_resolution_height
  label: "xStatus Video Input Source [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Height"

- id: x_status_video_input_source_n_resolution_refresh_rate
  label: "xStatus Video Input Source [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution RefreshRate"

- id: x_status_video_input_source_n_resolution_width
  label: "xStatus Video Input Source [n] Resolution Width"
  kind: query
  query_command: "xStatus Video Input Source [n] Resolution Width"

- id: x_status_video_layout_layout_family_local
  label: "xStatus Video Layout LayoutFamily Local"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Local"

- id: x_status_video_layout_layout_family_remote
  label: "xStatus Video Layout LayoutFamily Remote"
  kind: query
  query_command: "xStatus Video Layout LayoutFamily Remote"

- id: x_status_video_monitors
  label: "xStatus Video Monitors"
  kind: query
  query_command: "xStatus Video Monitors"

- id: x_status_video_output_connector_n_connected
  label: "xStatus Video Output Connector [n] Connected"
  kind: query
  query_command: "xStatus Video Output Connector [n] Connected"

- id: x_status_video_output_connector_n_connected_device_cec_n_device_type
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] DeviceType"

- id: x_status_video_mute
  label: "xStatus Video Mute"
  kind: query
  query_command: "xStatus Video Mute"

- id: x_status_video_output_connector_n_connected_device_cec_n_logical_address
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] LogicalAddress"

- id: x_status_video_output_connector_n_connected_device_cec_n_power_status
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] PowerStatus"

- id: x_status_video_output_connector_n_connected_device_cec_n_name
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] Name"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] Name"

- id: x_status_video_output_connector_n_connected_device_cec_n_vendor_id
  label: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice CEC [n] VendorId"

- id: x_status_video_output_connector_n_connected_device_name
  label: "xStatus Video Output Connector [n] ConnectedDevice Name"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice Name"

- id: x_status_video_output_connector_n_connected_device_screen_size
  label: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice ScreenSize"

- id: x_status_video_output_connector_n_connected_device_preferred_format
  label: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"
  kind: query
  query_command: "xStatus Video Output Connector [n] ConnectedDevice PreferredFormat"

- id: x_status_video_output_connector_n_monitor_role
  label: "xStatus Video Output Connector [n] MonitorRole"
  kind: query
  query_command: "xStatus Video Output Connector [n] MonitorRole"

- id: x_status_video_output_connector_n_resolution_height
  label: "xStatus Video Output Connector [n] Resolution Height"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution Height"

- id: x_status_video_output_connector_n_resolution_refresh_rate
  label: "xStatus Video Output Connector [n] Resolution RefreshRate"
  kind: query
  query_command: "xStatus Video Output Connector [n] Resolution RefreshRate"

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

- id: x_status_video_output_monitor_n_brightness
  label: "xStatus Video Output Monitor [n] Brightness"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Brightness"

- id: x_status_video_output_monitor_n_color_temperature_blue
  label: "xStatus Video Output Monitor [n] ColorTemperature Blue"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Blue"

- id: x_status_video_output_monitor_n_color_temperature_green
  label: "xStatus Video Output Monitor [n] ColorTemperature Green"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Green"

- id: x_status_video_output_monitor_n_color_temperature_red
  label: "xStatus Video Output Monitor [n] ColorTemperature Red"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Red"

- id: x_status_video_output_monitor_n_color_temperature_selected
  label: "xStatus Video Output Monitor [n] ColorTemperature Selected"
  kind: query
  query_command: "xStatus Video Output Monitor [n] ColorTemperature Selected"

- id: x_status_video_output_monitor_n_contrast
  label: "xStatus Video Output Monitor [n] Contrast"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Contrast"

- id: x_status_video_output_monitor_n_cscyuv
  label: "xStatus Video Output Monitor [n] CSCYUV"
  kind: query
  query_command: "xStatus Video Output Monitor [n] CSCYUV"

- id: x_status_video_output_monitor_n_firmware_version
  label: "xStatus Video Output Monitor [n] FirmwareVersion"
  kind: query
  query_command: "xStatus Video Output Monitor [n] FirmwareVersion"

- id: x_status_video_output_monitor_n_gamma
  label: "xStatus Video Output Monitor [n] Gamma"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Gamma"

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

- id: x_status_video_output_monitor_n_sharpness
  label: "xStatus Video Output Monitor [n] Sharpness"
  kind: query
  query_command: "xStatus Video Output Monitor [n] Sharpness"

- id: x_status_video_presentation_pipposition
  label: "xStatus Video Presentation PIPPosition"
  kind: query
  query_command: "xStatus Video Presentation PIPPosition"

- id: x_status_video_selfview_fullscreen_mode
  label: "xStatus Video Selfview FullscreenMode"
  kind: query
  query_command: "xStatus Video Selfview FullscreenMode"

- id: x_status_video_selfview_mode
  label: "xStatus Video Selfview Mode"
  kind: query
  query_command: "xStatus Video Selfview Mode"

- id: x_status_video_selfview_on_monitor_role
  label: "xStatus Video Selfview OnMonitorRole"
  kind: query
  query_command: "xStatus Video Selfview OnMonitorRole"

- id: x_status_video_selfview_pipposition
  label: "xStatus Video Selfview PIPPosition"
  kind: query
  query_command: "xStatus Video Selfview PIPPosition"
```

## Variables
```yaml
# Populated by the deterministic xConfiguration action merge (each
# xConfiguration row is a settable parameter). No additional manual entries.
```

## Events
```yaml
# Source documents an xEvent hierarchy with examples (OutgoingCallIndication,
# CallDisconnect, CallSuccessful, FeccActionInd, TString, SString). Full
# enumerated event catalogue not extracted in this pass.
# UNRESOLVED: complete xEvent row list not machine-extracted; only examples shown
# in source prose (lines 379-431).
```

## Macros
```yaml
# Source documents xCommand Macros Macro Save/Activate/Rename/Remove and
# xCommand Macros Runtime Start/Stop/Restart - these are control actions over
# user-authored JS macros (xConfiguration Macros Mode). No multi-step macro
# sequences are prescribed verbatim by the source.
# UNRESOLVED: no vendor-prescribed macro sequences to author.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Factory reset, software upgrade, and
# session exhaustion (limited concurrent HTTP sessions, do not time out
# automatically - must explicitly POST /xmlapi/session/end) are operational
# cautions, not safety interlocks.
```

## Notes
- **API groups:** Commands, Configurations, Status, Events — all hierarchical. Top-level prefixes: `xCommand`, `xConfiguration`, `xStatus`, `xEvent`, `xFeedback`, `xPreferences`, `xGetxml`, `xDocument`, `xTransaction`.
- **Output modes:** Terminal (default, line-based), XML, JSON — set per-session via `xPreferences outputmode <terminal|xml|json>`.
- **Asynchronous API:** no guarantee command responses arrive in issue order. Response-tagging via `resultId` attribute supported on all command types for request/response matching.
- **Case sensitivity:** all commands case-insensitive. Best practice: use complete paths (not `xconf vid` shortcuts) to avoid ambiguity across firmware releases.
- **Quoting:** values containing spaces must be quoted (e.g. `xCommand dial number: "my number contains spaces"`).
- **Multiline commands:** payload after command line, terminated by `\n.\n` (line containing single period). Used for in-room control definitions, branding images (base64), macros, banners, certificates.
- **Value types:** `<x..y>` integer range; `<X/Y/../Z>` literal enum; `<S: x, y>` string min/max length.
- **Feedback:** terminal/SSH/Telnet — up to 38 registered XPath expressions per session, per-session only (must re-register after reconnect); `xFeedback register <path>`. HTTP webhooks — `xCommand HttpFeedback Register`, up to 4 FeedbackSlots × 15 Expressions, XML or JSON format, posted to ServerUrl; FeedbackSlot 3 reserved for Cisco TMS.
- **Warning (source):** never `xFeedback register /Status` — may flood control application. Safe to register `/Configuration` (low change rate).
- **Ethernet ports:** Network port 1 always LAN. Additional ports DHCP-serve Cisco devices 169.254.1.41–240, single non-Cisco device 169.254.1.30, static non-Cisco range 169.254.1.241–254. SSH to codec on auxiliary port: 169.254.1.1.
- **User roles:** ADMIN, USER, AUDIT, ROOMCONTROL, INTEGRATOR. Webex-registered systems expose only INTEGRATOR + ROOMCONTROL locally.
- **Deprecated practice:** avoid `xCommand UserInterface OSD Key Click/Press` (remote-control emulation); use direct commands for forward compatibility.
- **Software version note:** doc body is CE9.5 API Reference Guide (October 2018); `*c` / `*s` / `*r` / `*e` prefixes denote configuration / status / result / event feedback lines.

<!-- UNRESOLVED: SSH/Telnet/HTTP/HTTPS port numbers not stated in source. -->
<!-- UNRESOLVED: firmware/CE software version compatibility range not bounded (doc dated CE9.5, OCTOBER 2018). -->
<!-- UNRESOLVED: exact product model list for this family entity not bounded; serial port availability varies (absent on DX70, DX80, Room 55 Dual, Room 70). -->
<!-- UNRESOLVED: serial flow control not stated. -->
<!-- UNRESOLVED: complete xEvent row catalogue not machine-extracted. -->
<!-- UNRESOLVED: command return-value interactions with 3rd-party systems are release-dependent and explicitly undocumented per source (line 19). -->

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce95/collaboration-endpoint-software-api-reference-guide-ce95.pdf
retrieved_at: 2026-06-25T08:09:41.677Z
last_checked_at: 2026-06-25T08:55:05.807Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T08:55:05.807Z
matched_actions: 823
action_count: 823
confidence: medium
summary: "deterministic presence proof: 823/823 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product models covered by this family spec not bounded; doc spans DX70/DX80/MX700/MX800/SX20/SX80/Room 55/Room 55 Dual/Room 70/Room 70 G2/Codec Plus/Codec Pro. Firmware version compatibility range not stated (doc is CE9.5 reference). PoE port counts and which products carry serial ports vary by hardware."
- "port numbers not stated in source"
- "flow control not stated in source"
- "complete xEvent row list not machine-extracted; only examples shown"
- "no vendor-prescribed macro sequences to author."
- "source contains no explicit safety warnings, interlock procedures,"
- "SSH/Telnet/HTTP/HTTPS port numbers not stated in source."
- "firmware/CE software version compatibility range not bounded (doc dated CE9.5, OCTOBER 2018)."
- "exact product model list for this family entity not bounded; serial port availability varies (absent on DX70, DX80, Room 55 Dual, Room 70)."
- "serial flow control not stated."
- "complete xEvent row catalogue not machine-extracted."
- "command return-value interactions with 3rd-party systems are release-dependent and explicitly undocumented per source (line 19)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
