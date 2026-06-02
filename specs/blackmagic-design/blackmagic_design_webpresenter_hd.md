---
spec_id: admin/blackmagic-design-streaming-encoder-hd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blackmagic Design Streaming Encoder HD Control Spec"
manufacturer: "Blackmagic Design"
model_family: "Blackmagic Streaming Encoder HD"
aliases: []
compatible_with:
  manufacturers:
    - "Blackmagic Design"
  models:
    - "Blackmagic Streaming Encoder HD"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - https://documents.blackmagicdesign.com/DeveloperManuals/WebPresenterEthernetProtocol.pdf
retrieved_at: 2026-04-30T04:40:49.512Z
last_checked_at: 2026-04-23T15:23:10.482Z
generated_at: 2026-04-23T15:23:10.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source"
  - "polling interval recommendations not stated in source"
  - "protocol does not describe push mechanism beyond status updates"
  - "no safety warnings or interlock procedures in source"
  - "RS-232 serial control — not covered in source"
  - "broadcast/discovery mechanism — not described in source"
  - "command timing or rate-limiting constraints — not stated in source"
  - "TLS/encryption for TCP control — not mentioned in source"
  - "recommended reconnect behavior after disconnect — not stated in source"
verification:
  verdict: verified
  checked_at: 2026-04-23T15:23:10.482Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched literally in source with correct command structure and transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Blackmagic Design Streaming Encoder HD Control Spec

## Summary
The Blackmagic Streaming Encoder HD is a network-attached streaming encoder that transmits live video to platforms such as YouTube, Twitch, and Facebook via RTMP or SRT. Control is provided over TCP on port 9977 using a line-oriented, text-based block protocol. The device exposes stream configuration, audio routing, network settings, and power management via a set of named blocks with key/value pairs.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9977
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from protocol structure:
# - queryable: status blocks can be requested and updated on change
# - routable: audio source selection (monitor out audio source)
# - powerable: shutdown/reboot actions present
Traits:
  - queryable
  - routable
  - powerable
```

## Actions
```yaml
# Identity Block - Label change
- id: set_label
  label: Set Device Label
  kind: action
  params:
    - name: label
      type: string
      description: New display name for the Streaming Encoder

# Network Block - DHCP/Static configuration
- id: set_network_dhcp
  label: Enable DHCP
  kind: action
  params:
    - name: interface
      type: integer
      description: Network interface index (e.g. 0 for Ethernet)

# Network Block - Static IP configuration
- id: set_network_static
  label: Set Static IP
  kind: action
  params:
    - name: interface
      type: integer
      description: Network interface index
    - name: addresses
      type: string
      description: Static IP and subnet in CIDR form (e.g. 192.168.1.2/255.255.255.0)
    - name: gateway
      type: string
      description: Gateway IPv4 address
    - name: dns_servers
      type: string
      description: Comma-separated list of DNS server IPv4 addresses

# UI Settings Block - Locale
- id: set_locale
  label: Set Locale
  kind: action
  params:
    - name: locale
      type: string
      description: Locale string (e.g. en_US.UTF-8)

# UI Settings Block - Audio Meter
- id: set_audio_meter
  label: Set Audio Meter Type
  kind: action
  params:
    - name: meter
      type: string
      description: Audio meter type (e.g. PPM -20dB, VU -18dB)

# Stream Settings Block
- id: set_stream_settings
  label: Set Stream Settings
  kind: action
  params:
    - name: video_mode
      type: string
      description: Video mode (e.g. 1080p59.94, 720p60)
    - name: platform
      type: string
      description: Streaming platform name
    - name: server
      type: string
      description: Server name (platform-dependent)
    - name: quality_level
      type: string
      description: Quality level (e.g. Streaming Medium)
    - name: stream_key
      type: string
      description: Stream key for the platform
    - name: password
      type: string
      description: SRT passphrase (if applicable)
    - name: url
      type: string
      description: Custom streaming URL (if supported)

# Stream State Block - Start/Stop
- id: stream_start
  label: Start Stream
  kind: action
  params: []

- id: stream_stop
  label: Stop Stream
  kind: action
  params: []

# Audio Settings Block
- id: set_audio_source
  label: Set Monitor Out Audio Source
  kind: action
  params:
    - name: source
      type: string
      description: Audio source (Auto, SDI In, Remote Source)

# Stream XML Block
- id: add_stream_xml
  label: Add Stream XML File
  kind: action
  params:
    - name: filename
      type: string
      description: XML filename
    - name: contents
      type: string
      description: XML file contents

- id: remove_stream_xml
  label: Remove Stream XML File
  kind: action
  params:
    - name: filename
      type: string
      description: XML filename to remove

- id: remove_all_stream_xml
  label: Remove All Stream XML Files
  kind: action
  params: []

# Shutdown Block
- id: reboot
  label: Reboot Device
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

# Status Dump Requests
- id: request_status_dump
  label: Request Status Dump
  kind: action
  params:
    - name: block
      type: string
      description: Block name to request (IDENTITY, VERSION, NETWORK, UI SETTINGS, STREAM SETTINGS, STREAM STATE, AUDIO SETTINGS)
```

## Feedbacks
```yaml
# Protocol Preamble Block (sent on every connection)
- id: protocol_preamble
  label: Protocol Preamble
  type: object
  fields:
    - name: version
      type: string
      description: Protocol version (e.g. 1.2)

# Identity Block
- id: identity
  label: Identity
  type: object
  fields:
    - name: model
      type: string
      description: Streaming Encoder model name (read-only)
    - name: label
      type: string
      description: Display name (read/write)
    - name: unique_id
      type: string
      description: Hexadecimal device unique identifier (read-only)

# Version Block
- id: version
  label: Version
  type: object
  fields:
    - name: product_id
      type: string
      description: Hexadecimal product ID (read-only)
    - name: hardware_version
      type: string
      description: Hardware version (read-only)
    - name: software_version
      type: string
      description: Software version (read-only)
    - name: software_release
      type: string
      description: Software release number (read-only)

# Network Block
- id: network
  label: Network Status
  type: object
  fields:
    - name: interface_count
      type: integer
      description: Number of networking interfaces
    - name: default_interface
      type: integer
      description: Default networking interface index

# Network Interface (per interface)
- id: network_interface
  label: Network Interface
  type: object
  fields:
    - name: name
      type: string
      description: Interface name (e.g. Ethernet, USBEthernet)
    - name: priority
      type: integer
      description: Interface priority (higher = higher priority)
    - name: mac_address
      type: string
      description: IEEE 802 MAC address
    - name: dynamic_ip
      type: boolean
      description: true = DHCP, false = Static IP
    - name: current_addresses
      type: string
      description: Active IP/subnet in CIDR form
    - name: current_gateway
      type: string
      description: Active gateway IPv4 address
    - name: current_dns_servers
      type: string
      description: Comma-separated DNS server list
    - name: static_addresses
      type: string
      description: Static IP/subnet when DHCP disabled
    - name: static_gateway
      type: string
      description: Static gateway when DHCP disabled
    - name: static_dns_servers
      type: string
      description: Static DNS servers when DHCP disabled

# UI Settings Block
- id: ui_settings
  label: UI Settings
  type: object
  fields:
    - name: available_locales
      type: string
      description: Comma-separated list of available locales
    - name: current_locale
      type: string
      description: Currently selected locale
    - name: available_audio_meters
      type: string
      description: Comma-separated list of audio meter types
    - name: current_audio_meter
      type: string
      description: Currently selected audio meter

# Stream Settings Block
- id: stream_settings
  label: Stream Settings
  type: object
  fields:
    - name: available_video_modes
      type: string
      description: Comma-separated list of video modes
    - name: video_mode
      type: string
      description: Current video mode
    - name: current_platform
      type: string
      description: Selected streaming platform
    - name: current_server
      type: string
      description: Current server for selected platform
    - name: current_quality_level
      type: string
      description: Current streaming quality level
    - name: stream_key
      type: string
      description: Stream key (write-only display recommended)
    - name: password
      type: string
      description: SRT passphrase (write-only)
    - name: current_url
      type: string
      description: Current streaming URL
    - name: customizable_url
      type: boolean
      description: Whether custom URLs are supported
    - name: available_default_platforms
      type: string
      description: Comma-separated list of default platforms
    - name: available_custom_platforms
      type: string
      description: Comma-separated list of custom platforms
    - name: available_servers
      type: string
      description: Available servers for current platform
    - name: available_quality_levels
      type: string
      description: Available quality levels

# Stream State Block
- id: stream_state
  label: Stream State
  type: object
  fields:
    - name: status
      type: enum
      values:
        - Idle
        - Connecting
        - Streaming
        - Interrupted
      description: Current streaming status (read-only, updated on change)
    - name: duration
      type: string
      description: Stream duration in DD:HH:MM:SS format
    - name: bitrate
      type: integer
      description: Current bitrate in bits per second
    - name: cache_used
      type: integer
      description: Cache usage as percentage

# Audio Settings Block
- id: audio_settings
  label: Audio Settings
  type: object
  fields:
    - name: current_monitor_out_audio_source
      type: string
      description: Current audio source for monitor output
    - name: available_monitor_out_audio_sources
      type: string
      description: Available audio sources

# Stream XML Block
- id: stream_xml
  label: Stream XML
  type: object
  fields:
    - name: files
      type: string
      description: Comma-separated list of loaded XML filenames

# Acknowledge / Negative Acknowledge
- id: ack
  label: ACK
  type: enum
  values:
    - ACK
    - NACK
  description: Server response to write commands (ACK = success, NACK = failure)

# End Prelude Block
- id: end_prelude
  label: End Prelude
  type: enum
  values:
    - END PRELUDE
  description: Marks end of initial status dump
```

## Variables
```yaml
# All writable keys from blocks can be treated as settable variables.
# Key variable names mirror the writable keys in Feedbacks above:
# - label (IDENTITY)
# - locale, audio meter (UI SETTINGS)
# - video mode, platform, server, quality level, stream key, URL (STREAM SETTINGS)
# - network interface settings (Dynamic IP, Static Addresses, Static Gateway, Static DNS)
# - monitor out audio source (AUDIO SETTINGS)
# UNRESOLVED: polling interval recommendations not stated in source
```

## Events
```yaml
# The device sends unsolicited status updates when parameters change.
# Events are the block updates themselves (see Feedbacks).
# Clients should subscribe to the following block update events:
# - IDENTITY: device label changed
# - NETWORK INTERFACE N: network configuration changed
# - UI SETTINGS: locale or audio meter changed
# - STREAM SETTINGS: streaming configuration changed
# - STREAM STATE: stream status changed (Status field only; Duration, Bitrate, Cache Used require polling)
# - AUDIO SETTINGS: audio source changed
# UNRESOLVED: protocol does not describe push mechanism beyond status updates
```

## Macros
```yaml
# No explicit multi-step macros are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

The protocol is a pure request/response model over TCP port 9977. All messages are ASCII text with LF line termination. The server sends a full status dump on connection (preamble + all blocks + END PRELUDE), then sends incremental block updates whenever any parameter changes.

ACK/NACK responses are sent for every write command. If a key is unrecognized, it is silently ignored and ACK is still returned. If a value is invalid for a known key, the existing value is retained and ACK is returned (with the actual value in the subsequent status update).

Changing network settings may drop the TCP connection.

The Shutdown block (reboot/factory reset) is write-only and is never sent unsolicited by the server.

<!-- UNRESOLVED: RS-232 serial control — not covered in source -->
<!-- UNRESOLVED: broadcast/discovery mechanism — not described in source -->
<!-- UNRESOLVED: command timing or rate-limiting constraints — not stated in source -->
<!-- UNRESOLVED: TLS/encryption for TCP control — not mentioned in source -->
<!-- UNRESOLVED: recommended reconnect behavior after disconnect — not stated in source -->

## Provenance

```yaml
source_domains:
  - documents.blackmagicdesign.com
source_urls:
  - https://documents.blackmagicdesign.com/DeveloperManuals/WebPresenterEthernetProtocol.pdf
retrieved_at: 2026-04-30T04:40:49.512Z
last_checked_at: 2026-04-23T15:23:10.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:23:10.482Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched literally in source with correct command structure and transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source"
- "polling interval recommendations not stated in source"
- "protocol does not describe push mechanism beyond status updates"
- "no safety warnings or interlock procedures in source"
- "RS-232 serial control — not covered in source"
- "broadcast/discovery mechanism — not described in source"
- "command timing or rate-limiting constraints — not stated in source"
- "TLS/encryption for TCP control — not mentioned in source"
- "recommended reconnect behavior after disconnect — not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
