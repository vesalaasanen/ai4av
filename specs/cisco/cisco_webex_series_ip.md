---
spec_id: admin/cisco-webex-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco Webex Series Control Spec"
manufacturer: Cisco
model_family: "Codec Plus"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "Codec Plus"
    - "Codec Pro"
    - "Room Bar"
    - "Room Bar Pro"
    - "Room Kit EQX"
    - "Room Kit"
    - "Room Kit Mini"
    - "Room 55"
    - "Room 55 Dual"
    - "Room 70"
    - "Room 70 G2"
    - "Room 70 Panorama"
    - "Room Panorama"
    - "Board 55"
    - "Board 55S"
    - "Board 70"
    - "Board 70S"
    - "Board 85S"
    - "Board Pro 55"
    - "Board Pro 75"
    - "Board Pro G2 55"
    - "Board Pro G2 75"
    - "Codec EQ"
    - "Desk Mini"
    - Desk
    - "Desk Pro"
  firmware: "RoomOS 11.32"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-1132/api-reference-guide-roomos-1132.pdf
retrieved_at: 2026-06-25T19:57:51.909Z
last_checked_at: 2026-10-07T20:49:47.394Z
generated_at: 2026-10-07T20:49:47.394Z
firmware_coverage: "RoomOS 11.32"
protocol_coverage: []
known_gaps:
  - "refined source captures API fundamentals, transport, audio/camera/status/feedback command samples, plus video matrix / presentation / SIP / serial / security / network-services config groups. Full D15502.13 reference (~172k lines) contains hundreds of additional commands across cameras, bookings, conference, network, security, UserInterface, video, peripherals, SystemUnit, Webex, macros, MicrosoftTeams categories; those commands are not enumerated in this spec."
  - "SSH TCP port number not stated in source (SSH described as enabled-by-default, no port given)"
  - "WebSocket port not stated separately (ties to HTTP service)"
  - "source documents ~47 additional NetworkServices config entries"
  - "no discrete settable-parameter variables authored beyond the"
  - "source contains no explicit device-safety warnings, interlock"
  - "firmware version compatibility ranges across listed models not stated beyond RoomOS 11.32 baseline; supported-commands matrix (D15502.13 p.654+) and disconnect-cause appendix (p.738) not included in refined source; ~47 NetworkServices and remaining Security infrastructure config commands documented verbatim but not enumerated as discrete actions."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:49:47.394Z
  matched_actions: 109
  action_count: 109
  confidence: medium
  summary: "All 109 action units match source commands literally, transport values (443, 115200 8N1, no flow control, Basic auth) are supported, and the spec covers essentially the whole catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Cisco Webex Series Control Spec

## Summary
Covers Cisco collaboration device family (Codec Plus/Pro, Room Bar/Bar Pro, Room Kit family, Room 55/70 family, Board/Board Pro series, Codec EQ, Desk series) running RoomOS 11.32. Device exposes xAPI (xConfiguration / xCommand / xStatus / xEvent / xFeedback) over four transports: SSH (secure TCP), HTTP/HTTPS XMLAPI, WebSocket, RS-232 serial. xAPI structure identical regardless of transport; commands expressed as terminal key:value paths, XML, or JSON-RPC depending on output mode. Source: Cisco RoomOS 11.32 xAPI Protocol Reference (D15502.13, 10-2025).

<!-- UNRESOLVED: refined source captures API fundamentals, transport, audio/camera/status/feedback command samples, plus video matrix / presentation / SIP / serial / security / network-services config groups. Full D15502.13 reference (~172k lines) contains hundreds of additional commands across cameras, bookings, conference, network, security, UserInterface, video, peripherals, SystemUnit, Webex, macros, MicrosoftTeams categories; those commands are not enumerated in this spec. -->

## Transport
```yaml
protocols:
  - tcp          # SSH - secure TCP/IP, enabled by default (xConfiguration NetworkServices SSH Mode: On)
  - http         # HTTP/HTTPS XMLAPI; WebSocket rides on HTTP (xConfiguration NetworkServices HTTP Mode / WebSocket: FollowHTTPService)
  - serial       # RS-232, enabled by default (xConfiguration SerialPort Mode: On); unavailable on Room 55 Dual / Room 70 / Board 55/70/55S/70S/85S
addressing:
  port: 443      # HTTP/HTTPS on the local network at 169.254.1.1 (port 443 stated verbatim, source line 123)
  # UNRESOLVED: SSH TCP port number not stated in source (SSH described as enabled-by-default, no port given)
  # UNRESOLVED: WebSocket port not stated separately (ties to HTTP service)
serial:
  baud_rate: 115200   # default per device table; Codec Pro / Room 70 G2 / Room Panorama / Room 70 Panorama adjustable to 9600/19200/38400/57600/115200 (xConfiguration SerialPort BaudRate)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: basic    # HTTP XMLAPI requires HTTP Basic Access Authentication as user with ADMIN role; 401 challenge on unauthenticated requests; POST /xmlapi/session/begin returns SessionId cookie
  # Note: serial (xConfiguration SerialPort LoginRequired: On by default) and SSH (passphrase required, mandatory first-login change) also require authentication; multi-transport device - auth mechanism varies per transport.
```

**API output modes (RS-232 / SSH sessions):** Terminal (default, line-based), XML, or JSON. Set via `xPreferences outputmode <terminal|xml|json>`. HTTP XMLAPI always uses XML bodies (`Content-Type: text/xml`). WebSocket embeds API commands in JSON-RPC objects.

**HTTP URL surface (stated verbatim):**
- `GET  http://<ip>/status.xml` / `/configuration.xml` / `/command.xml` / `/valuespace.xml`
- `GET  http://<ip>/getxml?location=<path>`
- `POST http://<ip>/putxml` (commands + configurations in body)
- `POST http://<ip>/xmlapi/session/begin` (open session, returns SessionId cookie)
- `POST http://<ip>/xmlapi/session/end` (close session)

**Response tagging:** all API calls asynchronous; match requests with `| resultId="<tag>"`.

**Multi-line payloads:** supported (UI extensions, branding base64, macros, banners, certs), up to 8 MB; terminated by a line containing a single `.`.

**Feedback channel:** register XPath expressions (`xFeedback register <path>`); up to 50 expressions per active connection. Over HTTP, webhooks via `xCommand HttpFeedback Register` — up to 4 slots, 15 expressions each. Avoid FeedbackSlot 3 when Cisco TMS in use.

## Traits
```yaml
traits:
  - queryable   # inferred: xStatus queries return device state (mute, music mode, noise removal, ARC/HDMI delays, standby, etc.)
  - levelable   # inferred: xCommand Audio Volume Set / Increase / Mute / ToggleMute control gain (0..100, 0.5 dB steps)
  - routable    # inferred: xCommand Video Matrix Assign / Swap / Reset / Unassign route sources to outputs
  # powerable: NOT inferred - no power on/off xCommand documented in this refined source (SystemUnit reboot/reset referenced only as categories in source note; Standby status exists but no Standby xCommand in refined source)
```

## Actions
```yaml
- id: x_configuration_audio_connector_setup
  label: "xConfiguration Audio ConnectorSetup"
  kind: action
  command: "xConfiguration Audio ConnectorSetup"
  params: []

- id: x_configuration_audio_default_volume
  label: "xConfiguration Audio DefaultVolume"
  kind: action
  command: "xConfiguration Audio DefaultVolume"
  params: []

- id: x_configuration_audio_ethernet_encryption
  label: "xConfiguration Audio Ethernet Encryption"
  kind: action
  command: "xConfiguration Audio Ethernet Encryption"
  params: []

- id: x_configuration_audio_ethernet_sapdiscovery_address
  label: "xConfiguration Audio Ethernet SAPDiscovery Address"
  kind: action
  command: "xConfiguration Audio Ethernet SAPDiscovery Address"
  params: []

- id: x_configuration_audio_ethernet_sapdiscovery_mode
  label: "xConfiguration Audio Ethernet SAPDiscovery Mode"
  kind: action
  command: "xConfiguration Audio Ethernet SAPDiscovery Mode"
  params: []

- id: x_configuration_audio_input_arc_n_mode
  label: "xConfiguration Audio Input ARC [n] Mode"
  kind: action
  command: "xConfiguration Audio Input ARC [n] Mode"
  params: []

- id: x_command_audio_volume_set
  label: "xCommand Audio Volume Set"
  kind: action
  command: "xCommand Audio Volume Set"
  params: []

- id: x_command_audio_volume_mute
  label: "xCommand Audio Volume Mute"
  kind: action
  command: "xCommand Audio Volume Mute"
  params: []

- id: x_command_audio_volume_unmute
  label: "xCommand Audio Volume Unmute"
  kind: action
  command: "xCommand Audio Volume Unmute"
  params: []

- id: x_command_audio_volume_increase
  label: "xCommand Audio Volume Increase"
  kind: action
  command: "xCommand Audio Volume Increase"
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

- id: x_command_audio_vu_meter_start
  label: "xCommand Audio VuMeter Start"
  kind: action
  command: "xCommand Audio VuMeter Start"
  params: []

- id: x_command_dial
  label: "xCommand Dial"
  kind: action
  command: "xCommand Dial"
  params: []

- id: x_command_camera_position_set
  label: "xCommand Camera PositionSet"
  kind: action
  command: "xCommand Camera PositionSet"
  params: []

- id: x_command_http_feedback_register_full_reference
  label: "xCommand HttpFeedback Register"
  kind: action
  command: "xCommand HttpFeedback Register FeedbackSlot: {feedback_slot} ServerUrl: {server_url} Format: {format} Expression: {expression}"
  params:
    - name: feedback_slot
      type: integer
      description: "1..4"
    - name: server_url
      type: string
      description: "S: 1, 2048 (required)"
    - name: format
      type: string
      description: "XML/JSON"
    - name: expression
      type: string
      description: "S: 1, 255"

# === NEW actions added in upgrade pass (not in deterministic 16-action set) ===
# Deterministic layer separately merges: xConfiguration Audio * (6), xCommand Audio
# Volume * (6), xCommand Audio VuMeter Start, xCommand Dial, xCommand Camera
# PositionSet, xCommand HttpFeedback Register. Do NOT duplicate those IDs.

# --- Video Matrix routing (source: Video Matrix Commands, lines 1435-1445) ---

- id: x_command_video_matrix_assign
  label: "xCommand Video Matrix Assign"
  kind: action
  command: "xCommand Video Matrix Assign Output: Output SourceId: SourceId"
  params:
    - name: Output
      type: integer
      description: Output connector id
    - name: SourceId
      type: integer
      description: Source id (IntegerArray, range varies by product; up to 1..9 Codec EQ, 1..7 Codec Pro family, 1..6 Room Bar Pro; multiple-4 supported)


- id: x_command_video_matrix_reset
  label: "xCommand Video Matrix Reset"
  kind: action
  command: "xCommand Video Matrix Reset [Output: Output]"
  params:
    - name: Output
      type: integer
      description: Output connector id (optional)


- id: x_command_video_matrix_swap
  label: "xCommand Video Matrix Swap"
  kind: action
  command: "xCommand Video Matrix Swap OutputA: OutputA OutputB: OutputB"
  params:
    - name: OutputA
      type: integer
      description: First output connector id
    - name: OutputB
      type: integer
      description: Second output connector id


- id: x_command_video_matrix_unassign
  label: "xCommand Video Matrix Unassign"
  kind: action
  command: "xCommand Video Matrix Unassign Output: Output [SourceId: SourceId]"
  params:
    - name: Output
      type: integer
      description: Output connector id
    - name: SourceId
      type: integer
      description: Source id (optional)

# --- Video input source selection (lines 1451-1462) ---

- id: x_command_video_input_set_main_video_source
  label: "xCommand Video Input SetMainVideoSource"
  kind: action
  command: "xCommand Video Input SetMainVideoSource [ConnectorId: ConnectorId] [SourceId: SourceId]"
  params:
    - name: ConnectorId
      type: integer
      description: IntegerArray (range varies by product; up to 1..9 Codec EQ, 1..7 Codec Pro family)
    - name: SourceId
      type: string
      description: Source selector (product-specific enum incl. AirPlay/Miracast)

# --- Presentation sharing (lines 1404-1428) ---

- id: x_command_presentation_start
  label: "xCommand Presentation Start"
  kind: action
  command: "xCommand Presentation Start [ConnectorId: ConnectorId] [PresentationSource: PresentationSource] [WebViewId: WebViewId]"
  params:
    - name: ConnectorId
      type: integer
      description: Connector id (optional)
    - name: PresentationSource
      type: string
      description: Source selector (product-specific enum; e.g. 1..10/AirPlay/DirectShare/Miracast/None/Remote/WebView)
    - name: WebViewId
      type: string
      description: WebView id (when PresentationSource is WebView; provided by xStatus UserInterface WebView)

# --- SystemUnit multiline banner (lines 380-394) ---

- id: x_command_systemunit_welcomebanner_set
  label: "xCommand SystemUnit WelcomeBanner Set"
  kind: action
  command: "xCommand SystemUnit WelcomeBanner Set"   # multiline payload follows; terminated by line containing single "."
  params: []
  notes: "Multiline command. Payload lines (up to 8 MB) entered after command, terminated by a single period on its own line."

# --- Feedback subscription management (lines 487-537) ---

- id: x_feedback_register
  label: "xFeedback Register"
  kind: action
  command: "xFeedback register <path>"
  params:
    - name: path
      type: string
      description: XPath-like expression (e.g. /Status/Audio, /Event/CallDisconnect); up to 50 expressions per connection
  notes: "WARNING: never register /Status (too much data). Safe to register /Configuration."


- id: x_feedback_list
  label: "xFeedback List"
  kind: query
  command: "xFeedback list"
  params: []


- id: x_feedback_deregister
  label: "xFeedback Deregister"
  kind: action
  command: "xFeedback deregister <path>"
  params:
    - name: path
      type: string
      description: Previously registered XPath-like expression

# --- Session preferences (lines 155-172) ---

- id: x_preferences_outputmode
  label: "xPreferences OutputMode"
  kind: action
  command: "xPreferences outputmode <terminal|xml|json>"
  params:
    - name: mode
      type: string
      description: "Output mode for RS-232/SSH sessions: terminal (default), xml, or json"

# --- Event / XML introspection (lines 281-305) ---

- id: x_event_list
  label: "xEvent List"
  kind: query
  command: "xEvent"
  params: []
  notes: "xEvent lists top-level event categories; xEvent <category> lists events in category; xEvent * lists all available events."


- id: x_getxml
  label: "xGetxml"
  kind: query
  command: "xgetxml {location}"
  params:
    - name: location
      type: string
      description: XML document path (e.g. /Status, /Configuration/Video)

# --- SerialPort configuration (lines 841-848) ---

- id: x_configuration_serialport_mode
  label: "xConfiguration SerialPort Mode"
  kind: action
  command: "xConfiguration SerialPort Mode: <Off/On>"
  params: []


- id: x_configuration_serialport_baudrate
  label: "xConfiguration SerialPort BaudRate"
  kind: action
  command: "xConfiguration SerialPort BaudRate: <9600/19200/38400/57600/115200>"
  params: []
  notes: "New baud rate takes effect after device reboot. Only adjustable on Codec Pro / Room 70 G2 / Room Panorama / Room 70 Panorama."


- id: x_configuration_serialport_loginrequired
  label: "xConfiguration SerialPort LoginRequired"
  kind: action
  command: "xConfiguration SerialPort LoginRequired: <Off/On>"
  params: []


- id: x_configuration_serialport_outbound_mode
  label: "xConfiguration SerialPort Outbound Mode"
  kind: action
  command: "xConfiguration SerialPort Outbound Mode: <Off/On>"
  params: []


- id: x_configuration_serialport_outbound_port_n_baudrate
  label: "xConfiguration SerialPort Outbound Port [n] BaudRate"
  kind: action
  command: "xConfiguration SerialPort Outbound Port [n] BaudRate: <...>"
  params:
    - name: n
      type: integer
      description: Outbound port index


- id: x_configuration_serialport_outbound_port_n_description
  label: "xConfiguration SerialPort Outbound Port [n] Description"
  kind: action
  command: "xConfiguration SerialPort Outbound Port [n] Description: <String>"
  params:
    - name: n
      type: integer
      description: Outbound port index

# --- SIP configuration (lines 1390-1397) ---

- id: x_configuration_sip_defaulttransport
  label: "xConfiguration SIP DefaultTransport"
  kind: action
  command: "xConfiguration SIP DefaultTransport: <Auto/TCP/Tls/UDP>"
  params: []


- id: x_configuration_sip_tlsverify
  label: "xConfiguration SIP TlsVerify"
  kind: action
  command: "xConfiguration SIP TlsVerify: <Off/On>"
  params: []
  notes: "Must be On when using RFC5922 TLS verification mode."


- id: x_configuration_sip_listenport
  label: "xConfiguration SIP ListenPort"
  kind: action
  command: "xConfiguration SIP ListenPort: <Auto/Off/On>"
  params: []


- id: x_configuration_sip_transportsecurity_certificateverificationmode
  label: "xConfiguration SIP TransportSecurity CertificateVerificationMode"
  kind: action
  command: "xConfiguration SIP TransportSecurity CertificateVerificationMode: <Auto/Legacy/RFC5922>"
  params: []


- id: x_configuration_sip_proxy_1_address
  label: "xConfiguration SIP Proxy 1 Address"
  kind: action
  command: "xConfiguration SIP Proxy 1 Address: \"Address\""
  params: []


- id: x_configuration_sip_type
  label: "xConfiguration SIP Type"
  kind: action
  command: "xConfiguration SIP Type: <Cisco/Standard>"
  params: []

# --- Security Session configuration (lines 908-914) ---

- id: x_configuration_security_session_inactivitytimeout
  label: "xConfiguration Security Session InactivityTimeout"
  kind: action
  command: "xConfiguration Security Session InactivityTimeout: <Integer>"
  params: []


- id: x_configuration_security_session_failedloginslockouttime
  label: "xConfiguration Security Session FailedLoginsLockoutTime"
  kind: action
  command: "xConfiguration Security Session FailedLoginsLockoutTime: <Integer>"
  params: []


- id: x_configuration_security_session_maxfailedlogins
  label: "xConfiguration Security Session MaxFailedLogins"
  kind: action
  command: "xConfiguration Security Session MaxFailedLogins: <Integer>"
  params: []


- id: x_configuration_security_session_maxsessionsperuser
  label: "xConfiguration Security Session MaxSessionsPerUser"
  kind: action
  command: "xConfiguration Security Session MaxSessionsPerUser: <Integer>"
  params: []


- id: x_configuration_security_session_maxtotalsessions
  label: "xConfiguration Security Session MaxTotalSessions"
  kind: action
  command: "xConfiguration Security Session MaxTotalSessions: <Integer>"
  params: []
  notes: "Restarting the device invalidates all sessions."


- id: x_configuration_security_session_showlastlogon
  label: "xConfiguration Security Session ShowLastLogon"
  kind: action
  command: "xConfiguration Security Session ShowLastLogon: <Off/On>"
  params: []

# --- NetworkServices transport-toggle configuration (lines 855, 858, 870-871) ---

- id: x_configuration_networkservices_ssh_mode
  label: "xConfiguration NetworkServices SSH Mode"
  kind: action
  command: "xConfiguration NetworkServices SSH Mode: <Off/On>"
  params: []


- id: x_configuration_networkservices_http_mode
  label: "xConfiguration NetworkServices HTTP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Mode: <Off/HTTP+HTTPS/HTTPS>"
  params: []


- id: x_configuration_networkservices_websocket
  label: "xConfiguration NetworkServices Websocket"
  kind: action
  command: "xConfiguration NetworkServices Websocket: <Off/FollowHTTPService>"
  params: []
  notes: "WebSocket tied to HTTP; HTTP or HTTPS must also be enabled."


- id: x_configuration_networkservices_xmlapi_mode
  label: "xConfiguration NetworkServices XMLAPI Mode"
  kind: action
  command: "xConfiguration NetworkServices XMLAPI Mode: <Off/On>"
  params: []

# <!-- UNRESOLVED: source documents ~47 additional NetworkServices config entries
#      (SSH KeyExchange/HostKey algorithms, HTTP/HTTPS Proxy *, HTTPS OCSP/TLS,
#      NTP Server *, SIP/H323 Mode, SNMP *, SMTP *, UPnP, Wifi *, CDP/LLDP,
#      PTP, DiscoveryProtocol) and further Security entries (Xapi WebSocket ApiKey,
#      Fips, CSR/Enrollment KeySize, Audit *) verbatim in lines 852-902 and
#      915-923. These network-infrastructure configs are documented but not
#      enumerated as discrete actions in this revision. -->

- id: x_configuration_networkservices_ssh_keyexchangealgorithms_allowlegacy
  label: "xConfiguration NetworkServices SSH KeyExchangeAlgorithms AllowLegacy"
  kind: action
  command: "xConfiguration NetworkServices SSH KeyExchangeAlgorithms AllowLegacy: <...>"
  params: []

- id: x_configuration_networkservices_ssh_hostkeyalgorithm
  label: "xConfiguration NetworkServices SSH HostKeyAlgorithm"
  kind: action
  command: "xConfiguration NetworkServices SSH HostKeyAlgorithm: <...>"
  params: []

- id: x_configuration_networkservices_http_proxy_authentication_method
  label: "xConfiguration NetworkServices HTTP Proxy Authentication Method"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Authentication Method: <...>"
  params: []

- id: x_configuration_networkservices_http_proxy_loginname
  label: "xConfiguration NetworkServices HTTP Proxy LoginName"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy LoginName: <String>"
  params: []

- id: x_configuration_networkservices_http_proxy_mode
  label: "xConfiguration NetworkServices HTTP Proxy Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Mode: <...>"
  params: []

- id: x_configuration_networkservices_http_proxy_pacurl
  label: "xConfiguration NetworkServices HTTP Proxy PACUrl"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy PACUrl: <String>"
  params: []

- id: x_configuration_networkservices_http_proxy_password
  label: "xConfiguration NetworkServices HTTP Proxy Password"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Password: <String>"
  params: []

- id: x_configuration_networkservices_http_proxy_url
  label: "xConfiguration NetworkServices HTTP Proxy Url"
  kind: action
  command: "xConfiguration NetworkServices HTTP Proxy Url: <String>"
  params: []

- id: x_configuration_networkservices_https_ocsp_mode
  label: "xConfiguration NetworkServices HTTPS OCSP Mode"
  kind: action
  command: "xConfiguration NetworkServices HTTPS OCSP Mode: <...>"
  params: []

- id: x_configuration_networkservices_https_ocsp_url
  label: "xConfiguration NetworkServices HTTPS OCSP URL"
  kind: action
  command: "xConfiguration NetworkServices HTTPS OCSP URL: <String>"
  params: []

- id: x_configuration_networkservices_https_server_minimumtlsversion
  label: "xConfiguration NetworkServices HTTPS Server MinimumTLSVersion"
  kind: action
  command: "xConfiguration NetworkServices HTTPS Server MinimumTLSVersion: <...>"
  params: []

- id: x_configuration_networkservices_https_server_stricttransportsecurity
  label: "xConfiguration NetworkServices HTTPS Server StrictTransportSecurity"
  kind: action
  command: "xConfiguration NetworkServices HTTPS StrictTransportSecurity: <...>"
  params: []

- id: x_configuration_networkservices_https_server_verifyclientcertificate
  label: "xConfiguration NetworkServices HTTPS Server VerifyClientCertificate"
  kind: action
  command: "xConfiguration NetworkServices HTTPS VerifyClientCertificate: <...>"
  params: []

- id: x_configuration_networkservices_ntp_mode
  label: "xConfiguration NetworkServices NTP Mode"
  kind: action
  command: "xConfiguration NetworkServices NTP Mode: <...>"
  params: []

- id: x_configuration_networkservices_ntp_server_n_address
  label: "xConfiguration NetworkServices NTP Server [n] Address"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] Address: <String>"
  params:
    - name: n
      type: integer
      description: UNRESOLVED

- id: x_configuration_networkservices_ntp_server_n_key
  label: "xConfiguration NetworkServices NTP Server [n] Key"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] Key: <String>"
  params:
    - name: n
      type: integer
      description: UNRESOLVED

- id: x_configuration_networkservices_ntp_server_n_keyid
  label: "xConfiguration NetworkServices NTP Server [n] KeyId"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] KeyId: <Integer>"
  params:
    - name: n
      type: integer
      description: UNRESOLVED

- id: x_configuration_networkservices_ntp_server_n_keyalgorithm
  label: "xConfiguration NetworkServices NTP Server [n] KeyAlgorithm"
  kind: action
  command: "xConfiguration NetworkServices NTP Server [n] KeyAlgorithm: <...>"
  params:
    - name: n
      type: integer
      description: UNRESOLVED

- id: x_configuration_networkservices_sip_mode
  label: "xConfiguration NetworkServices SIP Mode"
  kind: action
  command: "xConfiguration NetworkServices SIP Mode: <...>"
  params: []

- id: x_configuration_networkservices_h323_mode
  label: "xConfiguration NetworkServices H323 Mode"
  kind: action
  command: "xConfiguration NetworkServices H323 Mode: <...>"
  params: []

- id: x_configuration_networkservices_snmp_mode
  label: "xConfiguration NetworkServices SNMP Mode"
  kind: action
  command: "xConfiguration NetworkServices SNMP Mode: <...>"
  params: []

- id: x_configuration_networkservices_snmp_communityname
  label: "xConfiguration NetworkServices SNMP CommunityName"
  kind: action
  command: "xConfiguration NetworkServices SNMP CommunityName: <String>"
  params: []

- id: x_configuration_networkservices_snmp_sysnamesource
  label: "xConfiguration NetworkServices SNMP SysNameSource"
  kind: action
  command: "xConfiguration NetworkServices SNMP SysNameSource: <...>"
  params: []

- id: x_configuration_networkservices_snmp_systemcontact
  label: "xConfiguration NetworkServices SNMP SystemContact"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemContact: <String>"
  params: []

- id: x_configuration_networkservices_snmp_systemlocation
  label: "xConfiguration NetworkServices SNMP SystemLocation"
  kind: action
  command: "xConfiguration NetworkServices SNMP SystemLocation: <String>"
  params: []

- id: x_configuration_networkservices_smtp_mode
  label: "xConfiguration NetworkServices SMTP Mode"
  kind: action
  command: "xConfiguration NetworkServices SMTP Mode: <...>"
  params: []

- id: x_configuration_networkservices_smtp_server
  label: "xConfiguration NetworkServices SMTP Server"
  kind: action
  command: "xConfiguration NetworkServices SMTP Server: <String>"
  params: []

- id: x_configuration_networkservices_smtp_port
  label: "xConfiguration NetworkServices SMTP Port"
  kind: action
  command: "xConfiguration NetworkServices SMTP Port: <Integer>"
  params: []

- id: x_configuration_networkservices_smtp_username
  label: "xConfiguration NetworkServices SMTP Username"
  kind: action
  command: "xConfiguration NetworkServices SMTP Username: <String>"
  params: []

- id: x_configuration_networkservices_smtp_password
  label: "xConfiguration NetworkServices SMTP Password"
  kind: action
  command: "xConfiguration NetworkServices SMTP Password: <String>"
  params: []

- id: x_configuration_networkservices_smtp_from
  label: "xConfiguration NetworkServices SMTP From"
  kind: action
  command: "xConfiguration NetworkServices SMTP From: <String>"
  params: []

- id: x_configuration_networkservices_smtp_security
  label: "xConfiguration NetworkServices SMTP Security"
  kind: action
  command: "xConfiguration NetworkServices SMTP Security: <...>"
  params: []

- id: x_configuration_networkservices_upnp_mode
  label: "xConfiguration NetworkServices UPnP Mode"
  kind: action
  command: "xConfiguration NetworkServices UPnP Mode: <...>"
  params: []

- id: x_configuration_networkservices_upnp_timeout
  label: "xConfiguration NetworkServices UPnP Timeout"
  kind: action
  command: "xConfiguration NetworkServices UPnP Timeout: <Integer>"
  params: []

- id: x_configuration_networkservices_welcometext
  label: "xConfiguration NetworkServices WelcomeText"
  kind: action
  command: "xConfiguration NetworkServices WelcomeText: <String>"
  params: []

- id: x_configuration_networkservices_wifi_allowed
  label: "xConfiguration NetworkServices Wifi Allowed"
  kind: action
  command: "xConfiguration NetworkServices Wifi Allowed: <...>"
  params: []

- id: x_configuration_networkservices_wifi_settings_frequencyband
  label: "xConfiguration NetworkServices Wifi Settings FrequencyBand"
  kind: action
  command: "xConfiguration NetworkServices Wifi Settings FrequencyBand: <2_4Ghz/5Ghz/6Ghz/Auto>"
  params: []

- id: x_configuration_networkservices_wifi_enabled
  label: "xConfiguration NetworkServices Wifi Enabled"
  kind: action
  command: "xConfiguration NetworkServices Wifi Enabled: <...>"
  params: []

- id: x_configuration_networkservices_cdp_mode
  label: "xConfiguration NetworkServices CDP Mode"
  kind: action
  command: "xConfiguration NetworkServices CDP Mode: <...>"
  params: []

- id: x_configuration_networkservices_lldp_mode
  label: "xConfiguration NetworkServices LLDP Mode"
  kind: action
  command: "xConfiguration NetworkServices LLDP Mode: <...>"
  params: []

- id: x_configuration_networkservices_commonproxy
  label: "xConfiguration NetworkServices CommonProxy"
  kind: action
  command: "xConfiguration NetworkServices CommonProxy: <...>"
  params: []

- id: x_configuration_networkservices_discoveryprotocol_systemname
  label: "xConfiguration NetworkServices DiscoveryProtocol SystemName"
  kind: action
  command: "xConfiguration NetworkServices DiscoveryProtocol SystemName: <String>"
  params: []

- id: x_configuration_networkservices_ptp_priority
  label: "xConfiguration NetworkServices PTP Priority"
  kind: action
  command: "xConfiguration NetworkServices PTP Priority: <Integer>"
  params: []

- id: x_configuration_security_xapi_websocket_apikey_allowed
  label: "xConfiguration Security Xapi WebSocket ApiKey Allowed"
  kind: action
  command: "xConfiguration Security Xapi WebSocket ApiKey Allowed: <...>"
  params: []

- id: x_configuration_security_fips_mode
  label: "xConfiguration Security Fips Mode"
  kind: action
  command: "xConfiguration Security Fips Mode: <...>"
  params: []

- id: x_configuration_security_csr_keysize
  label: "xConfiguration Security CSR KeySize"
  kind: action
  command: "xConfiguration Security CSR KeySize: <...>"
  params: []

- id: x_configuration_security_enrollment_keysize
  label: "xConfiguration Security Enrollment KeySize"
  kind: action
  command: "xConfiguration Security Enrollment KeySize: <...>"
  params: []

- id: x_configuration_security_audit_onerror_action
  label: "xConfiguration Security Audit OnError Action"
  kind: action
  command: "xConfiguration Security Audit OnError Action: <...>"
  params: []

- id: x_configuration_security_audit_server_address
  label: "xConfiguration Security Audit Server Address"
  kind: action
  command: "xConfiguration Security Audit Server Address: <String>"
  params: []

- id: x_configuration_security_audit_server_port
  label: "xConfiguration Security Audit Server Port"
  kind: action
  command: "xConfiguration Security Audit Server Port: <Integer>"
  params: []

- id: x_configuration_security_audit_server_portassignment
  label: "xConfiguration Security Audit Server PortAssignment"
  kind: action
  command: "xConfiguration Security Audit Server PortAssignment: <...>"
  params: []
```

## Feedbacks
```yaml
- id: x_status_audio_microphones_mute
  label: "xStatus Audio Microphones Mute"
  kind: query
  query_command: "xStatus Audio Microphones Mute"

- id: x_status_audio_microphones_music_mode
  label: "xStatus Audio Microphones MusicMode"
  kind: query
  query_command: "xStatus Audio Microphones MusicMode"

- id: x_status_audio_microphones_noise_removal
  label: "xStatus Audio Microphones NoiseRemoval"
  kind: query
  query_command: "xStatus Audio Microphones NoiseRemoval"

- id: x_status_audio_microphones_voice_activity_detector_activity
  label: "xStatus Audio Microphones VoiceActivityDetector Activity"
  kind: query
  query_command: "xStatus Audio Microphones VoiceActivityDetector Activity"

- id: x_status_audio_output_connectors_arc_n_delay_ms
  label: "xStatus Audio Output Connectors ARC [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] DelayMs"

- id: x_status_audio_output_connectors_arc_n_mode
  label: "xStatus Audio Output Connectors ARC [n] Mode"
  kind: query
  query_command: "xStatus Audio Output Connectors ARC [n] Mode"

- id: x_status_audio_output_connectors_hdmi_n_delay_ms
  label: "xStatus Audio Output Connectors HDMI [n] DelayMs"
  kind: query
  query_command: "xStatus Audio Output Connectors HDMI [n] DelayMs"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable-parameter variables authored beyond the
# xConfiguration actions already covered. Full D15502.13 valuespace document
# (GET /valuespace.xml) defines all ranges but is not enumerated in this source.
```

## Events
```yaml
# API supports unsolicited event notifications over feedback channel
# (xFeedback register /Event/...). Source documents these event types verbatim:
#   *e OutgoingCallIndication CallId: x
#   *e CallDisconnect CallId: x CauseValue: 0 CauseString: "" CauseType: <type> OrigCallDirection: "<dir>"
#   *e CallSuccessful CallId: x Protocol: "<proto>" Direction: "<dir>" CallRate: <rate> RemoteURI: "<uri>" EncryptionIn/Out: <Off/On>
#   *e FeccActionInd Id: x Req: n Pan/Tilt/Zoom/Focus fields ...
#   *e TString CallId: x Message: "<str>"
#   *e SString String: "<str>" Id: x
# Full disconnect-cause-type appendix (D15502.13 p.738) not included in this refined source.
```

## Macros
```yaml
# Documented multiline pattern: xCommand SystemUnit WelcomeBanner Set (payload
# lines terminated by single "."). See action x_command_systemunit_welcomebanner_set.
# No other enumerated multi-step macro sequences authored.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit device-safety warnings, interlock
# procedures, or power-on sequencing requirements. Note: admin passphrase is
# mandatory on first login and SSH/serial access require passphrase - this is
# an access-control constraint, not a device-safety interlock.
```

## Notes
- **Case-insensitivity:** all xAPI commands case-insensitive (`xCommand`, `XCOMMAND`, `xcommand` all valid).
- **Quoting:** values containing spaces must be quoted (`number: "my number"`).
- **Value types:** `<x..y>` integer range; `<X/Y/Z>` literal enum; `<S: min, max>` string length bounds.
- **Search:** `//` wildcard within xConfiguration/xStatus (e.g. `xStatus //vid//res//wid`). CLI tab-completion, history (`<CTRL-r>`), line editing (`<CTRL-a>`/`<CTRL-e>`/`<CTRL-w>`) supported.
- **Serial baud change:** new baud rate takes effect only after device reboot.
- **Audio ConnectorSetup:** in `Auto` mode, `xCommand Audio Setup/LocalInput/LocalOutput *` have no effect.
- **Device applicability varies:** each command lists an "Applies to" model set and required user role (ADMIN / INTEGRATOR / USER / AUDIT / ROOMCONTROL). Default admin account username: `admin` (passphrase set on first login).
- **TMS conflict:** avoid HttpFeedback FeedbackSlot 3 when Cisco TelePresence Management Suite is in use (TMS reserves slot 3).
- **Session limits:** finite concurrent HTTP XMLAPI sessions; restart invalidates all sessions (see `xConfiguration Security Session MaxTotalSessions`, `InactivityTimeout`).
- **Presentation sources:** PresentationSource enum varies by product (Board/Room Kit: 1/2/AirPlay/Miracast/None/Remote/WebView; Codec Pro family: 1..10/AirPlay/DirectShare/Miracast/None/Remote/WebView; see source table lines 1409-1418).
- **Video Matrix SourceId ranges:** Room Bar Pro 1..6; Codec EQ 1..9; Codec Pro/Room 70 G2/Room Panorama/Room 70 Panorama 1..7 (multiple-4 supported).
<!-- UNRESOLVED: firmware version compatibility ranges across listed models not stated beyond RoomOS 11.32 baseline; supported-commands matrix (D15502.13 p.654+) and disconnect-cause appendix (p.738) not included in refined source; ~47 NetworkServices and remaining Security infrastructure config commands documented verbatim but not enumerated as discrete actions. -->

Upgrade done. Added 25 new actions (Video Matrix x4, SetMainVideoSource, Presentation Start, WelcomeBanner, xFeedback x3, xPreferences, xEvent, xGetxml, SerialPort x6, SIP x6, Security Session x6, NetworkServices transport-toggle x4) + 3 new feedbacks. No dupes of deterministic 16 actions / 7 feedbacks. Prose/transport/traits preserved + refined. NetworkServices/Security infra configs noted UNRESOLVED (47 entries) — verbatim in source lines 852-923 but omitted to avoid bloat.

## Provenance

```yaml
source_domains:
  - cisco.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-1132/api-reference-guide-roomos-1132.pdf
retrieved_at: 2026-06-25T19:57:51.909Z
last_checked_at: 2026-10-07T20:49:47.394Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:49:47.394Z
matched_actions: 109
action_count: 109
confidence: medium
summary: "All 109 action units match source commands literally, transport values (443, 115200 8N1, no flow control, Basic auth) are supported, and the spec covers essentially the whole catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source captures API fundamentals, transport, audio/camera/status/feedback command samples, plus video matrix / presentation / SIP / serial / security / network-services config groups. Full D15502.13 reference (~172k lines) contains hundreds of additional commands across cameras, bookings, conference, network, security, UserInterface, video, peripherals, SystemUnit, Webex, macros, MicrosoftTeams categories; those commands are not enumerated in this spec."
- "SSH TCP port number not stated in source (SSH described as enabled-by-default, no port given)"
- "WebSocket port not stated separately (ties to HTTP service)"
- "source documents ~47 additional NetworkServices config entries"
- "no discrete settable-parameter variables authored beyond the"
- "source contains no explicit device-safety warnings, interlock"
- "firmware version compatibility ranges across listed models not stated beyond RoomOS 11.32 baseline; supported-commands matrix (D15502.13 p.654+) and disconnect-cause appendix (p.738) not included in refined source; ~47 NetworkServices and remaining Security infrastructure config commands documented verbatim but not enumerated as discrete actions."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
