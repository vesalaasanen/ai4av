---
schema_version: ai4av-public-spec-v1
device_id: pinacle/soundbridge
entity_id: pinacle_soundbridge
spec_id: admin/pinacle-soundbridge
revision: 1
author: admin
title: "Pinacle Soundbridge Control Spec"
status: published
manufacturer: Pinacle
manufacturer_key: pinacle
model_family: SoundBridge
aliases: []
compatible_with:
  manufacturers:
    - Pinacle
  models:
    - SoundBridge
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
  - https://applicationmarket.crestron.com/pinacle-soundbridge
source_documents:
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:17:27.597Z
  - title: "Pinacle public source"
    url: https://applicationmarket.crestron.com/pinacle-soundbridge
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:17:28.450Z
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T19:18:11.890Z
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T19:25:06.790Z
retrieved_at: 2026-04-26T19:25:06.790Z
last_checked_at: 2026-04-27T15:02:39.110Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T15:02:39.110Z
  matched_actions: 167
  action_count: 167
  confidence: high
  summary: "All 167 spec actions matched literal command names in source; transport parameters verified; full command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Pinacle Soundbridge Control Spec

## Summary
Roku SoundBridge is a network-connected digital audio receiver. RCP protocol supports TCP (Telnet ports 5555/4445) and serial (RS-232/I2S). Commands are ASCII with CRLF terminators. Three command classes: synchronous (immediate), transacted (background, cancelable), and subscription (state-change events).

<!-- UNRESOLVED: manufacturer stated as "Roku" in source; input specified "Pinacle" — using input value -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5555
serial:
  baud_rate: null
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: cancel_transaction
  label: CancelTransaction
  kind: action
  params:
    - name: command_id
      type: string
      description: Command name of transacted command to cancel
- id: get_list_result_type
  label: GetListResultType
  kind: action
  params: []
- id: set_list_result_type
  label: SetListResultType
  kind: action
  params:
    - name: type
      type: enum
      values:
        - full
        - partial
- id: get_list_result
  label: GetListResult
  kind: action
  params:
    - name: start_index
      type: integer
    - name: end_index
      type: integer
- id: delete_list
  label: DeleteList
  kind: action
  params: []
- id: get_data_result_type
  label: GetDataResultType
  kind: action
  params: []
- id: set_data_result_type
  label: SetDataResultType
  kind: action
  params:
    - name: type
      type: enum
      values:
        - binary
        - hex
- id: get_progress_mode
  label: GetProgressMode
  kind: action
  params: []
- id: set_progress_mode
  label: SetProgressMode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - verbose
        - off
- id: get_initial_setup_complete
  label: GetInitialSetupComplete
  kind: action
  params: []
- id: set_initial_setup_complete
  label: SetInitialSetupComplete
  kind: action
  params: []
- id: get_required_setup_steps
  label: GetRequiredSetupSteps
  kind: action
  params: []
- id: list_languages
  label: ListLanguages
  kind: action
  params: []
- id: get_language
  label: GetLanguage
  kind: action
  params: []
- id: set_language
  label: SetLanguage
  kind: action
  params:
    - name: language
      type: union
      variants:
        - type: integer
        - type: string
- id: list_regions
  label: ListRegions
  kind: action
  params: []
- id: set_region
  label: SetRegion
  kind: action
  params:
    - name: region
      type: integer
- id: get_terms_of_service_url
  label: GetTermsOfServiceUrl
  kind: action
  params: []
- id: accept_terms_of_service
  label: AcceptTermsOfService
  kind: action
  params: []
- id: get_if_config
  label: GetIfConfig
  kind: action
  params: []
- id: get_link_status
  label: GetLinkStatus
  kind: action
  params:
    - name: interface
      type: union
      variants:
        - type: string
        - type: integer
      default: null
- id: get_ip_address
  label: GetIPAddress
  kind: action
  params:
    - name: interface
      type: union
      variants:
        - type: string
        - type: integer
      default: null
- id: get_mac_address
  label: GetMACAddress
  kind: action
  params:
    - name: interface
      type: union
      variants:
        - type: string
        - type: integer
      default: null
- id: list_wifi_networks
  label: ListWiFiNetworks
  kind: action
  params: []
- id: get_wifi_network_selection
  label: GetWiFiNetworkSelection
  kind: action
  params: []
- id: set_wifi_network_selection
  label: SetWiFiNetworkSelection
  kind: action
  params:
    - name: network
      type: union
      variants:
        - type: string
        - type: integer
- id: set_wifi_password
  label: SetWiFiPassword
  kind: action
  params:
    - name: password
      type: string
- id: wifi_network_connect
  label: WiFiNetworkConnect
  kind: action
  params: []
- id: get_connected_wifi_network
  label: GetConnectedWiFiNetwork
  kind: action
  params: []
- id: get_wifi_signal_quality
  label: GetWiFiSignalQuality
  kind: action
  params: []
- id: get_time
  label: GetTime
  kind: action
  params:
    - name: verbose
      type: boolean
      default: false
- id: get_date
  label: GetDate
  kind: action
  params:
    - name: verbose
      type: boolean
      default: false
- id: set_time
  label: SetTime
  kind: action
  params:
    - name: time
      type: string
      description: HH:MM:SS format
- id: set_date
  label: SetDate
  kind: action
  params:
    - name: date
      type: string
      description: MM-DD-YYYY format
- id: list_time_zones
  label: ListTimeZones
  kind: action
  params: []
- id: get_time_zone
  label: GetTimeZone
  kind: action
  params: []
- id: set_time_zone
  label: SetTimeZone
  kind: action
  params:
    - name: timezone
      type: integer
- id: get_software_version
  label: GetSoftwareVersion
  kind: action
  params: []
- id: get_boot_mode
  label: GetBootMode
  kind: action
  params: []
- id: check_software_upgrade
  label: CheckSoftwareUpgrade
  kind: action
  params:
    - name: local
      type: boolean
      default: false
- id: execute_software_upgrade
  label: ExecuteSoftwareUpgrade
  kind: action
  params:
    - name: local
      type: boolean
      default: false
- id: reboot
  label: Reboot
  kind: action
  params: []
- id: reset_to_factory_defaults
  label: ResetToFactoryDefaults
  kind: action
  params: []
- id: get_friendly_name
  label: GetFriendlyName
  kind: action
  params: []
- id: set_friendly_name
  label: SetFriendlyName
  kind: action
  params:
    - name: name
      type: string
- id: get_option
  label: GetOption
  kind: action
  params:
    - name: name
      type: string
- id: set_option
  label: SetOption
  kind: action
  params:
    - name: name
      type: string
    - name: value
      type: string
- id: get_visualizer
  label: GetVisualizer
  kind: action
  params:
    - name: verbose
      type: boolean
      default: false
- id: set_visualizer
  label: SetVisualizer
  kind: action
  params:
    - name: visualizer
      type: union
      variants:
        - type: integer
        - type: string
- id: get_visualizer_mode
  label: GetVisualizerMode
  kind: action
  params: []
- id: set_visualizer_mode
  label: SetVisualizerMode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - full
        - partial
        - off
- id: list_visualizers
  label: ListVisualizers
  kind: action
  params:
    - name: verbose
      type: boolean
      default: false
- id: get_viz_data_vu
  label: GetVizDataVU
  kind: action
  params: []
- id: get_viz_data_freq
  label: GetVizDataFreq
  kind: action
  params: []
- id: get_viz_data_scope
  label: GetVizDataScope
  kind: action
  params: []
- id: display_update_event_subscribe
  label: DisplayUpdateEventSubscribe
  kind: action
  params: []
- id: display_update_event_unsubscribe
  label: DisplayUpdateEventUnsubscribe
  kind: action
  params: []
- id: get_display_data
  label: GetDisplayData
  kind: action
  params: []
- id: ir_dispatch_command
  label: IrDispatchCommand
  kind: action
  params:
    - name: command
      type: union
      variants:
        - type: string
        - type: integer
- id: ir_demod_subscribe
  label: IrDemodSubscribe
  kind: action
  params:
    - name: updown
      type: boolean
      default: null
- id: ir_demod_unsubscribe
  label: IrDemodUnsubscribe
  kind: action
  params: []
- id: list_servers
  label: ListServers
  kind: action
  params: []
- id: set_server_filter
  label: SetServerFilter
  kind: action
  params:
    - name: filter_tokens
      type: array
      items:
        type: string
- id: set_server_connect_password
  label: SetServerConnectPassword
  kind: action
  params:
    - name: password
      type: string
      default: null
- id: server_connect
  label: ServerConnect
  kind: action
  params:
    - name: index
      type: integer
- id: server_launch_ui
  label: ServerLaunchUI
  kind: action
  params:
    - name: index
      type: integer
- id: server_disconnect
  label: ServerDisconnect
  kind: action
  params: []
- id: get_connected_server
  label: GetConnectedServer
  kind: action
  params: []
- id: get_active_server_info
  label: GetActiveServerInfo
  kind: action
  params: []
- id: server_get_capabilities
  label: ServerGetCapabilities
  kind: action
  params: []
- id: list_songs
  label: ListSongs
  kind: action
  params: []
- id: list_albums
  label: ListAlbums
  kind: action
  params: []
- id: list_artists
  label: ListArtists
  kind: action
  params: []
- id: list_composers
  label: ListComposers
  kind: action
  params: []
- id: list_genres
  label: ListGenres
  kind: action
  params: []
- id: list_locations
  label: ListLocations
  kind: action
  params: []
- id: list_media_languages
  label: ListMediaLanguages
  kind: action
  params: []
- id: list_playlists
  label: ListPlaylists
  kind: action
  params: []
- id: list_playlist_songs
  label: ListPlaylistSongs
  kind: action
  params:
    - name: index
      type: integer
- id: list_container_contents
  label: ListContainerContents
  kind: action
  params: []
- id: get_current_container_path
  label: GetCurrentContainerPath
  kind: action
  params: []
- id: container_enter
  label: ContainerEnter
  kind: action
  params:
    - name: index
      type: integer
- id: container_exit
  label: ContainerExit
  kind: action
  params: []
- id: search_songs
  label: SearchSongs
  kind: action
  params:
    - name: search_string
      type: string
- id: search_artists
  label: SearchArtists
  kind: action
  params:
    - name: search_string
      type: string
- id: search_albums
  label: SearchAlbums
  kind: action
  params:
    - name: search_string
      type: string
- id: search_composers
  label: SearchComposers
  kind: action
  params:
    - name: search_string
      type: string
- id: search_all
  label: SearchAll
  kind: action
  params:
    - name: search_string
      type: string
- id: set_browse_filter_artist
  label: SetBrowseFilterArtist
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_album
  label: SetBrowseFilterAlbum
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_composer
  label: SetBrowseFilterComposer
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_genre
  label: SetBrowseFilterGenre
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_location
  label: SetBrowseFilterLocation
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_media_language
  label: SetBrowseFilterMediaLanguage
  kind: action
  params:
    - name: filter_string
      type: string
- id: set_browse_filter_top_stations
  label: SetBrowseFilterTopStations
  kind: action
  params: []
- id: set_browse_filter_favorites
  label: SetBrowseFilterFavorites
  kind: action
  params: []
- id: set_song_list_sort
  label: SetSongListSort
  kind: action
  params:
    - name: sort
      type: enum
      values:
        - alpha
        - albumTrack
- id: set_browse_list_sort
  label: SetBrowseListSort
  kind: action
  params:
    - name: sort
      type: enum
      values:
        - alpha
        - ignoreThe
- id: get_song_info
  label: GetSongInfo
  kind: action
  params:
    - name: index
      type: integer
- id: get_current_song_info
  label: GetCurrentSongInfo
  kind: action
  params: []
- id: now_playing_clear
  label: NowPlayingClear
  kind: action
  params: []
- id: list_now_playing_queue
  label: ListNowPlayingQueue
  kind: action
  params: []
- id: play_index
  label: PlayIndex
  kind: action
  params:
    - name: index
      type: integer
- id: now_playing_insert
  label: NowPlayingInsert
  kind: action
  params:
    - name: index
      type: integer
    - name: insert_index
      type: integer
      default: null
- id: now_playing_remove_at
  label: NowPlayingRemoveAt
  kind: action
  params:
    - name: index
      type: integer
- id: queue_and_play
  label: QueueAndPlay
  kind: action
  params:
    - name: index
      type: integer
- id: queue_and_play_one
  label: QueueAndPlayOne
  kind: action
  params:
    - name: index
      type: union
      variants:
        - type: integer
        - type: string
- id: play
  label: Play
  kind: action
  params: []
- id: pause
  label: Pause
  kind: action
  params: []
- id: play_pause
  label: PlayPause
  kind: action
  params: []
- id: next
  label: Next
  kind: action
  params: []
- id: previous
  label: Previous
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: shuffle
  label: Shuffle
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - on
        - off
        - cycle
      default: null
- id: repeat
  label: Repeat
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - one
        - all
        - none
        - cycle
      default: null
- id: get_volume
  label: GetVolume
  kind: action
  params: []
- id: set_volume
  label: SetVolume
  kind: action
  params:
    - name: volume
      type: integer
- id: list_presets
  label: ListPresets
  kind: action
  params: []
- id: get_preset_info
  label: GetPresetInfo
  kind: action
  params:
    - name: index
      type: integer
- id: play_preset
  label: PlayPreset
  kind: action
  params:
    - name: index
      type: integer
- id: set_preset
  label: SetPreset
  kind: action
  params:
    - name: index
      type: integer
- id: get_working_song_info
  label: GetWorkingSongInfo
  kind: action
  params: []
- id: set_working_song_info
  label: SetWorkingSongInfo
  kind: action
  params:
    - name: index
      type: integer
- id: clear_working_song
  label: ClearWorkingSong
  kind: action
  params: []
- id: get_transport_state
  label: GetTransportState
  kind: query
  params: []
- id: get_elapsed_time
  label: GetElapsedTime
  kind: query
  params: []
- id: get_total_time
  label: GetTotalTime
  kind: query
  params: []
- id: get_current_now_playing_index
  label: GetCurrentNowPlayingIndex
  kind: query
  params: []
- id: socket_stream_open
  label: SocketStreamOpen
  kind: action
  params:
    - name: address
      type: string
      description: ipaddr:port format
- id: socket_close
  label: SocketClose
  kind: action
  params:
    - name: socket_id
      type: integer
- id: socket_receive_bytes
  label: SocketReceiveBytes
  kind: action
  params:
    - name: socket_id
      type: integer
    - name: max_bytes
      type: integer
- id: socket_send_bytes
  label: SocketSendBytes
  kind: action
  params:
    - name: socket_id
      type: integer
    - name: num_bytes
      type: integer
- id: socket_event_subscribe
  label: SocketEventSubscribe
  kind: action
  params: []
- id: socket_event_unsubscribe
  label: SocketEventUnsubscribe
  kind: action
  params: []
- id: upnp_search
  label: UPnPSearch
  kind: action
  params:
    - name: search_term
      type: string
- id: upnp_get_device_info
  label: UPnPGetDeviceInfo
  kind: query
  params:
    - name: device
      type: string
      description: index number or UUID string
- id: upnp_get_device_description
  label: UPnPGetDeviceDescription
  kind: query
  params:
    - name: device
      type: string
      description: index number or UUID string
- id: get_power_state
  label: GetPowerState
  kind: query
  params: []
- id: set_power_state
  label: SetPowerState
  kind: action
  params:
    - name: state
      type: enum
      values:
        - on
        - standby
    - name: reconnect
      type: enum
      values:
        - yes
        - no
- id: visualizer_mode
  label: VisualizerMode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - full
        - partial
        - off
- id: subscribe_transport_update_events
  label: SubscribeTransportUpdateEvents
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: transport_state
  type: enum
  values:
    - Play
    - Pause
    - Stop
    - Buffering
    - Disconnected
    - Standby
- id: transaction_result
  type: enum
  values:
    - TransactionInitiated
    - TransactionCanceled
    - TransactionComplete
    - ListResultSize
    - ListResultEnd
- id: list_result_type
  type: enum
  values:
    - full
    - partial
- id: data_result_type
  type: enum
  values:
    - hex
    - binary
- id: progress_mode
  type: enum
  values:
    - verbose
    - off
- id: visualizer_mode
  type: enum
  values:
    - full
    - partial
    - off
- id: shuffle_state
  type: enum
  values:
    - on
    - off
- id: repeat_state
  type: enum
  values:
    - one
    - all
    - off
- id: initial_setup_complete
  type: enum
  values:
    - Complete
    - NotComplete
- id: setup_steps
  type: array
  items:
    type: string
- id: wifi_signal_quality
  type: object
  properties:
    - name: quality
      type: integer
    - name: signal
      type: integer
    - name: noise
      type: integer
- id: software_version
  type: string
- id: boot_mode
  type: enum
  values:
    - Release
    - Safe
- id: upgrade_progress
  type: enum
  values:
    - CheckingUpgradeAvailability
    - CopyingUpgrade
    - DownloadingUpgrade
    - VerifyingMD5
    - ErasingFlash
    - BurningFlash
    - VerifyingFlash
    - SavingAdditionalData
    - UpgradeComplete
- id: display_data
  type: object
  properties:
    - name: type
      type: string
    - name: dimensions
      type: string
- id: viz_data_vu
  type: string
- id: viz_data_freq
  type: string
- id: viz_data_scope
  type: string
- id: ir_demod_event
  type: string
- id: display_update_event
  type: string
- id: transport_event
  type: enum
  values:
    - Stop
    - TrackChange
    - Buffering
    - Play
- id: elapsed_time
  type: string
- id: total_time
  type: string
- id: volume_level
  type: integer
- id: now_playing_index
  type: integer
- id: song_info
  type: object
- id: server_info
  type: object
  properties:
    - name: Type
      type: string
    - name: Name
      type: string
- id: server_capabilities
  type: object
- id: if_config
  type: object
- id: ip_address
  type: string
- id: mac_address
  type: string
- id: friendly_name
  type: string
- id: container_path
  type: string
```

## Variables
```yaml
- id: shuffle
  type: enum
  values:
    - on
    - off
    - cycle
- id: repeat
  type: enum
  values:
    - one
    - all
    - none
    - cycle
- id: volume
  type: integer
- id: language
  type: union
  variants:
    - type: integer
    - type: string
- id: region
  type: integer
- id: time_zone
  type: integer
- id: wifi_network_selection
  type: string
- id: server_filter
  type: array
  items:
    type: string
- id: visualizer
  type: union
  variants:
    - type: integer
    - type: string
- id: visualizer_mode
  type: enum
  values:
    - full
    - partial
    - off
- id: list_result_type
  type: enum
  values:
    - full
    - partial
- id: data_result_type
  type: enum
  values:
    - hex
    - binary
- id: progress_mode
  type: enum
  values:
    - verbose
    - off
- id: browse_filter_artist
  type: string
- id: browse_filter_album
  type: string
- id: browse_filter_composer
  type: string
- id: browse_filter_genre
  type: string
- id: browse_filter_location
  type: string
- id: browse_filter_media_language
  type: string
- id: song_list_sort
  type: enum
  values:
    - alpha
    - albumTrack
- id: browse_list_sort
  type: enum
  values:
    - alpha
    - ignoreThe
- id: friendly_name
  type: string
- id: option
  type: string
```

## Events
```yaml
- id: transport_event
  description: Unsolicited transport state change notifications
  params:
    - name: state
      type: enum
      values:
        - Stop
        - TrackChange
        - Buffering
        - Play
- id: display_update_event
  description: Display data update notifications
  params:
    - name: data
      type: string
- id: ir_demod_event
  description: IR command demodulation notifications
  params:
    - name: command
      type: string
```

## Macros
```yaml
- id: software_upgrade_sequence
  description: |
    Preconditions: unit must not be connected to a music server.
    1. CheckSoftwareUpgrade
    2. ExecuteSoftwareUpgrade
    Progress responses: CheckingUpgradeAvailability → DownloadingUpgrade (0-100) → VerifyingMD5 → ErasingFlash → BurningFlash → VerifyingFlash → SavingAdditionalData → UpgradeComplete
- id: internet_radio_playback
  description: |
    1. ServerDisconnect
    2. SetServerFilter radio
    3. ListServers
    4. ServerConnect n
    5. ListPlaylistSongs or content browsing commands
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Software upgrade requires unit to be disconnected from music server
    source: "In order for a software upgrade to succeed, the unit must not be connected to a music server."
```

## Notes
RCP protocol uses ASCII commands with CRLF (\r\n) terminators. Command classes: synchronous (immediate response), transacted (background, cancelable via CancelTransaction), subscription (state-change events until unsubscribed). Two TCP Telnet ports: 5555 (RCP shell) and 4444 (SoundBridge shell, requires "mmc" command to start RCP). Serial RS-232/I2S also supported via Wi-Fi Media Module. No authentication required. Verbose progress mode available for long-running transacted commands (ListSongs, SearchSongs, etc.).
<!-- UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source -->
<!-- UNRESOLVED: TCP port 4444 not listed in main transport block — alternate RCP shell port -->
<!-- UNRESOLVED: manufacturer discrepancy — source says "Roku", input says "Pinacle" -->

## Provenance

```yaml
source_urls:
  - https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
  - https://applicationmarket.crestron.com/pinacle-soundbridge
source_documents:
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:17:27.597Z
  - title: "Pinacle public source"
    url: https://applicationmarket.crestron.com/pinacle-soundbridge
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:17:28.450Z
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T19:18:11.890Z
  - title: "Pinacle public source"
    url: https://raw.githubusercontent.com/noyhrynban/Roku-SoundBridge-Controller/master/SoundBridgeRCPSpecification2-4.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T19:25:06.790Z
retrieved_at: 2026-04-26T19:25:06.790Z
last_checked_at: 2026-04-27T15:02:39.110Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:02:39.110Z
matched_actions: 167
action_count: 167
confidence: high
summary: "All 167 spec actions matched literal command names in source; transport parameters verified; full command catalogue coverage."
```

## Known Gaps

```yaml
[]
```
